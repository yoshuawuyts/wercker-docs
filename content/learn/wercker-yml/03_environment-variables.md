## Environment variables

Often times an application needs specific information during a build or
deploy. This could be an IP address for a server, a secret token or an
SSH key pair.

This type of information is either unique for each server you want to
deploy to, or maybe too sensitive to store in the git repository. Wercker supports a number
of ways to store and expose this data as environment variables.

> wercker can store sensitive information as environment variables that
> are available during pipeline runs

If you want to know which environment variables are available during a build
or deploy, look at the `Setup Environment` step of your [pipeline](/learn/pipelines/01_introduction.html) run.

Environment variables can be *global* and as such are available
during both build and deploy pipelines. Typically, these are used to store API tokens for
[after-steps](/learn/steps/03_after-steps.html) that post build and
deploy notifications in chatrooms such as Slack.

>Global variables are called pipeline variables and can be set in the settings
tab of your application.

The second set of variables are specific to deploy targets, and can only be set
directly on the deploy target. Typically, these are used to store information
such as hostnames, ssh-keys, passwords and more.

- - -
> Want to learn more? Read more about using environment variables
> [docs](/docs/environment-variables/index.html)

[&lsaquo; Sections](/learn/wercker-yml/02_sections.html "nav previous yml")
[Creating a yaml &rsaquo;](/learn/wercker-yml/04_creating-a-yml.html "nav next yml")
