---
title: "I Stopped Rushing to Code: What Debugging My Bot Taught Me About Software Engineering"
subtitle: "How crash logs, unexpected errors, and frustration changed the way I approach building software."
date: "2026-10-31T15:00:00Z"
category: "Engineering / Debugging"
excerpt: "I used to open my editor the moment I had an idea. Debugging CyrusBot showed me why understanding a system comes before building it, and what I do differently now."
cover: "/images/blog/debugging-taught-me-cover.png"
coverAlt: "Abstract illustration of a terminal log with one highlighted line under a magnifying glass."
projects:
  - cyrusbot
---

## The Habit of Rushing to Code

When I started building software, I was too eager to start coding. I would get an idea, open my editor and begin implementing features before I fully understood what the software was supposed to do. Writing code felt like progress, and a growing file felt like proof.

What I rarely did was ask what could go wrong. What happens when an API fails? When the database connection is unavailable? When a function receives something it was never designed to handle? I was building for the version of events where everything worked.

## When My Bot Started Showing Me the Reality

This became obvious while I was developing [CyrusBot](/projects/cyrusbot), my WhatsApp automation project. Real use is not polite. I met errors, crash logs and unexpected behaviour, and there were times when the bot received a message and still did not respond the way I expected.

A bot like this has several moving parts: a connection to WhatsApp, command handling, and an AI provider. Any of them can fail, and any of them can fail quietly. I had written each part to work, but I had not decided what should happen when it didn't.

## The Frustration of Debugging Without Understanding

I got frustrated, and part of that was my own doing. I was trying to fix problems without always understanding their causes. I would read an error, change something that looked related, run the program again and hope. Sometimes the symptom disappeared. That did not mean I had fixed anything. Often I had only moved the problem or hidden it, and it came back in another form.

It is a slow way to work, and it taught me very little each time.

## My Change in Perspective: Engineering Before Implementation

Eventually I started to see debugging differently. It is not finding an error and editing code until the red text goes away. It is understanding the software: what each component is responsible for, how the functions interact, where a failure could start, and what the application is supposed to do when something goes wrong.

You cannot debug a system you do not understand, and I had been building systems I only half understood. The answer was not a better debugging trick. It was more thinking, earlier, before the code existed.

## Why I Now Spend Hours Planning

Before I write code, I now spend real time on the design. Sometimes that is about three hours. On more complicated projects it can be up to six. That sounds like a lot until I compare it with the hours I lost to confused debugging. Before I start, I want to be able to answer these:

1. What exactly am I building?
2. What problem does it solve?
3. What responsibilities should each function or module have?
4. How should the components communicate?
5. What are the possible failure scenarios?
6. Why could each failure happen?
7. How should the application respond?
8. How will I diagnose and fix problems?
9. What should be documented?

Documenting possible failures, their causes, the expected behaviour and the recovery approach is becoming a normal part of how I work. Planning doesn't mean predicting every possible error. I will still be surprised. It means reducing avoidable mistakes and preparing for uncertainty, so that an unexpected failure lands in a system I understand.

## What Debugging Has Taught Me

I am still learning this, and I don't always get it right. A few things have stuck, though.

- An error message is information. Reading it properly is the first step.
- A fix I cannot explain is not really a fix.
- Failure is part of the design, not an interruption to it.
- Time spent understanding the problem is rarely wasted.

Good software engineering is not measured only by how quickly someone can write code. It is measured by how well they understand the system they are building. Anyone can make code run once. Understanding is what keeps it running.
