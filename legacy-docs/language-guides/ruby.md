---
sidebar_current: "languages-ruby"
---

# Ruby

Wercker has built in support for Ruby and will do some introspection to correctly assess if you are running a Ruby project. Wercker currently support Ruby through RVM. The box containing RVM is called [wercker/rvm](https://app.wercker.com/#explore/boxes/wercker/rvm). To use this box use the following `wercker.yml`:

``` yaml
box: wercker/rvm
```

## Versions

The current Ruby versions installed on this box are:

- ruby-1.9.3-p484
- ruby-2.0.0-p247
- ruby-2.0.0-p353 (default)
- ruby-2.1.0

We have [open-sourced](https://github.com/wercker/box-rvm) our box definitions at GitHub, so feel free to take a peek, fork it and create your own.

***
##### note that box definitions are still in progress and subject to change
***

## Common Steps

Through the `wercker.yml` file you are able to define your own build steps. Below are a few common steps for Ruby applications.

### rvm-use

RVM automatically changes the Ruby version according to a [few rules](https://rvm.io/workflow/projects). If you want to force a certain Ruby version then you can use the [wercker/rvm-use](https://app.wercker.com/#explore/steps/wercker/rvm-use) step:

``` yaml
box: wercker/ruby
build:
    steps:
        - rvm-use:
            version: ruby-1.9.3-p484
```

In the above example we've changed the Ruby version to `ruby-1.9.3-p484`. All steps that follow will use that Ruby version.

### bundle-install

For ruby you will want to execute `bundle install` to install your dependencies:

``` yaml
box: wercker/ruby
build:
    steps:
        - bundle-install
```
In the above example we will execute the `bundle install` command.

### rake

`Rake` or other commands can be executed through the `script` clause, like so:

``` yaml
box: wercker/ruby
build:
    steps:
        - bundle-install
        - script:
            name: rake
            code: bundle exec rake
```
Please note you have to indent your `wercker.yml` correctly.

## Guides

Below you'll find several articles on developing Ruby applications with wercker:

* [Getting Started with a Sinatra API](/articles/languages/ruby/getting-started-sinatra-api.html "Getting Started with a Sinatra API ").
* [Getting Started with Rails and Heroku](/articles/languages/ruby/rails-heroku.html "Getting Started with Rails and Heroku").
* [Setting up your Rails4 project](/articles/languages/ruby/settingup-rails4.html "Setting up your Rails4 project").

## Common problems

### Unable to install gems due to debugger-ruby\_core\_source gem

#### Problem

When trying to install Ruby Gems using bundle install, you receive the
following error (version varies):

```
Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.

    /usr/local/bin/ruby extconf.rb
checking for rb_method_entry_t.called_id in method.h... no
checking for rb_control_frame_t.method_id in method.h... no
checking for rb_method_entry_t.called_id in method.h... no
checking for rb_control_frame_t.method_id in method.h... no
Makefile creation failed
**************************************************************************
No source for ruby-2.0.0-p353 provided with debugger-ruby_core_source gem.
**************************************************************************
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.
```

#### Solution

Use bundler on your development machine to update the
`debugger-ruby_core_source` gem to it's latest version:

```
bundle update debugger-ruby_core_source
```

#### Details

The `debugger-ruby_core_source` gem is a gem which provides access to the Ruby
headers for other Gems. This is tightly coupled with the Ruby version which you
are using. If you are getting the above error message, then it basicly means
that the `debugger-ruby_core_source` doesn't support the Ruby version you're
using. The `debugger-ruby_core_source` gem supports most major Ruby version. So
you need to make sure you have a supported version and are using the latest
version of `debugger-ruby_core_source`.
