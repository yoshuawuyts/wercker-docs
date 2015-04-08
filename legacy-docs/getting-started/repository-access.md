---
sidebar_current: "gettingstarted-repositoryaccess"
---

# Repository access

Wercker needs to be able to check out the code from your source control provider.
Currently, both GitHub and Bitbucket are supported. This article describes how we
retrieve the code and the various methods of how to set up repository access. If you have a public
repository then you can skip to the public repository section.

## SSH Keys

Currently wercker uses an SSH key pair to check out code. We provide a public SSH
key which should be authorized to access the repository. Then, we use the private
SSH key to check out the code. There are a couple of ways to give authorization
to a public key; each of the methods have some advantages and disadvantages over
the others.

### Deploykeys

The first method is to add the SSH key to the repository as a deploy key. A
deploy key is an SSH key that is associated with a single repository. The advantage
of this method is that we only get access to that single repository. However,
this also means that we're unable to check out any submodules (it is only possible
to add an SSH key to a single repository).

More information:

- [Deploy keys in GitHub](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys)
- [Deploy keys in Bitbucket](https://confluence.atlassian.com/display/BITBUCKET/Use+deployment+keys)

### Machine users

The second method is to add the SSH key to a user on GitHub or Bitbucket. This
allows you to add more than 1 repositories to a single SSH key. Most of the time
these users are just used for authorization and don't have a real person using
it. This is why they are called "machine users". The advantage of this method is
that you'll be able to add multiple authorizations to a single SSH key.
The disadvantage is that it requires more management.

More information:

- [Machine user on GitHub](https://developer.github.com/guides/managing-deploy-keys/#machine-users)

### Picking the right method

For repositories that do not use a private submodule we recommend using a deploy
key. If you have a repository that uses private submodules, than you need to
create a machine user, and authorize this user access to all repositories.

## Public repositories

For public repositories, you do not have to add a deploy key or authorize a
machine user. You just have to make sure that you selected the "public repository"
option in the "repository access" configuration.

## Werckerbot

If you've created your application after September 4th, 2014, then you can skip
this section. However, if you created your application before September 4th 2014, then you
need to migrate to the new flow. This is also applicable to public repositories,
that never added werckerbot.

You need to go to the settings page of your application; here you can find the
repository access section. This wizard will migrate you from using werckerbot to using
an SSH key pair. Read the above sections to see which method you can select.
The wizard is similar to the add application flow presented in [this section](/articles/gettingstarted/web.html).

![image](/images/articles/gettingstarted/repository_access.png)

Once you've changed the key, you should remove werckerbot from your organisation teams
or the access management sections.

We're keeping wercker-bot around till 01-01-2015, than we will remove
werckerbot. So make sure you migrate before that time to prevent any downtime.
