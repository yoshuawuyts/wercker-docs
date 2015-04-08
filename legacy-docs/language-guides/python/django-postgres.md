---
sidebar_current: "languages-python"
---

# Getting Started with Django and Postgres

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-django-example)

### Table of Contents
* Prerequisites
* Set up virtualenv
* Declare dependencies
* Create base structure
* Update `settings.py`
* Create a wercker.yml file
* Push your changes
* Add to wercker

## Prerequisites
* Knowledge of Python and Django
* Have Python 2.7 and [virtualenv](http://pypi.python.org/pypi/virtualenv) installed
* Use [pip](http://pypi.python.org/pypi/pip) for dependencies
* A wercker account and a GitHub repository for the code you will write
* wercker command line interface (install through `pip install wercker`)

## Set up virtualenv

First we set up a virtual environment for our application:

``` bash
  $ virtualenv venv --distribute
  New python executable in venv/bin/python
  Installing distribute...............done.
  Installing pip...............done.
```

And now activate your newly created environment:

``` bash
  $ source venv/bin/activate
```

## Declare dependencies

For this application we install django, the python postgres driver and Kenneth Reitz's excellent [dj-database-url](https://github.com/kennethreitz/dj-database-url) module

``` bash
$ pip install django psycopg2 dj-database-url
```

Now go to the empty repository and define our dependencies in a requirements.txt file

    django
    psycopg2
    dj-database-url


## Create base structure
We can now create our django project, by running django-admin.py.

``` bash
$ django-admin.py startproject wercks .
```

## Update your settings.py

Define your database in `wercks/settings.py` as:

``` python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        env="WERCKER_POSTGRESQL_URL",
        default="sqlite:///local_db.sqlite"
    )
}
```
****
##### Note: the default option for dj_database_url is not needed, but may be usefull for testing locally. #####
****

Let's add a simple demo app:

``` bash
$ python manage.py startapp wercksdemo
```

And append it to the INSTALLED_APPS list in the wercks/settings.py, resulting in:

``` python
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    # 'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    'wercksdemo',
)
```

Create a model, by editing `wercksdemo/models.py`

``` python
from django.db import models


class City(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name
```

Next: the view. We will test with a very simple view that will say hello world and will display all the cities in the world (according to its database). Edit the `wercksdemo/views.py` to:

``` python
# Create your views here.
from django.http import HttpResponse
from django.template import Template, Context
from wercksdemo.models import City

def home(request):
    template = Template(
        """Hello, world! Here are all the cities of the world:
{% for city in cities %}{{city.name}}{% endfor %}"""
    )

    cities = City.objects.all()
    context = Context({"cities": cities})

    return HttpResponse(template.render(context))
```

Now let's add some content for testing. To enable this we need to create a fixture folder in wercksdemo and create a cities.json file. The fixture will contain two cities (Amsterdam and San Francisco).

``` javascript
[{"pk": 1, "model": "wercksdemo.city", "fields": {"name": "San Francisco"}}, {"pk": 2, "model": "wercksdemo.city", "fields": {"name": "Amsterdam"}}]
```

And finally the test file: `wercksdemo/tests.py`

``` python
from django.test.client import Client
from django.test import TestCase


class HomeTest(TestCase):
    fixtures = ["cities.json"]

    def test_has_world(self):
        c = Client()

        response = c.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "world")

    def test_has_amsterdam(self):
        c = Client()

        response = c.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Amsterdam")

```

## Create a wercker.yml file

``` yaml
  box: wercker/python
  services:
    - wercker/postgresql
  build:
    steps:
      - script:
          name: test
          code: |
            python manage.py test wercksdemo -v2
```

## Push your changes

``` bash
$ git add .
$ git commit -am 'init'
$ git push origin master
```

## Add repository to wercker

Run `wercker create` and follow the instructions. It basically will do 3 things:
1. Create the application and validate permissions
2. try to find heroku deploy targets (but we will do this later manually)
3. trigger a build on wercker.

See [getting started using the cli](/articles/gettingstarted/cli.html) for more information on the `wercker create` command.

See the result by running:
`wercker open`

Happy coding!
