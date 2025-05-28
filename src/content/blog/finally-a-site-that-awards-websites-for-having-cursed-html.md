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

I've wanted to try the Elixir language and associated web framework Phoenix a try for a long time, and this project finally gave me the perfect excuse.

### My Thoughts on [Elixir](https://joshmoody.org/blog/hidden-pitfalls-of-blazor/)

Overall, I liked it, 10/10 would recommend. The syntax is the most beautiful of any language ever since it looks like Ruby and has a pipe operator `|>`.

This is what the code for a single achievement looks like. No idea if it's idiomatic but it gets the job done:

```elixir
defmodule Divsoup.Achievement.DivSoupGold do
  alias Divsoup.Achievement

  @behaviour Divsoup.AchievementRule

  @impl true
  def evaluate(html_tree, _) do
    ratio = Divsoup.Util.DivSoup.get_div_ratio(html_tree)

    if ratio > 0.75 do
      []
    else
      ["Only #{ratio * 100}% of the HTML elements in the page are divs"]
    end
  end

  @impl true
  def achievement() do
    %Achievement{
      hierarchy: :gold,
      title: "Div Stew",
      group: "div_soup",
      description: "More than <strong>75%</strong> of the HTML elements in the page are <code>&lt;div&gt;</code> elements"
    }
  end
end
```

The supervisor tree and actor model are nifty concepts that I sadly didn't explore much in this project, since I didn't need massive concurrency or whatever for a weekend project. I did use them to make a bad job processing system, though, which was fairly painless.

```elixir
defmodule Divsoup.Analyzer.WorkerSupervisor do
  use Supervisor
  require Logger

  def start_link(opts \\ []) do
    Supervisor.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @impl true
  def init(_opts) do
    worker_count = Application.get_env(:divsoup, :worker_count, 1)

    Logger.info("Starting #{worker_count} analysis worker(s)")

    children =
      for i <- 1..worker_count do
        worker_name = :"Divsoup.Analyzer.Worker#{i}"

        Supervisor.child_spec(
          {Divsoup.Analyzer.Worker, [name: worker_name, worker_id: "worker_#{i}"]},
          id: worker_name
        )
      end

    Supervisor.init(children, strategy: :one_for_one)
  end

  def worker_count do
    Supervisor.count_children(__MODULE__).active
  end
end

```

Most of the pain I encountered while using Elixir came from the lack of libraries. But eh, it wasn't a big deal for a small project like this.

### My Thoughts on [Phoenix](https://www.phoenixframework.org/)

My benchmark for web framework quality is [Django](https://www.djangoproject.com/) (underrated, by the way), and overall I think Phoenix gets _close_ to matching Django's quality, but falls a bit short.

I turned off [LiveView](https://hexdocs.pm/phoenix_live_view/welcome.html) for this project so I can't speak to that. Although, if I had to guess, I probably wouldn't like it very much due to its similarity to [Blazor](https://joshmoody.org/blog/hidden-pitfalls-of-blazor/).

My biggest complaint with Phoenix is its emphasis on code generation. When you create a new project, it [scaffolds a _ton_ of code for you](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.New.html). I'm sure this is helpful to experienced users, but as a beginner, I was scared of choosing a setting wrong and then having no easy way to change it later.

For example, I didn't want to use [Tailwind](https://tailwindcss.com/) for this project, but even after using the `--no-tailwind` flag, a lot of the generated code had Tailwind classes in it, and it took annoyingly long to remove it by hand.

I wish the framework had less boilerplate so I wouldn't be so scared of screwing up a new project.

### Bots Are Annoying and Expensive

I chose [AWS Aurora Serverless V2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html) for the database, since it can [scale down to zero](https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity/) when not in use. But a couple days after launch, I noticed that the database was pretty much never sleeping.

The server logs revealed that bots are constantly hitting the home page of my site (and various WordPress routes), and since fetching the homepage involved a database request, the DB was getting sleep deprived.

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

My current fix is to make the homepage static so the `GET /` requests don't wake up the DB. One of these days I'll probably add a `robots.txt`, too.

I don't know why I'm even writing about the bot thing. Just had to vent, I guess.

## Conclusion

If you read [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML) for fun then you might get a kick out of [divsoup](https://divsoup.net).

Can't add anything else to this section or I'll fail the Turing test.
