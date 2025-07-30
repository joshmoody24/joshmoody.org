---
title: "Blog Posts I’ll Write if People Ask Me To"
description: "I have tons of blog post ideas but not enough time to write them. I'll prioritize articles that people ask me to write."
pubDate: "Mar 6, 2025"
---

## Too Many Things to Write About

Like most people with a website, I wish I wrote more.

I have the opposite of writer's block: so many ideas that I'm paralyzed by choice. So I'm pushing the problem onto you.

The following is a list of several blog posts I've had on the backburner for a while. If at least two people contact me via email and ask me to write a full post on one of these ideas, I'll do it. Limit of one request per person.

## Powershell Is Underrated

![Powershell command](/powershell.webp)

Lots of developers have spent their whole careers developing on Linux or Mac OS, and the only thing they know about Powershell is that it `Has-WeirdSyntax -Like This -That Seems | Verbose -ComparedTo Bash`.

I think Powershell is better than Bash because 1) it's based on objects instead of text, and 2) it has some cool list-manipulation features, similar to LINQ.

Here's Powershell:

```powershell
Get-Process
| where Name -like "powershell*"
| sort CPU -Descending
| select Name, Id, CPU
```

Versus the cryptic Bash equivalent:

```bash
ps -eo comm,pid,%cpu --sort=-%cpu
| grep '^powershell'
```

## The Secrets of Interactive Emails

Some email clients (notably Apple Mail) are powerful enough to embed fully interactive shopping carts or even video games inside of them.

How is this possible? The short answer is a boatload of external CSS. The longer answer involves a dozen workarounds for undocumented Apple Mail rendering bugs.

[This guy explains the big picture pretty well, but I've gone farther than him.](https://youtu.be/efAbKfUeSW0?si=WwbayYbML6cZGEV0)

## AMP4Email Is a Bad Framework (And How to Use It Anyway)

Speaking of interactive emails, Gmail has a whole framework for it: [AMP4Email](https://amp.dev/about/email). It lets emails show dynamic content, respond to user interaction, make API calls, etc.

But developing them is pure suffering.

AMP4Email is based on the [much-hated AMP project](https://www.reddit.com/r/webdev/comments/1g2u0p3/what_happened_to_amp/) that has mostly been abandoned by Google. The framework is riddled with annoying bugs and frustrating limitations that make it a total pain to work with. [(Here's a bug I found the other day)](https://github.com/ampproject/amphtml/issues/40251)

That said, I've discovered a ton of tricks and workarounds that make AMP emails less painful to develop. Happy to share if anyone's interested.

## Why Epona Sucks at Jumping Over Fences in Ocarina of Time

![Epona jumping over a fence](https://www.zeldadungeon.net/wiki/images/b/b8/Obstacle_Course_-_OOT64.png)

I've played through Ocarina of Time at least a dozen times over the last twenty years, but I've never beaten Malon's horse jumping minigame.

I recently watched a friend struggle with this minigame for over an hour, which got me thinking: why is it so freaking hard?

Ocarina of Time's source code has the answer. I won't spoil it before the full blog post, but [here's a good starting point](https://youtu.be/efAbKfUeSW0?si=WwbayYbML6cZGEV0) if you want to figure it out for yourself.

## Art Peaked in the Dada Movement

![Fountain by Marcel Duchamp](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/The_blind_man_MET_b1120124_004.jpg/800px-The_blind_man_MET_b1120124_004.jpg)

[Do I even need to elaborate on this?](<https://en.wikipedia.org/wiki/Fountain_(Duchamp)>)

## Hierarchies Considered Harmful

![Binary search tree](https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Binary_search_tree.svg/1280px-Binary_search_tree.svg.png)

I don't know how to explain it, but I've always had a gut feeling that hierarchies are cringe, while sets are based.

Consider the difference between organizing notes in folders versus marking them with tags. Folders lock you into a single organizational structure, whereas tags give you more flexibility.

I suspect there's some deeper principle here, but I haven't given it enough thought to be sure.

[I'm not the only one, by the way.](https://blog.codinghorror.com/trees-treeviews-and-ui/)

## Information Systems is an Underrated Major for Software Engineers

I have a chip on my shoulder about this one. Information Systems has a reputation for being less rigorous than Computer Science, which is somewhat true but is also an oversimplification.

In my experience, the average <abbr title="Information Systems">IS</abbr> major can run circles around <abbr title="Computer Science">CS</abbr> majors when it comes to database management and cloud architecture. Both of these skills are central to software engineering.

I'm obviously biased, but so is every recruiter I've ever met. I could give a Ted Talk on this.

## The Value of Type Safety is Inversely Proportional to Iteration Speed

I think people value type safety the appropriate amount for large projects but overrate its importance for small projects.

In other words, type safety is more useful for space probes than REPLs. Change my mind.

## We've Forgotten Too Much From Programming's Past

![XKCD LISP](https://imgs.xkcd.com/comics/lisp_cycles.png)

The history of computing is full of brilliant ideas that have been overshadowed by hype about the latest JavaScript framework or whatever.

I suspect there are tons of ideas in old research papers that never got the attention they deserved and are perfect solutions to modern problems.

## What I've Learned from Antkeeping

I've been raising a dozen ant colonies for the past few years and have learned a lot while doing so. For example:

- Queen ants are literally everywhere if you know where to look.
- Fly larvae will eat your queen ants from the inside out.
- Shattering a vial of live ants on your desk is a harrowing experience.
- The best cure for arachnophobia is realizing spiders are free ant food.
- Be careful raising mealworms as feeder insects because you will start caring about them as much as the ants.
- [Canned crickets are poison.](https://www.reddit.com/r/antkeeping/comments/1ahr9jx/canned_crickets_killed_colony/)
- Ants have nothing but time on their hands and WILL escape from any and all enclosures.

## Conclusion

[Let me know which topic you want me to write a full article about.](/contact) Thank you for the additional motivation!
