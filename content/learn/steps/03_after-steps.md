## After steps

Both a build and deploy pipeline can contain `after-steps` steps that need to be executed after a build or deploy has either failed or passed.

A good use-case for `after-steps` are *notifications* to a chat room, closing an issue on a project management system or sending out a newsletter after a succesful deploy.

Below is an example example of leveraging a [Slack notification](https://github.com/wercker/step-slack) step to send a message after a deploy on wercker. We make use of the `after-steps` element to signify that the message has to be sent after the deploy has either failed or passed

```yaml
deploy:
    after-steps:
        - slack-notifier:
            url: $SLACK_URL
            channel: notifications
            username: myamazingbotname
```

[&lsaquo; Using steps](/learn/steps/02_using-steps.html "nav previous steps")
[Step registry &rsaquo;](/learn/steps/04_step-registry.html "nav next steps")
