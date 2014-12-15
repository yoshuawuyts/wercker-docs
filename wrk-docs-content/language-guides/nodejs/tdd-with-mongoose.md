---
sidebar_current: "languages-nodejs"
---

# Test-Driven-Development with Express, MongoDB and Mongoose

You can find the code for this tutorial on [GitHub](https://github.com/mies/getting-started-nodejs-mongoose)

### Table of Contents
* Prerequisites
* Declare dependencies through a `package.json` file
* Defining our wercker.yml
* Writing our tests
* Creating our API
* Defining our Mongoose Model
* Adding our application to wercker
* Create a build environment variable
* Deploying to Heroku

## Prerequisites
* Basic knowledge on node.js, the express framework and the mongoose ODM
* Have the Mocha testing framework installed (`npm install -g mocha`).
* A wercker account and a GitHub repository for the code you will write
* Have a verified Heroku account in order to deploy your application with the MongoLab addon

### Declaring our dependencies

Let us first declare our dependencies through the `package.json` format. We will be using [express](http://expressjs.com/) as our application framework, and [mongoose](mongoosejs.com), an object document mapper for MongoDB and node.js applications. For testing purposes we will leverage [Mocha](http://visionmedia.github.io/mocha/) and [SuperTest](https://github.com/visionmedia/supertest).

We also immediately include a `script` clause that calls `mocha` (exexuted through the standard `npm test` command that runs any test) so our tests will be run. Our final `package.json` file looks as follows:

``` javascript
{"name": "getting-started-nodejs-mongoose",
  "description": "Sample app built with node.js, mongoose, mongodb. Delivered by wercker.",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "3.x",
    "mongoose": "3.6.x",
    "supertest": "0.7.0",
    "mocha": "1.11.0"
  },
  "scripts": {
    "test" : "mocha",
    "start": "app.js"
  }
}
```

### Defining our wercker.yml

The [wercker.yml](http://devcenter.wercker.com/articles/werckeryml/) file declares our build and deployment pipeline. We also use it to define any services, in this case [MongoDB](http://mongodb.org), we might need. Read more on services at our [dev center](http://devcenter.wercker.com/articles/services/). Make sure your `wercker.yml` looks as follows:

``` yaml
box: wercker/nodejs
services:
  - wercker/mongodb
build:
  # The steps that will be executed on build
  steps:
    # A step that executes `npm install` command
    - npm-install
    # A step that executes `npm test` command
    - npm-test
```
Note that we use the `node.js` box and, as said, make use of `wercker/mongodb` that provides us with the `WERCKER_MONGODB_HOST` environment variable that we can use as our connection string later on. As mentioned, visit our [dev center](http://devcenter.wercker.com/articles/services/) for more information on services and the [wercker.yml](http://devcenter.wercker.com/articles/werckeryml/).

### Writing our tests

As we're doing test-driven-development, we are going to write our tests first. We will test three routes that we will create in the next paragraph. Specifically, we want to test the creation of **todo** items, the listing of **all** todo items and the details of a **single** todo item based on the author information provided in the request. As said, we will use [Mocha](http://visionmedia.github.io/mocha/) and [SuperTest](https://github.com/visionmedia/supertest) for the writing of our tests. In a separate `test` folder, create a file called `test.js` with the following contents:

``` javascript
var request = require('supertest'),
    express = require('express');

var app = require('../app.js');

describe('POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .post('/todos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({'action': 'write post on TDD with mongodb, nodejs and wercker', 'author': 'mies'})
    .expect(200, done);
  });
});

describe('GET', function(){
  it('responds with a list of todo items in JSON', function(done){
    request(app)
    .get('/todos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET', function(){
  it('responds with a single todo item in JSON based on the author', function(done){
    request(app)
    .get('/todos/mies')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});
```
In this file, we see the three separate use-cases that we want to test, now that we know what the results should be of our API, let's go ahead and write it.

### Creating our API

Now, let's write our API. Create a file called `app.js` that looks as follows, we will go over it in a bit.

``` javascript
// Requires

var express = require('express');
var mongoose = require ("mongoose");

var app = express();
app.use(express.bodyParser());

var Todo = require('./models/todo');

// Configure express
app.configure('development', function() {
  mongoose.connect('mongodb://localhost/todos');
});

app.configure('test', function() {
  mongoose.connect('mongodb://'+ process.env.WERCKER_MONGODB_HOST + '/todos');
});

app.configure('production', function() {
  mongoose.connect('mongodb://localhost/todos');
});

// Routes
app.get('/', function(req, res) {
  res.send({'version' : '0.0.1'});
});

app.get('/todos', function(req, res) {
  Todo.find(function(err, result) {
    res.send(result);
  });
});

app.get('/todos/:author', function(req, res) {
  Todo.findOne({'author': req.params.author}, function(err, result) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.send({result: result});
    }
  });
});

app.post('/todos', function(req, res) {
  new Todo({action: req.body.action, author: req.body.author}).save();
  res.send({'new todo' : req.body.action});
});

// startup server
port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port number: ", port);
});

module.exports = app;

```

We define our, `dev`, `production` and `testing` environments with any specifcs we might need. For instance, our development environment might have a local instance of MongoDB running, whereas in our `test` and `production` environments these settings obviously differ. In the case of wercker, we utilize the environment variable, `WERCKER_MONGODB_HOST`, provided by defining our dependency on MongoDB in the previously defined `wercker.yml` file. We do not yet know what our production environment will look like (stay tuned for part 2 of this post), so we'll just leave the connection string to `localhost`.

#### Defining our Mongoose Model

We also need to create a model object that will define what a **todo item** actually looks like, and what kind of attributes it has.

Create a file called `todo.js` in a folder named `models` with the following contents:

``` javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var todoSchema= new Schema({
  action: String,
  author: String,
  creationDate: {type: Date, 'default': Date.now},
});

module.exports = mongoose.model('Todo', todoSchema);

```
A **todo** item has an *action* (the todo!), an author (who created it) and a creation date that defaults to the date when an item was inserted in the database.

Now that our application, models and tests are complete, we are ready test and deploy it with wercker.

### Adding our application to wercker

Sign in to wercker and click on the `add application` button. Make sure you have your repo on GitHub and have connected GitHub to wercker, as showcased below.

![image](http://f.cl.ly/items/1k0l1o1g31063x1r020X/Screen%20Shot%202013-06-19%20at%204.37.39%20PM.png)

#### Create a build environment variable

We have previously defined a `dev`, `test` and `production` setting in our application. The express framework uses the `NODE_ENV` environment variable to determine which setting to pick. For wercker we need to use the `test` setting, so how do we set this up? In wercker you can set build specific environment variables. In the **settings tab** of your application go to the section that reads **build**. Here we can set the `NODE_ENV` variable with the value `test` as shown below:

![image](http://f.cl.ly/items/1X172r3h2k272A1Y3h2S/Screen%20Shot%202013-06-19%20at%206.00.25%20PM.png)

After you've finished adding your application, we are ready to push our repository.

``` bash
git add .
git commit -am 'init'
git push origin master
```

This will trigger a build on wercker which looks like this:

![image](http://f.cl.ly/items/3h1K2f3g1S242f3X0o1T/Screen%20Shot%202013-06-19%20at%204.46.42%20PM.png)

### Deploying our app

We will deploy our application to Heroku, so make sure you have a (verified) [Heroku](http://heroku.com) account and have installed the [Heroku Toolbelt](http://toolbelt.heroku.com). Let's first create an app:

``` bash
heroku create

Creating guarded-atoll-9149... done, stack is cedar
http://guarded-atoll-9149.herokuapp.com/ | git@heroku.com:guarded-atoll-9149.git
Git remote heroku added
```
Now we need a MongoDB instance in the cloud! Fortunately, Heroku has a Marketplace (wercker is [on it](http://addons.heroku.com/wercker) by the way) filled with addons. One of which are our friends at [Mongolab](http://mongolab.com), so let's use their [add-on](https://addons.heroku.com/mongolab) to [provision](https://devcenter.heroku.com/articles/mongolab) a MongoDB database:

``` bash
heroku addons:add mongolab

Adding mongolab on guarded-atoll-9149... done, v3 (free)
Welcome to MongoLab.  Your new subscription is ready for use.  Please consult the MongoLab Add-on Admin UI for more information and useful management tools.
Use `heroku addons:docs mongolab` to view documentation.
```

For our `test` environment we used the `WERCKER_MONGODB_HOST` environment variable that was provided by wercker and was defined through the `wercker.yml`. We now need a similar environment variable for our production setting which is powered by Heroku and Mongolab. We can retrieve this environment variable, again via the Heroku command line interface:

``` bash
heroku config | grep MONGOLAB_URI

MONGOLAB_URI: mongodb://heroku_app3489u7438034:ofs0gfjfsdgsdfdsgfobfsd345ffsd3ej738@dfsdf45fsd628.mongolab.com:31628/heroku_app16434933244
```

We now need to use this environment variable, `MONGOLAB_URI`, in our actual application. Modify the **configure** section in your `app.js` file in the following way:

``` javascript
// Configure express
app.configure('development', function() {
  mongoose.connect('mongodb://localhost/todos');
});

app.configure('test', function() {
  mongoose.connect('mongodb://'+ process.env.WERCKER_MONGODB_HOST + '/todos');
});

app.configure('production', function() {
  mongoose.connect('mongodb://' + process.env.MONGOLAB_URI + '/todos');
});
```

Similarly to adding the `NODE_ENV=test` environment variable to wercker in the previous post, we need to do the same for Heroku, but now of course `NODE_ENV=production` as Heroku is our production environment.

``` bash
heroku config:set NODE_ENV=production

Setting config vars and restarting guarded-atoll-9149... done, v6
NODE_ENV: production
```
We now have succesfully set up our production environment consisting of Heroku and MongoLab.

### Creating a Heroku Procfile

Heroku needs to know which process to run on their cloud platform to actually launch your application. This is done throught the Heroku [Procfile](https://devcenter.heroku.com/articles/procfile).

Create a file called `Procfile` in your project directory with the following line of code:

```
web: node app.js
```

Let's add this file to our repository and push it to our version control system:

``` bash
git add Procfile
git commit -am 'added Procfile'
git push origin master
```

This will trigger a new build on wercker (which should pass as we didn't change anything dramatic) and we're now ready to deploy our application.

### Add deploy target

First, we add a deploy target. Go to your settings tab for your application on wercker and look for the **deploy targets** section. Although wercker has an [add-on] on the Heroku Marketplace, making deployment even easier, we are going to add Heroku manually as a deploy target.

![image](http://f.cl.ly/items/352B0a0W1Y0b1b0n0W0I/Screen%20Shot%202013-06-20%20at%2012.32.30%20PM.png)

As the page indicates, retrieve your Heroku API key from your [Heroku Dashboard](https://dashboard.heroku.com/account) and paste in the form. Next, you are presented with a form where you can *name* your deploy target (let's go with *production*) and are able to auto deploy specific branches. We've previously written a post on auto-deployment [here](http://blog.wercker.com/2013/06/05/Autodeployment.html). We are also able to either select an existing Heroku app that we want to deploy to, or create one. I'm going to pick the application I've previously created using the `heroku create` command and to which I've also added the [MongoLab add-on](https://addons.heroku.com/mongolab)

![image](http://f.cl.ly/items/2u1r3F2T3t2F2i2q2Q38/Screen%20Shot%202013-06-20%20at%2012.35.08%20PM.png)

Let's deploy our application!

### Deploying our application

Go to the latest green build on wercker and hit the *deploy this build* button. A pull down menu will appear and you can select the target ('production') that you've just created,

![image](http://f.cl.ly/items/2m151d1l3i1o3V3d3P3L/Screen%20Shot%202013-06-20%20at%201.29.14%20PM.png)

If you go to the **deploys** tab you can see your deploy in action:

![image](http://f.cl.ly/items/3q3d13263H3r2k2h3w1Y/Screen%20Shot%202013-06-20%20at%201.24.59%20PM.png)

If we visit the root of our application on Heroku we can see it in action:

![image](http://f.cl.ly/items/2u0D3m062M40032z0r1Y/Screen%20Shot%202013-06-20%20at%201.55.05%20PM.png)
