---
sidebar_current: "steps"
---

# Steps

Steps make up the wercker
[pipeline](/articles/introduction/pipeline.html) and can either be
executed in the [build](/articles/introduction/builds.html) or
[deploy](/articles/introduction/deploys.html) phase within the pipeline.

![image](http://f.cl.ly/items/2O3V2n3A1n2d3u3S363D/wercker_pipeline.png)

Examples of a **build step** are compilation of your code, running your
unit tests or performing
[jshint](https://github.com/wercker/step-jshint/).

A **deploy step** could be the synchronization of static assets, for
which we've created the [s3sync
step](https://github.com/wercker/step-s3sync/), that takes some Amazon
Web Services
credentials and bucket information and places these assets on Amazon S3.

You define your steps in the [wercker.yml](/articles/werckeryml) file
for your application. Taking the
abovementioned steps as examples, your **wercker.yml** would look as
follows:

``` yaml
box: wercker/python
services:
    - wercker/mongodb
build:
  steps:
    # execute jshint
    - jshint
deploy:
  steps:
    # Execute the s3sync deploy step, a step provided by wercker
    - s3sync:
        key_id: $AWS_ACCESS_KEY_ID
        key_secret: $AWS_SECRET_ACCESS_KEY
        bucket_url: $AWS_BUCKET_URL
        source_dir: build/
```

Steps can have parameters. Note that some options are optional and some
are required. Consult the **readme** of the step to see the available
parameters.

An example of a step with parameters:

    build:
      steps:
        - npm-install@1.0.5:
            package: jshint
            strict-ssl: false
        - npm-test

This will pass two options to the **npm install** step, `package` and `strict-ssl`.

Apart from predefined steps there is also the notion of **custom**, or
inline, steps

Custom build steps, which are basically bash scripts defined via the 'script' clause,
requiring **name** and **code** elements:

``` yaml
# A custom script step, name value is used in the UI
    # and the code value contains the command that get executed
    - script:
        name: echo python information
        code: |
          echo "python version $(python --version) running"
          echo "pip version $(pip --version) running"
```

This example echos back the **Python** and **pip** versions to us. Note
that the result of these commands area available in the wercker ui and
will be exposed as a build step under the name `echo python
information`.

#### after-steps

Wercker also has the notion of [after-steps](/articles/werckeryml/#after-steps) ideally suited for [notifications](/articles/werckeryml/notifications.html). See the subsection for [wercker.yml](/articles/werckeryml) for more information.

#### Changing the working directory

Some tools need to be in a certain directory to work, `bundle-install` for example will look for a Gemfile in the current directory and install the gems from that Gemfile. With wercker it is possible to change the working directory for all steps, it is not necessary for the steps developers to add extra code.

To change the working directory of a step you need to add a **cwd** element to the step. You can specify a relative path (relative from `$WERCKER_ROOT`) or a absolute path. Use of environment variables is possible.

``` yaml
build:
  steps:
    - bundle-install:
        cwd: src/
```

## Creating your own steps

You are also able to create your own steps.

Similar to applications or [boxes](/articles/boxes/), steps are defined through a single file called
`wercker-step.yml`.

Steps can be `deployed` to the wercker
directory, which is an index of both [boxes](/articles/boxes/) and steps.

Deploying your steps to the wercker directory allows not only **you** to
leverage these steps, but **others** as well.


* [Creating your own wercker steps](/articles/steps/create.html)

<!--You can explore the wercker directory for boxes [here](http://app.wercker.com/explore). -->

-------

<div class="authorCredits">
    <span class="profile-picture">
        <img src="https://secure.gravatar.com/avatar/d4b19718f9748779d7cf18c6303dc17f?d=identicon&s=192" alt="Micha Hernandez van Leuffen"/>
    </span>
    <ul class="authorCredits">

        <!-- author info -->
        <li class="authorCredits__name">
            <h4>Micha Hernandez van Leuffen</h4>
            <em>
                Micha is cofounder and CEO at wercker.
            </em>
        </li>

        <!-- info -->
        <li>
            <a href="http://beta.wercker.com" target="_blank">
                <i class="icon-company"></i> <em>wercker</em>
            </a>
            <a href="http://twitter.com/mies" target="_blank">
                <i class="icon-twitter"></i>
                <em> mies</em>
            </a>
        </li>

    </ul>
</div>

-------
##### last modified: July 11th, 2013
-------
