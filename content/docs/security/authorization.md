---
tags: authorization
---

## Authorization

On wercker everything you create, whether these are builds or applications, by default everything is private. The exception to this is your profile. The information shared on the profile by default is little more than the username and a link to your GitHub or Bitbucket profile.

Although an application is private by default, it can be made public. You can do this after adding the application to wercker: go to settings tab and tick the public app checkbox. On a public application logged in users (and anonymous users) can see builds, build steps list and build step detail (i.e. the log). Deploy targets and deploy information is not accessible. Keep in mind that even though a build step and the test log may be public, the actual code is not visible on wercker, except for stacktraces and/or other information displayed by the test tools.

To be specific: whether a user can access builds, build steps, view deploy logs or an applications is defined on the application level.


### Roles & permissions

There are three roles defined at this moment, with increasing amount of permissions these are:

1. build
2. build+deploy
3. admin

#### build

A user with build permissions can see builds, build steps together with its details, view deploy logs and can follow/unfollow applications. A note about deploy logs: some sensitive information may be visible in the deploy logs, but wercker allows some output to be hidden from the view.


#### build+deploy

A user with build+deploy permissions can do all things a user with build permissions can, but can also trigger deploys and create new deploy targets.

#### admin

Like the owner of a project, users with admin permissions can do the same as with build+deploy permissions and also:

* change settings on the project (set the application to public/private)
* change permissions for collaborators
* change the ownership of a project.