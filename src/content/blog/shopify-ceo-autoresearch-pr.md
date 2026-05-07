---
title:
  "Prediction: The Shopify CEO's Pull Request Will Never Be
  Merged Nor Closed"
description:
  "The CEO of Shopify used an AI tool called autoresearch to
  optimize Liquid parsing speed. The code quality is poor and no
  one will ever merge it."
pubDate: "March 31, 2026"
---

## Disclaimer

This post is not intended as a criticism of Tobi. I think
autoresearch is a cool idea and I like the fact that AI coding
tools are giving more people the opportunity to code. I am
critiquing the hype-based news coverage of this event and the
public's lack of interest in primary sources.

## The Autoresearch PR

The CEO of Shopify, Tobi Lütke, recently
[made headlines](https://x.com/altryne/status/2032223053116260367)
by using the AI tool
[autoresearch](https://github.com/karpathy/autoresearch) to
increase [Liquid](https://github.com/Shopify/liquid) parsing
speed by 53%.

Turns out this was a case of
["CEO Said A Thing!" journalism](https://karlbode.com/ceo-said-a-thing-journalism/)
where no one checked the primary source and all nuance was lost.

[Some articles imply the code actually shipped](https://awesomeagents.ai/news/shopify-ceo-ai-agent-liquid-engine-53-faster/#:~:text=shipped%20a%2053%25%20speedup%20that%20passed%20every%20test.)
and, well, works. Both false.

[I've dabbled in Liquid parsing myself](https://github.com/joshmoody24/templant/blob/main/src/langs/liquid/parse.js),
so I was compelled to read the code.
[Here's Tobi's actual pull request.](https://github.com/Shopify/liquid/pull/2056)
It makes the code significantly less readable, partially because
optimizations tend to be confusing, but mostly because the code
quality is just bad. See
[`lib/liquid/variable.rb`](https://github.com/Shopify/liquid/pull/2056/changes#diff-8aaa4fab9be3d1c69144327bf7ee6918e49eb7ff801ed25ee599144b56915256)
if you enjoy the feeling of your eyes glazing over.

On top of that, tests are failing.

![Failing tests on Tobi's pull request](/liquid-pr-test-failures.png)

To be fair, not _that_ many are failing: only
[3 out of 4,192](https://github.com/Shopify/liquid/actions/runs/23025139343/job/66871075325?pr=2056)
specs. Tricky ones, though. The remaining failures are code
quality related, like too many layers of nesting.

If I maintained Liquid, I wouldn't bother cleaning this up
because it seems unsalvageable. But I also wouldn't have the
guts to close a PR opened by the CEO. Therefore, I predict it
will stay open forever.

## TL;DR

If most of your knowledge comes from headlines, you are less
informed than you think.
