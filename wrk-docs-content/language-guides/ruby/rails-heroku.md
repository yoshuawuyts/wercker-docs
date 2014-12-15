---
sidebar_current: "languages-ruby"
---

# Getting started with Rails and Heroku

* Prerequisites
* Create your Rails project
* Set up Heroku
* Create your Procfile
* A note on database configurations
* Creating your wercker.yml file
* Adding your application to wercker
* Deploy to heroku

## Prerequisites

* A Heroku account
* Have Python installed if you wish to use the wercker command line interface and utilize `pip` for third-party libraries.
* A GitHub or Bitbucket repository that hosts your code.

## Create your Rails project

The code for this article is available on [GitHub](https://github.com/mies/getting-started-rails)
We will start with a clean Rails project which we will set up with a Postgres database. In your terminal run the following command:

	rails new getting-started-rails

Next we replace the `sqlite` gem in your Gemfile with `pg`; the Postgres gem for Ruby. Also, we will be using Unicorn as our web server, so we will add it to our `Gemfile`:

``` ruby
    gem 'pg'
    gem 'unicorn'
```

For this project we will be using Ruby version `2.0.0`, which we also specify in the `Gemfile`, just below the `:source 'https://rubygems.org'` section, create the following line:

``` ruby
ruby "2.0.0"
```

## Set up Heroku

	heroku create

## Create your Procfile

Don't forget to run `bundle install` afterwards. Next we will define a Procfile for Heroku:

	web: bundle exec unicorn -p $PORT -E $RACK_ENV

Also don't forget to commit and push this file to your repository.

## A note on database configurations

It is the convention to not include the `database.yml` file in your repository. Adding a service like `wercker/postgresql` will give you access to several environment variables. Wercker will autogenerate one if you have defined a `wercker.yml` file with the database you require. See the [services article](/articles/services "Available Services") and [wercker.yml article](/articles/werckeryml "wercker.yml file") for more information. For our Rails application we will leverage Postgres as our database server and set this up in the next step.

## Creating your wercker.yml file

The `wercker.yml` file helps you define any services you might need for your application such as databases and queues. We will leverage it to set up Postgres. Read more on the wercker.yml file and its possibilities [here](http://devcenter.wercker.com/articles/werckeryml/). Create a `wercker.yml` file with the following contents (we will go over it, inn a bit):

	box: wercker/ubuntu12.04-ruby2.0.0
    services:
      - wercker/postgresql
  build:
    steps:
      - bundle-install
      - rails-database-yml

We first specify the Ruby box that we want to use on wercker, which is of course the `2.0.0` box. Next we specify the services that we want to leverage. As said, we will be using Postgresql for our database backend, so we add it to our wercker.yml. We subsequently run the `bundle-install` step that will run a `bundle install` command to install your gems. Next, the `rails-database-yml` step generates a `database.yml` file that will set up the wercker dependent connection strings for your database.

You will now have access to several environment variables including:

	WERCKER_POSTGRESQL_HOST
	WERCKER_POSTGRESQL_PORT
	WERCKER_POSTGRESQL_USERNAME
	WERCKER_POSTGRESQL_PASSWORD
	WERCKER_POSTGRESQL_DATABASE

and the convenience url in the form of `postgres://postgres:wercker@10.0.3.223:5432/werckerdb1` that you can access via the environment variable:

	WERCKER_POSTGRESQL_URL

Again, the `rails-database-yml` leverages these [environment variables](http://www.12factor.net/config) to generate a `database.yml` file on wercker.

****
##### A NOTE ON DATABASE.YML
****

Similar to [Heroku](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-rails), there is [no need](https://devcenter.heroku.com/articles/ruby-support#build-behavior) to specify your database connections in a `database.yml` file as one is generated for you, based on the services section in your `wercker.yml` file and the `rails-database-yml` build step, each time a build is run on wercker. However, if you want to override this default behavior, through the `rails-database-yml` step as presented in the following wercker.yml:

``` yaml
box: wercker/ubuntu12.04-ruby2.0.0
services:
  - wercker/postgresql
  - wercker/mysql
build:
  steps:
    - bundle-install
    - rails-database-yml:
        service: mysql
```

Here we have specified that we want to use *two* databases, a Mysql and Postgres database, but the `database.yml` on wercker should be generated based on the mysql service. This scenario is probably not common, but it is possible.

Commit and push this file to your git repository.

## Setting up the wercker add-on

Wercker comes with a [Heroku add-on](https://addons.heroku.com/wercker) which you can find on the Heroku marketplace (please make sure you are part of the [Heroku Beta program](http://beta.heroku.com) while the add-on is in beta). By running the following command you will add the wercker addon to your Heroku app that you've created in previous steps:

	$ heroku addons:add wercker

This will set up a wizard that will guide you through subsequent steps needed to deploy your application. You can open this wizard and dashboard by running:

	$ heroku addons:open wercker

## Adding your application to wercker

Wercker comes with a command line interface (CLI) that will help you in setting up your applications with wercker. It is a Python program that can be installed via `pip install wercker`. Please see the [specific CLI documentation](/articles/cli "The wercker command line interface") for more. Running `wercker create` will add your application to wercker and set up your Heroku deploy target. You can also add your project via the [web interface](http://devcenter.wercker.com/articles/gettingstarted/web.html).

	$ wercker create
	Searching for git remote information...
	Found 1 repository location(s)...

	Please choose one of the following options:
	 (1) git@github.com:wercker/rails-sample.git
	Make your choice (1=default):

This command will also trigger an initial build. If this build is green you are ready for deployment.

## Deploy to Heroku

You can now deploy your green build to Heroku. You can do so via the dashboard that you can invoke by running `heroku addons:open wercker` and hit deploy next to a green build or by executing the following command through the command line interface:

	$ wercker deploy

	-----------------------
	welcome to wercker-cli
	-----------------------

	Looking for login token...
	Retreiving builds from wercker...
	Found 1 result(s)...

	┌───┬────────┬──────────┬────────┬──────────┬───────────────────┬──────────────────────┐
	│   │ result │ progress │ branch │ hash     │ created           │ message              │
	├───┼────────┼──────────┼────────┼──────────┼───────────────────┼──────────────────────┤
	│ 1 │ passed │ 100.0%   │ master │ bf3fc264 │ 04/04/13 13:49:19 │ init                 │
