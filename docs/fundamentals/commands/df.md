---
title: "df — Report File System Disk Space Usage"
description: "Complete reference for df — human-readable disk space, inode inspection (df -i), filesystem types, and storage troubleshooting."
---

# `df` — Report Filesystem Disk Space Usage

## Overview

`df` (disk free) displays the total, used, and available disk space on mounted filesystems. It is the first command used when troubleshooting "No space left on device" errors.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/df`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
df [OPTIONS] [FILE...]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-h` | `--human-readable` — Display sizes in powers of 1024 (e.g. 1024M, 10G) |
| `-H` | `--si` — Display sizes in powers of 1000 (e.g. 1000M, 10G) |
| `-i` | `--inodes` — Display inode information instead of block usage |
| `-T` | `--print-type` — Print filesystem type (e.g. ext4, xfs, overlay, tmpfs) |
| `-t TYPE` | Include only filesystems of specified type |
| `-x TYPE` | Exclude filesystems of specified type |
| `-P` | Use POSIX output format (prevents line wrapping) |

---

## Examples

### Human-Readable Filesystem Usage

```bash
df -h
```

Sample output:
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        49G   15G   32G  32% /
tmpfs           2.0G  1.2M  2.0G   1% /run
/dev/sda2       100G   85G   10G  90% /data
```

### Display Filesystem Types and Human Sizes

```bash
df -hT
```

### Inspect Inode Consumption

!!! warning "Disk full error despite free space?"
    A filesystem can run out of **inodes** (file metadata slots) even if there are gigabytes of free storage space available. Always check `df -i` when encountering unexplained disk space errors.

```bash
df -i
```

Sample output:
```
Filesystem       Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1       3276800 120000 3156800    4% /
/dev/sda2       6553600 6553600      0  100% /data   <-- INODE EXHAUSTION!
```

### Check Storage for Specific Path

```bash
df -h /var/log
```

---

## Interview Questions

??? question "How can a system report 'No space left on device' when df -h shows 50% free space?"
    The filesystem has run out of **inodes** (inode exhaustion). Every file and directory consumes one inode. If millions of tiny files are created, all available inodes are consumed while data blocks remain free. Run `df -i` to verify.

??? question "What is the difference between `df` and `du`?"
    `df` queries filesystem metadata to report total capacity and usage for entire mounted filesystems. `du` traverses specific directory trees line by line to calculate actual space occupied by individual files and folders.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `du` | Calculate directory space usage |
| `lsblk` | List block devices |
| `stat` | Show file status and inode number |
