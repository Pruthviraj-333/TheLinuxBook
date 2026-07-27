---
title: TheLinuxBook — Linux Made Simple
description: A clear, easy-to-understand Linux reference guide — from basic commands to advanced concepts, written in plain English with practical examples.
hide:
  - toc
  - navigation
---

<div class="tlb-hero">
  <h1>TheLinuxBook</h1>
  <p>
    Linux made clear, simple, and practical.<br>
    Easy-to-follow command guides, step-by-step examples, and visual cheat sheets.
  </p>
  <div class="tlb-badges">
    <span class="tlb-badge tlb-badge--green">Beginner Friendly</span>
    <span class="tlb-badge tlb-badge--blue">Step-by-Step Examples</span>
    <span class="tlb-badge tlb-badge--orange">Quick Cheat Sheets</span>
    <span class="tlb-badge tlb-badge--blue">Hands-on Labs</span>
  </div>
</div>

## Quick Start Cheat Sheet

Here are the most common daily Linux tasks and the exact commands to run:

| Goal | Command | What It Does |
|------|---------|--------------|
| **List files** | `ls -l -h` | Show files in current folder with sizes |
| **Show hidden files** | `ls -a` | List all files including hidden `.` files |
| **Change folder** | `cd /path/to/folder` | Move to a different directory |
| **Go back home** | `cd ~` or `cd` | Jump straight back to your home folder |
| **Show current folder** | `pwd` | Print your current location path |
| **Copy a file** | `cp file.txt backup.txt` | Create a copy of a file |
| **Copy a folder** | `cp -r folder/ backup/` | Copy an entire folder and its contents |
| **Move or rename** | `mv old.txt new.txt` | Rename a file or move it to another folder |
| **Remove a file** | `rm file.txt` | Delete a file permanently |
| **Remove a folder** | `rm -r folder/` | Delete a folder and everything inside it |

---

## Explore by Topic

<div class="tlb-grid">
  <a class="tlb-card" href="fundamentals/">
    <span class="tlb-card-title">Fundamentals</span>
    <span class="tlb-card-desc">Basic concepts, folder structure, essential commands, and how Linux works.</span>
  </a>
  <a class="tlb-card" href="shell/bash/">
    <span class="tlb-card-title">Shell & Scripting</span>
    <span class="tlb-card-desc">How to write scripts to automate repetitive tasks step by step.</span>
  </a>
  <a class="tlb-card" href="process/">
    <span class="tlb-card-title">Process Management</span>
    <span class="tlb-card-desc">How to check running programs, stop frozen apps, and manage background tasks.</span>
  </a>
  <a class="tlb-card" href="memory/">
    <span class="tlb-card-title">Memory Management</span>
    <span class="tlb-card-desc">Understand RAM, swap space, and how Linux manages memory.</span>
  </a>
  <a class="tlb-card" href="networking/">
    <span class="tlb-card-title">Networking</span>
    <span class="tlb-card-desc">Check network status, test connections, download files, and troubleshoot.</span>
  </a>
  <a class="tlb-card" href="storage/">
    <span class="tlb-card-title">Storage</span>
    <span class="tlb-card-desc">Disk space, mounting drives, formatting partitions, and file systems.</span>
  </a>
  <a class="tlb-card" href="security/">
    <span class="tlb-card-title">Security</span>
    <span class="tlb-card-desc">File permissions, user access control, and keeping your system safe.</span>
  </a>
  <a class="tlb-card" href="containers/">
    <span class="tlb-card-title">Containers</span>
    <span class="tlb-card-desc">Learn how Docker and containers isolate applications in Linux.</span>
  </a>
  <a class="tlb-card" href="systemd/">
    <span class="tlb-card-title">systemd</span>
    <span class="tlb-card-desc">How Linux boots up, manages background services, and logs system events.</span>
  </a>
  <a class="tlb-card" href="performance/">
    <span class="tlb-card-title">Performance</span>
    <span class="tlb-card-desc">Identify system slowdowns, monitor CPU usage, and speed up your machine.</span>
  </a>
  <a class="tlb-card" href="troubleshooting/">
    <span class="tlb-card-title">Troubleshooting</span>
    <span class="tlb-card-desc">Step-by-step guides to diagnose and fix common Linux errors.</span>
  </a>
  <a class="tlb-card" href="interview/">
    <span class="tlb-card-title">Interview Prep</span>
    <span class="tlb-card-desc">Practice real-world Linux interview questions with clear explanations.</span>
  </a>
</div>

---

## Where Should I Start?

=== "Beginner (New to Linux)"

    1. **[Essential Commands Reference](fundamentals/commands/index.md)** — Master `ls`, `cd`, `cp`, `mv`, `rm`.
    2. **[Linux Fundamentals](fundamentals/index.md)** — Understand how files and folders are organized.
    3. **[Filesystem Structure](fundamentals/filesystem/index.md)** — Learn what `/etc`, `/var`, `/home`, and `/usr` mean.
    4. **[Bash Scripting Basics](shell/bash/index.md)** — Write your first script to automate tasks.

=== "Intermediate (Daily User)"

    1. **[Process Management](process/index.md)** — Learn `ps`, `top`, `kill`, and job control.
    2. **[Memory Management](memory/index.md)** — Monitor RAM usage with `free -h` and `vmstat`.
    3. **[Networking Guide](networking/index.md)** — Learn `ip`, `ping`, `curl`, `ss`, and `ssh`.
    4. **[systemd Services](systemd/index.md)** — Create and manage background system services.

=== "Advanced (SysAdmin / DevOps)"

    1. **[Kernel Architecture](fundamentals/kernel/index.md)** — Deep dive into system calls and `/proc`.
    2. **[Performance Tuning](performance/index.md)** — Monitor CPU, I/O bottlenecks with `perf` and `eBPF`.
    3. **[Containers Under the Hood](containers/index.md)** — How namespaces and cgroups build Docker containers.
    4. **[Security & Hardening](security/index.md)** — Fine-tune permissions, SELinux, and capabilities.

---

## Simple Visual Workflow

```mermaid
graph LR
    A[Read Simple Guide] --> B[Try Command in Terminal]
    B --> C[Check Output & Examples]
    C --> D[Master Linux Concepts]

    style A fill:#7aa2f7,color:#fff
    style B fill:#9ece6a,color:#1a1b26
    style C fill:#bb9af7,color:#fff
    style D fill:#7dcfff,color:#1a1b26
```
