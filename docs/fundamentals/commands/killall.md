---
title: "killall — Kill Processes by Name"
description: "Complete reference for the killall command — syntax, options, exact match, signals, and comparison with pkill."
---

# `killall` — Kill Processes by Name

## Overview

`killall` sends a signal to all processes running a specified command name. Unlike `kill` (which takes PIDs), `killall` takes command names directly.

**Command type**: External (psmisc)  
**Location**: `/usr/bin/killall`

---

## Syntax

```bash
killall [OPTIONS] [SIGNAL] NAME...
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-s SIGNAL` / `-SIGNAL` | Send specified signal (default: `SIGTERM` / `15`) |
| `-i` | Interactive — ask for confirmation before killing each process |
| `-u USER` | Kill processes owned by specified USER |
| `-v` | Verbose — report whether signal was sent successfully |
| `-q` | Quiet — do not complain if no matching processes are found |
| `-w` | Wait — block until all killed processes have terminated |
| `-y N` | Kill processes younger than N seconds/minutes/hours/days |
| `-o N` | Kill processes older than N seconds/minutes/hours/days |

---

## Examples

### Gracefully Terminate All Instances of a Process

```bash
# Send SIGTERM to all nginx processes
killall nginx
```

### Force-Kill Processes

```bash
# Send SIGKILL (9) to all firefox instances
killall -9 firefox
```

### Interactive Termination with Confirmation

```bash
killall -i python3
```

### Kill Only Processes Owned by a Specific User

```bash
killall -u www-data php-fpm
```

---

## killall vs pkill

| Feature | `killall` | `pkill` |
|---------|-----------|---------|
| Pattern Matching | Exact process command name match (by default) | Full regular expression pattern match |
| Package | `psmisc` | `procps` |
| Safety | Safer against accidental partial pattern matches | Requires care to avoid matching unintended processes |

---

## Interview Questions

??? question "What is the key difference between `killall` and `pkill`?"
    `killall` matches exact process command names by default (e.g. `killall nginx` kills processes named `nginx`). `pkill` uses regular expression matching across process names or full command lines (e.g. `pkill ng` matches `nginx`, `ngg`, etc.).

---

## Related Commands

| Command | Description |
|---------|-------------|
| `kill` | Send signal to process by Process ID (PID) |
| `pkill` | Kill processes matching pattern |
| `pgrep` | List process IDs matching pattern |
