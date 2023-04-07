---
title: Logging best practices that I follow
date: "April 10, 2022"
---

At the beginning of my coding career, I mostly wrote logs (print statements 😜) when debugging an issue and removed them (unsaid rule) after the bug was fixed. But when I became a backend developer, I realised the importance of logging. In this blog, I am listing down all the things that I've learned in the past few years and the rules I follow when writing log statements.

## What exactly is logging?

In laymen's terms, we all know what logging is; it's printing messages, variables and exceptions to the console or a file. It is partially correct. However, what I feel is logging is a mechanism to record the state of the application and the actions it has taken at a given point in time.

If we think about it, both definitions are completely different. One suggests that we are indicating where we are in the codebase, and the second indicates the current state of request flow. This change in the thought process when developing an application helps us to write better logging statements and, in turn, helps us to improve the application.

## Different levels of Logs

The level of logging may vary based on the team you're in, the application you're working on, and, most likely, the framework/language you're using. The most widely used logging levels are `DEBUG`, `INFO`, `WARN` and `ERROR`.

### DEBUG 👨🏻‍💻

![debugging.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1649343223530/meiZpkf88.gif)

As the name suggests, these logs contain information that is most interesting for developers when trying to debug a problem. They are fine-grained statements concerning the state of the application.

In our production system, we have a huge number of `DEBUG` logs, and we tend to disable this level mostly. We enable this only when the need arises.

### INFO ℹ️

![info-level.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1649343014674/dCycagJ2a.gif)
Logs at this level are purely informational messages, as the name suggests and they should not be used to indicate a fault or error state in the application. To make the best use of this log level, consider what general information would be useful for diagnosing an application error when the primary interface is unavailable.

### WARN ⚠️

![darth-vader-this-is-your-last-warning.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1649342969562/Gn4KrBiLs.gif)

Warning logs should be used when something happens that could potentially cause some oddities in the application. These logs give us some heads-up, indicating something that might need our attention.

### ERROR 🚨

![error.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1649342866161/BKZSWVpCu.gif)

Logs at this level contain failures in the application. Use error logs when something that could've gone wrong has gone wrong and action needs to be taken by someone to resolve the issue. In the event there is no action needed, we can use the `WARN` level instead.

## How much should we log?

### Have fewer logs 🔇

There is no harm in actually having very few logs in our system, but this will make figuring out why something happened the way it happened a bit difficult.

### Log everything 🔊

If logging is this good, why can't we write a log statement after every line of our code?

Is it too much?

How much logging is too much logging?

![talk-spongebob.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1649343245360/yLswYQvicp.gif)

These types of questions were asked in a lot of forums, including StackOverflow, which led to [this blog][1] by [Coding Horror][2]

A few takeaways, according to me, are as follows:

- The more logs you add, the larger the codebase grows.

- There is a slight chance of your application becoming slower by having too many logs.

There is no one golden standard in the case of how much we need to log. It all depends on the application and who is writing the code. I suggest starting logging `ERROR` and `WARN` levels, and then `INFO` and `DEBUG` level logs as the need arises during development. Be mindful of what is being logged.

## Other uses of logging

- Having good logs helps us to debug and resolve the issue better and faster.

- Structured logs help us visualise logs in viewers like Kibana, Datadog, etc. These visualisations help us derive a few patterns in our application, which in turn can be used to make the application better.

## Rules I follow while writing logs 🪵

So we've read about what logging is, the different levels of logs, and the advantages of having good logs. The following are the rules and guidelines that I follow on a day-to-day basis when writing logs. It might not be exhaustive, but it should give a very good idea of the different things to consider while writing logs.

### Not all exceptions are errors

I used to have the habit of logging the exception messages and categorising them as errors. Later down the line, I realised that not all exceptions are errors, and some might be expected. These can be logged as either warnings or informational messages.

### Log after an action is performed, not before

Logging before an action is taken might give you some contextual information about what action would be taken, but we would never know whether the action was successful or not. Having a log message after the action is taken would inform us that the action was performed and the result of the action, if available. There are scenarios where we log before and after the action is taken. This is done to measure the amount of time it takes to complete the action.

### Either log or throw exceptions, but not both

As mentioned in [RSPEC-2139](https://rules.sonarsource.com/java/RSPEC-2139), it is not a good idea to log and throw exceptions at the same time. This is done to avoid a large number of identical logs, which would lead to noise in the log files.

### Define a logging format for your project

Having a predefined structure for log messages would make reading the logs easier. Additionally, this structure would help to visualise the logs in log viewers like Kibana, Datadog, etc...

Try not to merge log messages and variables when writing the logs. A good log format that I follow is

```
LOG.level("{Message} {Variables}");
```

Some examples:

```java
LOG.info("Fetched the employee data for a company. [companyId={}]", companyId);
LOG.error("Error occurred while fetching the employee data for the company. [companyId={}]", companyId, e);
```

## References

- Coding Horror [blog on logging][1]

- Code project [blog on The Art of Logging][3]

[1]: https://blog.codinghorror.com/the-problem-with-logging/
[2]: https://blog.codinghorror.com
[3]: https://www.codeproject.com/Articles/42354/The-Art-of-Logging
