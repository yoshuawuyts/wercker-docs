---
tags: app.wercker.com, build
---

## Cloud builds

For more information on steps run during a build see [about builds](/docs/build/about-builds.html).
There are two steps unique to cloud builds which are further described below:

* get code
* store

### Get code

In this step a git clone is performed using the ssh key generated 
during the `add application` or using a generic ssh key used for public 
repositories.


### Store

In this step we store the output of the build for later use. For each build two
things are stored: 

* the container
* build artifact

#### The container

The complete docker container is stored, for later use when deploying or when running `wercker pull`

#### Artifact

All files stored in $WERCKER_OUTPUT_DIR are collected in a single archive and 
stored. If this directory is empty, all files in the $WERCKER_SOURCE_DIR are 
stored instead.
