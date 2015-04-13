## Using Containers

You can use Docker containers obtained from Docker Hub by specifying them
in your [wercker.yml file](/learn/wercker-yml/01_introduction.html).

### Boxes and Services

The *box section* in your `wercker.yml` defines the main language stack
of your application and is the box that runs your build pipelines.
Service containers are spun up separately from your main language stack
and can be leveraged for databases or queues.

> Service containers are initialized separately from the main box in
your pipelines

### Specifying versions

Docker repositories can hold various versions of an image. Tags can be leveraged to specify a specfic version of a container.

> When using containers make sure you specify the correct tag for the
container you want to use.

You can specify a version tag in your
[wercker.yml](/learn/wercker-yml/01_introduction.html) as follows:

```yaml
# using python version 2.7
box: python:2.7
```

As mentioned in the
[wercker.yml](/learn/wercker-yml/01_introduction.html) section it is
also possible to reference a container via an `id` clause:

```yaml
box:
    id: python:2.7
```

Without specifying a tag you will get the latest build of the container
from Docker Hub, which in this case contains python version 3.

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

Now that we know how to use containers and define them in our
`wercker.yml`, we will have a look at how pipelines work.

[&lsaquo; Docker Hub](/learn/containers/02_docker-hub.html "nav previous containers")
[Pipelines &rsaquo;](/learn/pipelines/01_introduction.html "nav next pipelines")
