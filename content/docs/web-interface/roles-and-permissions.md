---
tags: example
---

## Roles & permissions

There are three roles defined at this moment, with increasing amount of permissions these are:

1. build + view deploys
2. build + deployment
3. admin

### Build + view deploys

A user with **build + view deploys** permissions can see builds, build steps together with its details, view deploy logs and can follow/unfollow applications. A note about deploy logs: some sensitive information may be visible in the deploy logs, but wercker allows some output to be hidden from the view.


### Build + deployment

A user with **build + deployment** permissions can do all things a user with **build + view deploys** permissions can, but can also trigger deploys and create new deploy targets.

### Admin

Like the owner of a project, users with admin permissions can do the same as with **build + deployment** permissions and also:

* change settings on the project (set the application to public/private)
* change permissions for collaborators
* change the ownership of a project
* delete the application
