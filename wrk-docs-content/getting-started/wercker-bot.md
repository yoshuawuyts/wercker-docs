---
sidebar_current: "gettingstarted"
---

# *- outdated -* A note on werckerbot

****
##### NOTE: Werckerbot is replaced by a more flexible solution. For information on our current solution see: [repository access](/articles/gettingstarted/repositoryaccess.html)
****

Wercker needs read permissions to run your tests each time you do a `git
push`. For this to work, you have to give the **werckerbot** user, which is
present on both [GitHub](http://github.com) and [Bitbucket](http://bitbucket.org), read
permissions to your repository.

### Using the web interface

This is made apparent in both the **add application**
flow as seen below:

![image](http://f.cl.ly/items/0b1R0D2M2l033K073w2t/wercker-bot.png)

### Using the CLI

When adding a project through the [command line
interface](/articles/cli/) you are also made aware of this:

```bash
github repository detected...
Selected repository url is
git@github.com:flenter/getting-started-python.git

Creating a new application
a new application has been created.
In the root of this repository a .wercker file has been created which
enables the link between the source code and wercker.

Checking werckerbot permissions on the repository...
Werckerbot has access
```


## Adding werckerbot on GitHub
On [GitHub](http://github.com) you can add a collaborator by going into the **settings** tab for your repository and clicking on the **Collaborators** option as shown:

![image](http://f.cl.ly/items/2P2L3O0M0Z3F013T0J3B/Screen%20Shot%202013-06-13%20at%2010.36.32%20AM.png)


## Adding werckerbot on Bitbucket
On [Bitbucket](http://bitbucket.org) you can add werckerbot by clicking the **settings** wheel and picking the **access amangement** option. Next you can add the **werckerbot** username as shown:

![image](http://cl.ly/PcnX/Screen%20Shot%202013-06-13%20at%2010.40.50%20AM.png)

You can always revoke access for werckerbot at a later stage. Please note that this will prohibit wercker from running any builds for you.
