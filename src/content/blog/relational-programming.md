---
title: 'All I Want is a Relational Programming Language'
description: 'The relational model is criminally underutilized in software development. Despite lots of theoretical discussion, no mainstream relational programming language exists. This needs to change if we want simpler, more robust software.'
pubDate: 'Sept 7, 2023'
heroImage: '/relational-database-logo.png'
---

## The Object-Relational Dilemma

Software development is largely influenced by the programming paradigms we adopt. Object-Oriented programming (OOP) is the go-to approach for many, but it has issues. One of the most difficult problems encountered in real-world object oriented development is the [object relational impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch). In other words, object-oriented languages are fundamentally incompatible with the relational model used by most databases.

The conflict between object-oriented and relational models has long plagued developers. As Ted Neward pointed out, it is the ["Vietnam of Computer Science."](https://www.odbms.org/wp-content/uploads/2013/11/031.01-Neward-The-Vietnam-of-Computer-Science-June-2006.pdf)

> Object/Relational Mapping represents a quagmire which starts well, gets more complicated as time passes, and before long entraps its users in a commitment that has no clear demarcation point, no clear win conditions, and no clear exit strategy.
>
> \- Ted Neward

To list just a few of the incompatibilities between object-orientated and relational models:

- Object-oriented programming ties data and behavior together. In the relational model, data and behavior are separate.
- Objects are essentially directed graphs; you can only traverse references between objects in one direction. In contrast, references in the relational model are automatically bidirectional, which is much simpler and easier to manage.
- Object-orientated languages often use [reference equality](https://www.baeldung.com/java-equals-method-operator-difference) by default, which is a common source of bugs. Every new Java developer has questioned their sanity after mixing up `==` and `Equals` at some point. Relational models, on the other hand, use value equality, which eliminates the possibility of duplicate data and is easier to reason about.
- The relational model lacks many object-oriented concepts, including inheritance, encapsulation, and polymorphism. The usefulness of these features is [often questioned](https://youtu.be/QM1iUe6IofM?si=NZ2rdzanJ4M9ZZJM) (especially [inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)), so the relational model is doing us a favor by getting rid of them.
- Relational modeling uses *declarative* constraints (e.g., foreign keys) to enforce data integrity. Object-oriented programming typically enforces integrity *imperatively*, through concepts like getters, setters, and exception handling. The OOP approach has much more room for bugs.

These clashes forces us to either bend relational models to fit OOP paradigms or vice versa. Usually, people resort to [Object-Relational Mappers (ORMs)](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping), which favors the OOP mindset. However, I argue that we should instead favor the relational model, as it provides a simpler, more robust framework for computation.

## Why Relational Programming

The famous paper [Out of the Tar Pit](https://curtclifton.net/papers/MoseleyMarks06a.pdf) provides a compelling argument for a relational programming language. The paper claims that current programming paradigms are incapable of managing the complexities of large-scale software development.

The authors propose a new type of programming language, dubbed "Functional Relational Programming" (FRP), which combines elements of [functional](https://en.wikipedia.org/wiki/Functional_programming), [logical](https://en.wikipedia.org/wiki/Logic_programming), and [relational](https://en.wikipedia.org/wiki/Relational_model) programming paradigms. The paper highlights how FRP minimizes state, simplifies control flow, and employs a declarative approach to reduce complexity and bugs.

> The primary, overriding goal behind the FRP architecture (and indeed this whole paper) is of course *elimination of complexity.*
>
> \- *Out of the Tar Pit*

Unfortunately, no mainstream programming language currently incorporates these principles effectively. The best effort so far is the [Cell programming language](https://www.cell-lang.net/), but it is relatively obscure and not actively maintained. This leaves us in a bind: the theory exists, but the practical tools don't.

## Not Just SQL

To be clear, I'm not advocating that we use SQL for all business logic. Despite its widespread use in so-called relational databases, SQL is not the answer. A truly relational programming language would not carry the limitations and peculiarities we associate with SQL.

A well-known database paper, [The Third Manifesto](https://www.dcs.warwick.ac.uk/~hugh/TTM/DTATRM.pdf), critically assesses SQL-based databases and emphasizes their shortcomings in aligning with the relational model:

> We seek a firm foundation for the future of data. We do not believe that the database language SQL is capable of providing such a foundation. Instead, we believe that any such foundation must be firmly rooted in the Relational Model of Data
>
> \- The Third Manifesto

The authors explain that SQL databases deviate from the true "relational model" as described by [E.F. Codd's seminal work](http://db.dobo.sk/wp-content/uploads/2015/11/Codd_1970_A_relational_model.pdf), including SQL's allowance of null values and duplicate rows.

Hence, the need is not just for a better database querying language but a fully relational programming language free from the limitations and quirks of SQL-based systems.

The authors then go on to propose a hypothetical replacement to SQL, dubbed "D" to address these problems. However, once again, no mainstream version of "D" exists!

Are you noticing a pattern?

In addition to the SQL problems pointed out by *The Third Manifesto*, I would also point out SQL's lack of arbitrary constraints. Why can't SQL constraints like `check` and `unique` reference other tables? This would dramatically improve data integrity. But alas, it is not supported. Unless, of course, you use a trigger, which is the ideal solution exactly never.

On the topic of arbitrary constraints, it's worth mentioning [Datomic](https://www.datomic.com/), a database which is more relational than its SQL counterparts and which even supports arbitrary constraints across multiple tables. In fact, [Datomic is probably the closest thing we have to a practical FRP architecture today.](https://www.youtube.com/watch?v=nbMMywfBXic) However, its closed-source nature and strong coupling with the Clojure programming language limit its applicability and make it niche solution.

The limitations described above underscore the larger issue: there is a gap in both the programming and database markets. **We need a truly relational database that can work hand-in-hand with a relational programming language.**

## Conclusion
The promise of a truly relational programming language could herald a shift in how we approach software development. Such a language would address the longstanding object-relational impedance mismatch and present a more consistent, robust, and elegant framework for engineers at all levels.

The theoretical groundwork exists. What we need now is a mainstream language that implements the theory. It's time for the software community to take the relational model seriously and develop tools that unlock its full power.

I admit that, since the concept of functional relational programming is largely untested, nobody knows for sure how beneficial it really is. But the concept is promising enough that it deserves a concerted effort. We have the hypothesis. Let's test it.