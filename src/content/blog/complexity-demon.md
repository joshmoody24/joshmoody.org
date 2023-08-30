---
title: 'Blazor Post'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
heroImage: '/blog-placeholder-3.jpg'
---

# Blazor isn't as good as it sounds (working title)

Introduction/hook

## Complexity, the Immortal 

The one overarching enemy in the realm of software development is complexity. In the immortal words of [The Grug Brained Developer](https://grugbrain.dev):

> given choice between complexity or one on one against t-rex, grug take t-rex

Complexity is bad for everyone, not just developers. From a business standpoint, complexity leads to slower development speed. Slower development speed means higher cost to develop new features. It also means reduced agility and responsiveness to customer needs. Complexity also increases the likelihood of software bugs, which leads to frustrated customers and developers. Frustrated customers means fewer customers. Frustrated developers means higher employee turnover.

Sure, some complexity is unavoidable, but a lot of it isn't. And Blazor is riddled with complexity of the unnecessary kind.

## Blazor: Complexity Made Flesh

Blazor sells itself as the ideal framework for creating rich, interactive web application without JavaScript. Avoiding JavaScript is the dream of many developers, and for this reason, reception to the framework is almost universally positive. I too once believed Blazor was the ideal way to write web applications. But everything changed after using Blazor to write an enterprise web app. During development of this app, Blazor handed me so many footguns that I ran out of feet to shoot with them. Here's some of the most egregious things about Blazor that will drive you crazy when developing a large application:

### Pessimistic re-rendering

### No separation of concerns between application layers
- UI diffing over SignalR results in subpar user experience: high latency, persistent connection required, UI hangs when backend is chugging, etc.
- Too easy to introduce unnecessary state
- Lacks JS features; JSInterop is a hassle
- The peculiarities of the @bind syntax have been a source of countless headaches. Deleting user input while typing, etc.

## Example: Blazor vs. React

React vs Blazor: How to fetch data only when the props (or parameters) have changed.

React:
```javascript
useEffect(() => {
    await fetchData();
}, [filters, sortColumn, sortDescending, pageNumber, maxPages]);
```

Blazor:

```c#
[Parameter] public ComplexType1 Filters { get; set; }
[Parameter] public string SortColumn { get; set; }
[Parameter] public bool SortDescending { get; set; }
[Parameter] public int PageNumber { get; set; }
[Parameter] public int MaxPages { get; set; }

private ComplexType1 _previousFilters;
private string _previousSortColumn;
private bool _previousSortDescending;
private int _previousPageNumber;
private int _previousMaxPages;

public override async Task OnParametersSetAsync()
{
    await base.OnParametersSetAsync();
    if (Filters != _previousFilters ||
        SortColumn != _previousSortColumn ||
        SortDescending != _previousSortDescending ||
        PageNumber != _previousPageNumber ||
        MaxPages != _previousMaxPages)
    {
        _previousFilters = Filters;
        _previousSortColumn = SortColumn;
        _previousSortDescending = SortDescending;
        _previousPageNumber = PageNumber;
        _previousMaxPages = MaxPages;

         await FetchData();
    }
}
```


Blazor’s approach has:
1. Much larger surface area (lots of room 
for bugs to hide in)
2. State management (#StateIsTheBug)
3. Unintuitive re-rendering behavior

## Proposed Alternative: MVC + HTMX

Intro

### ASP.NET MVC
• A simpler, more traditional web 
framework
• Much better than Blazor at
limiting application complexity
• Underrated because it’s not the 
latest fad (i.e., using it is a 
sneaky competitive advantage)
• Can coexist with Blazor

#### MVC Tip: Tag Helpers
• Use Tag Helpers to build your own custom HTML elements and 
attributes

#### MVC Tip: Partial Views
• Use Partial Views to create more complex portions of HTML. 
Like a Blazor component that renders static HTML (many of our Blazor
components are already static)

### HTMX
• Sometimes MVC is a little bit 
TOO simple for a complex user 
interface
• HTMX enables a modern UX 
with just HTML, no JavaScript 
required
• Used as little as possible

### HTMX Components
The MVC controller has a single action 
which uses HTMX request headers ("HX-Trigger") to 
determine whether to send the 
whole page or just a portion.

### Proof of Concept Summary
After two days of work:
Basic navbar, profile menu, account 
switcher, and report page functionality was 
successfully implemented in MVC + HTMX 
with equal or better performance in all 
areas and no functionality compromises

While the reduction in lines of code is a tangible metric, it's essential to balance this with other factors like maintainability, scalability, and flexibility. Fewer lines of code don't always equate to a better solution.

### Complexity Analysis
MVC+HTMX took about 38% as many lines of code compared to Blazor to implement basic pivot table UI functionality.

A recent proof of concept showed that MVC combined with HTMX executed basic functionalities in just about 38% of the lines of code compared to Blazor. These impressive results stem from the elimination of extraneous prop-passing, avoiding complicated state/lifecycle management, and the efficiency of tag helpers.

Largest reductions
come from not having to worry about:
- Boilerplate prop passing
- Component state/lifecycle management
- Using tag helpers instead of simple Razor components that basically just render static HTML anyway

## Overall Results
“Functionality is an asset, but code is a liability”
-Ted Dziuba, Taco Bell Programming

Blazor's functionality-per-line-of-code is very low.

## Recommendation 1: Situational MVC Adoption
Don’t replace the Report page with HTMX right now. It would be cool 
but not worth the high opportunity cost of developing new features.
When developing a new page, consider whether Blazor or MVC would 
be a better fit.
MVC is especially suitable when a page doesn’t need complex 
interactive UI. But HTMX lets it do complex interactive UI as well.

While we don't advocate for a complete overhaul, it's crucial to weigh the benefits of Blazor against MVC for future developments. MVC shines, particularly when you're dealing with pages that don't demand intricate UIs. But remember, HTMX extends MVC’s capabilities to handle even those complex UIs gracefully.

## Recommendation 2: Aggressive Complexity Avoidance

Taking inspiration from Melvin Conway’s famous paper "How Do Committees Invent?", we should constantly strive to strip down complicated tasks to their simplest form. If simplification isn’t achievable, perhaps it's worth re-evaluating the necessity of the feature itself. As a last resort, if a feature is deemed vital, it's important to embrace the challenge head-on.

> Let us first examine the tendency to overpopulate a design effort. It is a natural temptation of the initial designer to delegate tasks when the 
apparent complexity of the system approaches his limits of comprehension. This is the turning point in the course of the design. Either he struggles to reduce the system to comprehensibility and wins, 
or else he loses control of it. The outcome is almost predictable if there is schedule pressure and a budget to be managed.

-- Melvin Conway, How Do Committees Invent?”

>Let us first examine the tendency to [overcomplicate] a design effort. 
It is a natural temptation of the initial designer to [add another layer of 
abstraction] when the apparent complexity of the system approaches 
his limits of comprehension. This is the turning point in the course of
the design. Either the designer struggles to reduce the system to 
comprehensibility and wins, or else [the complexity demon devours 
your soul].

- Me

See also Fumito Ueda’s Design by Subtraction philosophy (Elaborate)

1. When asked to create something complicated, wrestle with the idea until it
becomes simple.
2. If you fail, try to convince the PM that the thing isn’t necessary.
> This feature is not strictly necessary in order to reach minimum viable functionality across the most common anticipated use cases.
3. If that fails, try to convince PM to adopt a simpler idea that does 80% of 
the job with 20% of the complexity.
> Instead of a report filter dropdown with nested checkboxes, let’s just have users 
switch between accounts (TODO: redact)
4. If that fails, then the feature is actually important. Bite the bullet and make 
it complicated.

The Benefits
- Faster development
- Reduced cost of new features
- Increased responsiveness to customer needs
- Simpler, more reliable software
- Fewer frustrated customers
- Easier for customers to learn
- Higher employee satisfaction

his section could benefit from drawing direct comparisons between your proposed approach and the complexity found in Blazor.