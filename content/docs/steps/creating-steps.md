---
tags: steps, registry
---

## Creating steps

If you cannot find a step which solves your particular "problem" in the
[step registry](/learn/steps/04_step-registry.html), then you can create
your own step and publish it. Steps are similar to any other projects on
wercker but instead of deploying to a cloud provider, you deploy to the
step registry in order to make the step available.

To be able to publish a step, you first need a wercker application containing the following files:

* The project needs to include a `run.sh` file which is the entry-point of your step
* The project needs to include a step manifest file call `wercker-step.yml`

Though technically a step can be written in *any* language, we
recommended writing them in `bash` or in `golang`. The former is usually
installed on most Docker containers whereas the latter compiles to a
single binary. Both programming languages do not require any
dependencies or libraries to be present that might not be installed in
various Docker containers people use, making them quite portable. If you
do create a step in a different programming language, make sure to document this.

### The Step Manifest file

The step manifest file defines the configuration of your step. Below an example of a wercker step manifest which we'll go over:

```yaml
name: slack-notifier
version: 1.0.1
description: Posts wercker build/deploy status to a Slack channel.
keywords:
  - notification
  - webhook
  - slack
properties:
  url:
    type: string
    required: true
  channel:
    type: string
    required: false
  username:
    type: string
    required: false
  notify_on:
    type: string
    required: false
  icon_url:
    type: string
    required: false
```

```yaml
name: slack-notifier
```

The `name` field is the name of your step. In order to use your step you
would include your step as follows in your [wercker.yml](/docs/wercker-
yml/creating-a-yml.html) file:

```yaml
- <username>/<stepname>:
```

```yaml
version: 1.0.1
```

Step versions adhere to a [semantic version scheme](http://semver.org). In order to use a specific version, let's say version `1.0.1` you would do this as follows in your `wercker.yml`:

```yaml
- <username>/<stepname>@1.0.1:
```

When developing your steps make sure you bump the version number when
deploying your steps to the registry.

The `description` field is a sensible description of you step so other
users can quickly see what your step does.

```yaml
description: Posts wercker build/deploy status to a Slack channel.
```

The `keywords` field are tags to identify your step:

```yaml
keywords:
  - notification
  - webhook
  - slack
```

If your step needs parameters you specify these via the `properties`
field. This could be a URL you need to `POST` to or any other logic that
you need in the step you are creating.

```yaml
properties:
  url:
    type: string
    required: true
  channel:
    type: string
    required: false
  username:
    type: string
    required: false
  notify_on:
    type: string
    required: false
  icon_url:
    type: string
    required: false
```









### The run.sh file

The `run.sh` file contains the entrypoint your step logic. This could be
`bash` code in the `run.sh` file itself or the calling of a separate
program (for instance created in golang).

### The Readme

If a `README.md` is present in your step folder, the registry will display
this such that people can easily deduct what your step does and how to use it.

### Publishing your step

Publishing steps is done by `deploying` your step to the registry. To do so
create a project on wercker for your step as you would with any other project.
Next, add a deploy target but pick the *wercker directory".
You can now deploy succesful builds to the registry. Make sure to bump the
version number when you want to deploy a new iteration of your step.

You can check out the complete repository of the wercker slack
notification step on [GitHub](https://github.com/wercker/step-slack)

