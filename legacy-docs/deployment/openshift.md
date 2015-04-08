# OpenShift

In this article we will showcase how you can deploy your application from wercker to OpenShift. We have created a Ruby sample application that you can fork on [GitHub](https://github.com/wercker/getting-started-openshift).

## Requirements

* OpenShift credentials (sign up at [OpenShift registration page](https://openshift.redhat.com/app/account/new))
* You have [created an application in OpenShift](https://openshift.redhat.com/app/console/application_types)
* A [GitHub](https://github.com/) account with a pre-made repository
* You have [registered for a wercker account](https://app.wercker.com/users/new) and [signed in](https://app.wercker.com/users)
* You have [added your application to wercker](/articles/gettingstarted/web.html)


## Deploy target

Every succesful build on wercker can be deployed to a so called deploy target. This can be a custom deploy target, or one of the predefined targets like [Heroku](/articles/deployment/heroku.html) or [OpenShift](#). You can read more at the [deployment section](/articles/deployment/).

In this article we will add one for OpenShift. Follow along with the steps below:

### Navigate to your application
First we need to sign in at wercker and navigate to the application we like to deploy to OpenShift.

![image](http://f.cl.ly/items/0f1W0u1M391m2K2p1n2s/Screen%20Shot%202013-06-06%20at%2011.03.02%20AM.png)

### Add OpenShift deploy target
To start the process to add an OpenShift deployment target, do the following:

* Click on the `Deployment` tab to open it
* Click the `Add deploy target` dropdown
* Click `OpenShift`

![image](http://f.cl.ly/items/3j2b2R2Y0t3e07422p3D/Screen%20Shot%202013-06-06%20at%2011.15.55%20AM.png)

### Create OpenShift authentication token
_note: you can skip this step if you already have an OpenShift authentication token._

OpenShift allows other services, like wercker, to access information via a secret token. OpenShift has three different scopes: `session`, `read` and `userinfo`. Wercker needs only read access. Although you can use an existing authentication token we strongly advice to create one per service. You can create a `read` authorization key at the [add authorization](https://openshift.redhat.com/app/console/authorizations/new) page at OpenShift. Give it a meaningful name like `wercker`.

![image](/assets/deployment-openshift/step3-openshift-auth-token.png)

### Authorize wercker

Enter the OpenShift authorization token and click `connect`.

![image](http://f.cl.ly/items/1N2s0C392U1F0W2R273i/Screen%20Shot%202013-06-06%20at%2010.32.11%20AM.png)



### Enter OpenShift deploy target details

Enter a descriptive deploy target name, such as: staging or production.

Select the OpenShift domain and application that you want to deploy to. Wercker automatically selects the first available domain and application.

If there are no domains or applications listed, please make sure you have created them on OpenShift.

Click `save` to create the deploy target.

_note: you can learn more about OpenShift domains and application in the [Namespaces chapter](https://access.redhat.com/site/documentation/en-US/OpenShift/2.0/html/User_Guide/chap-OpenShift-User_Guide-Namespaces.html) of the OpenShift User Guide._

![image](http://f.cl.ly/items/1l1U1F380h1N1v0g0v0B/Screen%20Shot%202013-06-06%20at%2010.40.30%20AM.png)

### Add public key to OpenShift

Wercker generates a ssh key per deploy target which is used to securely encrypt the connection that is used to deploy to OpenShift. This key needs be added to the [public keys section](https://openshift.redhat.com/app/console/keys/new) at OpenShift.

Copy the full content of the public key from the second textbox.

![image](http://f.cl.ly/items/091V403J0x0A3x0m1K0I/Screen%20Shot%202013-06-06%20at%2010.42.44%20AM.png)

Login to OpenShift and add the key to your public key list.

![image](http://f.cl.ly/items/2D240N47333K410g0Y2j/Screen%20Shot%202013-06-06%20at%2010.46.09%20AM.png)

### Deploy!

You are now ready to deploy to OpenShift. Wercker allows you to deploy all succesfull builds. Navigate to your application and select the succesfull build you like to deploy.

![image](http://f.cl.ly/items/0f1W0u1M391m2K2p1n2s/Screen%20Shot%202013-06-06%20at%2011.03.02%20AM.png)

In the build via click the `deploy this build` button and choose the target that you have just create.

![image](http://f.cl.ly/items/090u37223b3h0X1s0Y11/Screen%20Shot%202013-06-07%20at%2010.08.39%20AM.png)

Congratulations! You have successfully deployed your application to OpenShift.
