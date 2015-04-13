---
tags: slack, notifications
---

## Slack notifications

Wercker can send notifications on build or deploy events to your [Slack](http://slack.com) channel.

For notifications we leverage [after-steps](/docs/steps/after-steps.html) that are executed when a build
or deploy finishes.
Various notifications for Slack exist in the [step registry[(/docs/web-interface/step-registry.html), but below we showcase how to use one that wercker has created.
You define after-steps in your [wercker.yml](/docs/wercker-yml/creating-a-yml.html) either in your `build` or `deploy` pipeline (or both!).

``` yaml
    after-steps:
        - slack-notifier:
            url: $SLACK_URL
            channel: notifications
            username: werckerbot
            notify_on: "failed"
```

The `url` parameter is the [slack webhook](https://api.slack.com/incoming-webhooks) that wercker should post to.
You can create an *incoming webhook* on your slack integration page.
This url is then exposed as an environment variable that you create through the
wercker web interface as *deploy pipeline variable*.

The `channel` is the Slack chat room that you want the notifications you want to post to.
The `username` defines the name under which notifications should be posted.
Finally, the `notify_on` field specifies if you want to get notifications only on failed
builds or deploys.

Note we encourage to create a separate room for your notifications