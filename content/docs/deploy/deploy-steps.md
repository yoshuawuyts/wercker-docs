---
tags: deployment, steps
---

## Deploy steps

Deploy steps enable you to release your application or code to various
(cloud) infrastructure providers.

You define deploy steps in the `deploy` clause of your
[wercker.yml](/docs/wercker-yml/creating-a-yml.html). Deploy steps need
a `deploy target` that you deploy to. You define these deploy targets
through the wercker [web interface](/docs/web-interface/application-
settings.html) and reference the data associated with this target  in
your deploy step and `wercker.yml`.

Various deploy steps exist in the [step registry](/docs/web-interface
/step-registry.html) that you can use for your applications. These steps
range from syncing your assets and binaries to [S3](https://app.wercker.
com/#applications/51c82a063179be4478002245/tab/details), deploying to
[Cloud Foundry](https://app.wercker.com/#applications/53dd63d9df12aee638
0c5b46/tab/details) or [AWS Code-Deploy](https://app.wercker.com/#applic
ations/547fe5be6b3ba8733d2aabba/tab/details).

Within deploy steps you can leverage [environment variables](/docs
/environment-variables/using-env-vars.html) for storing sensitive
information such as passwords, IP addresses and tokens.

Below a snippet for using the S3 deploy step:

```yaml
deploy:
    steps:
    - s3sync:
        source_dir: build/
        delete-removed: true
        bucket-url: $AWS_BUCKET_URL
        key-id: $AWS_ACCESS_KEY_ID
        key-secret: $AWS_SECRET_ACCESS_KEY
```

Note that if you can't find a deploy step for your use-case you can [create your own!](/docs/steps/creating-steps.html)