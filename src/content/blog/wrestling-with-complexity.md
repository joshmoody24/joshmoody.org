---
title: 'Wrestling With Complexity'
description: 'A personal reflection on why complexity is the root of all evil.'
pubDate: 'Jul 08 2025'
heroImage: '/blazing-blazor-logo.webp'
---

## Complexity, the Immortal Enemy

The ultimate enemy of software development is complexity.

> given choice between complexity or one on one against t-rex, grug take t-rex
>
> \- [grug](https://grugbrain.dev)

I'm going to assume you, a competent software developer, already hate complexity. Hot take, I know. Unless you like slower development, reduced agility, buggier software, and frustrated customers, you don't like complexity.

I postulate that for any given system, there is a certain amount of unavoidable complexity inherent to the system's domain. I further postulate that systems which exceed this baseline level of complexity are worse than their simpler counterparts. For example, for the domain of [FizzBuzz](https://leetcode.com/problems/fizz-buzz/), a [Python one-liner](data:text/plain;charset=utf-8;base64,aT0xO2V4ZWMoInByaW50KCdGaXp6JyooaSUzPT0wKSsnQnV6eicqKGklNT09MClvciBpKTtpKz0xOyIqMTAwKSAjIG15IGJlc3QgY29kZSBnb2xmIGF0dGVtcHQgc28gZmFy) is a better solution than [FizzBuzz Enterprise Edition](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition) because it solves the problem with close to the minimum amount of complexity.

This is somewhat analogous to the concept of [overfitting](https://en.wikipedia.org/wiki/Overfitting) in machine learning, in which a model with too many parameters performs worse than a model with an appropriate amount of parameters.

## Solution: Aggressive Complexity Avoidance

Taking inspiration from Melvin Conway’s famous paper "How Do Committees Invent?", we should constantly strive to strip down complicated tasks to their simplest form. If simplification isn’t achievable, perhaps it's worth re-evaluating the necessity of the feature itself. As a last resort, if a feature is deemed vital, it's important to embrace the challenge head-on.

> Let us first examine the tendency to overpopulate a design effort. It is a natural temptation of the initial designer to delegate tasks when the apparent complexity of the system approaches his limits of comprehension. This is the turning point in the course of the design. Either he struggles to reduce the system to comprehensibility and wins, or else he loses control of it. The outcome is almost predictable if there is schedule pressure and a budget to be managed.
>
> \- Melvin Conway, [How Do Committees Invent?](http://melconway.com/research/committees.html)

Allow me to translate this into developer lingo:

>Let us first examine the tendency to **[overcomplicate]** a design effort. It is a natural temptation of the initial designer to **[add another layer of abstraction]** when the apparent complexity of the system approaches his limits of comprehension. This is the turning point in the course of the design. Either the designer struggles to reduce the system to comprehensibility and wins, or else **[the complexity demon devours your soul]**.
>
> \- Me

See also Fumito Ueda’s Design by Subtraction philosophy (Elaborate)

1. When asked to create something complicated, wrestle with the idea until it
becomes simple.
2. If you fail, try to convince the PM that the thing isn’t necessary.

*"This feature is not strictly necessary in order to reach minimum viable functionality across the most common anticipated use cases."*

3. If that fails, try to convince PM to adopt a simpler idea that does 80% of 
the job with 20% of the complexity.

*"Example"*

4. If that fails, then the feature is actually important. Bite the bullet and make 
it complicated.