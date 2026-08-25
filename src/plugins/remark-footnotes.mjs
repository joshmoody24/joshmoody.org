import GithubSlugger from "github-slugger";

const REF_NAME = "FootnoteRef";
const BODY_NAME = "Footnote";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Containers a trailing backlink can sit inside; anything else gets its own paragraph.
const PHRASING_CONTAINERS = new Set([
  "paragraph",
  "p",
  "small",
  "span",
  "em",
  "strong",
]);

const isJsxElement = (node, name) =>
  (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
  node.name === name;

const slugOf = (node) => {
  const attribute = node.attributes?.find(
    (a) => a.type === "mdxJsxAttribute" && a.name === "id",
  );
  return typeof attribute?.value === "string" ? attribute.value : null;
};

const el = (name, props, children = []) => ({
  type: "mdxJsxFlowElement",
  name,
  attributes: Object.entries(props).map(([name, value]) => ({
    type: "mdxJsxAttribute",
    name,
    value,
  })),
  children,
});

const inline = (name, props, children) => ({
  ...el(name, props, children),
  type: "mdxJsxTextElement",
});

const words = (value) => ({ type: "text", value });

const walk = (node, visit) => {
  for (const child of node.children ?? []) {
    visit(child);
    walk(child, visit);
  }
};

const collect = (tree) => {
  const refs = [];
  const bodies = [];
  walk(tree, (node) => {
    if (isJsxElement(node, REF_NAME)) refs.push(node);
    else if (isJsxElement(node, BODY_NAME)) bodies.push(node);
  });
  return { refs, bodies };
};

const replaceInTree = (node, replacementFor) => {
  if (!Array.isArray(node.children)) return;
  node.children = node.children.flatMap((child) => {
    const replacement = replacementFor(child);
    if (replacement) return replacement;
    replaceInTree(child, replacementFor);
    return [child];
  });
};

const buildRef = ({ slug, number }) =>
  inline("sup", { class: "footnote-ref", id: `footnote-${slug}-ref` }, [
    inline(
      "a",
      {
        class: "footnote-link",
        href: `#footnote-${slug}`,
        role: "doc-noteref",
        "aria-describedby": `footnote-${slug}`,
      },
      [words(String(number))],
    ),
    inline(
      "button",
      {
        class: "footnote-button",
        type: "button",
        role: "doc-noteref",
        popovertarget: `footnote-${slug}-popover`,
        "aria-label": `Footnote ${number}`,
        "aria-details": `footnote-${slug}-popover`,
        style: `anchor-name: --footnote-${slug}`,
      },
      [words(String(number))],
    ),
  ]);

const withBacklink = (children, { slug, number }) => {
  const backlink = inline(
    "a",
    {
      class: "footnote-backlink",
      href: `#footnote-${slug}-ref`,
      role: "doc-backlink",
      "aria-label": `Back to reference ${number}`,
    },
    [words("↩")],
  );
  const trailing = [words(" "), backlink];
  const last = children.at(-1);

  // A bare inline body has no block to trail, so give it a paragraph to sit in.
  if (last && !Array.isArray(last.children)) {
    return [{ type: "paragraph", children: [...children, ...trailing] }];
  }
  if (
    PHRASING_CONTAINERS.has(last?.type) ||
    PHRASING_CONTAINERS.has(last?.name)
  ) {
    return [
      ...children.slice(0, -1),
      { ...last, children: [...last.children, ...trailing] },
    ];
  }
  return [...children, { type: "paragraph", children: [backlink] }];
};

const headingText = (node) =>
  isJsxElement(node, REF_NAME)
    ? ""
    : (node.value ?? (node.children ?? []).map(headingText).join(""));

// Without this a marker's digits end up in the heading's generated anchor.
// Every heading is slugged so the duplicate counter matches rehype-slug.
const pinAnnotatedHeadingIds = (tree, refs) => {
  const slugger = new GithubSlugger();
  walk(tree, (node) => {
    if (node.type !== "heading") return;
    const id = slugger.slug(headingText(node));
    let annotated = false;
    walk(node, (child) => (annotated ||= refs.has(child)));
    if (annotated) {
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, id },
      };
    }
  });
};

export const remarkFootnotes = () => (tree, file) => {
  const { refs, bodies } = collect(tree);
  if (refs.length === 0 && bodies.length === 0) return;

  const validate = (node) => {
    const slug = slugOf(node);
    if (!slug) {
      file.fail(
        `<${node.name}> needs a string id, e.g. id="borrow-checker"`,
        node,
      );
    }
    if (!SLUG_PATTERN.test(slug)) {
      file.fail(`Footnote id "${slug}" must be lowercase kebab-case`, node);
    }
    return slug;
  };

  const notes = refs.map((node, index) => ({
    node,
    slug: validate(node),
    number: index + 1,
  }));
  const bodyBySlug = new Map(bodies.map((node) => [validate(node), node]));

  for (const { slug } of notes) {
    if (!bodyBySlug.has(slug)) {
      file.fail(`<FootnoteRef id="${slug}" /> has no matching <Footnote>`);
    }
  }
  for (const slug of bodyBySlug.keys()) {
    if (!notes.some((note) => note.slug === slug)) {
      file.fail(`<Footnote id="${slug}"> is never referenced`);
    }
  }
  const duplicate = notes.find(
    (note, i) => notes.findIndex((n) => n.slug === note.slug) !== i,
  );
  if (duplicate) {
    file.fail(`Two footnote references share the id "${duplicate.slug}"`);
  }

  const refNodes = new Set(refs);
  pinAnnotatedHeadingIds(tree, refNodes);

  const noteByRef = new Map(notes.map((note) => [note.node, note]));
  const bodyNodes = new Set(bodies);
  replaceInTree(tree, (node) => {
    if (bodyNodes.has(node)) return [];
    const note = noteByRef.get(node);
    // The word joiner keeps the marker from wrapping away from its word, so it
    // must stay flush against it with no intervening whitespace.
    return note ? [words("⁠"), buildRef(note)] : null;
  });

  const bodyOf = (slug) => bodyBySlug.get(slug).children;
  tree.children.push(
    el(
      "section",
      {
        class: "footnotes",
        role: "doc-endnotes",
        "aria-labelledby": "footnotes-heading",
      },
      [
        el("h2", { id: "footnotes-heading" }, [words("Footnotes")]),
        el(
          "ol",
          {},
          notes.map((note) =>
            el(
              "li",
              { id: `footnote-${note.slug}`, role: "doc-endnote" },
              withBacklink(bodyOf(note.slug), note),
            ),
          ),
        ),
      ],
    ),
    ...notes.map((note) =>
      el(
        "div",
        {
          class: "footnote-popover",
          id: `footnote-${note.slug}-popover`,
          popover: "auto",
          role: "doc-endnote",
          style: `position-anchor: --footnote-${note.slug}`,
        },
        structuredClone(bodyOf(note.slug)),
      ),
    ),
  );
};
