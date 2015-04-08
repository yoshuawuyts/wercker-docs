---
sidebar_current: "directory"
---

# The wercker directory

The wercker directory is an index of published [boxes](/articles/boxes)
and [steps](/articles/steps) that have been created by not only the
wercker team, but more importantly the community.

![image](http://f.cl.ly/items/0A2g31260n0T280M1i1W/directory-screenshot.jpg)

You can reach the directory in the [explore
section](http://app.wercker.com/#explore) of wercker.

## Box and step details

Upon publication, boxes and steps have an additional **details pane** that
showcases how to use the box or step. Other metadata such as tags and
author are shown as well.

![image](http://f.cl.ly/items/2W2h0R04181W2Z0v0h2M/box-details-screenshot.jpg)

Boxes and steps are public by default so all members of the community
can benefit.

## Publishing your own box or step

Boxes and steps are like any other application on wercker, a git
repository.

You can read about creating your own [boxes](/articles/boxes) or
[steps](/articles/steps) at their respective sections.

As boxes and steps are applications, they can be deployed. Instead of
[deploying](/articles/deployment) your application to Heroku or AWS, you
deploy (or publish) your box or step to the wercker directory.

Add your git repository containing your step or box just like any other
application on wercker and create a **wercker directory** deploy target
for it.

![image](http://f.cl.ly/items/25463i3b3q1y0A2e1F3i/Screen%20Shot%202013-07-22%20at%203.10.40%20PM.png)

Now you can select a green build for your box or step and deploy it to
the directory.

Keep in mind you need to bump the version number of you box or step each
time you want a new version to be published and available in the
directory.

![image](http://f.cl.ly/items/3E3s3m2f0y360Z3F3q2H/deploy-to-directory.jpg)
