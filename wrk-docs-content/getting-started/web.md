---
sidebar_current: "gettingstarted-web"
---

# Getting Started with the wercker web interface

This guide will walk you through creating your first application on wercker via the web interface.

For your convenience we have created five separate Getting Started repositories in
[Ruby](https://github.com/wercker/getting-started-ruby),
[Python](https://github.com/wercker/getting-started-python),
[Node.js](https://github.com/wercker/getting-started-nodejs),
[Go](https://github.com/wercker/getting-started-golang), and
[PHP](https://github.com/wercker/getting-started-php).

We assume you have registered for a [wercker account](https://app.wercker.com/users/new).


### Step 1. Fork the Repository

The first step is to fork one of the above mentioned repositories and clone it to your local machine.

### Step 2. Add Project

Next you can add this application to wercker. Log into wercker and push the `add application` button.

We first allow you to select your git provider, currently either GitHub or Bitbucket. If you've already authorized wercker to connect with either of these platforms, we will show this as well.

<a href="/images/articles/gettingstarted/startwizard.png" target="_blank"><img src="/images/articles/gettingstarted/startwizard.png" ></a>

We now present you with a list of repositories and also show if a repository is private, public, and if it's a fork of another repo. We introduced a search box which you can use to filter your repositories, making selection even snappier. Select the repository that you have forked in the previous step.

<a href="/images/articles/gettingstarted/selectrepository.png" target="_blank"><img src="/images/articles/gettingstarted/selectrepository.png" ></a>

Wercker uses an SSH key to checkout the code to run a build. For private
projects you need to add a public SSH key as a deploy key to your repository, or
you can add this public SSH key to an user which has acces to the repository.
For public repositories you don't have to add a public SSH key, you just need to
make sure you selected the public repository option in the repository access
settings of the application. See the section on [repository
access](/articles/gettingstarted/repositoryaccess.html) for more information on
this.

<a href="/images/articles/gettingstarted/configureaccess.png" target="_blank"><img src="/images/articles/gettingstarted/configureaccess.png" ></a>

Now, wercker is ready to help you with the `wercker.yml` file. It could of course be the case that you've already
added a wercker.yml to your repository. The new flow automatically detects the presence of a wercker.yml in your repository.

If the `wercker.yml` is not present we will try to detect the programming language of your project and present a suggested wercker.yml file with sensible defaults that you need to commit and push to your repository.

![image](http://f.cl.ly/items/3V33302R3W1F3z03461m/Screen%20Shot%202013-06-21%20at%2012.00.50%20PM.png)

Again, you can read more on the `wercker.yml` file and its possibilities at [wercker.yml section](http://devcenter.wercker.com/werckeryml/).

Finally when you're done we present you with a success dialog and allow you to make your project **public** on wercker, which is great for open source projects.

### Step 3. Code and create your first Build

Make a modification to the application's code. A simple update to the `README.md` will suffice but you can also create new functionality.

    $ git commit -m "modified the README"
    $ git push origin master

Commit your changes to your git repository and push them. This will trigger a new build on wercker, depicted in the activity feed, as you can see below.

![image](http://f.cl.ly/items/240s2M363v0H053r133m/build-started.jpg)

### Step 4. Add a deploy target

You are now ready to deploy this application to the Cloud. For this guide we will walk you through a deploy on [Heroku](http://heroku.com) a popular platform-as-a-service provider.

***
##### note: Wercker has an add-on on the Heroku marketplace that makes deployment even easier. See the [Heroku guide](/articles/deployment/heroku.html) in the deployment section.
***

From the deployment tab on wercker select the `add deploy target` button and pick Heroku from the list. You will be asked to enter your Heroku API key which you can find on your [Heroku account page](https://dashboard.heroku/com/account).

![image](http://f.cl.ly/items/3Z123S141T35402B0a2q/add-deploy-target.jpg)

You can now either choose an existing application on Heroku that you want to deploy to, or create a new application. You can add a label to this deploy target, such as `production` or `staging`.

### Step 5. Deploy your build

Now you are ready to deploy your build to Heroku. Select your green build from the list of builds and hit deploy:

![image](http://f.cl.ly/items/2D0g2U032j1o2P2l0v0O/deploy-build.jpg)

Wercker will now deploy your application!
