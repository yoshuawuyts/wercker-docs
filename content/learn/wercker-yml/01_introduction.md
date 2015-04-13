## Introduction to the wercker.yml

The wercker.yml file allows you to set up your [automation
pipelines](/learn/pipelines/01_introduction.html). YAML is a readable
and friendly markup language.

The `wercker.yml` file is a configuration
file that specifies how your build and deploy pipelines
should be run and which [steps](/learn/steps/01_introduction.html)
should be executed in those pipelines.

As your `wercker.yml` configuration is under source control, its contents
can vary per `git commit`.

> the contents of your wercker.yml can be different per commit

The `wercker.yml` file below shows complete build and deploy pipelines
for a [golang](http://golang.org) application which is deployed as a binary to [Amazon
S3](http://aws.amazon.com/s3/)

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
```

In the next part we will go over the syntax and sections of the
`wercker.yml`, how you can program it using environment variables and
finally a showing a complete working example.

[Sections &rsaquo;](/learn/wercker-yml/02_sections.html "nav next yml")
