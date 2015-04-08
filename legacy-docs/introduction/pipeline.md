---
sidebar_current: "introduction-pipeline"
---

# The wercker pipeline
Wercker has the notion of a **pipeline**; a set of **steps** and phases aimed at delivering your application.

![image](http://f.cl.ly/items/2O3V2n3A1n2d3u3S363D/wercker_pipeline.png)

In the following paragraphs we will describe the elements that make up the wercker pipeline.

### Table of contents

* [Builds](#builds)
* [Git Push](#gitpush)
* [Box](#box)
* [Services](#services)
* [Environment Variables](#envvars)
* [Steps](#steps)
* [Package](#package)
* [Deploys](#deploys)
* [Triggering your deploy](#trigger)

<a id="builds"></a>
## Builds

Builds are the result of a run-through of the steps in the wercker pipeline. If builds are succesful they produce a deployable package. You can define the steps in the wercker pipeline through the
[wercker.yml](/articles/werckeryml) file.

![image](http://f.cl.ly/items/3S1e1Q2U462j0V0Z1e3V/wercker_pipeline_build.png)

Every push to your git repository triggers a build. The pipeline is
executed inside a sandboxed environment that consists of a box and
additional [services](/articles/services/), such as databases or message queues.

If all steps in the pipeline are succesful, a build has passed.

The outcome of a successful build is packaged and stored, readying it for deployment.

<a id="gitpush"></a>
### Git Push

Each `git push` to a git repository that is added to wercker will trigger a new
build, regardless of the branch. This means that wercker builds every branch.
Wercker will start by cloning your repository via an private SSH key. Wercker
uses an SSH key to checkout the code to run a build. For private projects you
need to add a public SSH key as a deploy key to your repository, or you can add
this public SSH key to an user which has acces to the repository. For public
repositories you don't have to add a public SSH key, you just need to make sure
you selected the public repository option in the repository access settings of
the application. See the section on [repository
access](/articles/gettingstarted/repositoryaccess.html) for more information on
this.

<a id="box"></a>
### Box

A build is executed inside a box which, in essence, is a virtual machine that consists of an operating system and a set of packages installed that support your stack of choice. Wercker offers predefined boxes, but also allows you to create your own. See the [boxes](/articles/boxes/) section for more information.

Which box is used can be specified in the `wercker.yml`'s box element.
Here is an example that defines usage of the `Ruby` box from the
`wercker` user (boxes are scoped to users on wercker):

    box: wercker/ruby

<a id="services"></a>
### Services

A service on wercker is a box that runs a database, message queue or other software process. Services are created alongside the box that executes your build pipeline.

Specifying services to be used can be declared in the `wercker.yml`'s services element. Here is an example that defines to use the `Ruby` box, the `mongodb` service and the `rabbitmq` service made available by the `wercker` user:

    box: wercker/ruby
    services:
        - wercker/mongodb
        - wercker/rabbitmq

Services that are added to the build pipeline can set additional environment variables which can be used to connect to them. The example above will result in the following additional environment variables:

    WERCKER_MONGODB_HOST
    WERCKER_MONGODB_PORT
    WERCKER_RABBITMQ_HOST
    WERCKER_RABBITMQ_PORT

In each pipeline there is a default step named `environment variables` that exposes all environment variables that you can use, including those made available through declared services.

Similar to language specific boxes, it is possible to [create your own boxes](/articles/boxes/)
that run services as well.

<a id="envvars"></a>
### Environment Variables

Environment variables are the defacto way to retrieve information on wercker. Wercker provides a lot of
information by default that we can use in our steps. So let's look at a couple
of them that you can leverage, apart from those made available through services as mentioned above.

<table border="0">
<tr>
    <th>VARIABLE NAME</th>
    <th>EXAMPLE VALUE</th>
    <th>PURPOSE</th>
</tr>
<tr>
    <td>WERCKER_GIT_OWNER</td>
    <td>wercker</td>
    <td>The owner of the repository</td>
</tr>
<tr>
    <td>WERCKER_GIT_REPOSITORY</td>
    <td>step-bundle-install</td>
    <td>The name of the repository</td>
</tr>
<tr>
    <td>WERCKER_GIT_BRANCH</td>
    <td>master</td>
    <td>The branch name</td>
</tr>
<tr>
    <td>WERCKER_GIT_COMMIT</td>
    <td>ef306b2479a7ecd433
        7875b4d954a4c8fc18
        e237</td>
    <td>The commit hash</td>
</tr>
<tr>
    <td>WERCKER_SOURCE_DIR</td>
    <td>$WERCKER_ROOT/src</td>
    <td>The path to the directory of the source code</td>
</tr>
<tr>
    <td>WERCKER_CACHE_DIR</td>
    <td>/cache</td>
    <td>The path to the cache directory. This directory will be stored after the pipeline completes and restored when the pipeline runs again</td>
</tr>
<tr>
    <td>WERCKER_STEP_ROOT</td>
    <td>/wercker/steps/wercker
        /bundle-install/0.9.1</td>
    <td>The path to the working directory of the step that is currently executed. It contains the full content as deployed to the <a href="https://app.wercker.com/#explore">wercker directory</a></td>
</tr>
<tr>
    <td>WERCKER_STEP_ID</td>
    <td>9c182f44-e12d-4daf-91eb-a48d0540cc10</td>
    <td>The unique idenfier for the step, unique for each build/deploy.</td>
</tr>
<tr>
    <td>WERCKER_STEP_NAME</td>
    <td>bundle-install</td>
    <td>The name of the step as specified by the step in <strong>wercker-step.yml</strong></td>
</tr>
<tr>
    <td>WERCKER_REPORT_MESSAGE_FILE</td>
    <td>$WERCKER_REPORT_DIR/
        $WERCKER_STEP_ID/
        message.txt</td>
    <td>The location of a file you can use to output additonal information about the step.</td>
</tr>
</table>

For more information on how variables are made available and handled on the wercker platform, please see: [environment variables](/articles/steps/variables.html).
Environment variables are made available in the different steps that get executed in the wercker pipeline. Below we explain what steps entail.

<a id="steps"></a>
### Steps

A build consists of steps which can either succeed or fail. These steps
are defined in the `steps` clause within the `build` element of the `wercker.yml`. All steps contain a `name` property which can be set to a custom value. This property will be exposed in the user interface of wercker. Here is an example of a build pipeline of a ruby project:

``` yaml
build:
    - bundle-install
    - script:
        name: sass compile
        code: |
          bundle exec sass --style compressed scss/styles.scss:css/styles.min.css
```

The first step that is used is `bundle-install` and is a step provided by wercker. It runs the `bundle install` command in the root of the source directory to install the dependencies needed for your project. The reason for using the wercker provided **bundle install** step is that it leverages a cache that is shared between builds to increase build speed.

The second step is a `script` step which allows you to execute shell
script commands which can be declared in the `code` element. In this
example the `script` step is used to execute a **sass** compililation of stylesheet assets.

Steps are executed sequentially and you can add as many steps as you
want. If one fails the execution of the build is stopped, and the build
will be marked as **failed**.

<a id="package"></a>
### Package

The result of a passed build is a deployable package. The package is
created at the end of the build pipeline and contains all the assets and
code that are inside the working directory. This package can be the
input of a deployment pipeline. For advanced use-cases it can make sense
to create a sub-selection to be packaged, this is for instance applicable to compiled languages whereby the compiled output is the selection that you want to actually deploy.
Another example is the minification of javascript files which should be made available for deployment.

You can write the files you want packaged to the `$WERCKER_OUTPUT_DIR`. This will change the default behavior of packaging the working directory and will package the files in the `$WERCKER_OUTPUT_DIR`. Here is an example that builds a [Jekyll](http://jekyllrb.com) website and places the static html output in the `$WERCKER_OUTPUT_DIR`.

``` yaml
build:
    - bundle-install
    - script:
        name: generate static site
        code: |-
          bundle exec jekyll build --trace --destination "$WERCKER_OUTPUT_DIR"
```
The static html files will be copied into the `$WERCKER_OUTPUT_DIR` folder readying them for the deployment pipeline.

<a id="deploys"></a>
## Deploys
The deploy pipeline is aimed at delivering your passed build to your target of choice. At wercker we view deployment and delivery as a broad subject;
you can deploy your application to a cloud platform such as
[Heroku](/articles/deployment/heroku.html) or your Python library to the [Python Package Index](/articles/deployment/pypi.html).

The steps of the pipeline are again defined in the `wercker.yml`, using
the **deploy** element. Below an example of a `wercker.yml` file that executes a simple shell
script (the contents of this script is not shown, see [deployment for
more information](/articles/deployment/) to run your deploy pipeline:

``` yaml
deploy:
  steps:
    - script:
        name: my deploy
        code: ./deploy.sh
```

Execution of the deployment pipeline is done inside a sandboxed
environment which in turn is a **box**. In contrast to builds, deployments
cannot have services defined. The pipeline itself consists of a series
of steps that can either succeed or fail. Deploys pass when all steps
have succesfully completed. Configuration management is done via its
[deploy target](/articles/introduction/deploys.html) that you define on wercker.

![image](http://f.cl.ly/items/0T3z2f32433N2J3o0J26/wercker_pipeline_deploy.png)

<a id="trigger"></a>
### Triggering your deploy
A deployment can either be triggered manually via the [wercker cli](/articles/cli/),
manually via the wercker web application or automatically with the [auto
deploy feature](/articles/deployment/).
Only successful builds can be deployed.
