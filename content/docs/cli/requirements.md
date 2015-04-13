---
tags: cli
---

## Requirements

In order to make use of all of the features within the CLI you will need
a working Docker environment. On linux it is easy to install Docker
depending on your distribution and package manager. See Docker's
[installation
instructions](https://docs.docker.com/installation/#installation) fore more information.

### Docker on Mac OSX

If you are running Mac OSX you can install Docker using an installer
called [boot2docker](https://docs.docker.com/installation/mac/) that
will install [VirtualBox](https://www.virtualbox.org/) and a minimal
Docker environment. As an alternative, you can use
[Vagrant](http://vagrantup.com) to install a separate boot2docker
virtual machine using [this vagrant box](https://github.com/mitchellh/boot2docker-vagrant-box).

### OSX boot2docker quick start

If you're eager to get up to speed on OSX, below is a quickstart that
installs boot2docker via the [homebrew package
manager](http://brew.sh/).

```sh
brew install boot2docker

boot2docker init
boot2docker up

$(boot2docker shellinit)
```

> Note that this only activates Docker in the current shell session

Under the hood the `shellinit` command configures the Docker certificates
and environment variables, which actually distills to:

```sh
export DOCKER_HOST=tcp://192.168.59.103:2376
export DOCKER_CERT_PATH=$HOME/.boot2docker/certs/boot2docker-vm
export DOCKER_TLS_VERIFY=1
```

You can add these `exports` to your `.profile`, `.bashrc` or other shell configuration file.

Opening up a new terminal or reboorting your machine might
cause your Docker endpoint or boot2docker environment to be no longer
avalable, so you might want to at least export the environment variables
in your `.profile`, `.zshrc` or `.bashrc` file.
