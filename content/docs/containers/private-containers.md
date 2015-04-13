---
tags: docker
---

## Private containers

Private containers can either be pulled in from a private repository
on the [Docker Hub](/docs/containers/dockerhub.html) or from a
private registry such as [quay.io](http://quay.io).

Below you can find two examples of using a private Docker container as your
main container in your build pipeline.

### From Docker Hub

In order to pull in a private container you specify your repository via
the `id` parameter. Here we fetch the repository `python` belonging to the user `guido`.
You can provide a `$USERNAME` and `$PASSWORD` via environment
variables specified through the [wercker web interface](/learn/pipelines/03_using-env-vars.html).

```yaml
build:
    box:
      id: guido/python
      username: $USERNAME
      password: $PASSWORD
      tag: latest
    steps:
      - script:
        name: echo
```

The `registry` parameter is not necessary (see the next example) for
containers obtained from Docker Hub as it is the default registry that
we fetch from.

### From a private registry

In case you want to pull a container from a private registry you would
do that as follows.:

```yaml
build:
    box:
      id: quay.io/knuth/golang
      username: $USERNAME
      password: $PASSWORD
      tag: beta
      registry: quay.io
    steps:
      - script:
        name: echo
        code: echo "hello world!"
```

The username in this case is `knuth` and the repository is `golang`.
Again the `$USERNAME/$PASSWORD` combo is passed along through environment variables
that you either have exported or defined in the
[wercker web interface](/learn/pipelines/03_using-env-vars.html).

The domain name for the private registry (in this case `quay.io`)
is defined before the `username/repo` combination when using a custom registry.

Note that as opposed to the [services](/docs/services/using-services.html) section, which is a list of items,
the box section contains a singular item and as such is not preceeded by a `-`.