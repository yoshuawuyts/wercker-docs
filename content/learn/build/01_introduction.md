## Introduction to builds

Builds can encompass your unit tests but also any other steps such as minifying javascript, compass compiliation, installing dependencies and packaging your code, thus readying it for deployment.
Builds are triggered through a `git push` to your version control
platform, such as GitHub or Bitbucket.

-------

### Buildsteps

Builds are the result of a run-through of the steps in the wercker pipeline. If all steps in the pipeline are succesful, a build has passed.
The outcome of a successful build is packaged and stored, readying it for deployment. Though the number of build steps varies per programming environment and type of project, all projects have several buildsteps in common:

Of course you can add your own steps as well. See the [steps section](/learn/steps/01_introduction.html)
for more information.
  
### Get code
Wercker retrieves your repository from you version control system and
clones it into a container.

### Setup environment

If no [wercker.yml](/learn/wercker-yml/01_introduction.html) file is present in the
repository, wercker will generate a default one depending on your stack.

If you have defined a service such as a database, you will need
environment variables (env vars) to connect to these services. 
In the `environment variables` step these are declared and exported. See
the [article](/learn/pipelines/03_using-env-vars.html) about env vars in
the pipeline section for more information.

### Wercker init

In the wercker-init step, the pipeline environment variables are
bootstrapped. 

### Store

If all steps are successful, the resulting folder is packaged to a zip file, to be used later in the deployment process.

In the next section we'll dive into the various ways you can work with
builds.

[Local builds &rsaquo;](/learn/build/02_local-builds.html "nav next build")
