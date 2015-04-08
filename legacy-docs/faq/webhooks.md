---
sidebar_current: "faq-Webhooks"
---

# Webhooks

## What are Webhooks? ##

Webhooks are a way of communicating events between services. It allows one service to let another service know that something has happened. This is ussually achieved by making a request to a server using http.

## Why does wercker need to set Webhooks? ##

Wercker creates a Webhook in your source control provider. This is done automatically by wercker during the creation of your application. Upon a `git push` wercker receives one of these Webhooks, and will subsequently start a new build. Without the Webhook wercker does not know when to start a new build.

For certain source control providers we provide an even greater integration. Ie. GitHub sends a Webhook when a pull request is created, wercker uses this Webhook to create a build for this pull request.

## Permissions ##

Wercker uses the credentials of the user creating the application to create the Webhooks. It is however possible that user doesn't have permissions to change Webhook settings of your source control provider. The user will be warned during the creation of the application.

If you already created an application and wercker was unable to create a Webhook. You'll still be able to create a Webhook at a later stage. You can find the `fix Webhook` button in the settings page. This needs to be initiated by someone with sufficient permissions. The fix Webhook is also avaiable as a nudge when you've added an application for which you do not have sufficient permissions.

### Permissions on GitHub ####

On GitHub you have three permissions on a repository: `push`, `pull` and `admin`. You need the `admin` permission to be able to set a Webhook.

On GitHub you can be invited as a collaborator on a repository. This gives you `push` and `pull` permissions, but there is no way to get the `admin` permissions. Only the owner has the `admin` permission:

**Ask the owner to create the application on wercker or get the owner to click the `fix Webhook` button.**

With GitHub organizations it is possible to give someone `admin` permissions:

**Ask someone with the `admin` permissions to create the application on wercker or get someone with `admin` permissions to click the `fix Webhook` button.**

### Permissions on Bitbucket ####

On Bitbucket you can have `read`, `write` and `admin` permissions. You need the `admin` permissions to be able to set a Webhook:

**Ask someone with the `admin` permission to create the application on wercker or get someone with `admin` permission to click the `fix Webhook` button.**

## FAQ ##

### I've removed the Webhook, what do I do now? ###

You can use the fix Webhook button to recreate the Webhook. Make sure that your source control provider credentials have suffient permissions.

### I'm a collaborator on a GitHub repository, how do I get admin permissions ###

Unfortunately it's not possible to get admin permissions for a collaborator on a GitHub repository.
