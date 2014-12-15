---
sidebar_current: "docker"
---

# Docker Support

Wercker has beta support for [docker](http://docker.io) an abstraction layer on top of LXC.

To make use of docker support your [wercker.yml](/articles/werckeryml) should look as follows:

``` yaml
box: wercker-labs/docker
build:
  steps:
    - script:
        name: docker version
        code: |
          docker -v
```

We've open sourced our [packer](http://packer.io) definition that makes up the docker image on wercker:

[wercker labs docker image on GitHub](https://github.com/wercker/wercker-labs-docker)

<p>
  We have written several posts on our blog:
</p>
<ul>
  <li><a href="http://blog.wercker.com/2013/12/23/Test-driven-development-for-docker.html">Experimenting with test driven development for docker</a></li>
  <li><a href="http://blog.wercker.com/2013/11/28/Announcing-docker-support.html">announcing public Docker support</a></li>
  <li><a href="http://blog.wercker.com/2013/12/13/Deploying-to-dokku.html">deploying to Dokku</a></li>
  <li><a href="http://blog.wercker.com/2013/09/10/Building-and-testing-a-cluster-of-RethinkDB-Docker-containers.html">building and testing a cluster of RethinkDB Docker containers</a></li>
  <li><a href="http://blog.wercker.com/2013/09/06/Building-and-Storing-Docker-Containers.html">building and storing Docker containers to S3</a></li>
</ul>

<div class="flex-video">
  <iframe src="//player.vimeo.com/video/73947111" width="500" height="313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>
