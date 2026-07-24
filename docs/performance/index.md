---
title: Performance Engineering
description: Linux performance analysis, profiling, eBPF, flame graphs, and system tuning.
---

# Performance Engineering

## Overview

Performance engineering on Linux is a systematic discipline. Brendan Gregg's **USE Method** (Utilization, Saturation, Errors) and **RED Method** (Rate, Errors, Duration) provide frameworks for methodical investigation.

## The Performance Analysis Checklist

When investigating a slow system, work top-down:

```
1. uptime          → Load average trend
2. dmesg | tail    → Recent kernel errors
3. vmstat 1        → CPU, memory, I/O overview
4. mpstat -P ALL 1 → Per-CPU utilization
5. pidstat 1       → Per-process CPU
6. iostat -xz 1    → Disk I/O
7. free -m         → Memory
8. sar -n DEV 1    → Network
9. sar -n TCP,ETCP 1 → TCP metrics
10. top            → Interactive overview
```

## CPU Performance

```bash
# CPU utilization
mpstat -P ALL 1 5             # All CPUs, 1s interval, 5 times
sar -u 1 60                   # 60-second CPU history

# What's using CPU
top -b -n 1 | head -20
pidstat -u 1 | sort -k8 -rn | head -10

# CPU frequency and throttling
cpupower frequency-info
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq

# CPU cache performance
perf stat -e cache-misses,cache-references ls /tmp

# Context switches
vmstat 1 | awk '{print $12, $13}'   # cs column
pidstat -w 1
```

## Memory Performance

```bash
# Memory overview
free -h
vmstat -s

# Page fault rate
vmstat 1 | awk '{print $7, $8}'    # si=swap-in, so=swap-out

# Memory pressure
cat /proc/meminfo | grep -E 'MemAvailable|Cached|Dirty|Writeback'

# Slab cache (kernel memory)
slabtop
cat /proc/slabinfo

# Per-process memory
ps aux --sort=-%mem | head -20
```

## I/O Performance

```bash
# Disk I/O stats
iostat -xz 1
# Key metrics: %util (saturation), await (latency), r/s, w/s

# I/O by process
iotop -o                      # Only show processes doing I/O
pidstat -d 1

# Block device queue
cat /sys/block/sda/queue/scheduler
cat /sys/block/nvme0n1/queue/nr_requests

# Filesystem sync stats
cat /proc/sys/vm/dirty_ratio
cat /proc/sys/vm/dirty_background_ratio
```

## Profiling with perf

```bash
# CPU profiling (sample at 99Hz for 30s)
sudo perf record -F 99 -a -g -- sleep 30
sudo perf report

# System-wide stats
sudo perf stat -a sleep 5

# Count specific events
sudo perf stat -e instructions,cycles,cache-misses ls /tmp

# Profile a specific PID
sudo perf record -F 99 -p PID -g -- sleep 10

# Flame graph
sudo perf script | stackcollapse-perf.pl | flamegraph.pl > flame.svg
```

## eBPF — Extended Berkeley Packet Filter

eBPF allows safe, dynamic tracing of kernel and user-space programs with near-zero overhead.

```bash
# Install bcc tools
apt install bpfcc-tools

# Trace new process creation
sudo execsnoop-bpfcc

# File opens with latency
sudo opensnoop-bpfcc

# TCP connections
sudo tcpconnect-bpfcc

# Disk I/O latency histogram
sudo biolatency-bpfcc

# CPU run queue latency
sudo runqlat-bpfcc

# System calls per second
sudo syscount-bpfcc
```

## Kernel Tuning

```bash
# Networking performance
sudo sysctl -w net.core.somaxconn=65535
sudo sysctl -w net.ipv4.tcp_max_syn_backlog=8192
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728
sudo sysctl -w net.ipv4.tcp_rmem="4096 87380 67108864"
sudo sysctl -w net.ipv4.tcp_wmem="4096 65536 67108864"

# Memory
sudo sysctl -w vm.swappiness=10          # Reduce swap preference
sudo sysctl -w vm.dirty_ratio=15         # % dirty pages before sync
sudo sysctl -w vm.dirty_background_ratio=5

# File descriptors
sudo sysctl -w fs.file-max=2097152
ulimit -n 1048576                         # Per-session
```

## Interview Questions

??? question "What is load average and what does it mean?"
    Load average is the average number of processes in the **run queue** (running or waiting for CPU) plus processes in **uninterruptible sleep** (waiting for I/O) over 1, 5, and 15 minutes. A load average equal to the number of CPU cores means 100% CPU utilization. Higher means saturation (processes waiting). On a 4-core system, load average of 4.0 = fully utilized. 8.0 = overloaded (every process waits on average for one other process). Use `nproc` to check core count.

??? question "What is the difference between `vmstat`'s `si`/`so` and `bi`/`bo`?"
    `si` (swap-in) and `so` (swap-out) are **swap** I/O — pages moving between RAM and swap space. High values indicate memory pressure. `bi` (blocks-in) and `bo` (blocks-out) are **block device** I/O — all disk reads and writes, including filesystem I/O. They are in units of 1K blocks/s. High `bo` is normal for write-heavy workloads; high `si/so` indicates the system is struggling with RAM.
