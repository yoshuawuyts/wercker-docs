---
sidebar_current: "languages-ruby"
---

# Getting stated with Rails and MongoDB on wercker

You can find the code for this tutorial on [Github](https://github.com/mies/mongodb-demo)

### Table of Contents
* Prerequisites
* Add project to wercker
* Create a new Rails project
* Declare dependencies
* Create your mongoid configuration
* Create a wercker.yml file
* TODO: Create a Procfile and Heroku deploy target
* Push your changes to Github
* TODO: Add Mongolab
* TODO: Deploy to Heroku

## Create your rails project

We will start out with a fresh rails project but will will not utilize Active Record as we're using MongoDB for our database. If you would like to use MySQL or Postgres alongside MongoDB you should not add the `--skip-active-record` option.

``` bash
rails new mongodb-demo --skip-active-record
```

## Declare dependencies

For our Object Document Mapper we will use [Mongoid](http://mongoid.org) a popular Ruby framework to interact with MongoDB, so lets add this to our Gemfile.

**Gemfile**

``` ruby
gem 'mongoid'
```
Now we are ready to bundle our gems.

``` bash
bundle install
```

## Create your mongoid configuration

We have to let our Rails app know it should use MongoDB, so lets create a configuration file.

Generate a `mongoid.yml` file

``` bash
rails g mongoid:config
```

and update the `test` section with the wercker [environment variable](/articles/available-services):

``` bash
test:
  sessions:
    default:
      database: mongodb_demo_test
      hosts:
        -  <%= ENV['WERCKER_MONGODB_HOST'] || 'localhost:27017' %>
      options:
        consistency: :strong
        # In the test environment we lower the retries and retry interval to
        # low amounts for fast failures.
        max_retries: 1
        retry_interval: 0
```

## Create your wercker.json

Wercker has to know it should make MongoDB available for our tests, so lets create a `wercker.yml` [file](/articles/werckeryml)

**wercker.yaml**

``` yaml
box: wercker/ubuntu12.04-ruby2.0.0
services:
  - wercker/mongodb
build:
  steps:
    - bundle-install
```
The `services` section specifies any database you want to leverage, in this case `mongodb`. By declaring this in your `wercker.yml`, the `WERCKER_MONGODB_HOST` environment variable becomes available.

## Push to GitHub

``` bash
git add .
git commit -am 'init'
git push origin master
```

*****
##### Stay tuned for more updates on this tutorial
*****
