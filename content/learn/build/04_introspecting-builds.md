## Introspecting builds

Before you can introspect your build you need to load it into Docker. You can
either do this by adding the `--load` flag to the `wercker pull` command. 

Otherwise you need to use the docker command to load the container into Docker:

```sh
docker load -i <path>
```

Now that the container is loaded into Docker, you can use the standard Docker
tool to execute commands on it.

```sh
docker run -it --rm build-<build-id> /bin/bash
```

This gives you a prompt inside the container. Now you can jump into the
`pipeline` directory and have a look at the contents of your build
pipeline.

[&lsaquo; Pulling builds](/learn/build/03_pulling-builds.html "nav previous build")
[Deploy &rsaquo;](/learn/deploy/01_introduction.html "nav next deploy")
