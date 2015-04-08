---
sidebar_current: "steps-variables"
---

# Environment variables


## Introduction

What if you have an API key you need during a deploy or during a build? This is
information that is either unique for each server you want to deploy to
or may be too sensitive to store in the repository. Wercker supports a number
of ways to store and expose this data as environment variables.

![image](http://f.cl.ly/items/2O3V2n3A1n2d3u3S363D/wercker_pipeline.png)

If you want to know which environment variables are available during a build
or deploy, look at the `environment variables` step of your pipeline run.
You can also use a script step and use the export command to see the full list
of all variables at that moment during the build/deploy. This is convenient
since there are reasons why the environment variables step does not show all
environment variables available during the pipeline run.

```
    - script:
        code: |
            export
```

First of all, there are variables which are __global__. They are available
during builds and deploys. Typically, these are used to store API tokens for
after-steps such as hipchat, campfire etc.

These variables are called __pipeline variables__ and can be set in the settings
tab of your application.

The second set of variables are specific to deploy targets, and can only be set
directly on the deploy target. Typically, these are used to store information
such as hostnames, ssh-keys, passwords and more. These variables are called
__deploy target variables__


## Data types
The interface supports two types of data:

* text (which can be set as protected)
* SSH key pairs


### Protected variables

Protected variables functionality was added to limit the exposure of sensitive
information via the interface. The behavior of the variables during pipeline
runs (builds/deploys) are the same as other variables, but with the following
exceptions:

* protected variables are not displayed/logged during the setup environment step
* values are not shown in the settings tab and can only be set, not read back.

This behaviour is optional for variables of type text, SSH key pairs however
are automatically marked as protected.


### SSH Key pairs

Another common type of information used during deploys (but also during builds)
are SSH key pairs. Wercker can help you generate them for you and will only
expose the public part of the pair via the interface. During a pipeline run,
the key pair is exposed via two environment variables ending with: \_PRIVATE
and \_PUBLIC.

To use the SSH key pairs in wercker, you have to do two things.

1. let wercker generate a pair
2. create a variable


<a id="key-pairs"></a>
#### Generating SSH key pairs

You can generate new pairs, via SSH Keys section in the settings tab of your
application. Simply use the "generate new key pair" button and you'll be
presented with a small form asking for you to give it a name.

![freshly created ssh key](http://f.cl.ly/items/3x0P3u1X3P2Z1E3A2Z2t/Screen%20Shot%202013-08-23%20at%202.50.10%20PM.png)

#### Create a variable

When you create a new variable for the SSH key pair, remember you are actually
creating two variables who are based on the name you are entering. So, if you
created an SSH key pair to use as a bitbucket deploy key. You may want to name
the variable BITBUCKET\_DEPLOY\_KEY. During the pipeline run you will now have
two environment variables: BITBUCKET\_DEPLOY\_KEY\_PRIVATE and
BITBUCKET\_DEPLOY\_KEY\_PUBLIC

![variable on deploy target](http://f.cl.ly/items/2P163u1h440J3d433k2K/Screen%20Shot%202013-09-02%20at%203.06.25%20PM.png)

## Predefined variables

There are a number of environment variables defined during a build (as well as
during a deploy). They contain a variety of information, such as links to the
current application, build or deploy as well as the branch name and the location
of your app's unique cache.

### Build related variables

Let's take a look at a selection of them available during a build:

<table border="0">
<thead>
    <tr>
        <th>VARIABLE NAME</th>
        <th>EXAMPLE VALUE</th>
        <th>PURPOSE/CONTAINS</th>
    </tr>
</thead><tbody>
<tr>
    <td>WERCKER_MAIN_PIPELINE_STARTED</td>
    <td>1399372237</td>
    <td>Time in milliseconds when the build started</td>
</tr>
<tr>
    <td>CI</td>
    <td>true</td>
    <td>Can be used to detect if the app/script is running in an automated environment</td>
</tr>
<tr>
    <td>WERCKER_BUILD_URL</td>
    <td>https://app.....178b</td>
    <td>Link to the build on wercker</td>
</tr>
<tr>
    <td>WERCKER_GIT_DOMAIN</td>
    <td>github.com</td>
    <td>The domain the repository is cloned from (i.e. bitbucket.org or github.com)</td>
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
    <td>WERCKER_ROOT</td>
    <td>/pipeline/build"</td>
    <td>The location of the cloned code</td>
</tr>
<tr>
    <td>WERCKER_SOURCE_DIR</td>
    <td>$WERCKER_ROOT/src</td>
    <td >The path to the directory of the source code. By default WERCKER_ROOT and WERCKER_SOURCE_DIR are the same. However you can change this location via the wercker.yml (to a subfolder in your repository)</td>
</tr>
<tr>
    <td>WERCKER_CACHE_DIR</td>
    <td>/cache</td>
    <td>The path to the cache directory. This directory will be stored after the pipeline completes and restored when the pipeline runs again</td>
</tr>
<tr>
    <td>WERCKER_OUTPUT_DIR</td>
    <td>/pipeline/output/</td>
    <td>Any files here are assumed to be the result of the build process. If this folder is empty, the WERCKER_ROOT is assumed to contain the build result</td>
</tr>
<tr>
    <td>WERCKER_STARTED_BY</td>
    <td>Jacco Flenter</td>
    <td>build was started by this user</td>
</tr>
<tr>
    <td>WERCKER_APPLICATION_URL</td>
    <td>https://app......19ef</td>
    <td>URL of the application on wercker</td>
</tr>
</tbody>
</table>

When a step is being run, wercker also creates additional environment variables
for you to use. Please see [A guide to steps](/articles/steps/guide.html).
for more information

### Deploy related variables

The following variables are available during deploys. As you can see it's more
or less an expanded version of the information available during a build.

<table border="0">
<thead>
    <tr>
        <th>VARIABLE NAME</th>
        <th>EXAMPLE VALUE</th>
        <th>PURPOSE/CONTAINS</th>
    </tr>
</thead><tbody>
<tr>
    <td>WERCKER_MAIN_PIPELINE_STARTED</td>
    <td>1399372237</td>
    <td>Time in milliseconds when the deploy started</td>
</tr>
<tr>
    <td>DEPLOY</td>
    <td>true</td>
    <td>Shows whether </td>
</tr>
<tr>
    <td>WERCKER_DEPLOYTARGET_NAME</td>
    <td>staging</td>
    <td>Name of the deploy target the deploy is targetting</td>
</tr>
<tr>
    <td>WERCKER_DEPLOY_URL</td>
    <td>https://app.....178b</td>
    <td>Link to the DEPLOY on wercker</td>
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
    <td>WERCKER_ROOT</td>
    <td>/pipeline/build"</td>
    <td>The location of the build result</td>
</tr>
<tr>
    <td>WERCKER_SOURCE_DIR</td>
    <td>$WERCKER_ROOT/src</td>
    <td >The path to the directory of the source code. By default WERCKER_ROOT and WERCKER_SOURCE_DIR are the same. However you can change this location via the wercker.yml (to a subfolder in your repository)</td>
</tr>
<tr>
    <td>WERCKER_CACHE_DIR</td>
    <td>/cache</td>
    <td>The path to the cache directory. This directory will be stored after the pipeline completes and restored when the pipeline runs again</td>
</tr>
<tr>
    <td>WERCKER_STARTED_BY</td>
    <td>Jacco Flenter</td>
    <td>build was started by this user</td>
</tr>
<tr>
    <td>WERCKER_APPLICATION_URL</td>
    <td>https://app......19ef</td>
    <td>URL of the application on wercker</td>
</tr>
</tbody>
</table>

Once again, please remember that when you create your own steps, wercker also creates
additional environment variables for you to use. They are outlined in the [A guide to steps](/articles/steps/guide.html).

-------

<div class="authorCredits">
    <span class="profile-picture">
        <img src="https://secure.gravatar.com/avatar/7d9ef3d3f6911e6e4f9c51f6d99c48f8?d=identicon&s=192" alt="Jacco Flenter"/>
    </span>
    <ul class="authorCredits">

        <!-- author info -->
        <li class="authorCredits__name">
            <h4>Jacco Flenter</h4>
            <em>
                Jacco is an interaction engineer at wercker.
            </em>
        </li>

        <!-- info -->
        <li>
            <a href="http://beta.wercker.com" target="_blank">
                <i class="icon-company"></i> <em>wercker</em>
            </a>
            <a href="http://twitter.com/jflenter" target="_blank">
                <i class="icon-twitter"></i>
                <em> flenter</em>
            </a>
        </li>

    </ul>
</div>

-------
##### last modified: May 5th, 2014
-------
