---
title: 'Finally, a Site That "Awards" You For Writing Cursed HTML'
description: "They say you should make apps that you personally want to use. They didn't realize how weird my wants are."
pubDate: "May 28 2025"
heroImage: "/divsoup-homepage.webp"
---

## I’m the Only Person Who Wanted This, but It’s a Thing Now, I Guess

Often when I'm writing HTML, I'll debate whether to write `<img />` or `<img>` (among many other unimportant decisions) and think to myself, "no one will ever know or care if I'm consistent... but I'll know."

Well, now everyone can know, because I made an app that analyzes website HTML and awards "achievements" based on how weird the HTML is. I call it [divsoup](https://divsoup.net).

I don't feel like explaining it any further here, I'm assuming you've already played with it from now on.

## The Achievements

The [list of achievements](https://divsoup.net/achievements) seems to be most people's favorite part. It was my favorite part to build, too. Sadly, most of them are inspired by things I've encountered in the wild 😛

I also vaguely tried to make the achievements a bit educational, so hopefully people learn something semi-useful from this project.

## Tech Stack

The details are found in the [GitHub repository](https://github.com/joshmoody24/divsoup). Quick version: Elixir/Phoenix deployed on AWS with a PostgreSQL database (Aurora Serverless V2).

### My Thoughts on Elixir and Phoenix

For a long time I've wanted to give the Elixir language and its acclaimed web framework Phoenix a try, and this was the perfect excuse.

Overall, I liked it, 10/10 would recommend. A compiled language that is dynamically typed is an interesting combination. The syntax is the most beautiful of any language ever since it looks like Ruby and has a pipe operator `|>`.

The supervisor tree and actor model are nifty concepts that I sadly didn't explore much in this project, since I didn't need massive concurrency or whatever for a weekend project. I did use them to make a bad job processing system, at least, and it was fairly painless.

The only gripe I have is the relative lack of libraries but eh, not a big deal for a side project.

### Bots Are Annoying and Expensive

I chose [AWS Aurora Serverless V2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html) for the database, since it can [scale down to zero](https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity/) when not in use. But a couple days after launch I noticed that the database was pretty much never sleeping.

The server logs revealed that bots are constantly hitting the home page of my site (and various WordPress routes), and since my homepage required a database request, the DB was getting sleep deprived.

Here's a sample of my site's logs. It's a constant barrage of stuff like this:

```
May 28 08:36:11 [info] GET /
May 28 08:36:11 [info] Sent 200 in 660µs
May 28 08:36:12 [info] GET /blog/wp-includes/wlwmanifest.xml
May 28 08:36:12 [info] Sent 404 in 238µs
May 28 08:36:12 [info] GET /web/wp-includes/wlwmanifest.xml
May 28 08:36:12 [info] Sent 404 in 221µs
May 28 08:36:12 [info] GET /wordpress/wp-includes/wlwmanifest.xml
May 28 08:36:12 [info] Sent 404 in 170µs
May 28 08:36:12 [info] GET /website/wp-includes/wlwmanifest.xml
May 28 08:36:12 [info] Sent 404 in 209µs
May 28 08:36:12 [info] GET /wp/wp-includes/wlwmanifest.xml
May 28 08:36:12 [info] Sent 404 in 170µs
May 28 08:36:12 [info] GET /news/wp-includes/wlwmanifest.xml
May 28 08:36:12 [info] Sent 404 in 173µs
May 28 08:36:13 [info] GET /2018/wp-includes/wlwmanifest.xml
May 28 08:36:13 [info] Sent 404 in 208µs
May 28 08:36:13 [info] GET /2019/wp-includes/wlwmanifest.xml
May 28 08:36:13 [info] Sent 404 in 166µs
May 28 08:36:13 [info] GET /shop/wp-includes/wlwmanifest.xml
May 28 08:36:13 [info] Sent 404 in 170µs
May 28 08:36:13 [info] GET /wp1/wp-includes/wlwmanifest.xml
May 28 08:36:13 [info] Sent 404 in 170µs
May 28 08:36:13 [info] GET /test/wp-includes/wlwmanifest.xml
May 28 08:36:13 [info] Sent 404 in 184µs
May 28 08:36:14 [info] GET /media/wp-includes/wlwmanifest.xml
May 28 08:36:14 [info] Sent 404 in 188µs
May 28 08:36:14 [info] GET /wp2/wp-includes/wlwmanifest.xml
May 28 08:36:14 [info] Sent 404 in 166µs
May 28 08:36:14 [info] GET /site/wp-includes/wlwmanifest.xml
May 28 08:36:14 [info] Sent 404 in 167µs
May 28 08:36:14 [info] GET /cms/wp-includes/wlwmanifest.xml
```

My current fix is to make the homepage static, so those `GET /` requests don't wake up the database. One of these days I'll probably add a `robots.txt`, too.

I don't know why I'm even writing about the bot thing. Just had to vent, I guess.

## Conclusion

If you read [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML) for fun then you might get a kick out of [divsoup](https://divsoup.net).

Can't add anything else to this section or I'll fail the Turing test.
