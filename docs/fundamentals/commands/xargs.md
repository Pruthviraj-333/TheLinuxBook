---
title: "xargs — Build and Execute Commands from Input"
description: "Complete reference for the xargs command — syntax, options, parallel execution, and pipeline patterns."
---

# `xargs` — Build and Execute Commands from Input

## Overview

`xargs` reads items from standard input and passes them as **arguments** to another command. It solves the problem of commands that don't accept stdin directly, and can dramatically speed up processing by batching or parallelising operations.

**Command type**: External (GNU findutils)  
**Location**: `/usr/bin/xargs`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
xargs [OPTIONS] [COMMAND [ARGS]]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-n N` | Pass at most N arguments per command invocation |
| `-P N` | Run N processes in parallel |
| `-I REPLACE` | Replace occurrences of REPLACE string with each item |
| `-0` | Input items are terminated by NUL (for `find -print0`) |
| `-d DELIM` | Input delimiter (default: whitespace/newline) |
| `-r` | Do not run command if input is empty |
| `-t` | Print command before executing |
| `-p` | Prompt before executing each command |
| `--max-args=N` | Alias for `-n N` |

---

## Examples

### Basic Usage

```bash
# Pass filenames to rm (instead of shell globbing limit)
find /tmp -name "*.tmp" | xargs rm

# Echo each item (debug)
echo "one two three" | xargs -n1 echo
# one
# two
# three
```

### Handle Filenames with Spaces (NUL-separated)

```bash
# Always use -print0 with find and -0 with xargs for safety
find . -name "*.log" -print0 | xargs -0 rm

# Count lines in files with spaces in names
find . -name "*.txt" -print0 | xargs -0 wc -l
```

### Control Batch Size

```bash
# Pass 3 arguments per command invocation
echo "a b c d e f" | xargs -n3 echo
# a b c
# d e f
```

### Use a Placeholder (-I)

```bash
# Replace {} with each input item
ls *.tar.gz | xargs -I {} tar -xzf {}

# Move files to another directory
find . -name "*.jpg" | xargs -I {} mv {} /photos/

# Run a command per file with custom args
cat hostnames.txt | xargs -I HOST ssh HOST "uptime"
```

### Parallel Execution

```bash
# Run 4 jobs in parallel (massive speedup)
find . -name "*.jpg" | xargs -P4 -I {} convert {} -resize 800x600 {}.thumb.jpg

# Parallel file compression
find /var/log -name "*.log" -print0 | xargs -0 -P8 gzip
```

### With grep / find Pipelines

```bash
# Search all Python files for a pattern
find . -name "*.py" -print0 | xargs -0 grep "TODO"

# Delete files older than 30 days
find /tmp -mtime +30 -print0 | xargs -0 rm -f

# Check HTTP status of multiple URLs
cat urls.txt | xargs -P5 -I{} curl -o /dev/null -s -w "{}: %{http_code}\n" {}
```

---

## xargs vs `find -exec`

```bash
# xargs (batches files — one invocation for many files)
find . -name "*.log" | xargs gzip          # fast

# find -exec with + (same batching behaviour)
find . -name "*.log" -exec gzip {} +       # fast, equivalent

# find -exec with \; (one invocation per file — slow)
find . -name "*.log" -exec gzip {} \;      # slow
```

Use `xargs -0` with `find -print0` whenever filenames might contain spaces or special characters.

---

## Interview Questions

??? question "Why do we use `find -print0 | xargs -0` instead of just piping normally?"
    By default, `xargs` splits input on whitespace and newlines — so a filename like `my file.txt` would be treated as two separate arguments `my` and `file.txt`. Using `-print0` makes `find` separate filenames with a NUL character (which cannot appear in filenames), and `-0` tells `xargs` to use NUL as the delimiter. This correctly handles any filename, including those with spaces, tabs, or newlines.

??? question "How does xargs speed up processing with -P?"
    The `-P N` flag runs N command invocations in parallel. For example, `xargs -P4` starts 4 processes simultaneously instead of one at a time. This is especially effective for CPU-bound tasks (image conversion, compression) or I/O-bound tasks where latency can be hidden by parallelism.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `find -exec` | Execute commands on found files (alternative to xargs) |
| `parallel` (GNU) | More powerful parallel execution |
| `tee` | Split pipeline output to multiple destinations |
