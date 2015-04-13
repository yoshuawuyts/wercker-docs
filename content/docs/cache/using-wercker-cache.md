---
tags: cache
---

## Using wercker cache

#### WERCKER CACHE IS NOT YET AVAILABLE IN EWOK

A cache directory is shared between builds. The path to this directory is stored in the environment variable `$WERCKER_CACHE_DIR`. A step can leverage this cache to share assets between builds.

A good example of this is the [bundler-install](https://app.wercker.com/#applications/51c829d13179be44780020be/tab/details) step which leverages the cache to shorten the installation time of dependencies. It does so by storing the end-result of downloading and compiling dependend packages.

Future builds can use this as a starting point and only new dependencies which were not cached are downloaded. At the start of every build the cache directory is filled with the cached content from the last successful build, if not older than 14 days (and is < 1GB).


