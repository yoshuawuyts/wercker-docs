---
tags: docker
---

## Troubleshooting

### Can't connect to Docker endpoint on Linux

The wercker CLI by default connects to `127.0.0.1:2375` via the *TCP*
protocol.However by default Docker is installed on Linux and connects on
the *Unix* socket endpoint. You can get around this by setting the `DOCKER_HOST` environment variable
`DOCKER_HOST=unix:///var/run/docker.sock` or change the configuration of
your Docker daemon to listen to the TCP endpoint by default.
