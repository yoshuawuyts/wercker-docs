# Boxes

Wercker's build and deploy pipelines are run within `boxes` that define your stack.
Stacks can range from [programming languages](/articles/languages) such
as Python or Ruby, to databases and [services](/articles/services) like
[MongoDB](http://mongodb.org) or [RabbitMQ](http://www.rabbitmq.com/).

A box is basically a virtual machine with a set of packages installed that support your stack of choice.

![image](http://f.cl.ly/items/0x2f0q301u3q2J353t32/wercker_pipeline_box.png)

Wercker has a set of predefined boxes which are made available by
default.
These boxes include Python, Ruby, Node.js and PHP alongside a range of backend [services](/articles/services) consisting of Postgres, MySQL, MongoDB, Redis and RabbitMQ.

## Using Boxes

Using a box is trivial, the [wercker.yml](/articles/werckeryml) includes a `box` definition that you can leverage.

``` yaml
box: wercker/python
```

For language-specific boxes see the [languages](/articles/languages)
guides and of course explore the wercker directory.

<a id="create"></a>
## Creating your own boxes

You are also able to create your own boxes, provisioned either via simple bash-based scripts or Chef.

Similar to applications or [steps](/articles/steps/), boxes are defined through a single file called `wercker-box.yml`.

Boxes can be `deployed` to the wercker
directory, which is an index of both boxes and the previously mentioned
[steps](/articles/steps/).

Deploying your boxes to the wercker directory allows not only **you** to use
another programming language or service, but **others** as well.

When you deploy your box, be aware that it may take a while as wercker
is basically provisioning a VM.

We've created separate guides that explain both script-based and chef-based provisioning of your own boxes:

* [Creating your own wercker boxes with Bash](/articles/boxes/bash.html)
* [Creating your own wercker boxes with Chef](/articles/boxes/chef.html)
* [Creating your own wercker boxes with Puppet](/articles/boxes/puppet.html)
