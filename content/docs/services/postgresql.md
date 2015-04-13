---
tags: services, postgres
---

## PostgreSQL

The default [postgres docker image](https://registry.hub.docker.com/_/postgres/) requires a password to be passed in as an argument, alongside an optional username.

### Setup

However, because you cannot run docker commands direclty in wercker, you have to use the [`env`] tag in your **wercker.yml** file (as described [here](http://devcenter.wercker.io/docs/services/advanced-services.html)) :

```
# wercker.yml
box: yourbox
services:
   - id: postgres
     env:
       POSTGRES_PASSWORD: ourlittlesecret
       POSTGRES_USER: myuser  # optional
build:
   steps:
(...)
```

Now the [`POSTGRES_PASSWORD`] environment variable is set to _ourlittlesecret_ inside your service container and you can start using it!

### Environment variables and Connection strings

Below you can find the environment variables that are created and made available.
You can use these for connection strings and such in your applications.

```sh
POSTGRES_PASSWORD: ourlittlesecret
POSTGRES_PORT=tcp://172.XX.X.XX:5432
POSTGRES_ENV_POSTGRES_PASSWORD=ourlittlesecret
POSTGRES_ENV_LANG=en_US.utf8
POSTGRES_ENV_PG_MAJOR=9.4
POSTGRES_PORT_5432_TCP_PORT=5432
POSTGRES_PORT_5432_TCP_ADDR=172.XX.X.XX
POSTGRES_ENV_PGDATA=/var/lib/postgresql/data
POSTGRES_NAME=/wercker-pipeline-c880ea26-3902-4b03-a4b6-e718dc351c80/postgres
POSTGRES_PORT_5432_TCP=tcp://172.XX.X.XX:5432
POSTGRES_PORT_5432_TCP_PROTO=tcp
POSTGRES_ENV_PG_VERSION=9.4.1-1.pgdg70+1
```

To learn about how to find out the IP adress of a service container you should use the environment variables exposed by Docker. You can read more about that in our article [_availble env vars_](http://devcenter.wercker.io/docs/services/available-env-vars.html).
