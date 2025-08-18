---
title: Git Force Push
description: Force push into a git repository
logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZD0iTTI1MS4xNyAxMTYuNiAxMzkuNCA0LjgyYTE2LjQ5IDE2LjQ5IDAgMCAwLTIzLjMxIDBsLTIzLjIxIDIzLjIgMjkuNDQgMjkuNDVhMTkuNTcgMTkuNTcgMCAwIDEgMjQuOCAyNC45NmwyOC4zNyAyOC4zOGExOS42MSAxOS42MSAwIDEgMS0xMS43NSAxMS4wNkwxMzcuMjggOTUuNHY2OS42NGExOS42MiAxOS42MiAwIDEgMS0xNi4xMy0uNTdWOTQuMmExOS42MSAxOS42MSAwIDAgMS0xMC42NS0yNS43M0w4MS40NiAzOS40NCA0LjgzIDExNi4wOGExNi40OSAxNi40OSAwIDAgMCAwIDIzLjMyTDExNi42IDI1MS4xN2ExNi40OSAxNi40OSAwIDAgMCAyMy4zMiAwbDExMS4yNS0xMTEuMjVhMTYuNSAxNi41IDAgMCAwIDAtMjMuMzMiIGZpbGw9IiNERTRDMzYiLz48L3N2Zz4="
tags: ["git"]
---

Following command will ignore the changes in remote and pushes the current changes
Ref: [Git Force Push](https://git-scm.com/docs/git-push#Documentation/git-push.txt---force)

```sh
git push --force origin <branch_name>
```

Prefer using `--force-with-lease` instead

```sh
git push --force-with-lease origin <branch_name>
```
