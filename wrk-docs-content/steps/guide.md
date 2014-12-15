---
sidebar_current: "steps-guide"
---

# Wercker steps

Steps make up the wercker pipeline and can either be executed in the build or
deploy phase within the pipeline. Examples of a build step are compilation of
your code, running your unit tests or performing jshint. A deploy step could be
the synchronization of static assets, for which we've created the s3sync step,
that takes some Amazon Web Services credentials and bucket information and
places these assets on Amazon S3.

## wercker-step.yml

Every step must contain a `wercker-step.yml` file, which is the manifest that
describes the properties for the step.

Here is an example of a `wercker-step.yml` that only holds the required fields:

``` yaml
name: create-file
version: 0.9.6
description: create-file step
```

You can also add keywords to your step which increases discoverability:

``` yaml
keywords:
  - file
  - text
  - create
```

## Step entry point

Every step is executed by executing a `run.sh` file, which should be present as well.
This file is responsible for the high-level
organization of the step's functionality. The actual step logic can be written
inside the `run.sh`. When you want to group things you can move your logic
to multiple shell scripts and call them from `run.sh`. You could also develop
a step in Ruby, Python or Node.js and use the `run.sh` to bootstrap this. A good example
of the latter is the [validate-wercker-step](https://github.com/wercker/step-validate-wercker-step).

## Step options

Steps can have options or parameters to receive input. For example, the `create-file` step
has the option `filename` that specifies the filename and where the file should be created.
Options are set as elements of the step attribute in `wercker.yml`. Here is an
example that uses the `create-file` step and specifies three options:

    - create-file:
        name: generate production robots.txt
        filename: ./_production/robots.txt
        content: |-
          User-agent: *
          Allow: /

The `name` option is default for every step and it allows the user to specify the
logical name for that step. In the example above `filename` and `content` are
`create-file` specific options. The value from options can be retrieved with the
`get_option` function:

    filename=`get_option filename`
    echo "Value for filename option: $filename"

## Environment variables

The following is a selection of environment variables available in the context
of a step execution:


<table border="0">
<tr>
    <th>VARIABLE NAME</th>
    <th>EXAMPLE</th>
    <th>PURPOSE</th>
</tr>
<tr>
    <td>WERCKER_ROOT</td>
    <td>/pipeline/build</td>
    <td>The root folder where wercker runs the build or deployment pipeline</td>
</tr>
<tr>
    <td>WERCKER_SOURCE_DIR</td>
    <td>$WERCKER_ROOT/src</td>
    <td>The path to the directory of the source code</td>
</tr>
<tr>
    <td>WERCKER_OUTPUT_DIR</td>
    <td>/output</td>
    <td>The path to the directory that contains, or will contain, the output of the build pipeline</td>
</tr>
<tr>
    <td>WERCKER_CACHE_DIR</td>
    <td>/cache</td>
    <td>The path to the cache directory. This directory will be stored after the pipeline completes and restored when the pipeline runs again</td>
</tr>
<tr>
    <td>WERCKER_STEP_ROOT</td>
    <td>/wercker/steps/wercker/bundle-install/0.9.1</td>
    <td>The path to the working directory of the step that is currently executed. It contains the full content as deployed to the <a href="http://app.wercker.com/#explore">wercker directory</a></td>
</tr>
<tr>
    <td>WERCKER_STEP_ID</td>
    <td>9c182f44-e12d-4daf-91eb-a48d0540cc10</td>
    <td>The unique - within the context of the pipeline execution - idenfier for the step. It is unique for each build/deploy.</td>
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

There are also a number of generic environment variables which may be of interest (they are defined during the environment variables step of your build/deploy). Here's a small selection:

<table border="0">
<tr>
    <th>VARIABLE NAME</th>
    <th>EXAMPLE</th>
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
</table>


## Writing output

The following functions are available for writing output:

* `success` - writes a success message.
* `fail` - writes a failure message and **stops execution**. It also sets the
text which will be displayed on the build/deploy page (like calling the setMessage function).
* `warn` - writes a warning message.
* `info` - writes a informational message.
* `debug` - writes a debug message.
* `setMessage` - sets a message for in the wercker user interface. Visible on build and deploy pages. For an exanple on where it is displayed in wercker, look at the `setup environment` of a build or deploy. This function changes the file specified in `WERCKER_REPORT_MESSAGE_FILE`.


Here is a short example:

    debug "checking if config exists…"
    if [ -e ".config" ]
    then
        info ".config file found"
    else
        fail "missing .config file"
    fi

## Using wercker cache

A cache directory is shared between builds. The path to this directory is stored in the environment variable `$WERCKER_CACHE_DIR`. A step can leverage this cache to share assets between builds. A good example of this is the [`bundler-install`](https://app.wercker.com/#applications/51c829d13179be44780020be/tab/details) step which leverages the cache to shorten the installation time of dependencies. It does so by storing the end-result of downloading and compiling dependend packages. Future builds can use this as a starting point and only new dependencies which were not cached are downloaded. At the start of every build the cache directory is filled with the cached content from the last successful build, if not older than 14 days (and is < 1GB).

A step should not depend on content of the cache and should be able to handle scenarios where the cache is not populated.

Here is a simple example of a step that leverages the cache:

``` bash
if [ -f "$WERCKER_CACHE_DIR/mystep/a-dependency.bin" ];
then
    debug "a-dependency.bin found in cache"
else
    debug "tool.rar not found in cache, will download"
    curl -o "$WERCKER_CACHE_DIR/mystep/a-dependency.bin" "http://domain.org/a-dependency.bin"
fi
```

This example checks for the file `$WERCKER_CACHE_DIR/mystep/a-dependency.bin` from the cache. If the file is not found, it will be downloaded to the cache directory so it will be available for future builds, if the build succeeds.

## Check if a variable is set and not empty

    if [ ! -n "$var" ] ; then
        echo "var is not set or value is empty"
    fi

Where `$var` is the variable you want to check.

## Check if command exists

    if ! type s3cmd &> /dev/null
    then
        echo "s3cmd exists!"
    else
        echo "s3cmd does not exist!"
    fi

Where `s3cmd` is the command you want to check. The `&> /dev/null` part makes it silence (it generates no output).

-------

<div class="authorCredits">
    <span class="profile-picture">
        <img src="https://secure.gravatar.com/avatar/5864d682bb0da7bedf31601e4e3172e7?d=identicon&s=192" alt="Pieter Joost van de Sande"/>
    </span>
    <ul class="authorCredits">

        <!-- author info -->
        <li class="authorCredits__name">
            <h4>Pieter Joost van de Sande</h4>
            <em>
                Pieter Joost is an engineer and community manager at wercker
            </em>
        </li>

        <!-- info -->
        <li>
            <a href="http://beta.wercker.com" target="_blank">
                <i class="icon-company"></i> <em>wercker</em>
            </a>
            <a href="http://twitter.com/pjvds" target="_blank">
                <i class="icon-twitter"></i>
                <em> mies</em>
            </a>
        </li>

    </ul>
</div>

-------
##### last modified on: July 23rd, 2013
-------
