---
tags: classic
---

## Classic wercker.yml

The classic wercker environment does not use Docker containers but has its
own marketplace with (user created) boxes. Read more about the new Docker stack [here](/docs/pipelines/stacks.html)

In this section we go through the details of setting up your build and deploy pipeline using the `wercker.yml`.

* [Full working example](#example)
* [Basics](#basics)
* [Formatting](#formatting)
* [box](#box)
* [services](#services)

### Full working example

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

### Basics

This includes the box which is going to be used, any supporting
services, steps needed for the build and steps needed to do the deploy.
The most basic and default *wercker.yml* file is the following:

    box: wercker/default

This is a barebones ubuntu box with no support for a specific
programming environment. The default box can be the
[foundation](https://github.com/wercker/box-default) for
creating your own box.

### Formatting

Yaml is pretty strict with formatting and we advise everyone to use 4 spaces for indentation.


### box

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

### services

The services section allow you to specify supporting boxes, like databases or queue servers. This item should contain an array of supporting boxes. The reference will be the same as to a main box. So it will be prefixed and can contain a version.

Example:

    box: wercker/ruby
    services:
        - wercker/mongodb
        - wercker/rabbitmq

This will load two services, `mongodb` and `rabbitmq`, both owned by `wercker` and both using the latest versions.

If you want to create your own boxes it is recommended to use the [Docker stack](/docs/pipelines/stacks.html) for this as opposed to the classic stack.