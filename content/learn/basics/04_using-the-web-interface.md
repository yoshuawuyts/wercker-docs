## Using the web interface

The wercker web interface lets you add and manage your applications.
It also allows you to create and deploy workflows, add team members and see
an overview of both your build and deploy pipeline executions.

### Features

The *feed* tells you what is going on with the applications that you're a
part of. Which build failed, who of your team is deploying what to which
environment and who has been added to which project. It is a timeline of
your applications' activity.


![image](/images/feed-add-app.png)

The *add application wizard* allows you to add either repositories from
GitHub or Bitbucket. If these repositories are private, the wizard gives
your various option for enabling wercker to access these repositories.

The *application page* shows a live view of your
[builds](/learn/build/01_introduction.html) and
[deploys](/learn/deploy/01_introduction.html). Within the *settings tab* you can
control various aspects of your application; invite team members, set up deploy
targets and create [environment variables](/learn/wercker-yml/03_environment-
variables.html) for your [pipelines](/learn/pipelines/01_introduction.html).

![image](/images/app-stats.png)

Each application also contains a statistics section that shows a
graphical overview of the distribution of sucessful versus failed builds
and deploys, and who are the top builders within your team.

A specific build page for an application shows the steps that were
run for that *pipeline execution*, and of course if this build has passed or
failed.

![image](/images/build-deploy.png)

The deploy page has a similar overview for deploy pipelines that are
run for specific deploy targets.

- - -
> Want to learn more? Read more about using the web interface
> [docs](/docs/web-interface/index.html)

[&lsaquo; The wercker CLI](/learn/basics/03_the-wercker-cli.html "nav previous basics")
[The desktop app &rsaquo;](/learn/basics/05_the-desktop-app.html "nav next basics")
