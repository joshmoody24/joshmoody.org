---
title: "My Favorite Programming Articles"
description: "A collection of the best programming articles I've ever read."
pubDate: "Mar 7, 2025"
---

## The Modern Equivalent of Spellbooks

I collect blog posts like [Frieren collects grimoires](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJ4cG91YzBqaXIydjkyZzFyZTZ5cjR5NnFtc3cybmZtbXl4dnR1NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jUckyQVjuHNx9vXUtv/giphy.gif). Here are some of my favorites.

## [The Grug Brained Developer](https://grugbrain.dev/)

> complexity is spirit demon that enter codebase through well-meaning but ultimately very clubbable non grug-brain developers and project managers who not fear complexity spirit demon or even know about sometime

The HTMX guy is my [role model](https://htmx.org/essays/htmx-sucks/), and _Grug_ is his finest work. I read it every few months and it gets better every time.

## [Out of the Tar Pit](https://curtclifton.net/papers/MoseleyMarks06a.pdf)

This essay is about software complexity. It proposes a paradigm called _Functional Relational Programming_ as a way to mitigate it.

This paradigm [(mostly)](https://www.cell-lang.net/) never caught on, but its core concepts are as relevant as ever.

## [How Do Committees Invent?](http://melconway.com/research/committees.html)

Conway's Law has been called [The Only Unbreakable Law](https://youtu.be/5IUj1EZwpJY?si=tBVxsRatPCONu9eW) of software. This essay is a deep dive into the implications of that law.

In short, organizations can only produce copies of their communication structures.

## [Taco Bell Programming](http://widgetsandshit.com/teddziuba/2010/10/taco-bell-programming.html)

> Every item on the menu at Taco Bell is just a different configuration of roughly eight ingredients.
>
> The more I write code and design systems, the more I understand that many times, you can achieve the desired functionality simply with clever reconfigurations of the basic Unix tool set.

You can build a lot with a little.

## [A Relational Model of Data for Large Shared Data Banks](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf)

The legendary paper by E.F. Codd that introduced the relational database model. I think every software engineer should read it.

I will die on a hill screaming that the relational model is the most beautiful concept in computer science besides maybe combinatory logic and git.

Today's programmers have a lot of misconceptions about relational databases. Here are a few:

| Myth                                                                                                        | Fact                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Relational databases are called "relational" because of foreign keys.                                       | Relational databases are called "relational" because they're based on set theory.                                                                                                             |
| "Relational database" and "SQL database" are synonyms.                                                      | SQL is just one language for interacting with relational databases, and it's anything but quintessential. IMO we should have chosen [Datalog](https://en.wikipedia.org/wiki/Datalog) instead. |
| Relational databases were invented to solve the problem of data duplication. Third normal form or whatever. | Relational databases were invented to protect users from having to know the physical storage details of their data. 3NF is great though.                                                      |

If you just learned something, you need Codd in your life.

## [The Third Manifesto](https://www.dcs.warwick.ac.uk/~hugh/TTM/DTATRM.pdf)

This book-length manifesto expands on Codd's paper. It argues that we've gone astray from the "true" relational model and proposes a precise definition of what a relational database should be. It also introduces a new language called Tutorial D that is more relational than SQL.

It's a dense read, but worth it if you're a relational stan like me.

## [The Vietnam of Computer Science](https://www.odbms.org/wp-content/uploads/2013/11/031.01-Neward-The-Vietnam-of-Computer-Science-June-2006.pdf)

> Object/Relational Mapping is the Vietnam of Computer Science. It represents a quagmire which starts well, gets more complicated as time passes, and before long entraps its users in a commitment that has no clear demarcation point, no clear win conditions, and no clear exit strategy.

This one is particularly relevant to modern software development because it argues that Object-Relational Mappers (ORMs) are a fundamentally flawed approach to database interaction due to the [impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch) between object-oriented and relational paradigms.

I promise this is the last essay about relational databases.

## [Visual design rules you can safely follow every time](https://anthonyhobday.com/sideprojects/saferules/)

This is how I fake design competence.

## [Where are the builders?](https://near.blog/where-are-the-builders/)

As someone who loves redstone computers and things that are "technically Turing-complete," I totally vibed with this article.

## [The case against morning yoga, daily routines, and endless meetings](https://andrewchen.substack.com/p/10x-work-versus-1x-work)

As a night owl who hates meetings, I found this article refreshing. It pushes back on conventional productivity and career advice. It gives off major [_Black Swan_](https://en.wikipedia.org/wiki/The_Black_Swan:_The_Impact_of_the_Highly_Improbable) vibes.

## [Distributed == Relational](https://frest.substack.com/p/distributed-relational)

Sorry, had to slip one more relational article in here!

## [The Redo Opportunity](https://tylerhogge.com/2024/08/20/the-redo-opportunity/)

[Because I'm mentioned in it.](https://tylerhogge.com/2024/08/20/the-redo-opportunity/#:~:text=That%20left%20engineering,hit%20the%20stretch.)

## [Nikhil Suresh's Entire Blog](https://ludic.mataroa.blog/blog/you-must-read-at-least-one-book-to-ride/)

I love this guy. If you like _The Black Swan_, you'll love him too.

## [Antipatterns](https://cedanet.com.au/antipatterns/)

Most engineers know about the [Gang of Four design patterns](https://refactoring.guru/design-patterns) and perhaps Martin Fowler's [enterprise design patterns](https://martinfowler.com/articles/enterprisePatterns.html), but knowing the opposite is important, too.

You know you can trust this article because it calls ORMs an antipattern.

## [Programmer Archetypes](https://www.seangoedecke.com/programmer-archetypes/)

An interesting take on the different types of programmers you'll meet in the wild and how to work with them.

## [Just Use Postgres for Everything](https://www.amazingcto.com/postgres-for-everything/)

Unfathomably based.

## [Programming with Nothing](https://tomstu.art/programming-with-nothing)

A mind-blowing demonstration of lambda calculus.

## [To Mock a Mockingbird](https://en.wikipedia.org/wiki/To_Mock_a_Mockingbird)

A book to read if you think _Programming with Nothing_ isn't minimalist enough.

The puzzles in this book inspired me to write a [combinatory logic interpreter](https://github.com/joshmoody24/skoobert).

## Weird Stuff I Like

Here's a bunch of quirky links that I find fascinating, horrifying, hilarious, or all of the above:

- [A brief, incomplete, and mostly wrong history of programming languages](https://james-iry.blogspot.com/2009/05/brief-incomplete-and-mostly-wrong.html)
- [modalzmodalzmodalz](https://modalzmodalzmodalz.com/)
- [mother\*\*\*\*ingwebsite](https://motherfuckingwebsite.com/)
- [~~Dreamberd~~ Gulf of Mexico](https://github.com/TodePond/GulfOfMexico)
- [You can't parse HTML with regex](https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags)
- [Cascading Server Sheets](https://dev.to/thormeier/dont-try-this-at-home-css-as-the-backend-what-3oih)
- [Greenspun's tenth rule](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule)
- [Hofstadter's Law](https://en.wikipedia.org/wiki/Hofstadter%27s_law)
- [Fontemon](https://www.coderelay.io/fontemon.html)
- [llama.ttf](https://fuglede.github.io/llama.ttf/)
- [FizzBuzzEnterpriseEdition](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition)
- [CSS-Only Chat](https://github.com/kkuchta/css-only-chat)
- [Markov chains are funnier than LLMs](https://emnudge.dev/blog/markov-chains-are-funny/)
- [SQL 3D Engine](https://observablehq.com/@pallada-92/sql-3d-engine)
- [Cthulu merge](https://marc.info/?l=linux-kernel&m=139033182525831)
- [Sitcom Simulator](https://github.com/joshmoody24/sitcom-simulator)
- [Microservices](https://youtu.be/y8OnoxKotPQ?si=N5VyLsZOB2RkyZCm)
- [Interview with Senior JS Developer](https://youtu.be/Uo3cL4nrGOk?si=TlM42OzZjDrKTnHr)
- [Mongo DB is Web Scale](https://youtu.be/b2F-DItXtZs?si=eKEYDFDu5UrJVDO2)
