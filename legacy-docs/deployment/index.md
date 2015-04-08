# Deployment

This section describes the different deployment possiblities within wercker.

Wercker allows you to deploy your application to various [Platform-as-a-Service](http://en.wikipedia.org/wiki/Platform_as_a_service) (PaaS) providers such as Heroku ([see example](/articles/deployment/heroku.html)) but also Infrastructure-as-a-Service providers including Amazon Web Services and Rackspace. We call these deploy targets.

Furthermore you can use any mechanism to orchestrate and streamline your deploys through libraries such as [Fabric](http://fabfile.org), [Capistrano](https://github.com/capistrano/capistrano/wiki) or even plain old [Bash](http://www.gnu.org/software/bash/) scripting.

It is also possible to 'deploy' your code to package platforms such as [PyPI](http://pypi.python.org) that hosts libraries and other types of dependencies for your code, of which we will showcase an [example](/articles/deployment/pypi.html) as well.

## Requirements

In order to deploy your application you need to have a green [build](/articles/introduction/builds.html) and have specified a [deploy target](/articles/introduction/deploys.html) that you want to deploy your application to.

## Auto-deploying your application

Wercker supports auto-deployment, this means that a green build automatically gets deployed to a specified deploy target. This is convenient for instance, for low-risk applications such as [your blog](/articles/deployment/jekylls3.html) or to deploy to either a staging environment or feature branch environment. As such, wercker allows you to specify the [git branch](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging) that you want auto deployed.

![image](http://f.cl.ly/items/2R1a1Y3V0r3k2A2j3U0P/Screen%20Shot%202013-06-03%20at%203.18.49%20PM.png)

****
##### note: with great power comes great responsibility, so be careful with what gets autodeployed to which environment.
****
