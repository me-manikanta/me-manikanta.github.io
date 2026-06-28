---
title: How I track my expenses
date: "June 28, 2026"
tags: ["finance"]
category: "Softwares I use"
---

## The Problem

When it comes to spending and tracking, I am one of the laziest people you’ll ever meet. That used to be the case until last June (2025), when I received a paycheck and found myself wondering where all my money had gone.

It was difficult to track, as I could only remember the major expenses and couldn’t recall all the minor ones I’d made over the past month. That’s when I decided I needed some way to track my expenses, so I’d know where each of my rupees was going.

This feeling isn’t new to me. I always feel like this: search for some app that’s amazing at tracking expenses, then get lazy and don’t end up updating it with my expenses, and the cycle repeats.

## The Excel Solution

But this time around, I wanted a simple and easier solution. As a software engineer, I wanted to build an app that tracks my spending automatically. I started the project, ended up procrastinating, and didn’t build anything.

But thanks to the YouTube algorithm, my searches led it to recommend an amazing video on how to simply track expenses in Excel, no fancy software, nothing else.

Although I could buy the template from their website (spoiler: I did buy it), I wanted to follow the tutorial myself. It was quite long, but part of my mind said that if I invested the time now, I’d feel bad later if I didn’t use the template and track my expenses.

Another side benefit was that, by building the template myself, I’d know which areas I needed to tweak to make the tracker my own. I ended up buying the template later anyway, as I felt like I owed the author money for the amazing tutorial.

## The Monthly Ritual

Now that the easy part was over, what’s next? I needed to fill the Excel, but when? Daily, weekly, bi-weekly? While drafting the template, I realised I shouldn’t be hard on myself, so I’d fill it with all my expenses at the end of the month.

But I can already hear you screaming: aren’t you reproducing the same problem, where you don’t know why you made a certain expense or when you made it? Trust me, I hear you.

That’s when I got a brilliant idea (from my perspective): when paying through UPI apps or any other apps, I also write a friendly transaction message, so that future me would thank present me for it.

So at the end of the month, I download the previous month’s bank statement and manually tag each transaction myself, slowly watching the graph change as I add one transaction after another.

## Why I Didn’t Automate It

I hear you again: why such manual effort? Why don’t you automate it, and better yet, why don’t you ask AI to do the classification? Trust me, I wanted to, and I did as well, but once things were automated, I felt like I was missing something, some ritual.

On the first weekend of every month, my wife and I download the transactions, manually tag them, and re-think each one, why we did what we did. In a few cases, we even re-live our memories of a trip based on the transactions. (I know, it sounds cliché.) But it’s true, and so I ended up not automating it.

## The Cracks in Excel

After a few months, I realised there was a problem. Life isn’t ideal: sometimes we share expenses with friends and they pay us back, and other times we order something, return it, and get a refund later.

The problem with the Excel-based approach is that income and expenses have different categories, so refunds get counted as income instead of as a refund to an existing transaction. I didn’t know how to solve this, so I manually edited the transactions, or deleted them if the refund equalled the original amount.

All was well and good for a few months. But then, around January (6 months into this new way of tracking), I wanted something new that could fix all the bugs.

As an engineer myself, I wanted to “vibe code” an application that satisfied all my needs. Since I’d been using Excel-based tracking for a few months, I had a decent list of features I wanted to build. So I started ~~development~~ prompting.

## Build vs. Buy

Yeah, yeah, I can read your mind. You might be thinking, “Oh okay, this is another vibe-coded-project blog saying AI is good and solved all my needs, blah blah blah.” That’s not the case, please bear with me while I share my entire journey.

I started vibe-coding for real, and I also thought about open-sourcing it. But one thing my years of software development experience taught me is that there are so many smart people in the world who might have solved a similar problem, so why not check for existing solutions?

On a side note, I’m not discouraging anyone from building software in favour of only checking for available alternatives; my point is that it’s your choice.

In my case, I wanted something stable that keeps me sane and just tracks my expenses. I had no interest in learning anything from this project, so I was okay with checking for alternatives.

## Choosing Actual

I did have clarity on the requirements I needed for my expense tracker app. A few of them: it should be open source with a good community around it, self-hostable, and private, I own my data, and no one else.

With these filters, I found two great apps: “Actual” and “Firefly III”. Actual was recommended by my friend, and I instantly fell in love with it, because it has a UI similar to the Excel I’m familiar with, and it also has all the features I need (more than I need).

The same is true for “Firefly III”, but its only challenge is a bit of a learning curve, so it would be great for advanced tracking. Both have amazing documentation and a great community as well. No YouTube videos though :(.

With all this context in mind, I went ahead with “Actual”.

## Getting Started with Actual

First, I started playing around with the app. I downloaded a specific month's bank statements, imported them into Actual, and manually tagged them. I created a few automation rules for payees and played with Off Budget and On Budget accounts.

Things were pretty good, and I was liking the intuitive UI. Since I was already tracking most of my expenses in Excel, it “would’ve” been easier to import the Excel directly into Actual.

But, me being me, and looking at the power Actual has, I thought: why don’t I import all the bank statements from the past year and manually tag them? (Facepalm.) Yeah, I know I made life hard for myself, but that’s okay.

I downloaded all the bank statements from January 2025, imported them into Actual, looked at the patterns, created rules, and watched the graphs change live. Although it was tiring, the final output was rewarding, now I have a clear view of where my money is going, plus all the other analysis.

There is no AI in Actual; everything is simple text-based tracking, and any graph visualisation you can think of can be added. I was tempted to add AI to this setup, but then I thought that’s overkill, add it when you actually need it and it can’t be implemented with the existing system.

## My Tracking Today

So how does my tracking look now? Similar to before: on the first weekend of every month, my wife and I get some snacks and sit down. We download the bank statements and import them into Actual.

It does its magic, and with rules it cleans up some data so it’s easier for us to add categories (partially automated though :P). Once the tagging is done, we look at our dashboard and plan for the next month.

In the planning, we basically allocate a budget for each category in our life (groceries, fun and vacation, clothing, etc.) based on the events of the month in question. At the end of the month, we see how well we did and give ourselves a pat on the back.

## Final Thoughts

It’s been around 4 months that I’ve been using Actual, and so far I’m liking it. There are some features I’d like them to add, but there’s a high chance they’re already there and I’m just being lazy about reading the documentation.

Overall, I love the app, and I wanted to share it here so that, in case you ever stumble upon this blog while trying to figure out how to track expenses, you give Actual a try. Trust me, you’ll love it.

Oh yeah, and finally: if you’re here to actually learn how I track my expenses or plan my month, that didn’t change. It’s similar to what was mentioned in the video, or Actual’s core idea, “envelope-based budgeting”.

If you’re reading this line, that means you’ve actually read the article. Thank you, that means a lot. At first I didn’t want to write this, as I thought that in the AI era no one reads articles anymore.

But another part of my mind said: you should write it. What’s there to lose? If no one reads this, that’s okay, life is the same as usual. But if at least one person reads it, that’s a win. Again, nothing changes :P.

Anyway, thank you for reading till the last word. Cheers :D
