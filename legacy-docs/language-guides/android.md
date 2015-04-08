---
sidebar_current: "languages-android"
---


# Android

Below we go into detail on how to get started with wercker and android. You can also find guides specific to android below.

## Guides

* [Getting started with android and wercker - part 1](http://blog.wercker.com/2013/09/19/Gettingstarted-with-android-part-1.html)
* [Getting started with android and wercker - part 2](http://blog.wercker.com/2013/09/24/Gettingstarted-with-android-part-2.html)
* [Getting started with android and wercker - part 3](http://blog.wercker.com/2013/09/27/Gettingstarted-with-android-part-3.html)
* [Getting started with android and wercker - part 4](http://blog.wercker.com/2013/10/04/Getting-started-with-android-part-4.html)

## android box

The `wercker/android` box runs on ubuntu 12.04 and provides a selection of the android toolchain:

* gradle 1.7
* android sdk version 22.2
* android build tools r17 en 18.0.1
* android support library
* android API r17 (version 4.2.2) and 18 (android 4.3)

The box also inherits tools from a not yet official java box, resulting in the following additional tools:

* oracle java 7
* ant and ivy
* maven

A typical android application can use the following yaml:

``` yaml
box: wercker/android
# Build definition
build:
  # The steps that will be executed on build
  steps:
    - script:
        name: show base information
        code: |
          gradle -v
          echo $ANDROID_HOME
          echo $ANDROID_SDK_VERSION
          echo $ANDROID_BUILD_TOOLS
          echo $ANDROID_UPDATE_FILTER
    # A step that executes `gradle build` command
    - script:
        name: run gradle
        code: |
          gradle --full-stacktrace -q --project-cache-dir=$WERCKER_CACHE_DIR build
```
