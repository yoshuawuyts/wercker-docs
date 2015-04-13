---
tags: docker
---

## Can I run Docker commands on Ewok

The short answer is no.

On the Ewok stack, wercker runs your job inside a Docker container.
This means that Docker commands are *not* available as these would have to be made available outside the container which is insecure.

We are working on providing some of the Docker commands as internal steps that you can leverage.