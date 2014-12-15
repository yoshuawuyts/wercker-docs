# Available Commands

Assuming you have succesfully installed the wercker command line interface, you should now be able to run it:

    $ wercker
    -----------------------
    welcome to wercker-cli
    -----------------------

    Usage:
        wercker create
        wercker link
        wercker status
        wercker deploy
        wercker builds
        wercker open
        wercker open targets
        wercker queue
        wercker apps
        wercker login
        wercker logout
        wercker targets add
        wercker targets list
        wercker targets details
        wercker update
        wercker --version
        wercker --help

There's also an article in the getting started section explaning showing some basic usage of the wercker command (see [getting started with the wercker cli](/articles/gettingstarted/cli.html))

## Commands
Wercker supports the following commands:

### create
Adds an application to wercker. This will create a `.wercker` file in
your repository.

### link
Link a repository back up to an application on wercker. Useful if a repository does not contain the .wercker file.

### status
Shows the status of the most recent build.

### deploy
Deploy a build to a deploy target.

### login
Logs the user in and stores the token on the machine.

### logout
Removes the login token from the machine.

### open
Launches your default browser and opens your application page on wercker

### open targets
Opens a webpage showing a deploy target's details.

### apps
List applications the user has access to.

### builds
Shows a list of the most recent builds and their results.

### targets add
Add a heroku application as a deploy target.

### targets list
Retrieves a list of all deploy targets for the current application.

### targets details
Alias for open targets.

### update
Checks if there is a new version of the CLI available.
