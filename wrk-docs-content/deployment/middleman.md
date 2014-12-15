# Deploying your Middleman static site to S3 with wercker

[Middleman](http://middlemanapp.com) is another static site generator, that amongst others power this dev center. In this article we will outline how you can streamline the deployment pipeline of your Middleman applications to Amazon Web Services S3 with wercker.

### Prerequisites

* You have [created a free account](https://app.wercker.com/users/new/) at wercker.
* You have the code of your Middleman site hosted at [Github](http://github.com) or [Bitbucket](http://bitbucket.com).
* You have cloned a repository that contains a [Middleman](http://middlemanapp.com) site locally.
* You have an [Amazon S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html) that will serve your website.

### Creating our blog and adding it to wercker

As said we'll be using the Middleman blogging extension, so make sure you *gem install* it.

```bash
middleman init --template blog

git init

git add .

git commit -am 'init'

git push origin master
```

Congrats, you have just created your blog with Middleman; now lets add it to wercker! Log into wercker and add your repository to wercker by clicking the 'add application button'. Select your repository from either GitHub or Bitbucket. Follow the steps given and make sure you configure [access to your repository](/articles/gettingstarted/web.html)


### Adding our S3 deploy target

We now need to specify a custom deploy target on wercker that we will use to setup the details for Amazon S3. Go to the settings tab for your application and under the section 'Deploy Target' click add 'Add deploy target'.

Here you can fill in the name for your deploy target (for instance 'S3' or 'staging') and, if you prefer, select the [auto deploy option](http://blog.wercker.com/2013/06/05/Autodeployment.html) that allows you to automatically deploy specific branches (remember to auto deploy with care!).

Next you want to add the following [environment variables](http://12factor.net/config) that the build pipeline must leverage to sync your middleman app with S3.

![image](http://f.cl.ly/items/1z3B0Y221P1i2M1u1f1q/Screen%20Shot%202013-06-07%20at%204.02.29%20PM.png)

Here you enter the details of your Amazon S3 bucket. The key and secret key can be found in the [AWS security credentials](https://portal.aws.amazon.com/gp/aws/securityCredentials) page.

### Creating our wercker.yml

Now it is time to define your build process. This is the pipeline that is run each time changes are pushed to the git repository.

Create a new file called `wercker.yml` in the root of your repository with the following content (please make sure you indent the wercker.yml file correctly):

```yaml
box: wercker/ruby
build:
    steps:
        # Execute the bundle install step, a step provided by wercker
        - bundle-install
        # Execute a custom script step.
        - script:
            name: middleman build
            code: bundle exec middleman build --verbose
deploy:
    steps:
        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
```

The `s3sync` step synchronises a source directory with an Amazon S3 bucket. The `key_id`, `key_secret` and `bucket_url` options are set to the information from the deploy target, previously created on wercker. Only the `source` option is _hard configured_  to *build/* folder. This is the default folder with the output from the `middleman build` command, which was previously executed in the build phase.

After you've created the `wercker.yml` add it to your repository by executing the following commands in your terminal.

```bash
git add wercker.yml
git commit -m 'Add wercker.yml'
git push origin master
```
</br>

This automatically triggers a new build on wercker as you can see below.

![image](http://f.cl.ly/items/3z2N3k1B1E1l2C1V0B0j/Screen%20Shot%202013-06-07%20at%204.24.46%20PM.png)

If everything went well you are now ready to deploy this green build (if you didn't activate auto deploy of course!) to the S3 bucket that you have defined as a deploy target in a previous step. Select your build and click on the 'Deploy this build' button.

![image](http://f.cl.ly/items/3q2h0M333o0k2K3l2P2a/Screen%20Shot%202013-06-07%20at%204.35.06%20PM.png)

Your middleman application is now live on S3!

-------

<div class="authorCredits">
    <span class="profile-picture">
        <img src="https://secure.gravatar.com/avatar/d4b19718f9748779d7cf18c6303dc17f?d=identicon&s=192" alt="Micha Hernandez van Leuffen"/>
    </span>
    <ul class="authorCredits">

        <!-- author info -->
        <li class="authorCredits__name">
            <h4>Micha Hernandez van Leuffen</h4>
            <em>
                Micha is cofounder and CEO at wercker.
            </em>
        </li>

        <!-- info -->
        <li>
            <a href="http://beta.wercker.com" target="_blank">
                <i class="icon-company"></i> <em>wercker</em>
            </a>
            <a href="http://twitter.com/mies" target="_blank">
                <i class="icon-twitter"></i>
                <em> mies</em>
            </a>
        </li>

    </ul>
</div>

-------
##### last modified on: June 10, 2013
-------
