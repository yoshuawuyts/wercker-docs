# Heroku
This article deals with the wercker Heroku add-on, available on their [Marketplace](https://addons.heroku.com/wercker). The documentation for this add-on can also be found on [Heroku's Devcenter](https://devcenter.heroku.com/articles/wercker?preview=1).

****
##### note: you are also able to deploy to Heroku from wercker without the add-on
****
<br />

- [How does it work?](#how)
- [Requirements](#requirements)
- [Provisioning the add-on](#provisioning)
- [Local Setup](#localSetup)
- [Your first build and deploy](#buildAndDeploy)
- [Supported Languages and Services](#supportedLanguages)
- [Removing the add-on](#removing)

<a id="how"></a>
## How does it work?

Visually, the flow for wercker is as follows:

<p>
<a href="http://f.cl.ly/items/24352w223K2v142I1Y1V/heroku_flow.jpg" target="_blank"><img src="http://f.cl.ly/items/24352w223K2v142I1Y1V/heroku_flow.jpg" width="100%"></a>
</p>

Wercker connects with your GitHub or Bitbucket repository. Each time you do a `git push` wercker receive a signal that new code has been created and wil subsequently start running your tests in a sand-boxed environment. If your build is green, you are ready to deploy your application to Heroku. Through the Heroku add-on you get a concise dashboard with an overview of your builds and deploys.


****
##### NOTE: Having a separate repository on a version control platform such as GitHub is a requirement of using wercker.
****

<a id="requirements"></a>
## Requirements

- A Heroku account and application.
- A remote git repository for your application. Wercker supports GitHub and Bitbucket.
- Python and pip to install the wercker command-line interface

<a id="provisioning"></a>
## Provisioning the add-on
Wercker can be added to your application using the Heroku CLI:

    $ heroku addons:add wercker
    Adding wercker on sharp-mountain-4005... done, v7 (free)
    Use `heroku addons:open wercker` to get started.
    Use `heroku addons:docs wercker` to view documentation.

Next, open the wercker wizard by running the following command:

    $ heroku addons:open wercker

This wizard will guide you through the steps needed to run your first build on wercker.

<a id="localSetup"></a>
## Local Setup

Wercker comes with a command line interface that you can install by running:

    $ pip install wercker

****
##### NOTE: Wercker assumes that you already have a repository on GitHub or Bitbucket with pushed code and have created a Heroku application.
****

The CLI helps you interact with the wercker platform. Run the following command to link your application with wercker:

    $ wercker create

You will receive the following response

    -----------------------
    welcome to wercker-cli
    -----------------------

    Searching for git remote information...
    Found 1 repository location(s)...

    Please choose one of the following options:
     (1) git@github.com:mies/ruby-sample.git
    Make your choice (1=default):

As mentioned above, if you now run `heroku addons:open wercker` or go to the Heroku dashboard and click on the wercker resource, you will see the wercker wizard that will guide you through your build and deploy.

****
##### NOTE: In order to run your tests you need to configure [access](/articles/gettingstarted/web.html)
****

<a id="buildAndDeploy"></a>
## Your first build and deploy

If all went well your first build is triggered after you've succesfully run `wercker create`. Upon any subsequent `git push` commands wercker gets triggered and will run your a build.

You are now ready to deploy your build to Heroku, if it passed of course. You can deploy your build in two ways:

- Through the command line interface via the `wercker deploy` command. The CLI will ask which build you want to deploy to which target (you could after all, have multiple Heroku applications)
- Through the wercker wizard. As said, running `heroku addons:open wercker` will open the dashboard and you are now ready initiate your first deploy. See below:

<p>
<a href="https://app.wercker.com/public/images/heroku_dashboard.jpg" target="_blank">
<img src="https://app.wercker.com/public/images/heroku_dashboard.jpg" width="100%">
</a>
</p>

<a id="supportedLanguages"></a>
## Supported Languages and Services

Wercker currently supports Node.js, Python and Ruby. In terms of services like databases and queues, wercker has support for Postgres, MySQL, MongoDB, RabbitMQ, and Redis. See the [services section](/articles/services/) on how to specify any of these.

<a id="removing"></a>
## Removing the add-on

Wercker can be removed via the  CLI.

<div class="warning" markdown="1">This will delete the Heroku deploy target data on wercker and cannot be undone!</div>

    $ heroku addons:remove wercker
    -----> Removing wercker from sharp-mountain-4005... done, v1 (free)

This removes both the wercker addon from your Heroku application and the Heroku deploy target on wercker.
