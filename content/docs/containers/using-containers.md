---
tags: docker
---

## Using containers

You can use Docker containers obtained from Docker Hub by specifying them
in your [wercker.yml file](/docs/wercker-yml/build-section.html).

### Boxes and Services

The *box section* in your `wercker.yml` defines the main language stack
of your application and is the box that runs your build pipelines.
Service containers are spun up *separately* from your main language stack
and can be leveraged for databases or queues.

Note that some containers might need configuration or setup such as
seeding the database with a username and password. Make sure you do this
before using the container within the wercker pipeline.

### Specifying versions

Docker repositories can hold various versions of an image. Tags can be leveraged to specify a specfic version of a container.

> When using containers make sure you specify the correct tag for the
container you want to use.

You can specify a version tag in your
[wercker.yml](/learn/wercker-yml/01_introduction.html) as follows.

```yaml
# using python version 2.7
box: python:2.7
```

Without specifying a tag you will get the latest tag of the container.

```yaml
# using python version 3
box: python
```

This same method applies for service containers.

```yaml
# using a specific tag for a redis service
services:
    - redis:2.8
```

You can also [pull in](/docs/containers/private-containers.html) *private* containers from Docker Hub or private registries.

Note that it is also possible to specify a containers on a [per-pipeline basis](docs/pipelines/per-pipeline-containers.html).
