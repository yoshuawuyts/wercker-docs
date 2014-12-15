# Cloud Foundry
In this subsection we will discuss how you can deploy your application to [CloudFoundry](http://cloudfoundry.com), the OpenSource Platform-as-a-Service developed by VMware.

## Requirements

- Cloud Foundry credentials (sign up at http://my.cloudfoundry.com/signup)
- Cloud Foundry command line interface (vmc) installed (http://docs.cloudfoundry.com/tools/vmc/installing-vmc.html)
- A <a href="http://www.github.com" target="_blank">GitHub</a> account to use a pre-made repository
- And of course a <a href="https://app.wercker.com" target="_blank">wercker</a> account

## Fork

- Goto https://github.com/wercker/cloudfoundry-example and fork the repo

## Create Cloud Foundry application

- Clone repo <code>git clone https://github.com/[YOURNAME]/cloudfoundry-example</code>
- Goto directory <code>cd cloudfoundry-example</code>
- Create Cloud Foundry application <code>vmc push --name cfexample --runtime ruby19 --framework sinatra --instances 1 --no-bind-services --no-create-services --memory 64M</code>
- Choose unique domain ending with ".cloudfoundry.com" <code>Domain> [UNIQUE].cloudfoundry.com</code>
- Don't save configuration <code>Save configuration?>n</code>
- Cloud Foundry will create a new application named cfexample for you

## Create wercker application

- Login to wercker
- Click add an application and make sure you configure [access](/articles/gettingstarted/web.html)
- Choose GitHub repositories (connect to GitHub if you haven't already done so)
- Choose [YOURNAME]/cloudfoundry-example
- Go back to wercker and choose go to your application
- Build now
- See how the build is run

## Add deploy target

- Click on the Deployment tab
- Click on Add deploy target
- Choose Cloud Foundry
- Input your Cloud Foundry username and password and click Login
- Give this deploy target a name (for example staging or production)
- Choose cfexample
- Click Save


## Deploy

- Click Build tab
- Click on first build to go to the build overview
- Click Deploy this build
- Choose the deploy target you just created
- In the activity feed a new item appears with a progressbar showing how the deployment is going
- When done, a new activity feed item will appear stating the deployment is passed
- Open a browser and enter the domain you chose while creating the Cloud Foundry application
