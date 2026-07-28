---
title: "top — Real-Time Process Viewer"
description: "Complete reference for the top command — interactive controls, columns explained, sorting, and performance monitoring."
---

# `top` — Real-Time Process Viewer

## Overview

`top` provides a **real-time, continuously updating** view of running processes, CPU usage, memory usage, and system load. It is the standard first-look tool when diagnosing performance issues on a Linux system.

**Command type**: External (procps-ng)  
**Location**: `/usr/bin/top`

---

## Syntax

```bash
top [OPTIONS]
```

---

## Command-Line Options

| Option | Description |
|--------|-------------|
| `-d N` | Update interval in seconds (default: 3) |
| `-p PID` | Monitor specific PID(s) only |
| `-u USER` | Show only processes for USER |
| `-n N` | Run N iterations and exit (useful in scripts) |
| `-b` | Batch mode — non-interactive, good for scripting |
| `-H` | Show individual threads |
| `-i` | Ignore idle processes |

---

## Interactive Keyboard Controls

Once `top` is running, these keys control it:

| Key | Action |
|-----|--------|
| `q` | Quit |
| `h` | Show help |
| `k` | Kill a process (prompts for PID and signal) |
| `r` | Renice a process (change priority) |
| `M` | Sort by memory usage (`%MEM`) |
| `P` | Sort by CPU usage (`%CPU`, default) |
| `T` | Sort by cumulative CPU time |
| `N` | Sort by PID |
| `u` | Filter by username |
| `f` | Field management — add/remove columns |
| `d` | Change update delay |
| `1` | Toggle per-CPU view |
| `m` | Toggle memory display format |
| `z` | Toggle colour |
| `W` | Write current configuration |
| `Space` | Force immediate refresh |

---

## Understanding the top Header

```
top - 10:30:00 up 5 days,  2:15,  2 users,  load average: 0.52, 0.48, 0.45
Tasks: 285 total,   1 running, 284 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.2 us,  0.8 sy,  0.0 ni, 95.5 id,  0.3 wa,  0.0 hi,  0.2 si
MiB Mem :  15928.5 total,   3421.2 free,   8234.1 used,   4273.2 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   6892.3 avail Mem
```

**Load average**: 1, 5, 15 minute averages. A value equal to the number of CPU cores means 100% utilized.

**CPU breakdown**:

| Field | Meaning |
|-------|---------|
| `us` | User space CPU % |
| `sy` | System (kernel) CPU % |
| `ni` | Nice (low-priority) CPU % |
| `id` | Idle % |
| `wa` | I/O wait % — high value = storage bottleneck |
| `hi` | Hardware interrupt % |
| `si` | Software interrupt % |

---

## Process Table Columns

| Column | Meaning |
|--------|---------|
| `PID` | Process ID |
| `USER` | Owner |
| `PR` | Scheduling priority |
| `NI` | Nice value (-20 to +19) |
| `VIRT` | Virtual memory size |
| `RES` | Resident RAM (physical memory in use) |
| `SHR` | Shared memory size |
| `S` | Process state (R/S/D/Z/T) |
| `%CPU` | CPU usage since last update |
| `%MEM` | Physical memory as % of total RAM |
| `TIME+` | Cumulative CPU time |
| `COMMAND` | Process name |

---

## Useful Non-Interactive Modes

```bash
# Single snapshot (1 iteration) in batch mode
top -bn1 | head -20

# Monitor one PID
top -p 1234

# Watch top 5 CPU consumers
top -bn1 | awk 'NR>7{print}' | head -5

# Save output to file
top -bn1 > /tmp/top_snapshot.txt
```

---

## Interview Questions

??? question "What does a high `wa` (I/O wait) value in top mean?"
    `wa` is the percentage of time the CPU is idle while waiting for I/O (disk reads/writes) to complete. A high `wa` value (above 10–20%) means the system is I/O-bound — the CPU is available but processes are stuck waiting for storage. This points to slow disk, a saturated storage array, or a poorly optimized database.

??? question "What is the load average and what does it mean relative to CPU count?"
    Load average represents the average number of processes in the run queue (running or waiting to run) over 1, 5, and 15 minutes. A load of 1.0 on a single-core system means 100% utilization. On a 4-core system, a load of 4.0 means 100% utilized. Values consistently above the CPU count indicate the system is overloaded.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `htop` | Enhanced interactive process viewer |
| `ps` | Snapshot process list |
| `vmstat` | Virtual memory and CPU statistics |
| `iostat` | I/O and CPU statistics |
| `sar` | System activity reporter |
