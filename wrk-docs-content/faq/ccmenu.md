---
sidebar_current: "faq-ccmenu"
---

# CCMenu feed for notifications

Wercker allows you to subscribe to build and deploy feeds using for instance [CCMenu](http://ccmenu.sourceforge.net)

![image](http://f.cl.ly/items/3c0D3u3p02250D292x3b/Image%202013.08.20%2010%3A43%3A58%20AM.png)

## Configuration
Wercker offers two endpoints per project that serve status information in the **cctray.xml** format. One for the build status, and one for the deployment status.

### Build status feed

The feed url that contains the build status from an project is:

    https://app.wercker.com/api/v2/applications/{PROJECT-ID}/cc/build

You need to replace `{PROJECT-ID}` with the project id of the project you want to monitor.

### Deploy status feed

The feed url that contains the deployment status of a project's deploy target is:

    https://app.wercker.com/api/v2/applications/{PROJECT-ID}/cc/deploytargets/{DEPLOY-TARGET-NAME}

You need to replace `{PROJECT-ID}` with the project id of the project you want to monitor and `{DEPLOY-TARGET-NAME}` with the name of the deploy target. Read more about deploy targets on ou [dev center](http://devcenter.wercker.com/articles/introduction/deploys.html#deploy-targets)

## Tools

Here is a list of tools that allow you to monitor **cctray.xml** feeds and that can be used to monitor your build and deployment statuses of your wercker projects.

* [CCMenu for Mac](http://ccmenu.sourceforge.net/)
* [CCTray for Windows](http://confluence.public.thoughtworks.org/display/CCNET/CCTray)
* [buildnotify for Linux](https://bitbucket.org/Anay/buildnotify/wiki/Home)
* [CruiseControl Monitor for Firefox](https://addons.mozilla.org/en-US/firefox/addon/cruisecontrol-monitor/)

## Using CCMenu

There are a lot of tools that support the cc status format. As I'm mostly working on a Mac I decided to use [CCMenu](http://ccmenu.sourceforge.net/). It allows you to monitor multiple projects at the same time, and identifies the overall build status with just a glance at the menu bar.

![image](http://f.cl.ly/items/3c0D3u3p02250D292x3b/Image%202013.08.20%2010%3A43%3A58%20AM.png)

Download and install the latest version of ccmenu from the [CCMenu project](http://sourceforge.net/projects/ccmenu/files/CCMenu/).

### Finding your project id

Navigate to your project page at [app.wercker.com](https://app.wercker.com) and copy your project id from the url.

![image](http://f.cl.ly/items/1b1C101A0H3L1N1z3P3y/Image%202013.08.20%2010%3A44%3A44%20AM.png)

### Add builds to CCMenu

Open CCMenu by clicking on the icon in the top menu bar and open preferences.

![image](http://f.cl.ly/items/290S1k2p2L3i1e2B3i2I/Image%202013.08.20%2010%3A45%3A20%20AM.png)

### Enter feed details

Click on the **plus** sign in the preference window and enter your project `cc` feed url. It is important to follow the following steps closely because CCMenu was acting a bit weird when I entered my details.

1. Enter your feed url
2. Click `Use URL as entered above` option
3. Enter your wercker credentials
4. Check `The server requires authentication`
5. Click `Continue`
6. See the status of your project in your menu bar!

![image](http://f.cl.ly/items/1J0p3n423z2N2M0R1q1E/Image%202013.08.20%2010%3A48%3A34%20AM.png)

### Other feeds

You can repeat the previous steps for other feeds as well.

### Notification center

CCMenu supports Mac's [Notification Center](http://support.apple.com/kb/ht5362)

![image](http://f.cl.ly/items/1w1U1e2H2E0N2T02380f/Image%202013.08.20%2010%3A47%3A03%20AM.png)

### Final result

![image](http://f.cl.ly/items/470h3D3s042R1J0n1d1j/Image%202013.08.20%2010%3A48%3A01%20AM.png)