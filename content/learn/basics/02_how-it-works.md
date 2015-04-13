## How it works

Wercker is centered around the notion of
[pipelines](/learn/pipelines/01_introduction.html). A pipeline is an
automated workflow that takes your code and executes a series of
[steps](/learn/steps/01_introduction.html) on it, the end result being an artifact.

In order to trigger these pipelines, wercker integrates with your source
control platforms. Each time you do a `git push` wercker gets a signal via the source
control platform that hosts your code that new code has been
committed. Wercker subsequently fetches this code and executes a pipeline
on it. Wercker currently supports either [GitHub](http://github.com) or
[Bitbucket](http://bitbucket.org).

> wercker is centered around pipelines

Once a pipeline completes it either has a *passed* or *failed* status.

![image](/images/how-it-works.png)

Once these steps have been completed your `build` has either passed or failed.
If all went well you are ready to deploy your application to platforms such as
[Heroku](http://heroku.com), [Amazon Web Services](http://aws.amazon.com) or
other deploy targets. Similar to the build phase, the deployment part of the
wercker [pipeline](/learn/pipelines/01_introduction.html) consists of [deploy
steps](/learn/deploy/01_introduction.html#deploy-steps).


Continuously repeating these steps allows you and your team to work in
small increments which are easier to debug and thus you are also
delivering value to your own customers at a rapid pace.

In the next sections we discuss the wercker *toolchain* which
encompasses a command line interface, a web interface and a desktop app.

[&lsaquo; Introduction](/learn/basics/01_introduction.html "nav previous basics")
[The wercker CLI &rsaquo;](/learn/basics/03_the-wercker-cli.html "nav next basics")
