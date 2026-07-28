---
title: "chown — Change File Owner and Group"
description: "Complete reference for chown — changing file user ownership, group ownership, reference flags, and recursive updates."
---

# `chown` — Change File Owner and Group

## Overview

`chown` (change owner) changes the user owner and/or group owner of files, directories, or symbolic links. Ownership management is fundamental for configuring service access control in Linux.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/chown`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
chown [OPTIONS] USER[:GROUP] FILE...
chown [OPTIONS] :GROUP FILE...
```

---

## Examples

### Change User Ownership Only

```bash
# Change owner to user 'nginx'
chown nginx /var/www/html/index.html
```

### Change Both User and Group Ownership

```bash
# Set owner to 'www-data' and group to 'www-data'
chown www-data:www-data /var/www/html

# Shorthand: trailing colon sets group to user's primary group
chown www-data: /var/www/html
```

### Change Group Ownership Only

```bash
# Change group to 'docker' (user remains unchanged)
chown :docker /var/run/docker.sock
```

### Recursive Ownership Updates

```bash
# Change owner and group for directory and all contained files
chown -R nginx:nginx /var/www/app
```

### Copy Ownership from Reference File

```bash
# Set ownership of target.txt to match reference.txt
chown --reference=reference.txt target.txt
```

### Symlink Ownership

By default, `chown` operates on the target of a symlink, not the symlink itself. Use `-h` to change the ownership of the symlink file:

```bash
chown -h www-data:www-data /var/www/current_release_symlink
```

---

## Interview Questions

??? question "How do you change the group owner of a file without changing the user owner?"
    Prefix the group name with a colon or dot: `chown :developers file.txt` (or use `chgrp developers file.txt`).

??? question "What is the difference between `chown -R` and `chown -h`?"
    `-R` operates recursively down directory trees. `-h` changes the ownership of a symbolic link itself rather than the target file it points to.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `chmod` | Change file permissions |
| `chgrp` | Change group ownership specifically |
| `ls -l` | Display file ownership and group |
