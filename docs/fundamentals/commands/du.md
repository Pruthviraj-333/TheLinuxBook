---
title: "du — Estimate File Space Usage"
description: "Complete reference for du — calculating directory sizes, finding largest directories, depth limits, and disk cleanup patterns."
---

# `du` — Estimate File Space Usage

## Overview

`du` (disk usage) measures and reports the disk space occupied by files and directory trees. It is essential for identifying which directories or log files are consuming server disk space.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/du`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
du [OPTIONS] [PATH...]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-h` | `--human-readable` — Print sizes in human-readable units (K, M, G) |
| `-s` | `--summarize` — Display only a total size for each argument |
| `-d N` | `--max-depth=N` — Print total size for directories only down to depth N |
| `-a` | `--all` | Write counts for all files, not just directories |
| `-c` | `--total` | Produce a grand total at the end |
| `-x` | `--one-file-system` | Skip directories on different filesystems |
| `--exclude=PATTERN` | Exclude files matching PATTERN |

---

## Examples

### Check Total Size of Current Directory

```bash
du -sh .
```

### Find Top 10 Largest Directories in `/var`

```bash
du -h -d 1 /var | sort -h -r | head -10
```

### Check Depth 1 Sizes in `/var/log`

```bash
du -h --max-depth=1 /var/log
```

Sample output:
```
1.2G    /var/log/nginx
450M    /var/log/journal
120M    /var/log/apt
1.8G    /var/log
```

### Exclude Specific Patterns

```bash
# Exclude node_modules and .git folders
du -h --max-depth=1 --exclude="node_modules" --exclude=".git" /projects
```

---

## Interview Questions

??? question "How do you find the 10 largest subdirectories under /var using du?"
    ```bash
    du -h -d 1 /var | sort -hr | head -10
    ```
    `-d 1` restricts depth to 1 level, `sort -hr` sorts human-readable numbers in reverse (largest first), and `head -10` outputs the top 10.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `df` | Report filesystem disk space |
| `ncdu` | NCurses interactive disk usage analyzer |
| `find` | Search for files by size (`find . -size +100M`) |
