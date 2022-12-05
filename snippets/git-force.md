---
title: Git
description: Force push into a git repository
logo: "https://www.logolynx.com/images/logolynx/4f/4f5f6684ab7fb6b3f7be735e31803c84.png"
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