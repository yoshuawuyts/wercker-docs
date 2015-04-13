## The wercker CLI

Wercker offers a command line interface (CLI) that speeds up your workflow
even faster.

The CLI can be used to execute *single player mode*
[pipelines](/learn/pipelines/01_introduction.html) locally for easy
introspection and debugging. You can get the CLI for either Mac or Linux from our [downloads
page](http://wercker.com/downloads) or through the instructions on this
page.

### Requirements

In order to make use of all of the features within the CLI you will need
a working Docker environment. On linux it is easy to install Docker
depending on your distribution and package manager. See Docker's
[installation
instructions](https://docs.docker.com/installation/#installation) fore more information.

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

### Getting the CLI

You can obtain both versions for Mac OSX and Linux of the CLI at the
following locations:

* [Linux 32bit](http://downloads.wercker.com/cli/stable/linux_386/wercker)
* [Linux 64bit](http://downloads.wercker.com/cli/stable/linux_amd64/wercker)
* [Mac 64bit](http://downloads.wercker.com/cli/stable/darwin_amd64/wercker)

For example downloading the Mac OSX version and
installing it in `/usr/local/bin` (make sure this directory is available
in your PATH):

```sh
# downloads the Mac OSX CLI to /usr/local/bin (YMMV)
curl http://downloads.wercker.com/cli/stable/darwin_amd64/wercker -o /usr/local/bin/wercker
```

And for Linux 64 bit (make sure this directory is available in your
PATH):

```sh
# downloads the Linux CLI to /usr/local/bin (YMMV)
curl http://downloads.wercker.com/cli/stable/linux_amd64/wercker -o /usr/local/bin/wercker
```

> If you've installed the legacy version of the CLI, make sure its not
in your PATH

Next you want to make the CLI executable:

```sh
chmod +x /usr/local/bin/wercker
```

### Logging in

You can log into wercker with your username and password as follows:

```sh
wercker login
```

This will save a token in your `$HOME/.wercker` folder, so you don't
have to login the next time.

> Note that if you've signed up with GitHub you will need a password for the CLI which you can create on your profile page on wercker.

### Updating

You can check if you're running the latest version of the CLI by
running:

```
> wercker version

Version: 1.0.41
Git commit: 5efcc26716ccf608908bb87e30ef4c23414cb79e
```

When not up to date the CLI will nudge you to download a newer version
of the CLI.


### Commands

Below an overview of all the commands of the wercker CLI:

```
NAME:
   wercker - build and deploy from the command line

USAGE:
   wercker [global options] command [command options] [arguments...]

VERSION:
   1.0.54 (Git commit: dabc15876b877209047fa926774f97f001afbf43)

AUTHOR:
  Team wercker - <pleasemailus@wercker.com>

COMMANDS:
   build, b     build a project
   deploy, d    deploy a project
   detect, de   detect the type of project
   login, l     log into wercker
   pull, p      pull <build id>
   version, v   print versions
   help, h      Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --environment "ENVIRONMENT"  specify additional environment variables in a file
   --debug                      print additional debug information
   --journal                    Send logs to systemd-journald. Suppresses stdout logging.
   --auth-token                 authentication token to use
   --help, -h                   show help
   --version, -v                print the version
```

The *detect* command introspects your projects and generates
[wercker.yml](/learn/wercker-yml/01_introduction.html) files for your
projects.

> Currently go, python, nodejs and ruby are supported in the detect
> command

The *build* and *deploy* commands execute these pipelines locally. Using
the *pull* command you can download a container from the wercker
platform and use *inspect* to debug this container locally.

- - -
> Want to learn more? Read more about this on the
> [docs](/docs/cli/requirements.html)

[&lsaquo; How it works](/learn/basics/02_how-it-works.html "nav previous basics")
[Using the web interface &rsaquo;](/learn/basics/04_using-the-web-interface.html "nav next basics")
