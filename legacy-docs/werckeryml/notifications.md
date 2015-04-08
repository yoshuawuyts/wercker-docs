---
sidebar_current: "werckeryml-notifications"
---

# Adding notifications to your build and deploy pipelines

Through the [wercker.yml](/articles/werckeryml/) you are able to add notifications to your build and deploy pipelines on wercker. For instance, these notifications could send a message on a failed build or successful deploy. Wercker has the notion of an additional phase in the [wercker pipeline](/articles/introduction/pipeline.html), after build and deploy [steps](/articles/steps/), called `after-steps`, which can be used to execute steps after the build or deployment pipeline is finished. This makes them ideally suited for notifications.

Wercker currently support four types of notifications:

* [HipChat](#hipchat)
* [Campfire](#campfire)
* [Email](#email)
* [IRC](#irc)

You are also able to subscribe to a **build** or **deploy** feed using for instance [cctray](http://ccmenu.sourceforge.net). See the [cctray section](/articles/faq/ccmenu.html) for more information.

***
#### Note: feel free to fork these notifications and adapt as you see fit
***

<a id="hipchat"></a>
## HipChat

You can find the source code for this step on [GitHub](https://github.com/wercker/wercker-step-hipchat-notify)

Here is an example of an [wercker.yml](/articles/werckeryml/) for a typical Ruby application that leverages `after-steps`  for the build and deployment pipeline to send HipChat notifications.

``` yaml
box: wercker/ruby
build:
    steps:
        - bundle-install
        - script:
            name: rspec
            code: bundle exec rspec
    after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room-id: 628943
            from-name: wercker
deploy:
    steps:
        - heroku-deploy
    after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room-id: 628943
            from-name: wercker
```

The `room-id` variable is obviously the **id** for your HipChat room that you want to send the notifications to. The `from-name` is the name you want to designate to the send of the message, which defaults to **wercker**.

The `$HIPCHAT_TOKEN` can be set as an pipeline variable, which is available for the build pipeline, as well as the deployment pipeline.

![pipeline variables](http://f.cl.ly/items/0f1H0H212O0Q0d3t383R/pipeline-variables.png)

_note: this is not my real token!_

View the available options below:

#### required

* `token` - Your HipChat token.
* `room-id` - The id of the HipChat room.

#### optional

* `passed-message` - Use this option to override the default passed message.
* `failed-message` -  Use this option to override the default failed message.
* `from-name` - Use this option to override the name that will appear in the room as sender. Default is `wercker`.
* `on` - Possible values: `always` and `failed`, default `always`

You can create HipChat tokens on the [API tokens](https://www.hipchat.com/admin/api) page.

Check out our HipChat step in the [wercker directory](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details).

<a id="campfire"></a>
## Campfire

You can find the source code for this step on [GitHub](https://github.com/wercker/wercker-step-campfire-notify)

Here is an example of an [wercker.yml](/articles/werckeryml/) for a Ruby application that leverages `after-steps`  for the build pipeline and sends notifications to a Campfire room after builds.

``` yaml
box: wercker/ruby
build:
    steps:
        - bundle-install
        - script:
            name: rspec
            code: bundle exec rspec
    after-steps:
        - campfire-notify:
            token: $CAMPFIRE_TOKEN
            room-id: id
            subdomain: campfiresubdomain
```

The `room-id` variable is obviously the **id** for your Campfire room that you want to send the notifications to.

The `$CAMPFIRE_TOKEN` can be set as an pipeline variable, which is available for the build pipeline, as well as the deployment pipeline. The `subdomain` is the subdomain for your campfire room.

![image](http://f.cl.ly/items/1R0L3O0c0m3t2p1N0F2M/Screen%20Shot%202013-08-05%20at%201.20.40%20PM.png)

_note: this is not my real token!_

View the available options below:

#### required

* `token` - Your Campfire token.
* `room-id` - The id of the Campfire room.
* `subdomain` - The Campfire subdomain.

#### optional

* `passed-message` - Use this option to override the default passed message.
* `failed-message` -  Use this option to override the default failed message.
* `on` - Possible values: `always` and `failed`, default `always`

Check your info/account page on your Campifre for your API token that you can use as the above mentioned environment variable.

View our Campfire step in the [wercker directory](https://app.wercker.com/#applications/51f2a3e8df5a46247c000e0d/tab/details).

<a id="email"></a>
## Email

To make use of the [Email-Notify step](https://app.wercker.com/#applications/52b3132e0a0076c9780036ff/tab/details) which we've open sourced [here](https://github.com/wercker/step-email-notify), you would create a [wercker.yml](http://devcenter.wercker.com/articles/werckeryml/) file in the following way:

``` yaml
box: wercker/ruby
build:
    steps:
        # Execute the bundle install step, a step provided by wercker
        - bundle-install
        # Execute a custom script step.
        - script:
            name: middleman build
            code: bundle exec middleman build --verbose
    after-steps:
        - wercker/email-notify:
            from: alerts@wercker.com
            to: example@example.com
            username: $USER
            password: $PASS
            host: YOURSMTPSERVER
```

The wercker/email-notify step is self-explanatory; the **from** and **to** addresses are the email addresses from which you want to send the message and of course to whom. The **username** and **password** fields are the credentials for your SMTP server. We of course pass these along as pipeline environment variables as opposed to hardcoding them. Finally, you also fill in your SMTP **host**.

View the available options below:

#### required

* `from` - From address.
* `to` - To address.
* `host` - The host of your SMTP server.
* `username` - The username for your SMTP server.
* `password` - The password for your SMTP server.

#### optional

* `passed-subject` - Use this option to override the default passed subject.
* `failed-subject` -  Use this option to override the default failed subject.
* `passed-body` - Use this option to specify the passed body.
* `failed-body` -  Use this option to specify the failed body.
* `on` - Possible values: `always` and `failed`, default `always`


Check out our Email Notify step in the [wercker directory](https://app.wercker.com/#applications/52b3132e0a0076c9780036ff/tab/details). We've open sourced the code for this step as well on [GitHub](https://github.com/wercker/step-email-notify)

<a id="irc"></a>
## IRC

You can find the source code for this step on [GitHub](https://github.com/wwwouter/wercker-step-irc-notify)

Here is an example of a [wercker.yml](/articles/werckeryml/) file, that makes use of the [IRC Notify Step](https://app.wercker.com/#applications/51f2a14ddf5a46247c000cf7/tab/details) to send messages to an IRC room on passed or failed builds.

```yaml
box: wercker/ruby
build:
    steps:
        - bundle-install
        - script:
            name: middleman build
            code: bundle exec middleman build
    # use IRC NOTIFY Step
    after-steps:
     - wouter/irc-notify:
        server: irc.freenode.net
        port: 6667
        nickname: wercker
        channel: wercker-dev
```

As you can see in the `after-steps` clause, we make use of the `wouter/irc-notify` step, as [wouter](https://app.wercker.com/#wouter) created this notifier. We fill in the server we wish to connect to, which port and under which **nickname** we want to publish the message. Finally, we declare to which irc **#channel** you want to post the message to.

View the available options below:

#### required

* `server` - The hostname or ip address of the IRC server.
* `port` - The port of the IRC server.
* `nickname` - The nickname of the user that sends the message.
* `channel` - The channel that the message will be send to. Do not include '#' sign.

#### optional

* `passed-message` - Use this option to override the default passed message.
* `failed-message` -  Use this option to override the default failed message.
* `on` - Possible values: `always` and `failed`, default `always`

And now you have IRC notifications on your builds and deploys, as can be seen below:

![image](http://f.cl.ly/items/2e3y2M2E1r2Q0g3M1u44/Screen%20Shot%202013-08-13%20at%206.49.38%20PM.png)
