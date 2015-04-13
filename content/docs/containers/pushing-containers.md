---
tags: containers
---

## Pushing Docker containers

Though you are unable to run `docker` commands in your pipelines as this
would require being able to be [outside](/docs/faq/can-i-run-docker-commands.html) the container, we have created
several *internal* steps in order to interact with docker.

Internal [steps](docs/steps/about-steps.html) are steps that are baked into the
wercker [cli](/docs/cli/commands.html) as these interact with
the Docker API that is external from the container. From a security perspective
we don't want to make this funcionality
available from inside the Docker container, and as such have created these *internal* steps.

In order to push to Docker registries you use the `internal/docker-push` step.
The following examples show how to push to Docker registries such as the
[Docker Hub](https://registry.hub.docker.com/) and [Quay.io](http://quay.io) that adhere to
the `docker` API.

> When pushing to both public and private registries make sure you've
created the repository first

### Pushing to the public Docker Hub

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        repository: turing/bar
        registry: https://registry.hub.docker.com
```

The `$USERNAME` and `$PASSWORD` fields are environment variables that
you should specify through the [wercker web interface](/learn/pipelines/03_using-env-vars.html). The `repo`
field contains the repository that you want to push to (in this case the
username `turing` with the `bar` image), and `registry` is
the URL of your Docker registry.

> If you're pushing to the Docker Hub, the registry field is optional and can be omitted.

### Pushing to private registries

If you want to push to a private registry such as [quay.io](http://quay.io) you
would create the following [wercker.yml](/docs/wercker-yml/creating-a-yml.html) file:

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        repository: quay.io/knuth/foo
        registry: https://quay.io
```

Again `$USERNAME` and `$PASSWORD` are pipeline environment variables.
For the repository field, you prefix it with the domain name of your registry
when not using the Docker Hub. Here we push to the repo with username
`knuth` and the image `foo`.

Note the `internal/docker-push` step only works with registries that
comply with the Docker Registry API.
