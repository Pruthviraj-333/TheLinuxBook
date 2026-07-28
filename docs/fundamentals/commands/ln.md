---
title: "ln — Create Hard and Symbolic Links"
description: "Complete reference for the ln command — hard links vs symbolic links, syntax, options, and internals."
---

# `ln` — Create Hard and Symbolic Links

## Overview

`ln` creates **links** — additional names for files. There are two types:

- **Hard link**: A direct pointer to the same inode (same file data, different directory entry)
- **Symbolic link (symlink)**: A special file that points to another path by name

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/ln`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
ln [OPTION]... TARGET LINK_NAME
ln [OPTION]... TARGET...  DIRECTORY
```

---

## Options Reference

| Option | Long Form | Description |
|--------|-----------|-------------|
| `-s` | `--symbolic` | Create symbolic link (default is hard link) |
| `-f` | `--force` | Remove existing destination before linking |
| `-i` | `--interactive` | Prompt before removing |
| `-n` | `--no-dereference` | Treat LINK_NAME as a regular file if it is a symlink to a dir |
| `-r` | `--relative` | Create symlink using relative path |
| `-v` | `--verbose` | Print each created link |

---

## Hard Links

```bash
# Create a hard link
ln original.txt hardlink.txt

# Both names point to the same inode
ls -li original.txt hardlink.txt
# 123456 -rw-r--r-- 2 user group 1024 original.txt
# 123456 -rw-r--r-- 2 user group 1024 hardlink.txt
# ^^^^^^ same inode, link count = 2
```

**Hard link rules**:
- Must be on the **same filesystem**
- Cannot link to **directories** (usually)
- Deleting one name does not affect the data until all hard links are removed
- No "dangling" links — the inode exists as long as any link points to it

---

## Symbolic Links

```bash
# Create a symlink
ln -s /etc/nginx/nginx.conf nginx.conf

# Create symlink to a directory
ln -s /var/log/nginx logs

# Check what a symlink points to
ls -la nginx.conf
# lrwxrwxrwx 1 user group 21 nginx.conf -> /etc/nginx/nginx.conf

readlink nginx.conf
# /etc/nginx/nginx.conf
```

**Symlink rules**:
- Can cross filesystems
- Can point to directories
- Can be **dangling** (point to a path that doesn't exist)
- Permissions shown for the symlink itself are irrelevant — the target's permissions apply

---

## Examples

### Practical Symlink Patterns

```bash
# Version management — point "current" to latest
ln -sf /opt/python-3.13 /usr/local/python-current

# Quick access to deep config file
ln -s /etc/systemd/system/nginx.service ~/nginx.service

# Make a relative symlink (portable — works if directory is moved)
ln -sr ../lib/helper.sh ./helper.sh

# Force-replace an existing symlink
ln -sf /new/target existing-symlink
```

### Update a Symlink

```bash
# -f removes the old link first, then creates the new one
ln -sf /opt/app-v2.0 /usr/local/app-current
```

### Find All Symlinks

```bash
find /usr/bin -type l -ls | head -20
```

---

## Hard Link vs Symbolic Link

| Feature | Hard Link | Symbolic Link |
|---------|-----------|---------------|
| Cross-filesystem | No | Yes |
| Can link directories | No (usually) | Yes |
| Survives target deletion | Yes (keeps inode) | No (becomes dangling) |
| Shows as `l` in `ls -l` | No | Yes |
| Has own inode | No (shares inode) | Yes |
| `readlink` needed | No | Yes |

---

## Interview Questions

??? question "What is the difference between a hard link and a soft (symbolic) link?"
    A **hard link** is another directory entry pointing directly to the same inode (and thus the same data blocks). If you delete the original filename, the data persists because the inode's link count is still > 0. A **symbolic (soft) link** is a separate file that stores a path string. If the target path is deleted, the symlink becomes dangling — it points to nothing. Hard links cannot cross filesystem boundaries; symlinks can.

??? question "Why can't you create a hard link to a directory?"
    Allowing hard links to directories would create cycles in the filesystem tree, breaking tools like `find`, `du`, and `tar` that traverse the tree assuming it is a DAG (directed acyclic graph). The kernel generally prohibits it (only root can, with specific filesystems).

??? question "What happens to a hard link when the original file is deleted?"
    Nothing — the data is still fully accessible through the hard link. Deleting a filename decrements the inode's link count. The inode and data blocks are only freed when the link count reaches **zero** (and no process has the file open). This is why `rm` is really "unlink" — it removes a directory entry, not necessarily the data.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `readlink` | Print the value of a symbolic link |
| `realpath` | Resolve all symlinks to canonical path |
| `stat` | Show inode details including link count |
| `find -type l` | Find all symlinks |
| `unlink` | Remove one link (file or symlink) |
