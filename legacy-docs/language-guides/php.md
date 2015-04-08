---
sidebar_current: "languages-php"
---

# PHP

Below we go into detail on how to get started with wercker and php. You can also find guides specific to PHP below.

## Guides

* [Getting started with PHP and wercker](http://devcenter.wercker.com/articles/languages/php/gettingstarted-php.html)

## Sample application

There is an [getting-started-php](http://github.com/wercker/getting-started-php) application that demonstrates dependency management via Composer and running an integration test with PHPUnit.

## PHP box

The `wercker/php` box runs on ubuntu 12.04 and provides multiple versions of PHP. It also includes XDebug, PEAR, Pyrus, Composer and PHPUnit. For PHP projects your [wercker.yml](/articles/werckeryml/) could look as follows:

``` yaml
box: wercker/php
build:
  steps:
    - script:
        name: Install extensions
        code: |-
          pecl install memcache
          pecl install SQLite
    - script:
        name: install dependencies
        code: |-
            composer install --no-interaction
    - script:
        name: Serve application for integration tests
        code: php -S localhost:8000 >> /dev/null &
    - script:
        name: PHPUnit integration tests
        code: phpunit --configuration phpunit.xml
```

At the top you see the 'box' definition that states we want the 'wercker/php' box. Next, there is a 'build' clause, this defines your build pipeline on wercker. In the `wercker.yml` above we have defined several custom steps.

## PHP versions

There are three versions available on the wercker PHP box. The previous stable release PHP 5.3, the current stable release PHP 5.4 and the upcoming release PHP 5.5. By default the current stable release 5.4 is active.

    $ php --version
    PHP 5.4.16 ...

The wercker PHP box uses [phpenv](https://github.com/CHH/phpenv) to manage the versions. You can switch the PHP version with the `phpenv global` command:

    $ php --version
    PHP 5.4.16 ...
    $ phpenv global 5.5
    $ php --version
    PHP 5.5.0 ...

Here is an example of a script step that activates PHP 5.3:

	- script:
		name: Activate PHP 5.3
		code: phpenv global 5.3

## PHP configuration

As the PHP box has phpenv installed, you can use `phpenv config-add` to add a custom configuration file:

	- script:
		name: Add project-config.ini
		code: phpenv config-add project-config.ini

You must have a `project-config.ini` file inside your code repository. Here is an example of the possible contents of this file:

	date.timezone = "Europe/Amsterdam"

You could also add a line to the existing configuration file:

	echo 'date.timezone = "Europe/Amsterdam"' >> $HOME/.phpenv/versions/$(phpenv version-name)/etc/php.ini

## Available tools

The following package managers are installed [PEAR](http://pear.php.net/), [Pyrus](http://pear.php.net/manual/en/pyrus.about.php) and [Composer](http://getcomposer.org/).

### Installing Composer packages

Composer is a tool for dependency management in PHP. Composer is globally installed on the PHP box and the version does not change when changing the PHP version with phpenv.

Here is an example of a script step that installs all the dependencies:

	- script:
	    name: install dependencies
	    code: composer install

If you have a `require-dev` section in your `composer.json` you must specify the `--dev` option to install the packages listed in `require-dev`:

	- script:
	    name: install dependencies
	    code: composer install --dev

By default composer installed only stable packages. This behaviour can be changed by setting the `--stability` option:

	- script:
	    name: install dependencies
	    code: composer install --dev

#### Composer lock file

After installing dependencies, Composer writes the list of the exact versions it installed into a `composer.lock` file. This locks the project to those specific versions. It is a best practise to commit this `composer.lock` along with `composer.json` into version control to ensure wercker uses the same versions of dependencies as in your local development environment. This also guarantees that the same versions of dependencies are used among the full development team.

This means that if any of the dependencies get a new version, you won't get the updates automatically. To update to the new version, use the `update` on your local development machine and commit the updated `composer.lock` file:

	$ php composer.phar update
	$ git add composer.lock
	$ git commit -m 'Updates all dependencies to new version'

If you only want to update one dependency:

	$ php composer.phar update monolog/monolog
	$ git add composer.lock
	$ git commit -m 'Updates monolog to new version'

### Installing pear packages

Pear is a package manager for PHP. Pear is globally installed on the PHP box and the version does not change when changing the PHP version with phpenv.

Here is an example of an script step that installs the `pear/PHPDoc` package with pear.

	- script:
	    name: install dependencies
	    code: |-
	    	pear install pear/PHPDoc
	    	phpenv rehash

After the install, you should refresh your path by executing a `php rehash`.

### Installing pyrus packages

Pyrus is the successor of pear and is a package manager for PHP. Pyrus is globally installed on the PHP box and the version does not change when changing the PHP version with phpenv.

Here is an example of an script step that installs the `pear/PHPDoc` package with pear.

	- script:
	    name: install dependencies
	    code: |-
	    	pyrus install pear/PHPDoc
	    	phpenv rehash

After the install, you should refresh your path by executing an `php rehash`.

## Running tests with PHPUnit

PHPUnit is a test runner for PHP. PHPUnit is globally installed on the PHP box and the version does not change when changing the PHP version with phpenv.

	- script:
	    name: run unit tests
	    code: |-
	    	phpunit

You need to have a `bootstrap.php` for your tests that requires the `vendor/autoload.php` file. Here is an example of such:

	<?php
	$file = __DIR__.'/../vendor/autoload.php';
	if (!file_exists($file)) {
	    throw new RuntimeException('Install dependencies to run test suite.');
	}

	$autoload = require_once $file;
	?>

And you need to add this `bootstrap.php` file to your `phpunit.xml`:

	<?xml version="1.0" encoding="utf-8" ?>
	<phpunit bootstrap="tests/bootstrap.php">
	  <testsuites>
	    <testsuite name="integration tests">
	      <directory>tests</directory>
	    </testsuite>
	  </testsuites>
	</phpunit>

If your tests are integration tests, you can serve your application with the following script step:

    - script:
        name: Serve application
        code: php -S localhost:80 >> output.txt &

This will host your PHP application on port 80. All output will be piped to `output.txt` to keep your log clean. The ampersand (`&`) at the end of this command makes the command asynchronous.

## Installing extensions

The PHP box comes with PECL which can be used to compile and install extensions to the environment. Installing an extension with PECL will automatically activate them as well. In other words, it will update the php.ini accordingly. Here is an example of a script step that installs `memcache` and `SQLite` extension:

	- script:
		name: Install extensions
		code: |-
			pecl install memcache
			pecl install SQLite

Some extensions ask for user input during the installation. The `apc` package is an example of this:

	$ pecl install apc
	Downloading APC-3.1.13.tgz ...
	Starting to download APC-3.1.13.tgz (171,591 bytes)
	.....................................done: 171,591 bytes
	55 source files, building
	running: phpize
	Configuring for:
	PHP Api Version:         20100412
	Zend Module Api No:      20100525
	Zend Extension Api No:   220100525
	Enable internal debugging in APC [no] :

If this was a build on wercker it would eventually timeout. To solve this you can print user input to the process. Here is a script step that prints a newline (enter) to the pecl install command:

	- script:
		name: Install extensions
		code: echo '\n' | pecl install apc
