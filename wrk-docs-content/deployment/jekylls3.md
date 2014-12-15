#Deploying static sites to S3 with Jekyll and wercker

We usually associate *deployment* with servers and infrastructure, but for static site deployments such as blogs, we can leverage [Amazon Web Services' S3](http://aws.amazon.com/s3/) to host our static assets. In this article we will go into the details of deploying your [Jekyll](http://jekyllrb.com)) static site to S3 with wercker.

_note: a long form post is available at our [blog](http://blog.wercker.com/2013/05/31/simplify-you-jekyll-publishing-process-with-wercker.html)_

## Prerequisites

* You have [created a free account](https://app.wercker.com/users/new/) at wercker.
* You have the code of your jekyll site hosted at [Github](http://github.com) or [Bitbucket](http://bitbucket.com).
* You have cloned a repository that contains a [jekyll](http://jekyllrb.com) site locally.
* You have an [Amazon S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html) that will serve your website.

## Add your application to wercker

First you need to add an application to wercker. [Sign in](http://app.wercker.com/) at wercker and click the `add an application` button and subsequently select your repository.

Follow the steps given and make sure you configure [access to your repository](/articles/gettingstarted/web.html)


## Creating the wercker.yml
Now it is time to define your build process. This is the pipeline that will get executed everytime changes are pushed to the git repository.

Create a new file called `wercker.yml` in the root of your repository with the following content:

```yaml
    # our build should run within a Ruby box
    box: wercker/ruby
    build:
      steps:
        # Run a smart version of bundle install
        # which improves build execution time of
        # future builds
        - bundle-install

        # A custom script step
        # that actually builds the jekyll site
        - script:
            name: generate site
            code: bundle exec jekyll build --trace
```

****
##### note: Please make sure that your wercker.yml is correctly indented as above
****


</br>
Lets briefly go through the wercher.yml file. The first line contains `box: wercker/ruby` which defines that you want to run the build in a Ruby box (by default this is Ruby version 1.9.3p429).
The second line describes the `build` section that consists of steps, in this case there are two steps. These steps are performed during the execution of the build process. The first step `bundle-install` is a smart version of the `bundle install` command that leverages caching so future builds will run faster. The second step `script` executes the script that is defined the `code` clause that consists of a single command `bundler exec jekyll build --trace`. This step actually builds your Jekyll site.

After you created the `wercker.yml` add it to your repository by executing the following commands.

```bash
    git add wercker.yml
    git commit -m 'Add wercker.yml'
    git push origin master
```
</br>

Because you have created an application for this repository at wercker it should now start building.

## Add deployment target information
Now you have automated your content generation process that will get executed every time you push your code to git. This is helpful to catch jekyll errors early, but without  deployment it doesn't help your actual live website. Let's add a deploy target to your application on wercker so we can close the loop!

Go to your application at [app.wercker.com](https://app.wercker.com) and click on the settings tab.

A new form opens that you can use to enter information that is passed to the deployment context. Here you enter the details of your Amazon S3 bucket. The key and secret key can be found in the [AWS security credentials](https://portal.aws.amazon.com/gp/aws/securityCredentials) page.

![image](http://f.cl.ly/items/2K3m0f332m1v2V1v1y0c/deploy-details.png)

We leverage environment variables, in faith with the [12 factor design principles](http://www.12factor.net/config).

_note: these aren't my real keys… duh!_

If you host your website somewhere else you can leverage the custom deploy target for any type of deployment (for instance FTP or rsync)

## Add deployment steps
The current `wercker.yml` file contains the steps that are executed when the application is built. Now you want to add steps that are run when the application is actually deployed. These steps are performed in a context that hold the information you have entered in the previous section; key, secret and s3 url.

Add the following to the end of your current `wercker.yml` file:

```yaml
    deploy:
      steps:
        - s3sync:
            key_id: $KEY
            key_secret: $SECRET
            bucket_url: $URL
            source_dir: _site/
```
</br>

The `s3sync` step synchronises a source directory with an Amazon S3 bucket. The `key_id`, `key_secret` and `bucket_url` options are set to the information from the deploy target, previously created. Only the `source_dir` option is _hard coded_ (or should I say _hard configured_) to `_site/`. This is the directory where Jekyll stores the output.

We could also _hard code_ the key and key secret in here, but that is not something you want to put in your git repository. Especially not when you repository is public like [mine](https://github.com/pjvds/born2code.net).

Commit the changes of the `wercker.yml` file and push them to your repository.

```bash
    git add wercker.yml
    git commit -m 'Add deployment section'
    git push origin master
```
</br>

## Deploy it!
You have pushed changes to your repository, thus wercker created another build. Now the deployment information that you have added in the previous steps can be used to deploy the website. This can be done for every successful build in your application by clicking the blue deploy button.

![image](http://f.cl.ly/items/3G1u1P0Y3l0p0X21270L/deploy-it.png)

## Need help?
Let me help you! Just [tweet me](http://twitter.com/pjvds) or sent me an e-mail [pj@wercker.com](mailto:pj@wercker.com).

## Learn more

* You can learn more from [my wercker.yml file](https://github.com/pjvds/born2code.net/blob/master/wercker.yml).
* See my [own personal blog, born2code.net,](https://app.wercker.com/#project/5198a619a4dd999717000331) at wercker.
* More about the wercker.yml can be found at the [wercker devcenter](http://devcenter.wercker.com/articles/werckeryml/).
