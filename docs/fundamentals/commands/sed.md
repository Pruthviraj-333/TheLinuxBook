---
title: "sed — Stream Editor for Text Transformation"
description: "Complete reference for the sed command — substitution (s///), in-place editing (-i), line deletion, regex flags, and real-world examples."
---

# `sed` — Stream Editor

## Overview

`sed` (Stream Editor) parses and transforms text line by line. It is commonly used for search-and-replace operations, line deletions, line insertions, and automated text refactoring in scripts.

**Command type**: External (GNU coreutils / `sed`)  
**Location**: `/usr/bin/sed`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
sed [OPTIONS] 'SCRIPT' [INPUT_FILE...]
```

A script usually follows the structure `[address]command`.

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-i[SUFFIX]` | Edit files **in-place** (overwrites original file; optional suffix creates backup) |
| `-e SCRIPT` | Add script commands to execution pipeline (allows multiple `-e` expressions) |
| `-E` / `-r` | Use Extended Regular Expressions (ERE) instead of Basic Regular Expressions (BRE) |
| `-n` | Suppress automatic printing of pattern space (use `p` command to print explicitly) |

---

## Search & Replace Syntax (`s`)

```bash
sed 's/regex/replacement/flags' file.txt
```

### Substitution Flags

| Flag | Meaning |
|------|---------|
| `g` | Replace **all** matches on each line (global), not just the first |
| `i` | Case-insensitive matching |
| `N` | Replace only the N-th occurrence on each line (e.g. `2`) |
| `p` | Print the line if substitution occurred |

---

## Examples

### Replace Text in Output

```bash
# Replace first occurrence of "http" with "https" on each line
sed 's/http/https/' urls.txt

# Replace ALL occurrences globally
sed 's/http/https/g' urls.txt

# Case-insensitive replacement
sed 's/error/warning/gi' app.log
```

### In-Place File Editing (`-i`)

```bash
# Modify file directly
sed -i 's/127.0.0.1/0.0.0.0/g' config.env

# Modify file and create a backup (config.env.bak)
sed -i.bak 's/127.0.0.1/0.0.0.0/g' config.env
```

### Delete Lines (`d`)

```bash
# Delete line 5
sed '5d' input.txt

# Delete lines 1 to 10
sed '1,10d' input.txt

# Delete lines matching a pattern (e.g. comment lines)
sed '/^#/d' config.conf

# Delete blank lines
sed '/^$/d' input.txt
```

### Print Specific Lines (`-n` with `p`)

```bash
# Print lines 20 through 30
sed -n '20,30p' /var/log/syslog

# Print only lines containing "CRITICAL"
sed -n '/CRITICAL/p' app.log
```

---

## Interview Questions

??? question "How do you safely edit a file in-place with sed and create a backup?"
    Use the `-i` flag with a backup extension: `sed -i.bak 's/foo/bar/g' file.txt`. This edits `file.txt` directly while saving the original as `file.txt.bak`.

??? question "What is the difference between `sed 's/foo/bar/'` and `sed 's/foo/bar/g'`?"
    Without the `g` (global) flag, `sed` only replaces the **first match** on each line. With `g`, it replaces **every match** on every line.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `awk` | Text scanning and field processing programming language |
| `tr` | Translate or delete characters |
| `grep` | Pattern matching utility |
