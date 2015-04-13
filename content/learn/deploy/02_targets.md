## Targets

To deploy code, a deploy target needs to be created.

Deploy targets must be added on the wercker interface and could range
from *production*, *staging* or for instance a *cdn* target for static
assets.

In order to supply deploy targets with information such as tokens, IP
addresses or access keys, you add would add these via pipeline
environment variables.

> Each deploy target can have its own environment variables

See the [environment variables](/learn/pipelines/03_using-env-vars.html) section
for more information.

[&lsaquo; Introduction to deploy](/learn/deploy/01_introduction.html "nav previous deploy")
[Auto deployment &rsaquo;](/learn/deploy/03_auto-deployment.html "nav next deploy")
