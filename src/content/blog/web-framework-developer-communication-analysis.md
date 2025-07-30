---
title: "GitHub NLP Analysis #2: Web Framework Communities Talk Differently"
description: "Developers communicate differently across GitHub repositories like React, Vue, Django, Rails, Phoenix, and HTMX. For example, React is flooded with questions, Phoenix has many bug reports, and Django is highly discussion-oriented."
pubDate: "Oct 26, 2024"
---

This is the second post in which I analyze data scraped from GitHub to learn more about developer communication. [Check out the first post in this series to catch up.](./how-developers-communicate-on-github.md)

These posts are based on a research paper I wrote for a natural language processing course at Brigham Young University.

[Original paper available here.](/github-nlp/analyzing-github-repositories.pdf)

## Does Communication Differ Between GitHub Projects?

In the last post, we looked at the high-level characteristics of natural language in GitHub repositories. Now we'll examine specific repositories in search of interesting patterns.

**TL;DR: each community communicates very differently.**

## Methodology Recap

I analyzed code comments and issue comments from 19 GitHub repositories.

For this post, I'll focus on a subset of these projects: web frameworks like React, Vue, Django, Rails, Phoenix, and HTMX.

I used the same classification methods as before:

- Sentiment analysis was performed to label comments as _positive_ or _negative_.
- Code comments are categorized as _explanations_, _deprecations_, or _future work_.
- Issue comments are categorized as _questions_, _conclusions_, _discussions_, _solutions_, _feature requests_, or _bug reports_.

## Results

Let's examine the findings from each of the above bullet points individually.

### Comment Sentiment

The frequency of positive comments differs significantly between projects.

![Number of positive versus negative comments in web framework GitHub projects](/github-nlp/web-framework-positivity-ratios.webp)

Phoenix has the most positive community (25%) while HTMX has the least positive (15%).

I find this surprising because, from what I've seen, Phoenix and HTMX both have a reputation of being loved by developers (myself included).

### Code Comment Purposes

When it comes to code comments, the distribution of purposes doesn't vary much between repositories. Explanations dominate across the board.

![Purposes of code comments by project](/github-nlp/web-framework-code-comment-purpose-ratios.webp)

The only notable exception is Vue's much higher proportion of _future work_ comments. Perhaps the Vue community is more forward-thinking than most?

### Issue Comment Purposes

In contrast to code comments, the purposes of issue comments varies significantly between projects.

![Purposes of issue comments by project](/github-nlp/web-framework-issue-comment-purpose-ratios.webp)

React comments are by far the most likely to be questions. This may be due to React’s popularity; it likely attracts the most new, inexperienced developers, who are more likely to ask questions.

Django boasts a tiny bug report rate and a high discussion rate. Since Django is relatively old and mature, it makes sense that its developers would be slower and more deliberate.

Rails has a similar pattern to Django, although less extreme. Rails has a similar design philosophy to Django: both prioritize developer experience and velocity. Does goal similarity lead to communication similarity?

Phoenix has a high frequency of feature requests and bug reports. This tracks with my personal experience; I've found Phoenix lacking key features of more mature frameworks like Django. Give me auto-generated migration scripts already!

## Conclusion

Here's what I take from this analysis:

- Communication styles vary widely between projects.
- Mature projects have more discussions and fewer bugs.
- Popular projects get proportionally more questions.
- Project goals and philosophies likely influence communication styles.

## Why It Matters

~~Heck if I know, I just wanted to pit web frameworks against each other.~~

Understanding how communication styles vary between projects can help developers and maintainers tailor their communication strategies to better engage with their communities.

## Next Up

In the next post, I'll explore how communication styles impact project growth and popularity. Do explanatory comments and positive sentiment help your project get more stars? Stay tuned!

Hopefully it won't take me another six months to write it 😅

