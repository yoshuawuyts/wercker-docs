---
tags: deployment, autodeploy
---

## Auto deploy

Wercker supports auto-deployment, this means that a green build automatically gets deployed to a specified deploy target.

This is convenient for instance, for low-risk applications such as or to deploy to either a staging environment or feature branch environment. As such, wercker allows you to specify the [git branch](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging) that you want auto deployed.

Note with great power comes great responsibility, so be careful with what gets autodeployed to which environment.