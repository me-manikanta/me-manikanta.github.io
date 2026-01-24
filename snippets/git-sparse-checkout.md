---
title: Git Sparse Checkout
description: Checkout only specific files or directories in a git repository
logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZD0iTTI1MS4xNyAxMTYuNiAxMzkuNCA0LjgyYTE2LjQ5IDE2LjQ5IDAgMCAwLTIzLjMxIDBsLTIzLjIxIDIzLjIgMjkuNDQgMjkuNDVhMTkuNTcgMTkuNTcgMCAwIDEgMjQuOCAyNC45NmwyOC4zNyAyOC4zOGExOS42MSAxOS42MSAwIDEgMS0xMS43NSAxMS4wNkwxMzcuMjggOTUuNHY2OS42NGExOS42MiAxOS42MiAwIDEgMS0xNi4xMy0uNTdWOTQuMmExOS42MSAxOS42MSAwIDAgMS0xMC42NS0yNS43M0w4MS40NiAzOS40NCA0LjgzIDExNi4wOGExNi40OSAxNi40OSAwIDAgMCAwIDIzLjMyTDExNi42IDI1MS4xN2ExNi40OSAxNi40OSAwIDAgMCAyMy4zMiAwbDExMS4yNS0xMTEuMjVhMTYuNSAxNi41IDAgMCAwIDAtMjMuMzMiIGZpbGw9IiNERTRDMzYiLz48L3N2Zz4="
tags: ["git"]
---

Sparse checkout allows you to check out only a subset of files from the repository working copy. This is useful for large repositories where you only need to work on a specific part of the project.

### Clone with sparse checkout

The most common way is to clone with sparse checkout enabled. This is where you specify the **repository URL**.

```sh
git clone --filter=blob:none --sparse <repository_url>
cd <repository_name>
git sparse-checkout set <dir_to_checkout>
```

### Existing Repository

If you are already in a repository and want to enable sparse checkout:

```sh
git sparse-checkout init --cone
```

### Set directories to checkout

Define which directories you want to include in your working copy:

```sh
git sparse-checkout set <dir1> <dir2> ...
```

### Add directories

To add more directories to the current set:

```sh
git sparse-checkout add <dir3>
```

### List current configuration

See what is currently checked out:

```sh
git sparse-checkout list
```

### Disable sparse checkout

To return to a full checkout:

```sh
git sparse-checkout disable
```
