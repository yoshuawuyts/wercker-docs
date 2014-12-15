---
sidebar_current: "introduction-builds"
---

# Builds

A build is an execution run on wercker.
This can encompass your unit tests but also any other steps such as minifying javascript, compass compiliation, installing dependencies and packaging your code, thus readying it for deployment.
Builds are triggered through a `git push` to your version control platform, such as GitHub and Bitbucket.

-------

### Buildsteps

Wercker receives a notification through a [webhook](https://help.github.com/articles/post-receive-hooks) that new code has been pushed.

Though the number of build steps varies per programming environment and type of project, all projects have several buildsteps in common:

***
##### 1. get code
***
Wercker retrieves your repository from you version control system and clones it into a sandboxed environment.

***
##### 2. wercker.yml
***
If no [wercker.yml](/articles/werckeryml/) file is present in the repository, wercker will generate one.
Upon adding an application wercker will analyze the repository and try to find a box and default steps that match the code.
For example, if wercker detects that the repository is a ruby project it
will use the `wercker/ubuntu12.04-ruby1.9.3` box and add steps that will
install the **gems**.

***
##### 3. environment variables
***
If you have defined a service such as a database, you will need environment variables to connect to these services. In the `environment variables` build step these are declared.

***
##### 4. platform
***
In the platform step, the programming environment is bootstrapped. For Ruby this means rbenv, for Python virtualenv and for Node.js nodeenv. The default version of the programming language is used. You can use version in [wercker.yml](/articles/werckeryml/) to override this version number.

***
##### 5. dependencies
***
This buildstep installs the depencies of your project. For Ruby this means bundle install, for Python pip install -r requirements.txt, for Node.js npm install and for blank make

***
##### 6. package
***
If all steps are successful, the resulting folder is packaged to a zip file, to be used later in the deployment process.

### Adding your own Buildsteps

By editing the `wercker.yml` file you are able to define a build step that executes a compass compile. Below you see a `script step` declaration that executes a [compass](http://compass-style.org) compilation of [sass](http://sass-lang.com/) assets.


    build:
        steps:
            - script:
                name: compass compile
                code: |
                    sudo gem install compass
                    sudo gem install zurb-foundation -v 4.1.2 --no-rdoc --no-ri
                    compass compile -s compressed

***
See the [section](/articles/werckeryml/) on `wercker.yml` for more information.
