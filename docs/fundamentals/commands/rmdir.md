---
title: "rmdir — Remove Empty Directories"
description: "Reference for the rmdir command — syntax, options, and when to use rmdir vs rm -r."
---

# `rmdir` — Remove Empty Directories

## Overview

`rmdir` removes **empty directories** only. It is a safer alternative to `rm -r` because it refuses to delete directories that still contain files, protecting against accidental data loss.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/rmdir`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
rmdir [OPTION]... DIRECTORY...
```

---

## Options Reference

| Option | Long Form | Description |
|--------|-----------|-------------|
| `-p` | `--parents` | Remove DIRECTORY and its empty ancestors |
| `-v` | `--verbose` | Print a message for each removed directory |
| `--ignore-fail-on-non-empty` | | Suppress errors for non-empty directories |

---

## Examples

### Remove a Single Empty Directory

```bash
rmdir emptydir
```

### Remove Nested Empty Directories

```bash
# Creates: a/b/c — remove all in one step
rmdir -p a/b/c
# Removes c, then b (if empty), then a (if empty)
```

### Verbose Output

```bash
rmdir -pv build/tmp/cache
# rmdir: removing directory, 'build/tmp/cache'
# rmdir: removing directory, 'build/tmp'
# rmdir: removing directory, 'build'
```

### Fail Safely on Non-Empty

```bash
# This FAILS if the directory has any files (safe)
rmdir dir-with-files
# rmdir: failed to remove 'dir-with-files': Directory not empty
```

---

## rmdir vs rm -r

| | `rmdir` | `rm -r` |
|-|---------|---------|
| Removes empty dir | Yes | Yes |
| Removes non-empty dir | **No** (safe) | Yes (dangerous) |
| Recursive parent removal | `-p` | Not directly |
| Risk of data loss | Very low | High if used carelessly |

!!! tip "Use rmdir in scripts where you expect directories to be empty"
    If a directory unexpectedly still has files, `rmdir` will error loudly instead of silently deleting everything. This makes scripts safer.

---

## Interview Questions

??? question "What is the difference between `rmdir` and `rm -r`?"
    `rmdir` only removes directories that are completely **empty** — it fails with an error if the directory has any contents. `rm -r` recursively removes a directory and **all of its contents** without checking. Use `rmdir` when you want a safety net; use `rm -r` when you intentionally want to delete a tree.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `rm -r` | Remove directory and all contents |
| `mkdir` | Create directories |
| `find -type d -empty -delete` | Delete all empty directories under a path |
