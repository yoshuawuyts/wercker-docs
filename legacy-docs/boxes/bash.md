# Creating your own boxes with Bash

In this guide we will showcase how to create your own `wercker box` via shell scripting.

Boxes are git repositories which are added to wercker, similar to applications. However,
instead of deploying these to the cloud, you `deploy` to the wercker
directory.

The wercker box we will be building in this guide is a box containing [RethinkDB](http://rethinkdb.com), an open source distributed database.

You can find the source of this box on
[GitHub](https://github.com/mies/box-rethinkdb).

## Getting started

Creating a bash based box is trivial; first create a `git repository` with just one file called `wercker-box.yml`.

Similar to the [wercker.yml](/articles/werckeryml) file, the `wercker-box.yml` is a definition for how your box should be provisioned.

Your `wercker-box.yml` file should look as follows:

``` yaml
name: rethinkdb
version: 0.0.1
inherits: wercker/ubuntu12.04-webessentials@0.0.3
type: service
platform: ubuntu@12.04
description: wercker box for rethinkdb an open source distributed database
keywords:
  - rethinkdb
  - opensource
  - noqsql
  - database
  - json
packages:
  - rethinkdb@1.6.1
script: |
  sudo add-apt-repository ppa:rethinkdb/ppa -y
  sudo apt-get update -y
  sudo apt-get install rethinkdb -y
  sudo mkdir -p /etc/rethinkdb/instances.d
  sudo -- sh -c "echo 'bind=all' > /etc/rethinkdb/instances.d/default.conf"
env:
  WERCKER_RETHINKDB_PORT: 28015
  WERCKER_RETHINKDB_HOST: $$HOST$$
  WERCKER_RETHINKDB_URL: $$HOST$$:28015
  WERCKER_RETHINKDB_VERSION: "1.6.1"
```

### The wercker-box.yml

Let's go over the `wercker-box.yml` file that sets up our box.

#### Name and version

The `name` and `version` clauses are simple enough to understand. Each time you want to deploy a new version of your box, make sure to bump the version number.

#### Inherits

We have inheritence for boxes and as such we inherit from a box called
[webessentials](https://github.com/wercker/box-ubuntu12.04-webessentials)
which is a base box with the most popular libraries for the web installed such as `curl`, `libxslt` and `git`. With regards to inheritance, you may want to keep
your boxes lightweight. Otherwise the result could be that packages will
conflict with each other in one way or another. It also results in your
boxes being sharp, and fitted for a single purpose, as opposed to a
blunt instrument.

#### Type

Next, we specify the `type` of our box which can either be `service` or `main`. The latter is used only for pure programming language oriented boxes.

#### Platform

The `platform` clause lets us specify the underlying host operating system. Currently wercker only supports `ubuntu 12.04`.

#### Description, keywords and packages

The `description`, `keywords` and `packages` tags allow us to add
metadata to our box, which will be added to the wercker directory.
Packages will lock the version of our box in the directory as well, so make sure to increment it when a new version of the underlying service is available.

#### Script

Finally, we actually create the script that will provision our box. We add the *personal package archive*, or PPA, for RethinkDB, after which we update our packages through `apt-get update`.
Next, we `apt-get install` RethinkDB.

We need to make RethinkDB listen to all interfaces (not just localhost). Each time we run a build we need to be able to connect to it, through environment variables. In RethinkDB this is done through a configuration file that needs to exists in `/etc/rethinkdb/instances.d` with the following contents:

```
bind=all
```

You can read more on this configuration file at RethinkDB's [documentation site](http://www.rethinkdb.com/docs/guides/startup/).

We write this this file to the correct path as a final step in the script clause.

#### Env

These environment variable are created in the `env` clause. We've defined env vars such as `WERCKER_RETHINKDB_HOST` to which we can connect from our applications.

<!--You can explore the wercker directory for boxes [here](http://app.wercker.com/explore).-->

### Adding your box to the wercker directory

Make sure to add your repository to wercker. If you need some guidance with this, see the [getting started guide for the web](/articles/gettingstarted/web.html), that will help you do so.

Add your wercker-box.yml to your git repository and push it to either GitHub or Bitbucket.

``` bash
git add wercker-box.yml
git commit -am 'added wercker-box.yml'
git push origin master
```

This should trigger a build, which should pass.

You need to deploy your box to the wercker directory, just like any other
application. As such, you also need to create a deploy target for the
directory, so let's do so.

Go to the `settings tab` and under the *Deploy targets* section click **add deploy target**, after which a dialog is presented.

![image](http://f.cl.ly/items/0n0g0C0W3e1o33322o2R/Screen%20Shot%202013-07-08%20at%203.54.58%20PM.png)

Pick **wercker directory** as a deploy target and give it a name (such as
'directory').

![image](http://f.cl.ly/items/222d453f1R2w1F3a3o1V/Screen%20Shot%202013-07-08%20at%203.55.20%20PM.png)

Now go to your green build and hit the deploy button. Keep in mind that this deployment process can take a while as wercker is actually provisioning your box.

![image](http://f.cl.ly/items/3E3s3m2f0y360Z3F3q2H/deploy-to-directory.jpg)

Your box should now be available in the directory!

Explore what is currently available in the [wercker
directory](http://app.wercker.com/#explore).
