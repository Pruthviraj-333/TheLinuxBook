---
title: "find — Search Files and Directories"
description: "Complete reference for the find command — syntax, all filter expressions, actions, and real-world examples."
---

# `find` — Search Files and Directories

## Overview

`find` recursively searches a directory tree for files matching given criteria — by name, type, size, time, permissions, owner, and more. It can also execute actions on found files in a single command.

**Command type**: External (GNU findutils)  
**Location**: `/usr/bin/find`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
find [PATH...] [EXPRESSION]
```

`EXPRESSION` is composed of **tests**, **options**, and **actions**.

---

## Quick Reference

### Find by Name

```bash
# Exact filename
find /etc -name "sshd_config"

# Case-insensitive name
find /home -iname "readme.md"

# Wildcard pattern
find /var/log -name "*.log"

# Exclude a pattern
find . -not -name "*.pyc"
```

### Find by Type

```bash
# Files only
find /tmp -type f

# Directories only
find /opt -type d

# Symbolic links
find /usr/bin -type l

# Block devices
find /dev -type b
```

### Find by Size

```bash
# Exactly 100 bytes
find . -size 100c

# Larger than 100 MB
find /var -size +100M

# Smaller than 1 KB
find /tmp -size -1k

# Between 1 MB and 10 MB
find . -size +1M -size -10M
```

Size units: `c` = bytes, `k` = kilobytes, `M` = megabytes, `G` = gigabytes

### Find by Time

```bash
# Modified in the last 24 hours
find /etc -mtime -1

# Modified more than 7 days ago
find /var/log -mtime +7

# Accessed in the last 60 minutes
find /tmp -amin -60

# Changed (inode change) more than 30 days ago
find / -ctime +30

# Newer than a reference file
find . -newer /etc/passwd
```

Time suffixes: `mtime` = modification, `atime` = access, `ctime` = inode change  
`-N` = less than N days ago, `+N` = more than N days ago

### Find by Permissions

```bash
# Files with exact permissions 644
find . -perm 644

# Files with at least 644 permissions set
find . -perm -644

# Any of these bits set (e.g., any executable)
find . -perm /111

# SUID files (security audit)
find / -perm -4000 -type f 2>/dev/null

# World-writable files
find / -perm -002 -type f 2>/dev/null
```

### Find by Owner

```bash
# Files owned by specific user
find /home -user pruthvi

# Files owned by specific group
find /var -group www-data

# Files with no owner (orphaned files — security risk)
find / -nouser 2>/dev/null

# Files with no group
find / -nogroup 2>/dev/null
```

---

## Actions

### Print (default)

```bash
# Print matching paths (default action)
find /etc -name "*.conf" -print
```

### Delete

```bash
# Delete matching files (always comes LAST in expression)
find /tmp -name "*.tmp" -delete

# Delete empty directories
find . -type d -empty -delete
```

### Execute a Command

```bash
# Run a command on each found file ({} = filename, \; = end of command)
find /var/log -name "*.log" -exec gzip {} \;

# Batch execution (much faster — passes all files at once)
find /var/log -name "*.log" -exec gzip {} +

# Use xargs for large sets (also batches efficiently)
find /var/log -name "*.log" | xargs gzip

# Prompt before each action
find . -name "*.bak" -ok rm {} \;
```

### Print with Formatting

```bash
# Print with custom format
find . -name "*.py" -printf "%s\t%p\n"   # size, path

# Find and print only filenames (not full path)
find /etc -name "*.conf" -printf "%f\n"
```

---

## Combining Expressions

```bash
# AND (implicit — conditions separated by space)
find . -type f -name "*.log"

# Explicit AND
find . -type f -and -name "*.log"

# OR
find . -name "*.jpg" -or -name "*.png"

# NOT
find . -not -name "*.pyc"
find . ! -name "*.pyc"

# Grouping with parentheses (must be escaped in shell)
find . \( -name "*.jpg" -or -name "*.png" \) -size +1M
```

---

## Controlling Depth

```bash
# Only search 1 level deep (immediate children)
find /etc -maxdepth 1 -name "*.conf"

# Start at depth 2 (skip immediate children)
find . -mindepth 2 -name "*.py"

# Exactly 2 levels deep
find . -mindepth 2 -maxdepth 2
```

---

## Excluding Directories

```bash
# Skip a directory and continue search elsewhere
find . -path "./node_modules" -prune -o -name "*.js" -print

# Skip multiple directories
find . \( -path "./.git" -o -path "./vendor" \) -prune -o -type f -print
```

---

## Real-World Examples

```bash
# Find and delete all .DS_Store files (macOS artifacts)
find . -name ".DS_Store" -delete

# Find large files consuming disk space
find / -type f -size +500M 2>/dev/null | sort -rh | head -10

# Find all Python files modified today and run flake8
find . -name "*.py" -mtime -1 -exec flake8 {} +

# Find and compress old log files (older than 30 days)
find /var/log -name "*.log" -mtime +30 -exec gzip {} \;

# Find files with SUID bit (security audit)
find / -perm -4000 -type f 2>/dev/null

# Find world-writable directories (security risk)
find / -type d -perm -002 2>/dev/null

# Find and replace text in all .conf files
find /etc -name "*.conf" -exec sed -i 's/old/new/g' {} +
```

---

## Interview Questions

??? question "What is the difference between `-exec {} \;` and `-exec {} +`?"
    With `\;`, `find` runs the command **once per file** — it spawns a new process for every matched file, which is slow. With `+`, `find` accumulates as many filenames as possible and passes them all to the command in one invocation (like `xargs`). This is much faster when there are many files. Use `+` whenever possible.

??? question "How do you find files modified in the last 24 hours?"
    Use `find /path -mtime -1`. The `-1` means "less than 1 day ago" (i.e., within the last 24 hours). `+1` would mean "more than 1 day ago".

??? question "How do you safely exclude directories from a find search?"
    Use `-prune`: `find . -path "./node_modules" -prune -o -name "*.js" -print`. The `-prune` action tells `find` not to descend into the matched directory. The `-o` (or) means "otherwise, apply the next test". Without `-prune`, `find` descends into every directory it encounters.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `locate` | Fast filename database search (but not real-time) |
| `grep -r` | Search file *contents* recursively |
| `xargs` | Process find output efficiently |
| `fd` | Faster, user-friendly modern alternative to find |
| `stat` | Show detailed file metadata |
