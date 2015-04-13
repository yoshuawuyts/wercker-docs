---
tags: services
---

## Using services

Services are separate containers in your pipelines that you need
alongside your *main* language stack container.

Service containers are *spun up separate* from the main container.
Examples of services are databases and queues. You specify service
containers in your [wercker.yml](/docs/wercker-yml/creating-a-yml.html) file through the `services` clause:

```yaml
services:
    - mongodb
```

Having multiple services is also possible:

```yaml
services:
    - mongodb
    - redis
```

Tags specify a version of your service container:

```yaml
services:
    - mongodb:2.2.7
```

Please check the documentation of the container you are using if
additional environment variables need to be injected in the container or
not.

Note that as opposed to the [main containers](/docs/containers/using-containers.html) section, which is a singular item,
the services section contains a list of items and as such is preceeded by a `-`.

For more advanced usage of services including custom commands and defining
services on a per-pipeline basis, see our [advanced services section](/docs/services/advanced-services.html)