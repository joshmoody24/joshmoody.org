---
title: "Advent of Code vs. Weird Programming Languages"
description:
  "I solved each day of Advent of Code 2025 in a different
  unusual programming language. Here's how they stack up."
pubDate: "Jan 05 2026"
---

## Solving Advent of Code in a different language each day

I like weird programming languages, and Advent of Code is a good
excuse to try some.

Here's each language I used, with some hot takes.

## Enjoyment tier list

Enjoyment &asymp; elegance of that day's solution. If I had to
wrestle the language, I ranked it lower.

| Enjoyment | Language                                | Paradigm                   | Thoughts                                 |
| --------- | --------------------------------------- | -------------------------- | ---------------------------------------- |
| S         | [Clojure](#clojure)                     | Functional, Lisp           | Perfection (functional flavor)           |
| S         | [Prolog](#prolog)                       | Logic / Relational         | Perfection (relational flavor)           |
| A         | [Julia](#julia)                         | Scientific? Multiparadigm? | Better Python                            |
| A         | [Racket](#racket)                       | Functional, Lisp           | Second-best Lisp                         |
| A         | [APL](#apl)                             | Array                      | Symbols everywhere. Surprisingly elegant |
| B         | [R](#r)                                 | Statistical?               | Worse SQL, nice IDE                      |
| C         | [miniKanren](#minikanren)               | Logic / Relational         | Worse Prolog, too simple                 |
| D         | [Mercury](#mercury)                     | Logic / Relational         | Worse Prolog, too complicated            |
| D         | [Factor](#factor)                       | Concatenative              | Stack languages are for aliens           |
| F         | [CSS](#css)                             | Styling                    | Bad programming language                 |
| F         | [Game Boy Assembly](#game-boy-assembly) | Assembly                   | Suffering                                |

Some days I switched languages mid-way through, hence the
duplicate days.

Caveat: This isn't meant to be taken seriously. Each ranking
could be a fluke. Sometimes I picked a terrible language for a
problem just for the heck of it.

I'll show a code snippet for each language from my actual <abbr
title="Advent of Code">AoC</abbr> solutions. I'll generally just
show part 1 since they're typically shorter and simpler.
[My full solutions are available on GitHub.](https://github.com/joshmoody24/advent-of-code/tree/main/2025/)

That said, the particulars of each code snippet aren't
important. Just glance at them to get a feel for the syntax.

## Language summaries

### [Clojure](https://clojure.org/)

I declare Clojure the best language. It's so much more
_interactive_ than most languages. You use a REPL to constantly
run little chunks of your code while writing it. Way more fun
than having to hold the whole algorithm in your mind.

Here's a snippet from my solution to day 5, which was about
checking if IDs fall within certain ranges:

```clojure
(require '[clojure.string :as str])

(defn parse-input [path]
  (let [[range-strs id-strs]
        (-> path
            (slurp)
            (str/split #"\n\n")
            (#(mapv str/split-lines %)))]
    {:ranges (mapv
              #(mapv Long/parseLong (str/split % #"-"))
              range-strs)
     :ids (mapv Long/parseLong id-strs)}))

(def data
  (parse-input "input.txt"))

(defn in-range? [id range]
  (and (>= id (first range)) (<= id (second range))))

(defn in-any-range? [ranges id]
  (some #(in-range? id %) ranges))

(def part-1-answer
  (->>
   (:ids data)
   (filter #(in-any-range? (:ranges data) %))
   (count)))
```

I especially enjoyed the built-in syntax sugar macros like
`->>`. And I like how reading a file is called `slurp`.

[Clojure's Persistent data structures](https://en.wikipedia.org/wiki/Persistent_data_structure#Clojure)
are fascinating. Learning how they work under the hood is a fun
exercise.

### [Prolog](https://en.wikipedia.org/wiki/Prolog)

I didn't expect to love Prolog this much. It's typically
described as a "logic" programming language, but I prefer
"relational."

(I mean "relational" in the mathematical sense. Functions map
inputs to outputs. Relations are more general: they relate
multiple values together in arbitrary ways.)

The coolest part of relations is that you can essentially run
them backwards. You can ask questions like "what inputs would
lead to this output?" or "what outputs are possible from these
inputs?" This is extremely useful for some Leetcode-style
problems.

[I've yearned for a good relational programming language for years](https://joshmoody.org/blog/relational-programming/),
and Prolog is surprisingly close to my dream language.

My Prolog solution to day 7 part 2 was especially elegant. The
problem was a quantum-physics-inspired puzzle where you count
the number of possible universes that arise from a laser
bouncing around. Backtracking problems are Prolog's bread and
butter.

```prolog
main :-
    read_grid('input.txt', Grid),
    count_universes(Grid, TotalUniverses),
    format('Part 2: total universes: ~d~n', [TotalUniverses]).

read_grid(Path, Grid) :-
    read_file_to_string(Path, Content, []),
    split_string(Content, "\n", "", Lines),
    include(\=(""), Lines, NewLines),
    maplist(string_chars, NewLines, Grid).

next_col(Col, NextRow, NextCol) :-
  nth0(Col, NextRow, CellBelow),
  (CellBelow = '^' -> (NextCol is Col - 1; NextCol is Col + 1);  NextCol = Col).

:- table path_count/3. % Memoize path_count/3 for efficiency

path_count([_], _, 1).

path_count([CurrentRow|RestRows], Col, TotalCount) :-
    findall(Count,
            (
              next_col(Col, CurrentRow, NextCol),
              path_count(RestRows, NextCol, Count)
            ),
            Counts),
    sum_list(Counts, TotalCount).

start_col(Row, Col) :- nth0(Col, Row, 'S').

count_universes(Grid, Total) :-
    Grid = [FirstRow|_],
    start_col(FirstRow, StartCol),
    path_count(Grid, StartCol, Total).
```

### [Julia](https://julialang.org/)

Why did nobody tell me Julia is just Python but faster and with
better syntax? For some reason I always thought it was some old
scientific computing language, but it's actually pretty new and
kinda awesome.

Day 8 was about merging circuits in 3D space. My solution isn't
particularly elegant, but it shows off Julia's syntax. Kinda
looks like a hybrid of Python, Ruby, and Matlab, with optional
static types and JIT compilation for vroom vroom.

```julia
struct Point
    x::Int
    y::Int
    z::Int
end

function parse_point(line::String)
    x, y, z = split(line, ",")
    Point(parse(Int, x), parse(Int, y), parse(Int, z))
end

distance(a::Point, b::Point) =
    sqrt((a.x-b.x)^2 + (a.y-b.y)^2 + (a.z-b.z)^2)

points = [parse_point(line) for line in eachline("input.txt")]

edges = Vector{Tuple{Point,Point,Float64}}()

# cartesian product sorted by distance
for i in points
    for j in points
      if i == j
          continue
      end
      dist = distance(i, j) # could avoid squaring but Julia has vroom vroom to spare
      push!(edges, (i, j, dist))
    end
end
sort!(edges, by = t -> t[3])

circuit_id = 0
circuits = Dict{Point, Int}()

direct_connections = Set{Tuple{Point,Point}}()
function already_directly_connected(i, j)
    return (i, j) in direct_connections || (j, i) in direct_connections
end

# initialize each point to its own circuit
for p in points
    circuits[p] = circuit_id
    global circuit_id += 1
end

function merge_circuits(i, j)
    id_i = circuits[i]
    id_j = circuits[j]
    for (p, cid) in circuits
        if cid == id_j
            circuits[p] = id_i
        end
    end
end

stop_after = 1000

for edge in edges
    i, j, dist = edge
    num_connections = length(direct_connections)
    if num_connections >= stop_after break end
    if already_directly_connected(i, j) continue end
    if circuits[i] == circuits[j]
      push!(direct_connections, (j, i))
    else
      println("Merging circuits of points ", i, " and ", j)
      merge_circuits(i, j)
    end
end

println("Number of circuits formed: ", length(unique(values(circuits))))

circuit_sizes = Dict{Int, Int}()
for c in values(circuits)
    if haskey(circuit_sizes, c)
        circuit_sizes[c] += 1
    else
        circuit_sizes[c] = 1
    end
end

three_largest = sort(collect(values(circuit_sizes)), rev=true)[1:3]
product = prod(three_largest)

println("Sizes of three largest circuits: ", three_largest)
println("Product of sizes of three largest circuits: ", product)
```

Side note: the
[expression problem](https://wiki.c2.com/?ExpressionProblem)
keeps me up at night, and Julia's solution, multiple dispatch,
intrigues me.

- [More on multiple dispatch.](https://scientificcoder.com/the-art-of-multiple-dispatch)
- [Julia's take on multiple dispatch.](https://www.youtube.com/live/kc9HwsxE1OY)

### [Racket](https://racket-lang.org/)

I didn't use Racket "directly" per se, but rather used it as a
host language for [miniKanren (see below)](#minikanren).

I enjoyed Racket more than miniKanren. It's
[Scheme](https://www.scheme.org/) with batteries included. Good
for writing other languages in. Definitely in the top 2 Lisps.

A couple years ago I thought my "programming languages"
professor who loved Racket was a total nerd who was babied by
academia and had never written a line of business logic in his
life, but now I see where he was coming from. Racket is pretty
slick.

Here's the non-miniKanren part of my solution to day 10. Just
parsing logic and a nifty macro `->` for pipelining.

[Suffice it to say, macros are the coolest part of Lisps.](https://paulgraham.com/avg.html)

```racket
(define-syntax ->
  (syntax-rules ()
    [(_ x) x]
    [(_ x (f . args) more ...) (-> (f x . args) more ...)]
    [(_ x f more ...) (-> (f x) more ...)]))

(struct machine (hud buttons) #:transparent)

(define (parse-line line)
  (match (regexp-match
          #px"\\[([^]]+)\\]\\s+([^\\{]+)\\s+\\{([^}]+)\\}"
          line)
    [(list _ hud-str buttons-str joltage-str)
     (machine (parse-hud hud-str) (parse-buttons buttons-str))]))

(define (parse-input filename)
  (map parse-line (file->lines filename)))

(define (hud-chars->bits chars)
  (for/list ([c chars]) (if (char=? c #\#) 1 0)))

(define (parse-hud hud-str)
  (-> hud-str
      (string->list)
      (hud-chars->bits)))

(define (parse-buttons-outer button-str)
  (regexp-match*
   #px"\\(([^)]+)\\)"
   button-str
   #:match-select second))

(define (parse-buttons-inner outer-strs)
  (for/list ([csv outer-strs])
    (map string->number (string-split csv ","))))

(define (parse-buttons button-str)
  (-> button-str
      parse-buttons-outer
      parse-buttons-inner))
```

### [APL](https://tryapl.org/)

APL is _weird_. It's an old language based on arrays.

I'm a fan.

The learning curve was insane because everything is a weird
symbol. Once you learn them, it's actually pretty readable. But
annoying to type.

Other than the symbols, it feels similar to other vectorized
languages like R, PyTorch, and Matlab. I always suck at those; I
get stuck for hours trying to do some tricky transformation only
to realize there was an elegant one-liner for it.

This code will look like gibberish if you don't know APL, but
once you understand the symbols it's actually pretty slick.

```
(lines enc eol) ← ⎕NGET 'input.txt' 1
rows ← {(⎕D⍳⍵) - 1}¨ lines

digits ← 12

find_max_index ← {⍵⍳⌈/⍵}

⍝ The amogus thing is a comment
⍝ ⍺ = current digit (starting from leftmost = 1)
⍝ ⍵ = digits after the previously chosen digit
nth_index ← {
   ⍺=1: find_max_index (-(digits-⍺))↓⍵
   prev_index ← (⍺-1)∇⍵
   candidate_digits ← prev_index↓(-(digits-⍺))↓⍵
   prev_index + find_max_index candidate_digits
}

digit_indexes ← {⍵ nth_index¨ rows}¨⍳digits
digit_values ← ({⍵ ⌷¨ rows}¨digit_indexes)
exponents ← 10 * ¯1 + ⌽⍳digits

⎕PP ← 34
⎕ ← +/ +/¨ exponents × digit_values
```

Essentially, this code (for day 3) is looking at rows of digits
and finding the largest possible number that can be formed by
picking 12 digits from each row.

APL felt a little dated. I hear good things about
[Uiua](https://www.uiua.org/).

### [R](https://www.r-project.org/)

R itself felt mid, but R + Tidyverse was pretty good. Tidyverse
is basically Pandas but better. Felt like solving in SQL.

Day 4 was about recursively removing accessible "rolls" from a
grid.

```r
library(readr)
library(stringr)
library(tidyverse)

grid <- read_lines("input.txt") |>
  str_split("", simplify=TRUE)

offsets <- expand.grid(dr = -1:1, dc = -1:1) |>
  filter(dr != 0 | dc != 0)

df <- as_tibble(grid) |>
  mutate(row=row_number()) |>
  pivot_longer(-row, names_to="col", values_to="val") |>
  mutate(col = as.integer(str_remove(col, "V"))) |>
  mutate(is_roll=val=="@") |>
  select(-val)

with_accessible_rolls_recursively_removed <- function(df, max_iters = -1) {
  neighbors <- offsets |>
    crossing(df) |>
    mutate(row2=row+dr, col2=col+dc) |>
    left_join(df, by=c("row2"="row", "col2"="col"), suffix=c("", "_neighbor")) |>
    rename(neighbor_is_roll=is_roll_neighbor) |>
    mutate(neighbor_is_roll=replace_na(neighbor_is_roll, FALSE))

  accessibility_df <- neighbors |>
    group_by(row, col) |>
    summarize(
      adjacent_rolls_count=sum(neighbor_is_roll),
      is_roll=first(is_roll),
      .groups = "drop"
    ) |>
    ungroup() |>
    mutate(adjacent_rolls_count=replace_na(adjacent_rolls_count, 0)) |>
    mutate(accessible=adjacent_rolls_count < 4) |>
    select(-adjacent_rolls_count)

  state_visual <- accessibility_df |>
    mutate(is_roll=if_else(is_roll, "@", ".")) |>
    select(-accessible) |>
    pivot_wider(values_from=is_roll, names_from=col)

  has_accessible_rolls <- accessibility_df |>
    filter(accessible & is_roll) |>
    nrow() > 0

  if (!has_accessible_rolls | max_iters == 0) {
    return(accessibility_df)
  }

  grid_with_accessible_rolls_removed <- accessibility_df |>
    mutate(is_roll=if_else(accessible & is_roll, FALSE, is_roll))

  return(Recall(
    grid_with_accessible_rolls_removed,
    max_iters=max_iters-1
  ))
}

part1_state_df <- with_accessible_rolls_recursively_removed(df, 0)

part1_accessibility_count <- part1_state_df |>
  filter(accessible & is_roll) |>
  nrow()
part1_accessibility_count

final_state_df <- with_accessible_rolls_recursively_removed(df)

initial_roll_count <- part1_state_df |>
  filter(is_roll) |>
  nrow()

final_roll_count <- final_state_df |>
  filter(is_roll) |>
  nrow()

part2_result <- initial_roll_count - final_roll_count
part2_result
```

Side note: despite looking a bit ugly, the RStudio IDE is really
nice for developer experience. I like how it encourages
interactive development and visualization.

![RStudio IDE showing an Advent of Code R solution with data frame](/advent-of-code/rstudio.png)

### [miniKanren](https://minikanren.org/)

miniKanren, an embeddable relational programming DSL, was fun
but really hard to solve AoC in. Day 10 part 1 was dang hard.
Part 2 would have required reinventing arithmetic from scratch,
so I tapped out.

(For part 2, I tried
[Prolog CLP(FD)](https://www.swi-prolog.org/man/clpfd.html) but
hit performance issues. I sighed and went with
[ol' reliable](https://en.wikipedia.org/wiki/Z3_Theorem_Prover).)

miniKanren is like Prolog but minimal. You have to everything
yourself. Mind-expanding, but a bit too barebones for my taste.

A simple example is the relation `conso`, which relates a head,
tail, and list such that the list is `[head, ...tail]`. You can
use it to construct or deconstruct lists.

```racket
(define (conso h t ls)
  (== (cons h t) ls))

(run 1 (q) (conso 1 '(2 3) q)) ; => '((1 2 3))
(run 1 (q) (conso q '(2 3) '(1 2 3))) ; => '(1)
(run 1 (q) (conso 1 q '(1 2 3))) ; => '((2 3))
```

I'm not a fan of the convention to append "o" to relation names.
IMO it makes the code harder to read and you feel stupid
pronouncing it.

Here's my solution to day 10 part 1. I had to start by
implementing XOR from scratch and then build up a boolean
satisfiability machine from there. Cool, but not fun. Took many
hours. Incomprehensible.

```racket
(define (conso h t ls)
  (== (cons h t) ls))

(define (bito n)
  (conde
    [(== n 0)]
    [(== n 1)]))

(define (xor2o a b c)
  (conde
    [(== a 0) (== b 0) (== c 0)]
    [(== a 0) (== b 1) (== c 1)]
    [(== a 1) (== b 0) (== c 1)]
    [(== a 1) (== b 1) (== c 0)]))

(define (xor-listo ls out)
  (conde
    [(== ls '()) (== out 0)]
    [(fresh (h t prev-out)
       (bito h)
       (conso h t ls)
       (xor-listo t prev-out)
       (xor2o h prev-out out))]))

(define (lighto press-bits hud-bit)
  (xor-listo press-bits hud-bit))

(define (lightso press-bits-per-light hud-bits)
  (conde
    [(== press-bits-per-light '())
     (== hud-bits '())]
    [(fresh (pb-current pb-rest hud-current hud-rest)
       (conso pb-current pb-rest     press-bits-per-light)
       (conso hud-current hud-rest   hud-bits)
       (lighto pb-current hud-current)
       (lightso pb-rest hud-rest))]))

(define (relevant-buttons-per-light hud buttons)
  (for/list ([i (in-range (length hud))])
    (filter (lambda (button) (member i button)) buttons)))

(define (n-bitso n bit-vars)
  (if (zero? n)
      (== bit-vars '())
      (fresh (b rest)
        (bito b)
        (== bit-vars (cons b rest))
        (n-bitso (- n 1) rest))))

(define (membero x ls)
  (conde
    [(fresh (a d)
       (conso a d ls)
       (== a x))]
    [(fresh (a d)
       (conso a d ls)
       (membero x d))]))

(define (button-light-contribo button press-bit light-idx contrib)
  (conda
    [(membero light-idx button)
     (== contrib press-bit)]
    [(== contrib 0)]))

(define (light-idx-contribo buttons press-bits light-idx hud-bit)
  (conde
    [(== buttons '()) (== press-bits '()) (== hud-bit 0)]
    [(fresh (btn rest-btns press rest-press-bits contrib rest-xor)
       (conso btn rest-btns buttons)
       (conso press rest-press-bits press-bits)
       (bito press)
       (button-light-contribo btn press light-idx contrib)
       (light-idx-contribo rest-btns rest-press-bits light-idx rest-xor)
       (xor2o contrib rest-xor hud-bit))]))

(define (machineo buttons press-bits hud-bits)
  (machineo/rec buttons press-bits hud-bits 0))

(define (machineo/rec buttons press-bits hud-bits idx)
  (conde
    [(== hud-bits '())]
    [(fresh (t rest-hud-bits)
       (conso t rest-hud-bits hud-bits)
       (light-idx-contribo buttons press-bits idx t)
       (machineo/rec buttons press-bits rest-hud-bits (add1 idx)))]))

(define (first-n-solutions machine n)
  (run n (press-bits)
    (n-bitso (length (machine-buttons machine)) press-bits)
    (machineo (machine-buttons machine) press-bits (machine-hud machine))))

(define (comparator a b)
  (< (apply + a) (apply + b)))

(define (best-solution solutions)
  (first (sort solutions comparator)))

(define machines (parse-input "input.txt"))

(define press-bits (map (lambda (m) (first-n-solutions m 10)) machines))

(define best-press-counts (map (lambda (pb) (apply + (best-solution pb))) press-bits))

(apply + best-press-counts)
```

If you're curious,
[this is the canonical book to learn miniKanren.](https://mitpress.mit.edu/9780262535519/the-reasoned-schemer/)

### [Mercury](https://mercurylang.org/)

I had high hopes for Mercury.

Mercury is a modern descendant of Prolog with static types, a
better module system, and syntax for functional programming
instead of only relational programming.

I'm sure Mercury is much better for large projects, but it
totally sucked for Advent of Code. The static types got in the
way a lot, and I had to write tons of boilerplate code to do
simple things like reading a file or splitting a string.

Mercury is extremely focused on correctness, so you have to
prove a bunch of exhaustive logical properties about your
program before it will compile. After day 7 part 1, I switched
to Prolog because it's basically the same language except it
takes like &frac14; as much code to express the same idea.

This is the same problem as my Prolog example above, except the
simpler version that didn't require backtracking. But even the
simpler version is way more code in Mercury.

```prolog
:- module solution1.

:- interface.
:- import_module io.
:- pred main(io::di, io::uo) is det.

:- implementation.
:- import_module char, int, list, string.

:- func empty = char.
:- func laser = char.
:- func splitter = char.

empty = ('.').
laser = ('|').
splitter = ('^').

main(!IO) :-
    read_grid("input.txt", Grid, !IO),
    processed_grid(Grid, FinalGrid, TotalSplits),
    % io.write_string("Final grid:\n", !IO),
    % print_grid(FinalGrid, !IO),
    io.format("Part 1: total splits: %d\n", [i(TotalSplits)], !IO).

% Grid utils

:- pred read_grid(string::in, list(list(char))::out, io::di, io::uo) is det.
read_grid(Path, Grid, !IO) :-
    io.open_input(Path, Result, !IO),
    (
        Result = ok(Stream),
        read_lines(Stream, Lines, !IO),
        io.close_input(Stream, !IO),
        Grid = list.map(string.to_char_list, Lines)
    ;
        Result = error(Error),
        io.format("Failed to open '%s': %s\n", [s(Path), s(io.error_message(Error))], !IO),
        Grid = []
    ).

:- pred print_grid(list(list(char))::in, io::di, io::uo) is det.
print_grid([], !IO).
print_grid([Row | Rows], !IO) :-
    io.write_string(string.from_char_list(Row), !IO),
    io.nl(!IO),
    print_grid(Rows, !IO).

% Generic IO utils

:- pred read_lines(io.input_stream::in, list(string)::out,
    io::di, io::uo) is det.
read_lines(Stream, Lines, !IO) :-
    io.read_line_as_string(Stream, Result, !IO),
    (
        Result = ok(Line0),
        Line = string.replace_all(string.chomp(Line0), "S", "|"),
        read_lines(Stream, Rest, !IO),
        ( if Line = "" then Lines = Rest else Lines = [Line | Rest] )
    ;
        Result = eof,
        Lines = []
    ;
        Result = error(_),
        Lines = []
    ).

% Core logic

:- pred processed_grid(
     list(list(char))::in,
     list(list(char))::out, int::out
   ) is det.

processed_grid([], [], 0).
processed_grid(Grid @ [First | _], NewGrid, Splits) :-
    EmptyRow = list.duplicate(list.length(First), empty),
    processed_rows(EmptyRow, Grid, NewGrid, 0, Splits).

:- pred processed_rows(
     list(char)::in, list(list(char))::in,
     list(list(char))::out, int::in, int::out
   ) is det.

processed_rows(_, [], [], !Splits).
processed_rows(Above, [Row | Rows], [NewRow | NewRows], !Splits) :-
    process_row(Above, Row, NewRow, RowSplits),
    !:Splits = !.Splits + RowSplits,
    processed_rows(NewRow, Rows, NewRows, !Splits).

:- pred process_row(
     list(char)::in, list(char)::in,
     list(char)::out, int::out
   ) is det.

process_row(Above, Current, NewRow, Splits) :-
    processed_cells(empty, empty, Above, Current, NewRow, 0, Splits).

:- pred processed_cells(
     char::in, char::in, list(char)::in, list(char)::in,
     list(char)::out, int::in, int::out
   ) is det.

processed_cells(_, _, [], [], [], !Splits).
processed_cells(_, _, [], [_ | _], [], !Splits).
processed_cells(_, _, [_ | _], [], [], !Splits).
processed_cells(AL, CL, [AM | ARest], [C | CRest], [NewC | NewRest], !Splits) :-
    AR = ( if ARest = [X | _] then X else empty ),
    CR = ( if CRest = [Y | _] then Y else empty ),
    processed_cell(AL, AM, AR, CL, C, CR, NewC, CellSplits),
    !:Splits = !.Splits + CellSplits,
    processed_cells(AM, C, ARest, CRest, NewRest, !Splits).

:- pred processed_cell(
    char::in, char::in, char::in, char::in, char::in, char::in,
    char::out, int::out
) is det.

processed_cell(AboveL, AboveM, AboveR, CurrL, C, CurrR, NewC, Splits) :-
    (
        C = empty, AboveM = laser -> NewC = laser, Splits = 0;
        C = empty, AboveL = laser, CurrL = splitter -> NewC = laser, Splits = 0;
        C = empty, AboveR = laser, CurrR = splitter -> NewC = laser, Splits = 0;
        C = splitter, AboveM = laser -> NewC = splitter, Splits = 1;
        NewC = C, Splits = 0
    ).

:- end_module solution1.
```

### [Factor](https://factorcode.org/)

I wanted to love Factor.

Factor is a modern take on concatenative languages.
Concatenative means stack-based. As in, the entire language is a
stack.

For example, this outputs `3`:

```
1 2 + .
```

(Translation: push `1` onto the stack; push `2` onto the stack;
pop the two things on top of the stack, add them together, and
push the result to the stack; then print the top of the stack.)

You can build up more complex operations by defining new words
(functions).

```
: square ( n -- n^2 ) dup * ;
5 square . ! Outputs 25
```

Concatenative languages have been around for a long time.
[Forth](<https://en.wikipedia.org/wiki/Forth_(programming_language)>)
is the most popular because it runs on tiny embedded systems.
Factor is like Forth but with modern conveniences.

I had a rough time with Factor. First of all, setting up a
project was a pain. It's an
[image-based language](https://wiki.c2.com/?ImageBasedLanguage),
and I found that concept so foreign I almost gave up.

But even after getting it set up, I was fighting the language
constantly. The stack-based paradigm is so different from what
I'm used to that I couldn't think straight. And this is coming
from
[the guy who wrote FizzBuzz in combinatory logic](https://joshmoody.org/blog/programming-with-less-than-nothing/).

Day 9's puzzle was finding the biggest rectangle constructible
from a set of points. This is trivial in any other language, but
it pushed me to my limits in Factor.

```factor
USING: arrays io.encodings.utf8 io.files io.pathnames kernel math math.functions sequences splitting math.parser prettyprint vocabs.loader ;
IN: maxrectangle

: parse-line ( str -- pair )
    "," split [ string>number ] map ;

: read-coords ( path -- pairs )
    utf8 file-lines [ parse-line ] map ;

: all-pairs ( seq -- pairs )
    dup cartesian-product concat ;

: x-dist ( p1 p2 -- n )
    [ first ] dip first - abs 1 + ;

: y-dist ( p1 p2 -- n )
    [ second ] dip second - abs 1 + ;

: rectangle-area ( p1 p2 -- n )
    [ x-dist ] [ y-dist ] 2bi * ;

: with-area ( pair -- tuple )
    dup first2 rectangle-area suffix ;

: main ( -- )
    "maxrectangle" vocab-path parent-directory "input.txt" append-path
    read-coords all-pairs [ with-area ] map [ last neg ] sort-by first last "Part 1: " print . ;
main
```

I'm not necessarily saying Factor is a bad language. I just
found it too alien to learn in one day.

### [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

Unfortunately you can't solve AoC day 6 part 1 in CSS because
you hit the maximum integer value of CSS counters.

![Aggregated numbers columnwise via CSS counters](/advent-of-code/aoc-2025-day-6-part-1-css.png)

In other words, CSS is one browser fork away from being viable.

### [Game Boy Assembly](https://gbdev.io/gb-asm-tutorial/)

No more low level languages for me. For anything. Ever.

This was only day 2, so the actual problem was conceptually
simple. Just summing up certain numbers in various ranges.

But nothing is simple in assembly.

I've dabbled in assembly for school projects in the past, so I
walked into this puzzle with some hubris.

I started by following along with
[gbdev.io's tutorial](https://gbdev.io/gb-asm-tutorial/), and
got as far as desigining a font tilemap for printing numbers.
Here's some of the boilerplate:

```asm
INCLUDE "hardware.inc"

SECTION "Header", ROM0[$100]

  jp EntryPoint

  ds $150 - @, 0 ; Make room for the header

EntryPoint:
  ; Do not turn the LCD off outside of VBlank
WaitVBlank:
  ld a, [rLY]
  cp 144
  jp c, WaitVBlank

  ; Turn the LCD off
  ld a, 0
  ld [rLCDC], a

  ; Copy the tile data
  ld de, Tiles
  ld hl, $9000
  ld bc, TilesEnd - Tiles
CopyTiles:
  ld a, [de]
  ld [hli], a
  inc de
  dec bc
  ld a, b
  or a, c
  jp nz, CopyTiles

  ; Copy the tilemap
  ld de, Tilemap
  ld hl, $9800
  ld bc, TilemapEnd - Tilemap
CopyTilemap:
  ld a, [de]
  ld [hli], a
  inc de
  dec bc
  ld a, b
  or a, c
  jp nz, CopyTilemap

  ; Turn the LCD on
  ld a, LCDCF_ON | LCDCF_BGON
  ld [rLCDC], a

  ; During the first (blank) frame, initialize display registers
  ld a, %11100100
  ld [rBGP], a

  ld hl, Input
  call ParseFirstNumber ; TODO: more than just the first number

Done:
    jp Done
```

Unfortunately, I ran into many problems after that.

First obstacle: the lack of `number->string` and
`string->number` functions. You have to build those from
scratch, which involves exponents of 10 and mod 10.

If that seems easy, Game Boy **doesn't natively support
multiplication**. You have to use bit shifts. For example,
&times;10 is `(n << 1) + (n << 1 << 1 << 1)`.

That's all fun and games until you realize the puzzle's maximum
integers are **A COUPLE BITS OUT OF RANGE OF THE MAXIMUM 32-BIT
UNSIGNED INTEGER**.

Game boy hardware doesn't support 64-bit arithmetic, so you have
to reimplement in software. I hope you like carry logic!

That's when I decided to switch from assembly to C.

C was still difficult. My brute force solution only checked 2
numbers per second thanks to the slow software arithmetic. That
would have taken 9 days.

So instead I had to find an optimized solution. And even that
took the poor thing 60 seconds.

<p class="centered">
    <video height="1080" width="1920" controls style="max-width: 100%; height: auto;">
    <source src="/advent-of-code/aoc-2025-day-2-game-boy.webm" type="video/webm">
    Your browser does not support the video tag.
    </video>
</p>

I did part 2 in a different language.

The sick freak who decided to make this puzzle's numbers exceed
4 billion is getting a lump of human flesh in their stocking.

## Then I got sick and gave up

You ever eat something, throw up, and find yourself unable to
eat that food ever again? That's me with Advent of Code. I got
the flu on day 11 and was dead for a week. Now I can't think
about Leetcode without dry heaving.

The final problems were probably too hard to do in a weird
language anyway.

TL;DR I recommend messing around with Clojure, Prolog, Julia,
Racket, and APL. They're fun languages that will change the way
you think.
