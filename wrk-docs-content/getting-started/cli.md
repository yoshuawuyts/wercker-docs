---
sidebar_current: "gettingstarted-cli"
---

# Getting Started with the wercker command line interface

This guide will walk you through creating your first application on wercker using the command line interface (CLI). You can install the cli via `pip install wercker`. Please see the [specific CLI documentation](/articles/cli "The wercker command line interface") for more.

As previously mentioned, we have created five separate Getting Started repositories in
[Ruby](https://github.com/wercker/getting-started-ruby), [Python](https://github.com/wercker/getting-started-python), [Node.js](https://github.com/wercker/getting-started-nodejs), [PHP](https://github.com/wercker/getting-started-php) and [Go](https://github.com/wercker/getting-started-golang).

We assume you have registered for a [wercker account](https://app.wercker.com/users/new) and have a Heroku account.

***
##### NOTE: at this moment we are in beta, you need to have access to Heroku's beta program to complete this guide.
***

### Fork the Repository

The first step is to fork one of the above mentioned repositories and clone it to your local machine.

### Add Project

Go to the repository on your machine and run `wercker create`. This should result in an output similar to this:

``` bash
$ wercker create
-----------------------
welcome to wercker-cli
-----------------------

About to create an application on wercker.

This consists of the following steps:
1. Configure application
2. Setup keys
3. Add a deploy target (0 heroku targets detected)
4. Trigger initial build

Step 1. Configure application
-------------

1 repository location(s) found...

Please choose one of the following options:
 (1) git@github.com:USERNAME/REPOSITORY.git
Make your choice (1=default):
```

The wercker create wizard will pause here, to allow you to catch up with what it is about to do. Since my repository has only one remote location (GitHub), pressing enter or input 1 will suffice. After which the wizard will continue:

```bash
github repository detected...
Selected repository url is git@github.com:wercker/USERNAME/REPOSITORY.git


Step 2.
-------------
In order to clone the repository on wercker, an ssh key is needed. A new/unique
key can be generated for each repository. There 3 ways of using ssh keys on
wercker:

1. Automatically add a deploy key [recommended]
2. Use the checkout key, wercker uses for public projects.
3. Let wercker generate a key, but allow add it manually to github/bitbucket.
(needed when using git submodules)

For more information on this see: http://devcenter.wercker.com/articles/gettingstarted/repositoryaccess.html

Options:(enter=1):
Retrieving a new ssh-key.
done.
Adding deploy key to repository:
Creating a new application
done.

In the root of this repository a .wercker file has been created which enables the link between the source code and wercker.


Step 3.
-------------

0 automatic supported target(s) found.

Step 4.
-------------

Triggering a new build.
done.

Done.
-------------

You are all set up to for using wercker. You can trigger new builds by
committing and pushing your latest changes.

Happy coding!
```

Note: wercker will check if you have configured repository access correctly. For more information see the [repository access section](/articles/gettingstarted/repositoryaccess.html)

### List & monitor builds

This all that's needed to add a application to wercker. But there are some handy commands we can do while we are waiting for the build to complete (or go to the website). The first one is `wercker queue`, which lists all jobs that still need to be done for this application. This can be both builds as well as deploys.

``` bash
$ wercker queue
-----------------------
welcome to wercker-cli
-----------------------

Retreiving list of unfinished builds.
Retreiving builds from wercker...
Found 1 result(s)...

┌─────────┬──────────┬────────┬──────────┬───────────────────┬─────────────────┐
│ result  │ progress │ branch │ hash     │ created           │ message         │
├─────────┼──────────┼────────┼──────────┼───────────────────┼─────────────────┤
│ unknown │ 50.0%    │ master │ ada9bd93 │ 05/02/13 13:37:53 │ badge update... │
├─────────┼──────────┼────────┼──────────┼───────────────────┼─────────────────┤

Retreiving list of deploy targets...

No deploy targets found.
```

The second command is `wercker builds` which lists the 5 latest builds (including both finished and unfinished ones).

``` bash
$ wercker builds
-----------------------
welcome to wercker-cli
-----------------------

Retreiving builds from wercker...
Found 2 result(s)...

┌────────┬──────────┬────────┬──────────┬───────────────────┬─────────────────┐
│ result │ progress │ branch │ hash     │ created           │ message         │
├────────┼──────────┼────────┼──────────┼───────────────────┼─────────────────┤
│ passed │ 100.0%   │ master │ ada9bd93 │ 05/02/13 13:37:53 │ badge update... │
├────────┼──────────┼────────┼──────────┼───────────────────┼─────────────────┤
│ passed │ 100.0%   │ master │ 3de45ff9 │ 05/02/13 13:17:10 │ added badge     │
├────────┼──────────┼────────┼──────────┼───────────────────┼─────────────────┤
```

### Add a deploy target

You are now ready to deploy this application to the Cloud. For this guide we will walk you through a deploy on [Heroku](http://heroku.com) a popular platform-as-a-service provider.

***
##### note: See the [Heroku guide](/articles/deployment/heroku.html) in the deployment section for a more heroku centric explanation.
***

We first create a new app on heroku, by running `heroku create`

``` bash
$ heroku create
Creating secret-bastion-2817... done, region is us
http://secret-bastion-2817.herokuapp.com/ | git@heroku.com:secret-bastion-2817.git
Git remote heroku added
```

Add the wercker addon to your new heroku application and run `wercker targets add`

```bash
$ heroku addons:add wercker
Adding wercker on secret-bastion-2817... done, v2 (free)
Use `heroku addons:open wercker` to get started.
Use `heroku addons:docs wercker` to view documentation.

$ wercker targets add
-----------------------
welcome to wercker-cli
-----------------------

Heroku remote git@heroku.com:secret-bastion-2817.git selected.
Heroku deploy target secret-bastion-2817 successfully added to the wercker applicaiton
```


### Deploy

You can now run `wercker deploy` and wercker will deploy your application!
