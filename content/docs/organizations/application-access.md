---
tags: organizations
---

## Application access

An application that belongs to an organization only accepts teams as collaborators
and always has the **owners** team setup as **admin** collaborators.

![image](/images/collaborators.jpg)

A **team** uses the same permissions as a single collaborator, those permissions
are: `build + view deploys`, `build + deployment` and `admin`.
[Read more about permissons &rsaquo;](/docs/web-interface/roles-and-permissions.html)

Giving a team `admin` access means they are allowed to do the same type of
management on an application as the **owners** team. Meaning they can also
change the permission on a team or delete the application.
