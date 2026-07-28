---
title: "htop — Interactive Process Viewer"
description: "Complete reference for the htop command — interactive interface, process tree, filtering, sorting, memory meters, and shortcuts."
---

# `htop` — Interactive Process Viewer

## Overview

`htop` is an interactive system-monitor process viewer. It improves upon `top` by providing a colourful, mouse-supported text interface, horizontal/vertical scrolling, visual memory/CPU meters, and full process tree views.

**Command type**: External  
**Location**: `/usr/bin/htop`

---

## Syntax

```bash
htop [OPTIONS]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-d DELAY` | Set delay between updates in tenths of seconds (e.g. `-d 10` = 1 second) |
| `-C` | Start in monochrome (no-colour) mode |
| `-u USER` | Show only processes belonging to USER |
| `-p PID` | Show only specified process ID(s) |
| `-t` | Show processes in a tree structure |

---

## Essential Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F1` / `h` | Display help screen |
| `F2` / `S` | Setup menu (customize header meters and column colors) |
| `F3` / `/` | Search for process command name |
| `F4` / `\` | Filter processes by name |
| `F5` / `t` | Toggle tree view (show parent-child process relationships) |
| `F6` | Select column to sort by |
| `F7` / `]` | Decrease nice value (increase process priority — root required) |
| `F8` / `[` | Increase nice value (decrease process priority) |
| `F9` / `k` | Send signal to selected process (kill menu) |
| `F10` / `q` | Quit `htop` |
| `Space` | Tag selected process |
| `U` | Untag all processes |

---

## Examples

### View Processes as Tree

```bash
htop -t
```

### Filter Processes by User

```bash
htop -u www-data
```

---

## Interview Questions

??? question "What advantages does `htop` offer over traditional `top`?"
    `htop` offers an interactive GUI-like terminal experience with color-coded CPU/memory meters, support for mouse clicks and scrolling, easy process filtering (`F4`), process tree views (`F5`), and quick signal selection without having to remember PID numbers.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `top` | Standard POSIX process monitoring tool |
| `btop` / `bpytop` | Modern resource monitor with visual graphs |
| `glances` | Cross-platform system monitoring tool |
