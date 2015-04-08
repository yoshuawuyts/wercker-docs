---
sidebar_current: "werckeryml"
---

# wercker.yml

The `wercker.yml` file allows you to set up your wercker enviroment.

***
#### NOTE: Add your wercker.yml to your repository

You need to add this file to your project repository and push it to **git**.
Changes to the `wercker.yml` that are pushed will be picked up by **wercker** automatically.

Not sure if your `wercker.yml` is correct, please use our <a href="/articles/werckeryml/validate.html">validator</a>.
***

In this section we go through the details of setting up your build and deploy pipeline using the `wercker.yml` DSL.

* [Full working example](#example)
* [Basics](#basics)
* [Formatting](#formatting)
* [box](#box)
* [services](#services)
* [build](#build)
* [deploy](#deploy)
* [after-steps](#after-steps)
* [timeout](#timeout)

<a id="example"></a>
## Full working example

If you're eager to grasp the `wercker.yml` format, below an example file that includes all elements which are discussed below.

```yaml
box: wercker/ruby
services:
    - mies/rethinkdb
build:
    steps:
        # Execute the bundle install step, a step provided by wercker
        - bundle-install
        # Execute a custom script step.
        - script:
            name: middleman build
            code: bundle exec middleman build --verbose
deploy:
    steps:
        # Execute the heroku-deploy, heroku details can be edited
        # online at http://app.wercker.com/
        #- heroku-deploy

        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
    after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room-id: id
            from-name: name
```

<a id="basics"></a>
## Basics

This includes the box which is going to be used, any supporting
services, steps needed for the build and steps needed to do the deploy.
The most basic and default *wercker.yml* file is the following:

    box: wercker/default

This is a barebones ubuntu box with no support for a specific
programming environment. The default box can be the
[foundation](https://github.com/wercker/box-default) for
creating your own box.

<a id="formatting"></a>
## Formatting

Yaml is pretty strict with formatting and we advise everyone to use 4 spaces for indentation.

<a id="box"></a>
## box

The box section allows you to choose a box which will be used to run the builds and deploys. This item will contain a single reference to the box. The box will be prefixed by the owner and it can be postfixed with a "@" followed by a version. If no version is given, then the latest version will be used. The default blank box:

    box: wercker/default

A node.js box:

    box: wercker/nodejs

Use the latest version of a box called `nodejs` which is owned by the user wercker.

Here is a selection of wercker supported boxes:

    wercker/android
    wercker/dart
    wercker/default
    wercker/golang
    wercker/mongodb
    wercker/mysql
    wercker/nodejs
    wercker/php
    wercker/postgresql
    wercker/postgresql9.2
    wercker/python
    wercker/rabbitmq
    wercker/redis
    wercker/ruby
    wercker/rvm
    wercker/ubuntu
    wercker/ubuntu12.04-nodejs0.10
    wercker/ubuntu12.04-nodejs0.8
    wercker/ubuntu12.04-ruby1.9.3
    wercker/ubuntu12.04-ruby2.0.0
    wercker/ubuntu12.04-webessentials

You can visit the [wercker directory](http://app.wercker.com/#explore) for more boxes, created by us
and the community.

<a id="services"></a>
## services

The services section allow you to specify supporting boxes, like databases or queue servers. This item should contain an array of supporting boxes. The reference will be the same as to a main box. So it will be prefixed and can contain a version.

Example:

    box: wercker/ruby
    services:
        - wercker/mongodb
        - wercker/rabbitmq

This will load two services, `mongodb` and `rabbitmq`, both owned by `wercker` and both using the latest versions.

See [services](/articles/services/) for more information.

<a id="build"></a>
## build

The `build` section will contain all the configuration for the build pipeline.

### steps

The steps section will contain all of the steps which will used during a build. A step in it's simplest form is the name of a buildstep. It can optionally be postfixed with the version of the step.

Example:

    build:
      steps:
        - npm-install@1.0.5
        - npm-test

This build will be run with two steps, `npm install` and `npm test`, where `npm install` will be fixed on version 1.0.5 and `npm test` will use the latest version.

It's also possible to pass options to a step. Note that some options are optional and some are required. Consult the readme of the step to see the available steps.

Example:

    build:
      steps:
        - npm-install@1.0.5:
            package: jshint
            strict-ssl: false
        - npm-test

This will pass two options to the `npm install` step, `package` and `strict-ssl`.

# Example wercker.yml

```yaml
box: wercker/nodejs@0.0.10
services:
  - wercker/mongodb@0.0.1
  - wercker/rabbitmq
build:
  steps:
    - npm-install@1.0.5:
        strict-ssl: false
    - jshint:
        use_strict: true
        trailing_whitespace: false
    # A comment
    -  npm-test
    -  script:
        name: some simple test!
        code: |-
          echo "line 1"
          echo "line 2"
```
This `wercker.yml` file sets up a [nodejs box](https://app.wercker.com/#applications/51ac34f1df8960ba4500495a/tab/details) with [mongodb](https://app.wercker.com/#explore/boxes/wercker/mongodb/0.0.6) and [rabbitmq](https://app.wercker.com/#applications/51acf2a7c67e0560780006d2/tab/details) as services and executes a build pipeline consisting of [npm-install](https://app.wercker.com/#applications/51c829f23179be44780021ac/tab/details), [jshint](https://app.wercker.com/#applications/51c829ec3179be4478002179/tab/details), [npm-test](https://app.wercker.com/#applications/51c829f43179be44780021bd/tab/details), and a custom script that executes several **echos**. See the [builds section](/articles/introduction/builds.html) and [steps](/articles/steps/) section for more information.

<a id="deploy"></a>
## deploy

The `deploy` section will contain all the configuration for the [deployment](/articles/deployment/) pipeline.

### steps

The steps section will contain all steps which will be used during a deploy. A step in it's simplest form is the name of a deploystep. It can optionally be suffixed with the version of the step.

``` yaml
deploy:
    steps:
        # Execute the heroku-deploy, heroku details can be edited
        # online at http://app.wercker.com/
        - heroku-deploy

        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
```
The example above does a deploy to Heroku (the configuration data, such as the Heroku API can be filled in on the wercker website). It also syncs the `build/` folder, which could hold static assets to S3 using the [s3sync](https://app.wercker.com/#applications/51c82a063179be4478002245/tab/details) step.

See the [deployment](/articles/deployment/) and [steps](/articles/steps/) section for more information.

<a id="after-steps"></a>
## after-steps

Both a build and deploy pipeline can contain `after-steps`; steps that need to be executed after a build or deploy has either failed or passed. A good use-case for `after-steps` are [notifications](/articles/werckeryml/notifications.html) to an [IRC channel](https://app.wercker.com/#applications/51f2a14ddf5a46247c000cf7/tab/details) or [HipChat Room](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details), closing an issue on a project management system or sending out a newsletter after a succesful deploy.

Below an example example of leveraging the [hipchat-notify](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details) step to send a message after a deploy on wercker. We make use of the `after-steps` element to signify that the message has to be sent after the deploy.

``` yaml
deploy:
   after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room_id: id
            from-name: name
```

<a id="timeout"></a>
## Timeout

Wercker will stop the build if it doesn't generate any output for 5 minutes. It can be overriden by settings `no-response-timeout` to the number of minutes of your liking:

```yaml
box: wercker/golang
no-response-timeout: 10
build:
   ...
```
