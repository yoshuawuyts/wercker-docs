---
tags: nodejs
---

## Nodejs

This article describes how to get started with the `nodejs` programming
language and wercker.

### Table of Contents

* The box
* Useful steps
* Complete wercker.yml
* Sample application

### The box

The Docker Hub has several `node.js` containers available to choose from.
The [default](https://registry.hub.docker.com/_/node/) nodejs container
comes with several versions of node installed. The [nodesource](https://registry.hub.docker.com/u/nodesource/node/)
container is minimal but might be missing out on some libraries.

### Useful steps

* [npm-install](https://app.wercker.com/#applications/51c829f23179be44780021ac/tab/details)
* [grunt](https://app.wercker.com/#applications/51c829e23179be4478002135/tab/details)
* [npm-test](https://app.wercker.com/#applications/51c829f43179be44780021bd/tab/details)

### Complete wercker.yml

```yaml
box: nodesource/trusty
# Build definition
build:
  # The steps that will be executed on build
  steps:
    # A step that executes `npm install` command
    - npm-install
    # A step that executes `npm test` command
    - npm-test

    # A custom script step, name value is used in the UI
    # and the code value contains the command that get executed
    - script:
        name: echo nodejs information
        code: |
          echo "node version $(node -v) running"
          echo "npm version $(npm -v) running"

```

### Sample application

You can checkout and clone a sample application in ruby at the
following location:

![image](/images/github-icon.svg)[getting-started-nodejs](https://github.com/wercker/getting-started-nodejs)
