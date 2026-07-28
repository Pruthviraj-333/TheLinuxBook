---
title: "diff — Compare Files Line by Line"
description: "Complete reference for the diff command — syntax, output formats, patching, and practical examples."
---

# `diff` — Compare Files Line by Line

## Overview

`diff` compares two files line by line and reports what must be changed to make them identical. Its output is the foundation of **patches** — the standard format for distributing code changes.

**Command type**: External (GNU diffutils)  
**Location**: `/usr/bin/diff`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
diff [OPTIONS] FILE1 FILE2
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-u` / `--unified` | Unified diff format (most common — used by git) |
| `-c` | Context diff format |
| `-i` | Ignore case differences |
| `-w` | Ignore all whitespace |
| `-b` | Ignore changes in amount of whitespace |
| `-B` | Ignore blank lines |
| `-r` | Recursively compare directories |
| `-q` | Only report whether files differ (no details) |
| `-N` | Treat missing files as empty |
| `--color` | Coloured output |
| `-y` | Side-by-side output |
| `-W N` | Width for side-by-side output |

---

## Understanding Diff Output

### Normal Format

```bash
diff file1.txt file2.txt
# 3c3
# < old line in file1
# ---
# > new line in file2
```

| Symbol | Meaning |
|--------|---------|
| `<` | Line from FILE1 |
| `>` | Line from FILE2 |
| `a` | Add (lines exist in FILE2 but not FILE1) |
| `d` | Delete (lines exist in FILE1 but not FILE2) |
| `c` | Change (lines differ between files) |

### Unified Format (Most Common)

```bash
diff -u original.txt modified.txt
# --- original.txt  2025-01-15 10:00:00
# +++ modified.txt  2025-01-15 10:05:00
# @@ -1,5 +1,5 @@
#  unchanged line
# -removed line
# +added line
#  another unchanged line
```

| Symbol | Meaning |
|--------|---------|
| `-` | Line removed (was in FILE1) |
| `+` | Line added (exists in FILE2) |
| ` ` | Context line (unchanged) |

---

## Examples

### Basic Comparison

```bash
# Compare two files
diff file1.txt file2.txt

# Unified format (standard for patches)
diff -u file1.txt file2.txt

# Side-by-side
diff -y file1.txt file2.txt

# Only report if different
diff -q config.old config.new && echo "Same" || echo "Different"
```

### Compare Directories

```bash
# Recursively compare two directories
diff -r dir1/ dir2/

# Only list which files differ
diff -rq dir1/ dir2/
```

### Ignore Whitespace

```bash
# Ignore all whitespace differences
diff -w file1.txt file2.txt

# Ignore trailing whitespace only
diff -b file1.txt file2.txt
```

### Create and Apply Patches

```bash
# Create a patch file
diff -u original.c modified.c > my_fix.patch

# Apply the patch
patch original.c < my_fix.patch

# Apply in reverse (undo a patch)
patch -R original.c < my_fix.patch
```

---

## Interview Questions

??? question "What is the difference between `diff -u` and `diff -c`?"
    Both show context around changes, but in different formats. `-u` (unified) shows removed lines with `-` and added lines with `+` in a single block — this is the format used by `git diff` and most modern tools. `-c` (context) shows OLD and NEW sections separately with `!` markers. Unified format is more compact and is the standard for patches.

??? question "How do you compare two directories recursively?"
    `diff -r dir1/ dir2/` compares all files in both directory trees recursively. Add `-q` to only show which files differ without the actual line-by-line differences. Use `diff -rq dir1/ dir2/` to get a clean list of files that have changed.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `patch` | Apply diff output to files |
| `vimdiff` | Interactive side-by-side diff in vim |
| `git diff` | Compare files tracked by git |
| `colordiff` | Coloured wrapper around diff |
