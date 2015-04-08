Legacy URL redirector
=====================

This tool will create redirect files based on `urlmappings.txt`. This file
contains source to destination mapping.

urlmappings.txt
---------------

This file is used to map source to destination mapping, and it uses the
following format:

```
source | destination
```

- `source` is the key in the S3 bucket.
- `destination` is the redirect URL. It has to start with either:
  - `http|https` to do a redirect to a other site.
  - `/` to do a redirect in the current site.

Both `source` and `destination` are trimmed, and cannot contain a `|` character.

This file can contain comments, the first character needs to be a `#` character.
