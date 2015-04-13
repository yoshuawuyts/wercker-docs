---
tags: example
---

## Using environment variables

You can also use a [script step](/learn/steps/01_introduction.html) and use the export command to see the full list
of all variables at that moment during the build/deploy.

This is convenient as the environment variables step does not always show all
environment variables available during the pipeline run.

```yaml
- script:
    code: |
        export
```

