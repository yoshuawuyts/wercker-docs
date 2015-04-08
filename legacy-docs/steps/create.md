# Creating your own steps

Similar to boxes, steps are applications on wercker. You can create them
by including a `run.sh` file in your repository that is run on wercker
when the step is activated. Furthermore, a `wercker-step.yml` needs to
be created that contains data on the step.

Let's create a step that notifies the Campfire chat platform when we do
a build on wercker. You can find the source for this step on
[GitHub](https://github.com/wwwouter/wercker-step-campfire-notify). Before we
begin, please make sure you are familiar with [environment variables](/articles/steps/variables.html)
and have read [A guide to steps](/articles/steps/guide.html).

We want to use this step in the following way in the
[wercker.yml](/articles/werckeryml) of our application:

```yaml
build:
  steps:
    - wouter/campfire-notify:
        token: $CAMPFIRE_TOKEN
        room-id: id
        subdomain: <<your campfire subdomain>>
        message: $WERCKER_APPLICATION_OWNER_NAME/$WERCKER_APPLICATION_NAME build by $WERCKER_STARTED_BY finished
```

The parameters for this step are self-explanatory; the **token** is our
Campfire token, **the room_id** the room that we want to post the
message to, subdomain is our campfie subdomain. Finally the message is
the message that we want to post to the Campfire room. It is constructed
from the various environment variables that are available on wercker and
those which you have specified on wercker yourself.

Next to the `wercker-step.yml` each step needs a `run.sh` file that
either runs your steps commands or executes another program (which could
be written in Python, Ruby or another language).

Let's look at the `run.sh` file for this Campfire notification step:

```bash
if [ ! -n "$WERCKER_CAMPFIRE_NOTIFY_TOKEN" ]; then
  error 'Please specify token property'
  exit 1
fi

if [ ! -n "$WERCKER_CAMPFIRE_NOTIFY_MESSAGE" ]; then
  error 'Please specify message property'
  exit 1
fi

if [ ! -n "$WERCKER_CAMPFIRE_NOTIFY_SUBDOMAIN" ]; then
  error 'Please specify subdomain property'
  exit 1
fi

if [ ! -n "$WERCKER_CAMPFIRE_NOTIFY_ROOM_ID" ]; then
  error 'Please specify room_id property'
  exit 1
fi


curl --user $WERCKER_CAMPFIRE_NOTIFY_TOKEN:x  -X POST -H "Content-Type: application/json" -d "{\"message\":{\"body\":\"$WERCKER_CAMPFIRE_NOTIFY_MESSAGE\", \"type\":\"TextMessage\"}}" https://$WERCKER_CAMPFIRE_NOTIFY_SUBDOMAIN.campfirenow.com/room/$WERCKER_CAMPFIRE_NOTIFY_ROOM_ID/speak
```

Here we check if the necessary environment variables are available, If
this is the case, we finaly do a simple **curl** command that does a
**HTTP POST** with **JSON** to the Campfire room.

We now have build notifications to Campfire for our wercker pipeline!

## Adding your step to the wercker directory

Make sure to add your repository to wercker. If you need some guidance with this, see the [getting started guide for the web](/articles/gettingstarted/web.html), that will help you do so.

Add your **wercker-step.yml** and **run.sh** to your git repository and push it to either GitHub or Bitbucket.

```bash
git add wercker-step.yml run.sh
git commit -am 'added wercker-step.yml and run.sh'
git push origin master
```

This should trigger a build, which should pass.

You need to deploy your step to the wercker directory, just like any
other application. As such, you also need to create a deploy target for
the directory, so let's do so.

Go to the `settings tab` and under the *Deploy targets* section click **add deploy target**, after which a dialog is presented.

![image](http://f.cl.ly/items/0n0g0C0W3e1o33322o2R/Screen%20Shot%202013-07-08%20at%203.54.58%20PM.png)

Pick **wercker directory** as a deploy target and give it a name (such as
'directory').

![image](http://f.cl.ly/items/222d453f1R2w1F3a3o1V/Screen%20Shot%202013-07-08%20at%203.55.20%20PM.png)

Now go to your green build and hit the deploy button.

![image](http://f.cl.ly/items/3E3s3m2f0y360Z3F3q2H/deploy-to-directory.jpg)

Your step should now be available in the directory!

## Conclusion

Steps are quite powerful and can be created in other programming
languages as well.

We have a large collection of steps available on wercker's [GitHub
page](http://github.com/wercker) that you can use for inspiration for
creating your own steps.
