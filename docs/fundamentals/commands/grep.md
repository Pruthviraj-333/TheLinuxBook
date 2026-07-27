---
title: "grep — Search Text with Patterns"
description: "Complete reference for the grep command — syntax, regex patterns, options, examples, and internals."
---

# `grep` — Search Text with Patterns

## Overview

`grep` searches one or more files (or stdin) for lines matching a pattern and prints matching lines. It is one of the most frequently used Linux commands, essential for log analysis, code search, and pipeline filtering.

**Name**: **G**lobally search a **R**egular **E**xpression and **P**rint  
**Command type**: External (GNU grep)  
**Location**: `/usr/bin/grep`  
**Standard**: POSIX.1-2017

---

## Syntax

```bash
grep [OPTION]... PATTERN [FILE]...
grep [OPTION]... -e PATTERN... [FILE]...
grep [OPTION]... -f PATTERN_FILE [FILE]...
```

---

## Options Reference

### Output Control

| Option | Description |
|--------|-------------|
| `-c` | Print count of matching lines (not the lines themselves) |
| `-l` | Print only filenames that contain a match |
| `-L` | Print only filenames with **no** match |
| `-n` | Prefix each line with its line number |
| `-o` | Print only the matching part of the line (not the whole line) |
| `-q` | Quiet — exit 0 if match found, no output |
| `-v` | Invert — print lines that do **not** match |
| `-m N` | Stop after N matches |

### Context Lines

| Option | Description |
|--------|-------------|
| `-A N` | Print N lines **after** each match |
| `-B N` | Print N lines **before** each match |
| `-C N` | Print N lines **before and after** each match |

### Pattern / Matching

| Option | Description |
|--------|-------------|
| `-i` | Case-insensitive matching |
| `-w` | Match whole words only |
| `-x` | Match whole lines only |
| `-e PATTERN` | Use PATTERN (allows multiple `-e` flags) |
| `-f FILE` | Read patterns from FILE (one per line) |

### Regex Engine

| Option | Description |
|--------|-------------|
| (default) | Basic Regular Expressions (BRE) |
| `-E` | Extended Regular Expressions (ERE) — like `egrep` |
| `-F` | Fixed strings — no regex, fast literal search — like `fgrep` |
| `-P` | Perl-compatible Regular Expressions (PCRE) |

### Recursive

| Option | Description |
|--------|-------------|
| `-r` | Recurse into directories |
| `-R` | Recurse, also following symlinks |
| `--include=GLOB` | Only search files matching glob (use with `-r`) |
| `--exclude=GLOB` | Skip files matching glob |

---

## Examples

### Basic Search

```bash
# Search for "error" in a file
grep "error" /var/log/syslog

# Case-insensitive
grep -i "error" /var/log/syslog

# Show line numbers
grep -n "error" /var/log/syslog
```

### Invert / Negative Match

```bash
# Print all lines that do NOT contain "debug"
grep -v "debug" app.log

# Count non-matching lines
grep -vc "debug" app.log
```

### Context Around Matches

```bash
# Show 3 lines before and after each match
grep -C 3 "segfault" /var/log/kern.log

# 2 lines before only
grep -B 2 "ERROR" app.log

# 5 lines after only
grep -A 5 "Starting server" app.log
```

### Count and List Files

```bash
# Count matching lines in each file
grep -c "ERROR" *.log

# List files that contain the pattern
grep -l "TODO" src/**/*.py

# List files that do NOT contain the pattern
grep -L "#!/bin/bash" scripts/*.sh
```

### Whole Word / Whole Line

```bash
# Match "log" as a whole word (not "logging" or "syslog")
grep -w "log" /var/log/syslog

# Match only lines that are exactly "done"
grep -x "done" status.txt
```

### Recursive Search Through Directories

```bash
# Search all .conf files recursively
grep -r "Listen 80" /etc/ --include="*.conf"

# Search source code, excluding build artifacts
grep -r "TODO" ./src --include="*.py" --exclude-dir="__pycache__"
```

### Extended and Perl Regex

```bash
# ERE: match IP addresses (simplified)
grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log

# ERE: match "error" or "warning"
grep -E "error|warning" app.log

# PCRE: named groups, lookahead/lookbehind
grep -P "(?<=user=)\w+" auth.log
```

### Multiple Patterns with -e

```bash
# Match any line containing "error" OR "fail" OR "critical"
grep -e "error" -e "fail" -e "critical" app.log

# Or using ERE:
grep -E "error|fail|critical" app.log
```

### Extract Only the Match

```bash
# Extract just the matched portion (not the whole line)
grep -oE "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" access.log
```

### Use in Pipelines

```bash
# Filter output of another command
ps aux | grep nginx | grep -v grep

# Count lines in a log file containing "404"
cat access.log | grep " 404 " | wc -l

# Quick quiet check (no output, just exit code)
if grep -q "ERROR" app.log; then
    echo "Errors found!"
fi
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Match found |
| `1` | No match found |
| `2` | Error (e.g., file not found, invalid regex) |

This makes `grep -q` very useful in shell conditionals.

---

## Regular Expression Quick Reference

| Pattern | Matches |
|---------|---------|
| `.` | Any single character |
| `*` | Zero or more of previous |
| `+` | One or more (ERE only) |
| `?` | Zero or one (ERE only) |
| `^` | Start of line |
| `$` | End of line |
| `[abc]` | Any of a, b, or c |
| `[^abc]` | Any character except a, b, c |
| `\w` | Word character (PCRE) |
| `\d` | Digit (PCRE) |
| `\b` | Word boundary (PCRE) |

---

## Interview Questions

??? question "What is the difference between grep, egrep, and fgrep?"
    `grep` uses Basic Regular Expressions (BRE). `egrep` (or `grep -E`) uses Extended Regular Expressions, which support `+`, `?`, `|`, `{n,m}`, and `()` without escaping. `fgrep` (or `grep -F`) treats the pattern as a literal fixed string — no regex — making it much faster for simple text searches.

??? question "What does grep's exit code mean?"
    Exit code `0` means at least one match was found. Exit code `1` means no matches. Exit code `2` means an error occurred (bad regex, file not found, etc.). This is useful in scripts: `grep -q "pattern" file && echo "found"` runs the `echo` only if the pattern is found.

??? question "How do you search for a literal dot (.) with grep?"
    In a regex, `.` matches any character. To match a literal dot, escape it: `grep '\.'` or `grep -F '.'`. Using `-F` (fixed string) is safer when you want no regex interpretation at all.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `awk` | Pattern scanning and field extraction |
| `sed` | Stream editor — find and replace |
| `find` | Search files by metadata (not content) |
| `ripgrep` (`rg`) | Faster modern alternative to grep |
| `ag` (The Silver Searcher) | Another fast code-search tool |
