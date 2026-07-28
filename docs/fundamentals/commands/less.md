---
title: "less — Opposite of more (Terminal File Pager)"
description: "Complete reference for the less command — navigation shortcuts, search, line numbers, live follow mode (+F), and comparison with more."
---

# `less` — Terminal File Pager

## Overview

`less` is a terminal paging utility used to view the contents of a text file one page at a time. Unlike older pagers like `more`, `less` does not need to read the entire file before starting, making it fast on massive files. It also allows both forward and backward navigation.

**Command type**: External  
**Location**: `/usr/bin/less`

---

## Syntax

```bash
less [OPTIONS] FILE...
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-N` | Show line numbers |
| `-S` | Chop long lines (disable line wrapping) |
| `-i` | Ignore case in searches unless search pattern contains uppercase letters |
| `-F` | Quit automatically if the entire file fits on one screen |
| `-X` | Disable sending termcap initialization/deinitialization strings (leaves file content on screen after exit) |
| `+F` | Open file directly in live follow mode (similar to `tail -f`) |
| `+G` | Start viewing from the end of the file |

---

## Essential Navigation Shortcuts

When viewing a file inside `less`, use the following keyboard shortcuts:

### Movement

| Key | Action |
|-----|--------|
| `Space` / `Page Down` | Scroll down one full page |
| `b` / `Page Up` | Scroll up one full page |
| `j` / `Down Arrow` | Scroll down one line |
| `k` / `Up Arrow` | Scroll up one line |
| `g` | Jump to the beginning of the file |
| `G` | Jump to the end of the file |
| `50g` | Jump to line 50 |

### Search

| Key | Action |
|-----|--------|
| `/pattern` | Search forward for `pattern` |
| `?pattern` | Search backward for `pattern` |
| `n` | Repeat search for next occurrence |
| `N` | Repeat search for previous occurrence in opposite direction |

### Other Controls

| Key | Action |
|-----|--------|
| `F` | Switch to live follow mode (press `Ctrl+C` to return to regular pager mode) |
| `m` followed by letter | Set a mark (e.g. `ma` marks current location as `a`) |
| `'` followed by letter | Jump to mark (e.g. `'a`) |
| `q` | Quit `less` |

---

## Examples

### View File with Line Numbers and Unwrapped Lines

```bash
less -N -S /var/log/syslog
```

### Live Log Monitoring with `less`

```bash
# Open file in follow mode
less +F /var/log/nginx/access.log
```

While in follow mode, press `Ctrl+C` to interrupt log following and use regular `less` search/navigation features. Press `Shift+F` to resume following.

### Pipe Command Output into `less`

```bash
# View long directory listing
ls -la /etc | less

# View git logs
git log --oneline --graph | less
```

---

## Interview Questions

??? question "Why is `less` preferred over `cat` or `more` for large log files?"
    `less` doesn't load the entire file into memory before displaying, allowing instant opening of multi-gigabyte log files. Unlike `more`, `less` supports backward scrolling and searching.

??? question "How do you switch between live log tailing and searching inside `less`?"
    Use `less +F logfile` to follow live output. Press `Ctrl+C` to stop following and navigate/search backward. Press `Shift+F` to return to live tailing mode.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `more` | Older, legacy terminal pager (forward only) |
| `tail` | View the end of a file or follow live changes |
| `head` | View the beginning of a file |
