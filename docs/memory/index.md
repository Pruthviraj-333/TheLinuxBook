---
title: Memory Management
description: Linux virtual memory, paging, mmap, huge pages, OOM killer, NUMA, and memory internals.
---

# Memory Management

## Overview

Linux uses **virtual memory** — every process sees its own address space independent of physical RAM. The kernel manages the mapping between virtual and physical addresses, handles page faults, implements swapping, and protects processes from each other.

## Process Memory Layout

<memory-layout></memory-layout>

## Virtual Memory Concepts

=== "Virtual vs Physical"

    ```bash
    # Virtual memory of PID 1
    cat /proc/1/maps

    # Memory stats
    free -h
    cat /proc/meminfo | head -30

    # Process memory usage
    ps aux --sort=-%mem | head -15
    ```

=== "Pages & Page Faults"

    - Default page size: **4KB** on x86_64
    - A **page fault** occurs when a virtual address has no physical page mapped
    - The kernel handles it by allocating a physical page and updating the page table
    - **Major fault**: requires disk I/O (page was swapped out)
    - **Minor fault**: page is in memory but not mapped to this process (e.g., CoW)

    ```bash
    # Check page faults for a process
    /usr/bin/time -v ls /tmp 2>&1 | grep "Page faults"
    ```

=== "Huge Pages"

    ```bash
    # Check huge page support
    grep -i huge /proc/meminfo

    # Configure huge pages
    echo 512 | sudo tee /proc/sys/vm/nr_hugepages

    # Transparent huge pages (THP)
    cat /sys/kernel/mm/transparent_hugepage/enabled

    # Disable THP (often recommended for databases)
    echo never | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
    ```

## Memory Analysis Tools

```bash
# System memory overview
free -h

# Detailed memory info
cat /proc/meminfo

# Per-process memory
pmap -x PID
cat /proc/PID/status | grep -i vm
cat /proc/PID/smaps_rollup

# Memory usage by process (sorted)
ps aux --sort=-%mem | head -20

# Virtual memory statistics
vmstat 1 5

# Page table statistics
cat /proc/vmstat | grep -E 'pgfault|pgmajfault|pswp'

# Memory usage per cgroup
cat /sys/fs/cgroup/.../memory.current
```

## OOM Killer

When the system runs out of memory, the **OOM (Out Of Memory) killer** terminates processes to free RAM.

```bash
# Check OOM kills in kernel log
dmesg | grep -i "oom killer"
journalctl -k | grep -i "out of memory"

# OOM score of a process (higher = more likely to be killed)
cat /proc/PID/oom_score

# Adjust OOM score (-1000 = never kill, +1000 = kill first)
echo -500 | sudo tee /proc/PID/oom_score_adj

# Protect systemd services from OOM
# In unit file: OOMScoreAdjust=-500
```

## Interview Questions

??? question "What is the difference between RSS and VSZ in `ps` output?"
    **VSZ (Virtual Size)**: Total virtual memory claimed by the process — includes all mapped memory, shared libraries, stack, heap. Usually much larger than physical memory usage. **RSS (Resident Set Size)**: Physical RAM currently in use by the process. Excludes swapped-out pages and pages not yet faulted in. RSS is the better indicator of actual memory pressure. Note: RSS can be misleading for shared libraries (each process counts the full shared library in its RSS, but physically it's loaded once).

??? question "What is copy-on-write (CoW) in the context of `fork()`?"
    When a process forks, Linux does **not** immediately copy the parent's memory pages. Instead, both parent and child share the same physical pages, marked read-only. When either process tries to **write** to a page, the kernel gets a page fault, creates a private copy of that page, and allows the write. This makes `fork()` extremely fast even for large processes, since in `fork()+exec()` scenarios, most pages are never written to.
