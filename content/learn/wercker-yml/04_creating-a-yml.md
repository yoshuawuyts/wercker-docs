## Creating a yaml

### Full working example

If you're eager to grasp the `wercker.yml` format, below an example file
that includes all elements which are explained with inline comments.

```yaml
# use the default golang container from Docker Hub
box: golang
# The steps that will be executed in the build pipeline
build:
  steps:
    # golint step!
    - wercker/golint

    # Build the project
    - script:
        name: go build
        code: |
          go build ./...

    # Test the project
    - script:
        name: go test
        code: |
          go test ./...

# The steps that will be executed in the deploy pipeline
deploy:
    steps:
        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/

    # notify slack on succesful or failed deploys
    after-steps:
        # use a slack notifcation step from the marketplace
        - kobim/slack-post:
            url: $SLACK_URL
            channel: notifications
            username: werckerbot
```

[&lsaquo; Environtment variables](/learn/wercker-yml/03_environment-variables.html "nav previous yml")
[Containers &rsaquo;](/learn/containers/01_introduction.html "nav next containers")
