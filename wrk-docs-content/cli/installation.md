# Installation
We assume and [recommend](http://www.pip-installer.org/en/latest/other-tools.html#pip-compared-to-easy-install) that Python dependencies and libraries are managed through [pip](http://www.pip-installer.org/en/latest/) which you can install via `sudo easy_install pip`.

****
##### The short version: `pip install wercker`
****

## Installation instructions

Depending on how Python is installed on your system you will have to make sure your `PATH` is set correctly so you can globally run the `wercker` command.

****
##### On the Mac
****
Our preferred way of installing Python on the Mac is [Homebrew](https://github.com/mxcl/homebrew/wiki/Homebrew-and-Python). Homebrew's Python comes bundled with `pip`. Again make sure your `PATH` environment variable includes the location where the `wercker` command is installed, in the case of Homebrew this is `/usr/local/share/python`.

****
##### On Linux
****
On both Debian-based distributions such as Ubuntu `pip` is installed through `sudo apt-get install python-setuptools`. If your version of Linux comes with a `yum` based package manager, such as Fedora or RHEL, the `pip` command is installed via `sudo yum install python-setuptools`.

****
##### On Windows
****

For Windows we recommend installing [Cygwin](http://www.cygwin.com/) with the following packages enabled:

* python/python
* net/openssh
* devel/git
* web/wget

Next, download and install `easy_install` with the following commands
```bash
$ wget http://peak.telecommunity.com/dist/ez_setup.py
$ python ez_setup.py
```

We will now install `pip` through easy_install:

```bash
$ easy_install pip
```

After which you can continue to install the `wercker` command line interface.

## Installing the wercker CLI

The wercker command line interface is written in python and on Linux/Mac OSX can be installed by running:

```bash
$ pip install wercker
```

Depending on your operating system, you may have to run this with superuser privileges (i.e. use `sudo pip install wercker`). Also note:
linux users may need to install python headers (for Ubuntu/Debian users: `sudo apt-get install python-dev`).
