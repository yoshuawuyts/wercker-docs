## Docker Hub

Wercker currently supports containers obtained from [Docker
Hub](https://hub.docker.com), a marketplace for various Docker containers,
ranging from language stacks to databases.

![image](/images/dockerhub.png)

### Getting containers from Docker Hub

In order to use these containers you have to specify them in your
[wercker.yml](/learn/wercker-yml/01_introduction.html). You at least
need to specify  the main language stack you want to use via the `box`
section.

> Currently only public repositories from Docker Hub are supported.

Private repositories are not yet supported in wercker, so make sure your
containers are public on Docker Hub.

In the next section we'll explain how you can use containers in your
pipelines.

- - -
> Want to push containers to the Docker Hub? Read more on our
> [docs](/docs/containers/pushing-containers.html)

[&lsaquo; Introduction to containers](/learn/containers/01_introduction.html "nav previous containers")
[Using containers &rsaquo;](/learn/containers/03_using-containers.html "nav next containers")
