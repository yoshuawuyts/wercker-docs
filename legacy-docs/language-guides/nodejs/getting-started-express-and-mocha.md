---
sidebar_current: "languages-nodejs"
---

# Getting started with Express and Mocha

You can find the code for this tutorial on [GitHub](https://github.com/mies/wercker-nodejs-api)

### Table of Contents
* Prerequisites
* Write the API
* Declare dependencies through a `package.json` file
* Create a test folder and add a Mocha unit test
* Initiate your Git repository and push your changes to Github
* Setting up the wercker add-on for Heroku
* Installing the wercker command line interface
* Deploying to Heroku

## Prerequisites
* Basic knowledge on node.js, and Express
* Have a Heroku account
* Have the Mocha testing framework installed (`npm install -g mocha`).
* A wercker account and a GitHub repository for the code you will write
* Have Python installed if you wish to use the wercker command line interface and utilize pip for third-party libraries.

## Write the API
Create an Express application with the following code:

**app.js**

``` javascript
  var express = require('express');
  var app = express();

  app.get('/', function(req, res){
    res.send("Hello Cybertron!")
  });

  app.get('/insecticons.json', function(req, res){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({insecticons : ["Shrapnel","Bombshell", "Kickback"]}));
    res.end();
  });

  var port = process.env.PORT || 5000;
  app.listen(port);

  module.exports = app;
```

## Declare our dependencies through a `package.json` file

**package.json**

``` json
  {
    "name": "wercker-nodejs-api",
    "version": "0.0.1",
    "engines" : {
    "node": "0.6.x"
    },
    "dependencies": {
      "express": "3.x",
      "nodeunit": "0.7.4",
      "supertest" : "0.4.0",
      "mocha" : "1.6.0"
    },
    "scripts": {
      "test": "mocha",
      "start": "app.js"
    }
  }
```

Next, run `npm install` to set up your local environment.

## Create a test folder and add a unittest

** test/test.js **

``` javascript
  var request = require('supertest')
    , express = require('express');

  var app = require('../app.js');

  describe('GET /', function(){
    it('respond with plain text', function(done){
      request(app)
        .get('/')
        .expect(200, done);
    })
  })

  describe('GET', function(){
    it('respond with json', function(done){
      request(app)
      .get('/insecticons.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })
```

** Note: For simple node.js applications, wercker does not need a `wercker.yml` file to run the unit tests. It automatically runs them if you've defined them correctly in your `package.json` **

## Initiate your Git repository and push your changes to Github
```
  $ git init
  $ git commit -m 'init'
  $ git push origin master
```

## Setting up the wercker add-on for Heroku

First we create a Heroku application:

	$ heroku create

Now we are ready to provision the add-on to our appliction:

	$ heroku addons:add wercker

You can now open up the wercker dashboard that will guide you through the next steps:

	$ heroku addons:open wercker

This launches your default browser and opens up the dashboard. As you can see it recommends us to install the wercker command line interface.

## Installing the wercker command line interface

As said, wercker comes with a command line interface (written in Python) that you can install via `pip`:

	$ pip install wercker

The CLI has several handy commands that you can leverage. First we will add our application to wercker via this CLI:

	$ wercker create

This will couple your application to wercker and automatically sets up your Heroku app as a deployment option. This command will also trigger an initial build.

## Deploying to Heroku

Launching the dashboard will showcase the latest build result (which should be green), that you can deploy either via the `deploy` button or through the CLI. We will do the latter:

	$ wercker deploy

The CLI will ask us which build and which deploy target we want to deploy to. It automatically defaults to the latest build, which is fine as we have only one build.
