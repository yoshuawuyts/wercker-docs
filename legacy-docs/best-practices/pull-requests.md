# Attaching build statuses to commits on Github

A while back GitHub announced the availability of the [commit status
api](https://github.com/blog/1227-commit-status-api) and wercker
supports attaching the build result to the commit. There are two
scenarios where wercker sets the status. One, is the result of every
'normal' build in wercker. These show up in the branch overview and
inter-repository pull-requests. Another scenario is when a collaborator
sends a pull request of a fork; this pull request will be built and the result will be set in your own repository.

This article is also available on our [dev
center](http://devcenter.wercker.com/articles/bestpractices/pullrequests.html)

![image](http://f.cl.ly/items/261g3H47283U3t361k1P/IMG_0547.JPG)

### Scenario 1: Status on Commit

Even when pushing to your own repositories and without utilizing pull requests, results of these builds are attached to your commit.

Below you can see that the latest build for this blog has successfully completed on wercker.

![image](http://f.cl.ly/items/1X3F270u1Y3H2c413j3Q/Screen%20Shot%202013-06-12%20at%201.34.13%20PM.png)

If we view the branch of this commit on GitHub you can see that by hovering over the &#10003; checkmark will showcase that the build finished with a success status.

![image](http://f.cl.ly/items/0F072b3E343T312k0i1I/Screen%20Shot%202013-06-12%20at%201.31.18%20PM.png)

Clicking that &#10003; checkmark will take you to the [build page on wercker](https://app.wercker.com/#build/51b84324345a2a453d002cda) and give you more details on the various buildsteps, such as `unittests`, `bundle install` and `middleman processing` the build went through.

### Scenario 2: Pull Requests

The second scenario is the support for [pull
requests](https://help.github.com/articles/using-pull-requests). Pull
requests are an awesome way of collaborating on projects: you fork an
existing repository, `git push` your improvements to your forked repo
and do a pull request on the original repository to contribute back your
code.

If the original repository is added to wercker, any pull request from a
forked repo gets built and the status is attached to the pull request.

![image](http://f.cl.ly/items/2O1N280y0z1C1w3y1e43/Screen%20Shot%202013-06-12%20at%202.44.33%20PM.png)

We now know for certain that we can safely merge this pull request! When
we hit the 'merge this pull request' button we still want to build the
end result of the merge, which wercker does automatically.

Another way to showcase your latest build status is through the wercker
badge which you can add via the 'share button' as shown below.

![image](http://f.cl.ly/items/2Y1B35013h292B1A1Z3E/Screen%20Shot%202013-06-12%20at%203.06.11%20PM.png)

The build status for this blog is for instance as follows:

[![Wercker
status](https://app.wercker.com/status/328166c4407cc4b934edabcf019f94cc/m)](https://app.wercker.com/project/bykey/328166c4407cc4b934edabcf019f94cc)

Pull requests are a very powerful mechanism for working together on code
and wercker makes them even better.
