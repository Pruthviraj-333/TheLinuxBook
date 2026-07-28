---
title: "tar — Tape Archiver (Archive and Compress Files)"
description: "Complete reference for tar — creating archives (-czf), extracting archives (-xzf), listing contents (-tzf), and compression options (gzip, bzip2, xz)."
---

# `tar` — Tape Archiver

## Overview

`tar` (Tape ARchiver) creates, maintains, modifies, and extracts archive files. It bundles multiple files and directories into a single archive file, with optional compression algorithms (Gzip, Bzip2, XZ).

**Command type**: External (GNU tar)  
**Location**: `/bin/tar`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
tar [MODE_FLAG][OPTIONS] -f ARCHIVE_FILE [FILES...]
```

---

## Key Mode Flags

| Flag | Long Form | Description |
|------|-----------|-------------|
| `-c` | `--create` | Create a new archive |
| `-x` | `--extract` | Extract files from an archive |
| `-t` | `--list` | List contents of an archive without extracting |
| `-u` | `--update` | Append files that are newer than copy in archive |

---

## Compression Flags

| Flag | Compression Algorithm | File Extension | Speed vs Ratio |
|------|-----------------------|----------------|----------------|
| `-z` | Gzip | `.tar.gz` / `.tgz` | Fast speed, good ratio |
| `-j` | Bzip2 | `.tar.bz2` | Moderate speed, better ratio |
| `-J` | XZ | `.tar.xz` | Slower speed, maximum compression ratio |

---

## Examples

### Create Archives

```bash
# Create compressed gzipped archive of a folder
tar -czvf backup.tar.gz /var/www/html

# Create compressed XZ archive (maximum compression)
tar -cJvf logs.tar.xz /var/log
```

### Extract Archives

```bash
# Extract .tar.gz into current directory
tar -xzvf archive.tar.gz

# Extract into a specific destination directory
tar -xzvf archive.tar.gz -C /opt/app
```

### List Archive Contents

```bash
# List files inside archive without extracting
tar -tzvf archive.tar.gz
```

---

## Interview Questions

??? question "What do the flags `-czvf` and `-xzvf` stand for in tar?"
    - `-c`: Create archive
    - `-x`: Extract archive
    - `-z`: Filter through Gzip compression
    - `-v`: Verbose output (list processed files)
    - `-f`: Specify target archive filename

---

## Related Commands

| Command | Description |
|---------|-------------|
| `gzip` | Single file compressor utility |
| `zip` / `unzip` | Standard PKZIP archive manager |
