---
title: "Your Code Isn't Simple Enough"
description: 'Why complexity is the root of all evil in software development and what you should do about it.'
pubDate: 'Sept 8 2023'
heroImage: '/complexity.webp'
---

## The Complexity Problem
I've noticed that smart people like complex solutions. Why? I think it's because complexity is more mentally stimulating than simplicity. For example, several years ago I constructed an elaborate pulley system in my bedroom so I could turn off the lights without leaving my bed. I won't lie: it was awesome.

But just because you *can* create a Rube Goldberg machine doesn't mean you should. In software engineering, complexity slows down development, causes bugs, frustrates both developers and customers, and is generally the bane of the entire industry's existence.

In the timeless words of grug:

> given choice between complexity or one on one against t-rex, grug take t-rex
>
> \- [grug](https://grugbrain.dev)

Surprising? Not really. Any developer who has inherited another dev's "work of art" has felt this on a deep level.

[Every system has some unavoidable complexity](https://lawsofux.com/teslers-law/). It's the nature of the beast. However, systems that exceed this "baseline" complexity aren't just overdoing it; they're doing it wrong. Consider the humble domain of [FizzBuzz](https://leetcode.com/problems/fizz-buzz/). A succinct [Python one-liner](data:text/plain;charset=utf-8;base64,aT0xO2V4ZWMoInByaW50KCdGaXp6JyooaSUzPT0wKSsnQnV6eicqKGklNT09MClvciBpKTtpKz0xOyIqMTAwKSAjIG15IGJlc3QgY29kZSBnb2xmIGF0dGVtcHQgc28gZmFy) is infinitely superior to the elaborate [FizzBuzz Enterprise Edition](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition) because the former uses the minimum required complexity to solve the problem.

It's like the dilemma of [overfitting](https://en.wikipedia.org/wiki/Overfitting) in machine learning: a model that’s too complex for its data will actually perform worse.

## What does simplicity look like?

Simple systems:
- [Have few layers of abstraction](https://www.linkedin.com/pulse/principle-simplicity-sustaining-software-architecture-alex-koltun/)
- [Have shallow tech stacks](https://www.radicalsimpli.city/)
- [Focus on just a few core features](https://newsletter.systemdesign.one/i/135986506/whatsapp-engineering)
- [Favor multi-page apps over single-page apps](https://dev.to/tigt/routing-im-not-smart-enough-for-a-spa-5hki)
- [Favor boring technology over the latest fad](https://invene.com/blog/boring-technology-is-a-business-advantage)
- [Favor monoliths over microservices](https://grugbrain.dev/#grug-on-microservices)
- [Just use Postgres for everything](https://www.amazingcto.com/postgres-for-everything/)
- [Don't read email](https://en.wikipedia.org/wiki/Jamie_Zawinski#Zawinski's_Law)
- [Use inline JavaScript](https://htmx.org/essays/locality-of-behaviour/)

## How do we achieve simplicity?
Achieving simplicity requires significant mental effort. Counterintuitively, simple systems are the hardest kind to make.

### Wrestle with complexity
In the landmark paper, [*How Do Committees Invent?*](http://melconway.com/research/committees.html), Melvin Conway states that a system can only produce copies of its own communication structure. In other words, **only simple systems can produce simple output.** This principle, known as Conway's Law, was originally applied to social organizations but applies equally well to software systems. In fact, Conway's Law has been described as [the only immutable law of software architecture](https://www.youtube.com/watch?v=5IUj1EZwpJY).

Thus, if we want to create simple experiences that delight customers, we must strive for simple software architecture. Unfortunately, this is easier said than done. In Conway's words:

> Let us first examine the tendency to overpopulate a design effort. It is a natural temptation of the initial designer to delegate tasks when the apparent complexity of the system approaches his limits of comprehension. This is the turning point in the course of the design. Either he struggles to reduce the system to comprehensibility and wins, or else he loses control of it. The outcome is almost predictable if there is schedule pressure and a budget to be managed.
>
> \- Melvin Conway, *How Do Committees Invent?*

In developer speak:

> Let us first examine the tendency to **[overcomplicate]** a design effort. It is a natural temptation of the initial designer to **[add another layer of abstraction]** when the apparent complexity of the system approaches his limits of comprehension. This is the turning point in the course of the design. Either the designer struggles to reduce the system to comprehensibility and wins, or else **[the complexity demon devours your soul]**.

This quote from Conway resonates with me because I have experienced that "wrestle" with complexity many times. Ideas do not naturally simplify themselves; it takes extreme mental exertion to reduce an idea to its core.

### Design by subtraction
Fumito Ueda, director of the video game [*Shadow of the Colossus*](https://en.wikipedia.org/wiki/Shadow_of_the_Colossus), echoes Conway's sentiments with his [Design by Subtraction](https://www.sirlin.net/articles/subtractive-design) philosophy. Instead of adding features to his games, Ueda repeatedly strips out features until only the game's purest essence remains. This philosophy has produced beautiful, elegant games that have been revered by players for decades. The broader software industry would do well to follow Ueda's example.

## How to avoid complexity
Evidently, the only way to achieve simplicity is through **deliberate and aggressive complexity avoidance**. To accomplish this, I have found the following steps to be helpful:

### 1. Wrestle with the complexity
Before diving into code, grapple with that complex idea. Try to distill it, refine it, and if possible, simplify it. This is much harder than it sounds, but do not yield. The complexity demon must not win.

### 2. If you fail, convince your project manager to pivot their idea
If you still can't distill the complex concept, talk with your PM. Turn on the charm and try to convince them that their feature idea isn't truly necessary.

You might say, "This feature isn't strictly necessary to reach minimum viable functionality across the most common use cases and thus has a comparatively low return on investment."

No PM can resist this statement.

### 3. If that also fails, propose an 80/20 solution
Okay, maybe PMs can push back after all. This is where the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle) comes into play. In "grug brain" speak, "Do little, get lots." Find a solution that gets 80% of the job done with 20% of the effort. It’s like the design by subtraction method: start big, then shave away until you’re left with a beautiful, simple solution.

### 4. If even that fails, the complexity is unavoidable
Sometimes, despite our best efforts, we need that Rube Goldberg solution. If the complex feature really is important, you have no choice but to bite the bullet and make it complicated. But remember, if you have to go complex, do it intentionally, understanding every moving part.

## Conclusion
In the ever-evolving world of software development, the allure of shiny new technologies and intricate algorithms can be tempting. But as we chase after the next big thing, let's not forget the age-old wisdom: simplicity is the ultimate sophistication. Remember, complexity doesn't just confuse developers; it confuses users too. Challenge yourself to embrace the elegance of simplicity. Less really is more.
