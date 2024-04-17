---
title: 'How Developers Communicate on GitHub'
description: 'This analysis explores code comments and GitHub issues across various open-source projects to understand how developers communicate technical information. It includes findings on common types of code comments, the nature of issue discussions, and trends in sentiment.'
heroImage: '/github-nlp/positive-comments-timeline.webp'
pubDate: 'Apr 16, 2024'
---

This is the first of several of posts in which I analyze data scraped from GitHub to learn more about developer communication. These posts are based on a [research paper I wrote for a natural language processing course at Brigham Young University.](/github-nlp/analyzing-github-repositories.pdf)

## Natural Language in Code Repositories

GitHub is a massively popular online service that helps developers manage and collaborate on their code. But they contain more than just code; they're also full of natural language.

Why? Large software projects require communication to ensure they don't fall apart. This communication takes many forms, and two of the most common are **code comments** and **GitHub issues**.

Code comments are snippets of natural language embedded into source code files to clarify the purpose of the underlying code.

GitHub issues are discussions between software developers or users in GitHub's issue tracking tool, typically for the purpose of reporting bugs, asking questions, or requesting features.

This post will answer the question, *What are the high-level characteristics of natural language in GitHub repositories?*

## Methodology

To answer this question, I created a dataset consisting of two types of data, **code comments** and **issue comments**, from 19 GitHub repositories. Chosen projects are diverse in purpose, size, and programming language.

The full project list is [Sitcom Simulator](https://github.com/joshmoody24/sitcom-simulator), [Nodejs.org](https://github.com/nodejs/nodejs.org), [sled](https://github.com/spacejam/sled), [Auto1111SDK](https://github.com/Auto1111SDK/Auto1111SDK), [Devika](https://github.com/stitionai/devika), [System.Linq.Dynamic.Core](https://github.com/zzzprojects/System.Linq.Dynamic.Core), [HTTPRequest](https://github.com/elnormous/HTTPRequest), [Flask](https://github.com/pallets/flask), [React](https://github.com/facebook/react), [Turbo](https://github.com/hotwired/turbo), [Rails](https://github.com/rails/rails), [Vue.js](https://github.com/vuejs/core), [MoviePy](https://github.com/Zulko/moviepy), [Astro](https://github.com/withastro/astro), [htmx](https://github.com/bigskysoftware/htmx), [Phoenix](https://github.com/phoenixframework/phoenix), [Ethereum](https://github.com/ethereum/go-ethereum), [Bootstrap](https://github.com/twbs/bootstrap), [Django](https://github.com/django/django).


There's a slight bias towards generative AI projects and web frameworks due to personal interests 🙃

I randomly sampled 1,500 code comments and 1,500 issue comments from each repository because I've already spent too much money on Colab Pro this year.

### Code Comments

I used the [GitHub API](https://docs.github.com/en/rest), [GitPython](https://gitpython.readthedocs.io/en/stable/intro.html), and a slew of regular expressions to extract code comments from every commit from 19 GitHub repositories. 

I then used the [BART model](https://huggingface.co/facebook/bart-large) as a zero-shot classifier to group the comments into the following categories:

| Comment Type | Category     | Real Example                                       |
|--------------|--------------|----------------------------------------------------|
| Code         | Explanation  | we can't run the select function on the first tab  |
| Code         | Deprecated   | DEPRECATED - Do not use if you can avoid.          |
| Code         | Future work  | TODO - support more request types POST, PUT, DELETE, etc. |

### Issue Comments

I used the GitHub API to extract the full issue comment history from each repository, and classified them into the following categories:

| Comment Type | Category         | Real Example                                        |
|--------------|------------------|-----------------------------------------------------|
| Issue        | Question         | @<person's name> this is the exact issue I am facing. Did you find any solution to this? |
| Issue        | Conclusion       | This is a duplicate of #919                         |
| Issue        | Discussion       | Sorry for the delay, I've approved but would like to give the chance for another reviewer to merge it. |
| Issue        | Solution         | You can leverage many of the latest models, paid and free through a single API at Openrouter. |
| Issue        | Feature request  | A low-hanging fruit and huge Feature boost would be adding Langsmith. Thanks! |
| Issue        | Bug report       | This bug still persists with 4-2-stable.            |

I also did sentiment analysis, classifying each comment as **POSITIVE** or **NEGATIVE** using the [DistilBERT model](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english).

## Results

I aggregated the above data into a single dataset and created some visualizations to gain a broad understanding of what technical communication looks like on GitHub.

### Code Comment Categories Over Time

![Graph of code comment categories over time](/github-nlp/purpose-category-ratio-code.webp)

The relative frequency of each code comment type has remained mostly static over time.

Explanations are by far the most common purpose for code comments, accounting for over 80% of the total. Deprecation and future work comments are almost equal in frequency, but future work takes a slight lead. This suggests that software projects tend to grow over time, with more features being created than destroyed.

### Issue Comment Categories Over Time

![Graph of issue comment categories over time](/github-nlp/purpose-category-ratio-issue.webp)

Similarly, issue comment purpose ratios have largely stayed the same over time.

More than half of issue comments are categorized as questions, but fewer than 10% of comments are classified as solutions. Assuming the classification model is reasonably accurate, this indicates that many questions raised in GitHub issues go unanswered.

The instability of the values between 2013-2015 is due to less available data during that time.

### Sentiment Analysis Over Time

![Ratio of positive comments over time](/github-nlp/positive-comments-timeline.webp)

The tone of technical communication is mostly negative. This might be because code errors and bugs are among the most frequently discussed topics. For example, the top twenty unigrams and bigrams include *error*, *problem*, *breaking 
change*, and *doesn't work*.

However, this negative slant may also be due to model limitations. Researchers have found that [standard sentiment analysis tools often struggle with technical language](https://dl.acm.org/doi/10.1007/s10664-016-9493-x).

### N-Gram Analysis

To get a feel for what words developers use, I calculated the most common unigrams and bigrams for both code and issue comments.

The results show that code comments are more technical in nature than issue comments. However, both are extremely likely to contain hyperlinks to [GitHub.com](https://github.com).

#### Top Code Comment Unigrams

| Rank | Term     | Count |
|------|----------|-------|
| 1    | use      | 512   |
| 2    | object   | 472   |
| 3    | function | 471   |
| 4    | value    | 460   |
| 5    | set      | 440   |

Interestingly, the unigrams *object* and *function* are used almost equally. This suggests that neither nouns nor verbs take precedence in the minds of developers. It may also suggest that neither object-oriented nor functional programming is inherently more “natural” than the other.

#### Top Code Comment Bigrams

| Rank | Term          | Count |
|------|---------------|-------|
| 1    | make sure     | 90    |
| 2    | github com    | 57    |
| 3    | license bsd   | 56    |
| 4    | copyright 2010| 40    |
| 5    | return value  | 39    |

Flask was apparently obsessed with copyrighting itself in 2010.

#### Top Issue Comment Unigrams

| Rank | Term   | Count |
|------|--------|-------|
| 1    | issue  | 1721  |
| 2    | like   | 1095  |
| 3    | think  | 1076  |
| 4    | use    | 1013  |
| 5    | just   | 1008  |

Right away you can see that issues are more natural in tone than code comments.

The unigram *issue* is almost twice as popular as the second most popular. This is likely because *issue* has two meanings in software development: it can refer to a generic problem with the software or it can refer to a post on GitHub Issues.

#### Top Issue Comment Bigrams

| Rank | Term        | Count |
|------|-------------|-------|
| 1    | github com  | 487   |
| 2    | https github| 462   |
| 3    | don think   | 145   |
| 4    | looks like  | 133   |
| 5    | use case    | 131   |

Once again, GitHub links are by far the most common phrase.

And that concludes the high-level portion of my analysis!

### Why It Matters

Analyzing how developers communicate on GitHub reveals a lot about project management and community dynamics. Or something. ChatGPT wrote that. I don't care if this project is useful; I did it on a whim.

In future posts, I'll explore how these communication styles vary between projects and how much they impact project growth and popularity. Stay tuned!