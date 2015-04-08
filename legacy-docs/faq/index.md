---
sidebar_current: "faq"
---

# FAQ

### Can anybody see my source code? ###
No, see our [security](/articles/introduction/security.html) section for more details.

### Why can't I add any public repository to wercker?
wercker needs to have some additional rights to the repository so it can:

* receive events when new code is added to the repository.
* so it can use things such as the status api for GitHub

If you want to run tests on a public/open source library, but have no permissions on the project: you could fork it and add that project to wercker.

<a id="nobuilds"></a>
### When I `git push` my code, builds aren't triggered on wercker.

First make sure the push isn't for a ignored branch. Currently it's not possible to change ignored branches. The only ignored branch is `gh-pages` for GitHub repositories.

**This issue is discussed in detail in the [Webhook section](/articles/faq/webhooks.html).** The summary is as follows:

It is probably the case that you have added an application to wercker of which you are not the owner/admin on GitHub, just a collaborator.
As a collaborator you are not allowed to set the webhooks on your repository that wercker needs for triggering builds.

To clarify, if user A is collaborator on the repository of user B (the owner account). A is not allowed to set hooks, only B is.

There are two solutions:

1. You can change the user B account on GitHub to an organisation account. This would allow you to not be a collaborator on the repository of user B, but an administrator. Which has the rights to set an hook.

2. User B (the owner account) adds the application to wercker and makes you a team member at wercker.

We're sorry about this, but GitHub's permission model isn't fine-grained enough to make this work out of the box.

**Please see the [Webhook section](/articles/faq/webhooks.html) for more information.**

### What happens to my code when I run a build?
Simplified we:

1. do a checkout your code and parse the wercker.yml.
2. Based on the wercker.yml and an analyzis of the code, boot up virtual machines in a sandboxed environment.
3. install additional software, packages and or libraries.
4. Run the tests inside the sandboxed environment
5. Teardown and destroy the sanboxed environment.
6. remove your code.

For more details see the [builds](/articles/introduction/builds.html) page

### Can you add support for X?
If you feel we should support a certain service (for instance memcached) or language, feel free to [contact](mailto:pleasemailus@wercker.com) us.

### Is there a public api with documentation for wercker?
We are currently working on our api and are planning to release an api with documentation as soon as we are ready.

### I have collaborators on Heroku but they don't have access?
We are working on that and hope to release it soon.
