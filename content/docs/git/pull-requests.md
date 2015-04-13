---
tags: git, pullrequests
---

## Pull requests

This article explains how pull requests work on wercker.

### How does wercker handle GitHub pull requests?

Wercker builds against the HEAD of the pull request branch and
integrates with the build status API of GitHub. 

Changes in the target branch are therefore not applicable to the builds. 
If the pull request initiator however adds a new commit to the PR (or
rebases on the target branch) then this commit will be built again on
wercker.

Finally, any merged pull request will result in a new commit and thus in a new build.
