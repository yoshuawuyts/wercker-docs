## Using environment variables

Environment variables are used to store information which is needed during
the execution of a pipeline, such as tokens or keys.

### Data types

The wercker web interface supports two types of data for your
environment variables:

* text (which can be set as hidden and protected)
* SSH key pairs

![image](/images/env-vars.png)

### Protected variables

Protected variables limit the exposure of sensitive
information via the interface. The behavior of the variables during pipeline
executions are the same as other variables, but with the following
exceptions:

* protected variables are not displayed/logged during the setup environment step
* values are not shown in the settings tab and can only be set, not read
    afterwards

This behaviour is optional for variables of type text, SSH key pairs however
are automatically marked as protected.


### SSH Key pairs

Another common type of information used during deploys (but also during builds)
are SSH key pairs. Wercker can help you generate them for you, and will only
expose the public part of the pair via the interface. During a pipeline run,
the key pair is exposed via two environment variables ending with:
**_PRIVATE** and **_PUBLIC**.

In the next section we will look at how artifacts are packaged when a
pipeline ends.

[How it works &rsaquo;](/learn/pipelines/02_how-it-works.html "nav previous pipelines")
[Packaging &rsaquo;](/learn/pipelines/04_packaging.html "nav next pipelines")
