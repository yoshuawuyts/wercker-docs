## Introduction to deployment

This section describes the different deployment possiblities within wercker.

Wercker allows you to deploy your application to various Platform-as-a-Service
(PaaS) providers such as Heroku but also Infrastructure-as-a-Service
providers including Amazon Web Services and Rackspace. We call these deploy targets.

Furthermore you can use any mechanism to orchestrate and streamline your deploys
through libraries such as Fabric, Capistrano or even plain old Bash scripting.

It is also possible to ‘deploy’ your code to package platforms such as PyPI that
hosts libraries and other types of dependencies for your code, of which we will
showcase an example as well.

### Deploy steps

Deploy steps can be specified in the wercker.yml. It's possible to set environment
variables in the wercker web interface that can be used in your custom deploy code.
```yaml
deploy:
    steps:
        - script:
            name: my deploy script
            code: echo my-deploy-script.sh
```

When a build is passed, it can be deployed to a target. In the next
section we'll look at how to set up deploy targets.

[Targets &rsaquo;](/learn/deploy/02_targets.html "nav next deploy")
