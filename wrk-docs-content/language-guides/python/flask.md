---
sidebar_current: "languages-python"
---

# Getting Started with Flask

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-flask-api)

#### Table of Contents

* Prerequisites
* Set up virtualenv
* Declare dependencies through `requirements.txt`
* Add project to wercker
* Write the API
* Create a simple unit test
* Create a wercker.yml file
* Create a Procfile and Heroku deploy target
* Push your changes to Github
* Deploy to Heroku

## Prerequisites
* Basic knowledge on Python and the [Flask](http://flask.pocoo.org) micro framework
* Have Python 2.7 and [virtualenv](http://pypi.python.org/pypi/virtualenv) installed
* Use [pip](http://pypi.python.org/pypi/pip) for dependencies
* A wercker account and a GitHub repository for the code you will write

## Set up our Virtualenv

Within your project folder:


	$ virtualenv venv --distribute
	New python executable in venv/bin/python
	Installing distribute...............done.
	Installing pip...............done.


And now activate your newly created environment:


	$ source venv/bin/activate

## Declare dependencies in a `requirements.txt` file


	$ pip install flask
	$ pip freeze > requirements.txt


## Add project to wercker
Add your GitHub project to wercker using the wercker dashboard

* Goto `Add project`
* Pick GitHub and select your repository for this project

## Write the API

Create a simple Flask API

**app.py**

``` python


import os
from flask import Flask
from flask import Response
from flask import json

app = Flask(__name__)

@app.route('/')
def hello():
  return 'Hello Cybertron!'

@app.route('/stunticons.json')
def stunticons():
  data = ["Motormaster", "Dead End", "Breakdown", "Wildrider", "Drag Strip"]
  resp = Response(json.dumps(data), status=200, mimetype='application/json')
  return resp

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.debug = True
  app.run(host='0.0.0.0', port=port)
```

## Create a simple Unit Test

We're now ready to write a simple unit test for our API. We're going to leverage Python's `unittest` module for our testcase and check if the HTTP response code is a `200, OK` and if the json served by the API is the json data that we are expecting.

**app_test.py**


    from app import app

    import unittest
    import json

    class StunticonTestCase(unittest.TestCase):

      def test_index(self):

        tester = app.test_client(self)

        response = tester.get('/stunticons.json', content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            json.dumps([
                "Motormaster",
                "Dead End",
                "Breakdown",
                "Wildrider",
                "Drag Strip"
            ])
        )

    if __name__ == '__main__':
        unittest.main()


## Create a wercker.yml file

Now that we have our unit test we need to let wercker know it should run it, we do this through a `wercker.yml` file within out project folder.

**wercker.yml**

  ``` yaml
    box: wercker/python
    build:
      steps:
        - pip-install
        - script:
            name: flask tests
            code: python app_test.py
  ```


Here you can see we added two steps to our build pipeline. The first one is `pip-install`, a step that is provided by the wercker platform that runs `pip install`. The second is a custom script step that we name `flask tests` and will run `python app_test.py` as a separate buildstep.

## Create a Procfile and Heroku deploy target

We are going to deploy our simple API to Heroku, which expects a Procfile that defines our process types:

**Procfile**


	web: python app.py


From the wercker dashboard select the deployment tab and create a Heroku deploy target by adding your Heroku API key.from your [account page on Heroku](https://dashboard.heroku.com/account) or use the [add-on](http://addons.heroku.com/wercker).

## Push your code to GitHub

```bash
$ git add .
$ git commit -m 'init'
$ git push origin master
```

As you have previously added this repository to wercker, your push gets automatically picked up and triggers a build.

## Deploy your application to Heroku

If all went well you now have a green build, which is ready to be deployed to Heroku.
Select your build and hit the deploy button. Your Python Flask API is now live.
