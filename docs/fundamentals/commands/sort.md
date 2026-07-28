---
title: "sort — Sort Lines of Text"
description: "Complete reference for the sort command — syntax, options, numeric/alphabetic sorting, unique, reverse, and pipeline examples."
---

# `sort` — Sort Lines of Text

## Overview

`sort` reads lines from files (or stdin), sorts them, and writes the result to stdout. It supports alphabetic, numeric, human-readable size, month name, and random ordering.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/sort`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
sort [OPTION]... [FILE]...
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-n` | Numeric sort (treats fields as numbers) |
| `-r` | Reverse order |
| `-u` | Output only unique lines (remove duplicates) |
| `-k FIELD` | Sort by key field N |
| `-t SEP` | Field separator character (default: whitespace) |
| `-f` | Case-insensitive (fold uppercase to lowercase) |
| `-h` | Human-readable numbers (1K, 2M, 3G) |
| `-M` | Month sort (Jan, Feb, ..., Dec) |
| `-R` | Random shuffle |
| `-o FILE` | Write output to FILE (safe to use same as input) |
| `-c` | Check if input is already sorted (no output) |

---

## Examples

### Alphabetic Sort

```bash
# Sort lines alphabetically
sort names.txt

# Reverse alphabetical
sort -r names.txt

# Case-insensitive
sort -f names.txt
```

### Numeric Sort

```bash
# Sort numbers correctly (without -n, "10" comes before "9")
sort -n numbers.txt

# Sort by file size (numeric, reversed = largest first)
ls -s | sort -n -r
```

### Sort CSV/TSV by Column

```bash
# Sort by 3rd field (space-separated)
sort -k3 file.txt

# Sort /etc/passwd by UID (field 3, colon-separated, numeric)
sort -t: -k3 -n /etc/passwd

# Sort ps output by memory usage (field 4), descending
ps aux | sort -k4 -n -r | head -10
```

### Human-Readable Size Sort

```bash
# Sort du output correctly (1K, 20M, 3G)
du -sh /var/* | sort -h

# Largest directories first
du -sh /var/* | sort -rh | head -10
```

### Unique Lines

```bash
# Sort and remove duplicates
sort -u words.txt

# Equivalent to sort | uniq
sort words.txt | uniq
```

### Sort and Save

```bash
# Write sorted output back to a file
sort -o file.txt file.txt    # Safe to use same input/output file
```

### Check if Already Sorted

```bash
sort -c file.txt
# Prints nothing if sorted, error if not
echo $?   # 0 = sorted, 1 = not sorted
```

---

## Interview Questions

??? question "Why does `sort` without `-n` give wrong results for numbers?"
    By default, `sort` compares lines as strings, character by character. So `10` comes before `9` because `'1' < '9'`. Use `-n` to compare values numerically — `9` then `10` in ascending order.

??? question "How do you sort a CSV file by its second column?"
    ```bash
    sort -t',' -k2 file.csv
    ```
    `-t','` sets the delimiter to comma, and `-k2` sorts by the second field.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `uniq` | Remove or count duplicate lines (works best after sort) |
| `awk` | Complex field-based sorting and aggregation |
| `tsort` | Topological sort |
