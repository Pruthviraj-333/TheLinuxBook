---
title: "uniq — Filter Duplicate Lines"
description: "Complete reference for the uniq command — syntax, options, counting duplicates, and pipeline examples."
---

# `uniq` — Filter Duplicate Lines

## Overview

`uniq` filters **adjacent duplicate lines** from input. It is almost always used after `sort`, because it only compares consecutive lines — non-adjacent duplicates are not removed.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/uniq`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
uniq [OPTION]... [INPUT [OUTPUT]]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-c` | Prefix each line with the count of occurrences |
| `-d` | Print only duplicate lines (lines that appear more than once) |
| `-u` | Print only unique lines (lines that appear exactly once) |
| `-i` | Case-insensitive comparison |
| `-f N` | Skip first N fields before comparing |
| `-s N` | Skip first N characters before comparing |
| `-w N` | Compare only first N characters |

---

## Examples

### Basic Deduplication

```bash
# Remove adjacent duplicates (file must be sorted first!)
sort words.txt | uniq

# Shortcut: sort -u does both
sort -u words.txt
```

### Count Occurrences

```bash
# Count how many times each line appears
sort words.txt | uniq -c

# Sort by frequency (most common first)
sort words.txt | uniq -c | sort -rn

# Top 10 most common words in a file
tr -s '[:space:]' '\n' < text.txt | sort | uniq -c | sort -rn | head -10
```

### Show Only Duplicates or Unique Lines

```bash
# Show only lines that appear MORE than once
sort file.txt | uniq -d

# Show only lines that appear exactly once
sort file.txt | uniq -u
```

### Real-World Examples

```bash
# Find duplicate IP addresses in an access log
awk '{print $1}' access.log | sort | uniq -d

# Count unique HTTP status codes and their frequency
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# Find commands used most often in shell history
history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10
```

---

## Interview Questions

??? question "Why must input be sorted before using `uniq`?"
    `uniq` only compares **adjacent** lines. If duplicates are not next to each other, `uniq` won't detect them. Running `sort` first groups all identical lines together, so `uniq` can then identify and remove them correctly.

??? question "How do you find the 5 most common lines in a file?"
    ```bash
    sort file.txt | uniq -c | sort -rn | head -5
    ```
    This pipeline: sorts lines → counts occurrences → sorts by count (descending) → takes top 5.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `sort` | Sort lines (prerequisite for uniq) |
| `sort -u` | Sort and deduplicate in one step |
| `awk` | More flexible counting and deduplication |
