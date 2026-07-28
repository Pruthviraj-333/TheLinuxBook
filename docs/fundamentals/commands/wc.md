---
title: "wc — Word, Line, and Character Count"
description: "Complete reference for the wc command — syntax, options, examples, and counting patterns for files and pipelines."
---

# `wc` — Word, Line, and Character Count

## Overview

`wc` counts **lines, words, characters, and bytes** in files or standard input. It is one of the most useful commands for quick file analysis and pipeline processing.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/wc`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
wc [OPTION]... [FILE]...
```

---

## Options Reference

| Option | Long Form | Description |
|--------|-----------|-------------|
| `-l` | `--lines` | Print line count only |
| `-w` | `--words` | Print word count only |
| `-c` | `--bytes` | Print byte count only |
| `-m` | `--chars` | Print character count (differs from bytes for UTF-8) |
| `-L` | `--max-line-length` | Print length of longest line |

With no options, `wc` prints **lines, words, bytes** in that order.

---

## Examples

### Basic Count

```bash
# Count lines, words, bytes
wc file.txt
# 42  156  1024 file.txt

# Count multiple files (shows per-file + total)
wc file1.txt file2.txt
```

### Specific Counts

```bash
# Count lines only
wc -l /etc/passwd
# 42 /etc/passwd

# Count words only
wc -w essay.txt

# Count bytes only
wc -c image.png

# Length of the longest line
wc -L source.py
```

### Count Lines in a Directory

```bash
# Count total lines across all Python files
wc -l *.py

# Count total lines in all files recursively
find . -name "*.md" | xargs wc -l | tail -1
```

### Use in Pipelines

```bash
# How many running processes?
ps aux | wc -l

# How many files in a directory?
ls /etc | wc -l

# How many lines contain "error"?
grep -i "error" app.log | wc -l

# How many unique IPs in an access log?
awk '{print $1}' access.log | sort -u | wc -l
```

### Character vs Byte Count

```bash
# For ASCII files, -c and -m are identical
# For UTF-8 files, -m counts Unicode code points, -c counts raw bytes
echo "café" | wc -c   # 6 (é = 2 bytes in UTF-8)
echo "café" | wc -m   # 5 (4 characters + newline)
```

---

## Interview Questions

??? question "What is the difference between `wc -c` and `wc -m`?"
    `-c` counts raw **bytes** in the file. `-m` counts **characters** (Unicode code points). For plain ASCII text they are identical. For UTF-8 encoded files with multi-byte characters (like accented letters or CJK characters), `-m` gives the number of characters while `-c` gives the larger byte count.

??? question "How do you count the number of files in a directory?"
    ```bash
    ls -1 /path/to/dir | wc -l
    ```
    The `-1` flag ensures one file per line. Note this counts all entries including hidden files only if you add `-a`.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `cat` | Display file contents |
| `grep -c` | Count matching lines |
| `awk` | Flexible counting and aggregation |
| `du` | Disk usage (file sizes) |
