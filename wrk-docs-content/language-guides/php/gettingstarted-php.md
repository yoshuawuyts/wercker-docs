---
sidebar_current: "languages-php"
---

# Getting started with PHP and wercker

In this guide you will develop a tiny PHP application that has an integration
test and build pipeline setup at wercker.

## Prerequisites

* Have [PHP](http://php.net) 5.4 or higher installed
* Use [Composer](http://getcomposer.org/) for dependencies
* Have a [GitHub](http://github.com) or [Bitbucket](http://bitbucket.com) account
* Have [git](http://git-scm.com/) installed

## Creating the repository

Start by creating a new git repository on your local machine. This will be the place where we store all the application source files.

``` bash
$ mkdir php-cities
$ cd php-cities
$ git init
```

## Adding index.php

Create a new file named `index.php` with the following contents.

``` php
<?php
$cities = array("Amsterdam", "San Francisco", "Berlin",
                "New York", "Tokyo", "London");

header('Content-Type: application/json');
echo json_encode($cities, JSON_PRETTY_PRINT);
?>
```

## Add index.php to the repository

Add the `index.php` file to the git repository.

``` bash
$ git add index.php
$ git commit -m 'Adds index.php'
```

## Running the service

See the service in action by serving it with the built-in webserver that PHP offers since version 5.4.

``` bash
$ php -S localhost:8000
```

Open your favorite browser and browse to [localhost:8000](http://localhost:8000) to see your service in action.

## Add project to GitHub or Bitbucket

Now add your code repository to your version control platform of choice,
either GitHub or Bitbucket.

## Add wercker.yml

With the `wercker.yml` file you can configure the build and deployment
pipeline for your application.

Create a new file named `wercker.yml` with the following content. This file will tell wercker to run the build pipeline in a
PHP environment and simply output the PHP environment information on every build.
We will add more useful steps in a bit.

``` yaml
box: wercker/php
build:
  steps:
    - script:
        name: echo PHP information
        code: |-
            php -v
            php -i
```

Add the file to your git repository:

``` bash
$ git add wercker.yml
$ git commit -m 'Adds wercker.yml that defines the build'
```

## Add project to wercker

Add your GitHub or Bitbucket project to wercker using the [wercker add application](https://app.wercker.com/#projects/create) flow.

When you've added your application, every commit you push to your git
repository will from now on trigger a build on wercker.

## Install PHPUnit

Now is time to add an integration test to verify that your PHP service works as expected.
This is very useful for future development and allows you to notice breaking changes in the future.

If you do not have PHPUnit installed, do so now via pear:

``` bash
$ pear config-set auto_discover 1
$ pear install pear.phpunit.de/PHPUnit
```

See the [installing PHPUnit](http://phpunit.de/manual/3.7/en/installation.html) for more ways to install PHPUnit.

## Adding an integration test

Create a new directory with the name `tests` that will hold the tests
for this application. Create a new file with the name `ResponseTest.php`
  with the following contents:

``` php
<?php
class CitiesResponseTest extends PHPUnit_Framework_TestCase
{
  public function testCitiesListContainsAmsterdam()
  {
    $uri = "http://localhost:8000";
    $response = http_get($uri, null, $info);

    $this->assertEquals("application/json", $info["content_type"]);
    $this->assertContains("Amsterdam", $response);
  }
}
?>
```

 Add this test to the git repository.

``` bash
$ git add tests/ResponseTest.php
$ git commit -m 'Adds integration test'
```

## Setup PHPUnit

Create a file called `tests/bootstrap.php` with the following contents:

``` php
<?php
$file = __DIR__.'/../vendor/autoload.php';
if (!file_exists($file)) {
    throw new RuntimeException('Install dependencies to run test suite.');
}

$autoload = require_once $file;
?>
```

Create a file called `phpunit.xml` in the root of the project that looks
as follows:

``` xml
<?xml version="1.0" encoding="utf-8" ?>
<phpunit bootstrap="tests/bootstrap.php">
  <testsuites>
    <testsuite name="integration tests">
      <directory>tests</directory>
    </testsuite>
  </testsuites>
</phpunit>
```

Add this test to the git repository:

``` bash
$ git add bootstrap.php
$ git add phpunit.xml
$ git commit -m 'Adds phpunit setup files'
```

## Add httpful dependency

The integration tests levarages the httpful framework to make the actual http request. Use composer to handle the dependency management
by creating a `composer.json` file in the root of your project with the
following contents:

``` json
{
    "require-dev": {
        "nategood/httpful": "*"
    }
}
```

Now install the dependencies by executing the following command.

``` bash
$ composer install
```

Add the `composer.json` and the `composer.lock` file that was just created by composer to the repository.

``` bash
$ git add composer.json
$ git add composer.lock
$ git commit -m 'Adds composer depedency files'
```

## Run PHPUnit

Start a new terminal window that hosts the service.

``` bash
$ php -S localhost:8000
```

In the other window, run php unit and see the test pass.

``` bash
$ phpunit
PHPUnit 3.7.21 by Sebastian Bergmann.

Configuration read from /Users/pjvds/dev/php-cities/phpunit.xml

.

Time: 0 seconds, Memory: 3.25Mb

OK (1 test, 2 assertions)
```

## Update wercker.yml to run your tests

Update the `wercker.yml` file by adding steps that execute our newly
created tests.

``` yaml
box: wercker/php
build:
  steps:
    - script:
        name: install dependencies
        code: |-
            composer install --no-interaction
    - script:
        name: Serve application
        code: php -S localhost:8000 >> /dev/null &
    - script:
        name: PHPUnit integration tests
        code: phpunit --configuration phpunit.xml
```

## Push commits and see wercker execute your build

You have successfully developed a simple API in PHP and pushing the
commits should trigger a build on wercker. The build consists of a step
that installs the dependencies defined in `composer.json`, serves the
application with PHP's built-in webserver and then executes the integration test.

``` bash
$ git add wercker.yml
$ git push origin master
```

Now go to your application at [wercker](http://app.wercker.com) and see your build succeed.
