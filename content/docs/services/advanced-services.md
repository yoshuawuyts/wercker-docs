---
tags: services
---

## Advanced services

This article describes advanced usage of service containers within wercker.

### Injecting environment variables in services

Often type services such as databases need environment variables defined
to run. Typical examples are usernames and passwords. As such you probably
want to start off with being explicit in defining your service containers and
reference them through an id:

```yaml
services:
    - id: mongodb
```

Next you want to the pass along additional environment information, for instance a username and password:

```yaml
services:
    - id: mariadb
      env:
        MYSQL_ROOT_USERNAME: myusername
        MYSQL_ROOT_PASSWORD: mysecretpassword
```

### Custom entrypoint command for services

It could be that the Docker container that you are using for a service
does not have an `ENTRYPOINT` or command to run upon launching the container.

You can specify a command for your container to run on launching in your
`wercker.yml` as follows:

```yaml
  services:
    - id: shannon/awesome-service
      username: $USERNAME
      password: $PASSWORD
      tag: latest
      cmd: my_amazing_command
```

Here we use a the container `awesome-service` by the user `shannon` and define
the command to be run when launching the container ` my_amazing_command`.

### Per-pipeline services

Sometimes you want a service to be only available in a specific pipeline
as opposed to a global service. You can define services on a per-pipeline
basis as follows:

```yaml
build:
  services:
    - id: mariadb
      username: $USERNAME
      password: $PASSWORD
      tag: latest

  box:
    id: google/golang
    steps:
       # Build the project
      - script:
          name: go build
          code: |
            go build ./...
```

Here we define the `mariadb` service to be only available in the [build pipeline](http://devcenter.wercker.com/learn/pipelines/01_introduction.html).