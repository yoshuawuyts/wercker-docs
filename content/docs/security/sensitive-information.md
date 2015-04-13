---
tags: security
---

## Security and sensitive information

One of the concerns people may have when they start using wercker for Continuous Integration is whether other people can see or access their source code. In this article we will look at some of the authorization aspects on wercker and a bit at technology behind wercker.

## Sensitive information in wercker
Before describing in details what is visible to who, let's take a look first at how to prevent sensitive information to be accessible to the wrong people via wercker. There are four main areas where sensitive information may be visible:

1. In the source code.
2. In the logs of tests.
3. In the deploy logs.
4. In the deploy settings.

### The source code

Wercker provides no access to the source code of an application. Your source code is handled by specific testing servers who clone your code and run your tests in separate containers who are setup and destroyed for each build. The resulting build artefacts are stored, accessible only for wercker servers, up to 3 months for use during deployment.

### Test logs

Maybe your code contains that default password you should change, or there's other information you don't want to have in your test logs. Wercker offers some tools to help you: you can hide output of commands by setting the log value to false. See the [wercker.yml](/docs/wercker-yml/creating-a-yml.html) article for more details.

### Deploy logs

Since wercker allows you to set environment variables for configuring deploy specific information, there's a chance sensitive information can end up in the deploy log. To prevent this from happening, we've added a "hidden from log" checkbox for each your environment variable you define.

### Deploy settings

Deploy settings are the most specific details for your deployment, only people with sufficient permissions can access these on an application. To be specific: users with write permissions or admin roles. The difference between these roles will be described later.

### Summary

At wercker we take security seriously and have some new features planned. If you have any questions or suggestions, don't hesitate to <a href="mailto:pleasemailus@wercker.com">contact us</a>.
