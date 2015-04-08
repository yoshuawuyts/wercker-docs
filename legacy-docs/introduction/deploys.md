---
sidebar_current: "introduction-deploys"
---

# Deploys

In this section we explain some of the core concepts that you will encounter throughout wercker. By explaining these concepts you will be able to make better use of wercker.

* [builds](#builds)
* [deploy targets](#deploy-targets)
* [deploys](#deploys)

<a id="builds"></a>
## Builds

As explained in the [builds](/articles/introduction/builds.html)
section, every time a push to git is done, wercker pulls this commit. Wercker compiles, tests and packages the code.

Build steps can be specified in [wercker.yml](/articles/werckeryml/)

In the project overview there is a list of the latest builds.

More information: [Builds](builds.html)

<a id="deploy-targets"></a>
## Deploy targets

To be able to deploy you need three things:

1. An account and an application on wercker
2. A green build for that application
3. A deploy target.

To deploy code, a deploy target needs to be created. Various deploy
targets exist on wercker; [Heroku](/articles/deployment/heroku.html),
[OpenShift](/articles/deployment/openshift.html), Custom and the
[wercker directory](/articles/directory).

With the Heroku deploy target you are able to deploy your code to the
Heroku platform-as-a-service and with the Custom target you can deploy
to your own servers, such as Amazon, RackSpace and Digital Ocean.

<a id="deploys"></a>
## Deploys

Deploy steps can be specified in [wercker.yml](/articles/werckeryml/)

It's possible to set environment variables in the wercker web interface that can be used in your custom deploy code.

    deploy:
        steps:
            - script:
                name: my deploy script
                code: echo my-deploy-script.sh

For more information see the section on
[deployment](/articles/deployment).

When a [Build](/articles/introduction/builds.html) is passed, it can be deployed to a [Deploy Target](#deploy-targets).

If you want to learn more on deployment see the dedicated [chapter](/articles/deployment/) on supported deployment options.
