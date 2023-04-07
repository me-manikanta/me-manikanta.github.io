---
title: Let's discuss commit messages
date: "July 10, 2022"
---

We all know what a commit message is, and probably write at least 1 commit message every day. But how confident we are that we'll understand the changes we made in a commit by reading only the message after some time?

There are multiple reasons why we don't write proper commit messages:

- No proper structure is defined in the team/project
- Laziness

There can be a wide variety of other reasons as well.

But wait!

## Why should we write better commit messages?

If we browse through the `git log` of any of our repositories, there is a high chance that it looks something like this,

``` text
fixed NPE in test case
CSS fixes
added a button to send mail
updates versions in package.json
```

Hmm, so what is the fix in the latest commit? Yeah, even I can't tell until I look at the changes in the commit. Perhaps you have encountered code in a professional environment where you had no idea what it was doing or meant for.

Similar to having maintainable code and good documentation, having a good commit log is suggested to save yourself and/or co-workers hours of digging around in the repository.

## Anatomy of a commit message

Most of us write only one line of commit message explaining what the changes are by running the following command.

```sh
git commit -m "<Message>"
```

But did you know that multi-line commits are possible?

```sh
git commit -m "<Message1>" -m "<Message2>"
```

Actually, for each `-m` param to the `git commit` command it adds a new line to the commit message.

This feature opens a whole new world for us to write commits, as we now know that we aren't blocked by writing about our changes in 1 line, we can have a summary in one line have a detailed explanation in the subsequent lines. The structure of the commitment will come as

```sh
git commit -m "<Title>" -m "<Message>" -m "<Footer>"
```

> Pro Tip: Prefer using a text editor when writing commit messages instead of command-line :D

## Let's talk about better commit messages

As we now have defined a basic structure of the commit message, let's add some rules along with the structure to have consistency across all of our commits.

> These rules work for me, but might not work for you. My goal here is to give you some inspiration so that you can come up with your structure.

#### Type of Commit

Wait what!!! There are types of commits?

Technically there are no types, but logically we can have any number of types based on our needs.
Following are a few of the widely accepted types of commits:

- `feat` – Added a new feature
- `fix` – Fixed a bug
- `chore` – Changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- `refactor` – refactored code that neither fixes a bug nor adds a feature
- `docs` – Updates to docs in the repository
- `style` – Format code
- `test` – Adding/fixing test cases
- `perf` – Performance improvements
- `ci` – Continuous Integration related
- `build` – Changes that affect the build system or external dependencies
- `revert` – Reverts a previous commit

To specify the type of the commit I use emojis like ✨, and 🐛 for the feat, and bug respectively... more emojis for different types of commits can be found [here](http://gitmoji.dev). Specifying the type as text would also work, but I've transitioned to this way of writing commits for 2 reasons:

1. Git log looks cool 😎
2. I save some characters in the subject line

#### Scope of Commit

The scope is a noun that describes what section of the codebase is affected by this change/commit.

Example:

- feat(API) or ✨(API)
- fix(orders) or 🐛(orders)
- docs(workflow) or 📝(workflow)

#### Subject

Summary of the changes in the commit.

Some key points to consider while writing the subject:

- Have a hard limit of 50 characters
- There is no need to add punctuation, be mindful of the hard limit we've set ;)
- Use the imperative mood

#### Body

This is an optional section where we can provide a detailed explanation of what the change is, and why we've made the change.

- Separate the subject from the body with a blank line
- Try having a hard limit in each line of the body(I prefer to have around 70 to 75)

#### Footer

This section can be used as a meta section of the commit. Here we can specify things like the ticket or issue number that the change corresponds to. reviewer of the commit etc..,

Most of this information is inspired from [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) and they explain all the specs for writing a good commit in much detail. Do note that there is no one correct way of writing commits but having a team agreement can help maintain the repository easier.

## Tools

If you've liked the concept of writing conventional commits and want to force them into your workflow, there are a lot of tools available to help you to do so.

- If you prefer using the command line for writing commits, [Commitizen](https://commitizen-tools.github.io/commitizen/) would be a good choice for you, when you are about to commit your changes it asks a series of questions and forces you to write descriptive commits.
- If you prefer using IDEs like IntelliJ or VS Code there are plugins available. I've used [this](https://plugins.jetbrains.com/plugin/13389-conventional-commit) plugin in IntelliJ and it worked for me, however, I haven't tried any in VSCode.

## References

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)
- [Gitmoji](https://gitmoji.dev) - An emoji guide for your commit messages
- [Commitizen](https://commitizen-tools.github.io/commitizen/) - Command line tool for writing conventional commits
- [Conventional Commit Plugin](https://plugins.jetbrains.com/plugin/13389-conventional-commit) - An IntelliJ plugin for writing conventional commits
