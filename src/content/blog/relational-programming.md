---
title: 'All I want is a Relational Programming Language'
description: 'todo'
pubDate: 'Jul 08 2025'
heroImage: '/todo'
---

The Vietnam of Computer Science
Out of the Tar Pit
The Third Manifesto
Minikanren
Logic programming is sort of the same but sort of not?
Cell programming language is the best we can do? Not actively being developed anymore but sounds cool.
Truly relational databases would be nice too
Arbitrary constraints/datalog querying is nice too (Logica)

All I Want is a Relational Programming Language
Published on: Jul 08, 2025

Hero Image

Introduction
Software development is largely influenced by the programming paradigms we adopt. Object-Oriented Programming (OOP) may be the go-to approach for many, but it comes with its own set of issues. These issues often arise from what's known as the "object-relational impedance," a mismatch between the object and relational models that can make data manipulation cumbersome. In this post, I'll argue for the benefits of a relational programming language, which I believe can lead to more efficient and less error-prone code.

The Incompatibility Problem
The inherent incompatibility between Object-Oriented and Relational models is no minor issue. Ted Neward referred to this conflict as the "Vietnam of Computer Science."

"The Object-Relational Mapping problem is the Vietnam of computer science."

This clash creates challenges in software development, as people usually resort to bending the relational model to fit within the constraints of OOP. Contrary to this common approach, I suggest that we should be accommodating our methods to better suit the relational model. The relational paradigm offers simpler and more consistent ways to handle data, a benefit that shouldn't be overlooked.

Why Relational Programming
"Out of the Tar Pit" provides a compelling argument for Functional Relational Programming (FRP), which combines elements of both functional and relational programming paradigms. The paper highlights how FRP minimizes state, encourages declarative programming, and utilizes bidirectional references.

"Functional Relational Programming... offers a way out of the non-essential complexity introduced by state."

The benefits of adopting an FRP approach are clear: reduced complexity, fewer bugs, and more straightforward code. However, it's disappointing to note that, as of now, there is no mainstream programming language that incorporates these principles effectively.

Not Just SQL
SQL is not the answer to our programming needs, despite its widespread use in databases. "The Third Manifesto" makes it clear that even databases using SQL fall short of being truly relational.

"Current SQL-based systems are far from the relational model."

My focus is on the development of a programming language that genuinely embraces the relational model. Such a language would not carry the limitations and peculiarities we associate with SQL and existing databases.

Potential Solutions: Minikanren and Cell
When it comes to languages that approach Functional Relational Programming, Minikanren and Cell come to mind. Both are relatively unknown and specialized for relational programming. Minikanren leans more towards logic programming, whereas Cell was developed specifically to implement FRP principles. Unfortunately, their limited user bases and lack of active development hinder their potential as mainstream solutions.

Logic Programming: A Half-Measure
Prolog, a well-known logic programming language, does touch upon some relational concepts. However, it doesn't fully satisfy the requirements of Functional Relational Programming as outlined in "Out of the Tar Pit." This suggests that while logic programming languages like Prolog can serve as a step towards what we're looking for, they aren't the final solution.

Databases and Constraints
On the topic of databases, it's worth mentioning Datomic, a database designed to be more relational and supports arbitrary constraints. However, its closed-source nature and strong coupling with the Clojure programming language make it niche and not universally applicable. These limitations underscore the larger issue: the absence of truly relational databases that can work hand-in-hand with a relational programming language.

Conclusion
The need for a relational programming language is evident. Such a language would offer simplified code management, fewer bugs, and an elegant resolution to the "object-relational impedance" problem. This isn't just a theoretical exercise; both new and seasoned software engineers stand to benefit from such a paradigm shift.