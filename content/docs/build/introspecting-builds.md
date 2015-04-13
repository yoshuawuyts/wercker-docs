---
tags: builds, introspecting
---

## Introspecting builds

Often you want to have a closer look at what happened within your
pipelines.

Builds that you have [pulled](/docs/build/pulling-builds.html), or
[built locally](/docs/build/local-builds.html) using the [wercker command line
interface](/docs/cli/commands.html) can be introspected.

This is useful for debugging purposes and having a closer look at what
happened during your build.

As wercker currently supports [Docker containers](/docs/containers/dockerhub.html), introspection is
done via the Docker command.

### Using the Docker command

We expect you to have a [working Docker environment](/learn/basics/03_the-wercker-cli.html) available on your
machine. Assuming you have a [built a container
locally]((/docs/build/local-builds.html) ) or have [pulled](/docs/build/pulling-builds.html), a
build artifact as container you can run the following command to inspect
your container:

```sh
docker run -it --rm build-<BUILD-ID> /bin/bash
```

This gives you a prompt inside the container. Now you can jump into the
`pipeline` directory and have a look at the contents of your build
pipeline.

After you've run the container you can retrieve it's container-id by
running `docker ps -a`. You can then stop the container:

```sh
docker stop <CONTAINER-ID>
```

Note that containers take up storage on your local machine and you want
to clean (delete) these from time to time.
