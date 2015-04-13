---
tags: builds
---

## Pulling builds

You can use the [wercker command line interface](/docs/cli/commands.html) to pull build
artifacts, which are containers themselves, to your local machine.

You can also pull a specific build using the build-id as identfier:

```bash
wercker pull <BUILD-ID>
```

You can also query for a certain build. For this, you need the *name*
of the owner and *project-name* on wercker. Then you can optionally give some
extra queries such as *branch* or result.

```sh
wercker pull owner/project-name [query flags]
```

Checkout the all available flags in the help page: 

```sh
wercker pull --help
```

If you have a working Docker environment and you want to load the container
after download, than use the `--load` flag.
