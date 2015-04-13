---
tags: email, notifications
---

## Email notifications

Wercker has built-in support for email notifications. This means you
do not have to define a custom [after-step](/docs/steps/after-steps.html) to get emails on failing or
passing builds.

Built-in email notifications are systemwide however, and cannot be tuned on an
application-level.

In order to use email notifications you go to your profile settings and
select the *email* option.

Here you can fill in the email address you want to get notifications on.

You can also specify the granularity of emails. Wercker can send emails for
builds, deploys and collaborator changes as well as either failed or passed builds.

Note that if you don't want to receive email anymore you can hit the *off* switch
to turn off email entirely.