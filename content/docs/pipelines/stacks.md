---
tags: pipeline, infrastructure, stack, docker
---

## Stacks

A stack is a complete environment that runs your pipelines, including the
operating system and container technology. Different stacks have different
feature sets.

There are currently *two* stacks available on wercker:

* wercker classic (also known as Andorian)
* wercker (newest, also known as Ewok)

### Classic

Wercker classic (codename: Andorian) uses LXC as its container runtime. Because developers want
different programming languages, build tools, libraries and services on their
environment, we offered the ability to create your own boxes and publish these
on the marketplace. In classic we also introduced the ability to customize
your pipelines via [steps](/docs/steps/about-steps.html) and publish these
to the marketplace as well.



### New wercker stack

The new wercker stack (codename: Ewok) uses the [Docker](http://docker.io) container runtime.
Docker offers tools to create your own containers which you can publish on their
[Docker Hub](http://hub.docker.com). In the new wercker stack we allow you to use
containers obtained from the Docker Hub, which you can leverage in your pipelines.
As such, there is no longer a need to use the classic wercker marketplace of boxes.
Steps obtained from the marketplace work in *both* classic and new wercker.

You can read more about how wercker uses the Docker Hub in [this section](/docs/containers/dockerhub.html)