---
title: TheLinuxBook — Professional Linux Documentation
description: A comprehensive, production-quality Linux documentation reference — from fundamentals to kernel internals, written for engineers who take Linux seriously.
hide:
  - toc
  - navigation
---

<div class="tlb-hero">
  <h1>TheLinuxBook</h1>
  <p>
    A professional Linux documentation reference built for engineers.<br>
    From shell basics to kernel internals — everything in one place.
  </p>
  <div class="tlb-badges">
    <span class="tlb-badge tlb-badge--blue">MkDocs + Material</span>
    <span class="tlb-badge tlb-badge--green">Linux Fundamentals → Advanced</span>
    <span class="tlb-badge tlb-badge--orange">Kernel Internals</span>
    <span class="tlb-badge tlb-badge--blue">Hands-on Labs</span>
    <span class="tlb-badge tlb-badge--green">Interview Prep</span>
  </div>
</div>

## What's Inside

<div class="tlb-grid">
  <a class="tlb-card" href="fundamentals/">
    <span class="tlb-card-title">Fundamentals</span>
    <span class="tlb-card-desc">Core commands, filesystem hierarchy, kernel concepts, and system architecture.</span>
  </a>
  <a class="tlb-card" href="shell/bash/">
    <span class="tlb-card-title">Shell & Scripting</span>
    <span class="tlb-card-desc">Bash scripting, shell internals, job control, process substitution, and more.</span>
  </a>
  <a class="tlb-card" href="process/">
    <span class="tlb-card-title">Process Management</span>
    <span class="tlb-card-desc">Process lifecycle, signals, scheduling, namespaces, and cgroups.</span>
  </a>
  <a class="tlb-card" href="memory/">
    <span class="tlb-card-title">Memory Management</span>
    <span class="tlb-card-desc">Virtual memory, paging, mmap, huge pages, OOM killer, and NUMA.</span>
  </a>
  <a class="tlb-card" href="networking/">
    <span class="tlb-card-title">Networking</span>
    <span class="tlb-card-desc">TCP/IP stack, sockets, iptables, network namespaces, and troubleshooting.</span>
  </a>
  <a class="tlb-card" href="storage/">
    <span class="tlb-card-title">Storage</span>
    <span class="tlb-card-desc">Block devices, filesystems, LVM, RAID, I/O schedulers, and NFS.</span>
  </a>
  <a class="tlb-card" href="security/">
    <span class="tlb-card-title">Security</span>
    <span class="tlb-card-desc">Permissions, SELinux, AppArmor, capabilities, seccomp, and audit.</span>
  </a>
  <a class="tlb-card" href="containers/">
    <span class="tlb-card-title">Containers</span>
    <span class="tlb-card-desc">namespaces, cgroups, OCI, container runtimes — how containers actually work.</span>
  </a>
  <a class="tlb-card" href="systemd/">
    <span class="tlb-card-title">systemd</span>
    <span class="tlb-card-desc">Unit files, targets, journald, socket activation, and service hardening.</span>
  </a>
  <a class="tlb-card" href="performance/">
    <span class="tlb-card-title">Performance</span>
    <span class="tlb-card-desc">Profiling, perf, eBPF, flame graphs, CPU/memory/I/O tuning.</span>
  </a>
  <a class="tlb-card" href="troubleshooting/">
    <span class="tlb-card-title">Troubleshooting</span>
    <span class="tlb-card-desc">Systematic debugging methodology, kernel panic analysis, and war stories.</span>
  </a>
  <a class="tlb-card" href="interview/">
    <span class="tlb-card-title">Interview Prep</span>
    <span class="tlb-card-desc">300+ curated Linux interview questions with detailed, expert answers.</span>
  </a>
</div>

---

## Quick Navigation

=== "By Topic"

    | Area | Key Pages |
    |---|---|
    | **Commands** | [ls](fundamentals/commands/ls.md), chmod, chown, find, grep, awk, sed, ps, top |
    | **Filesystem** | [Hierarchy](fundamentals/filesystem/index.md), inodes, hard vs soft links, mount |
    | **Kernel** | [Architecture](fundamentals/kernel/index.md), syscalls, modules, procfs, sysfs |
    | **Processes** | fork/exec, wait, signals, scheduler, namespaces |
    | **Networking** | TCP/IP, sockets, iptables, ss, netstat, tcpdump |
    | **Security** | DAC/MAC, capabilities, SELinux, seccomp, audit |

=== "By Skill Level"

    **Beginner** — Start here:

    1. [Linux Fundamentals](fundamentals/index.md)
    2. [Essential Commands](fundamentals/commands/index.md)
    3. [Filesystem Hierarchy](fundamentals/filesystem/index.md)
    4. [Bash Scripting](shell/bash/index.md)

    **Intermediate** — Level up:

    5. [Process Management](process/index.md)
    6. [Memory Management](memory/index.md)
    7. [Networking Deep Dive](networking/index.md)
    8. [systemd](systemd/index.md)

    **Advanced** — Go deep:

    9. [Kernel Internals](fundamentals/kernel/index.md)
    10. [Performance Engineering](performance/index.md)
    11. [Container Internals](containers/index.md)
    12. [Security Hardening](security/index.md)

=== "By Use Case"

    - **SRE/DevOps**: Containers, systemd, Performance, Networking
    - **Security Engineer**: Security, Kernel, Process Management
    - **Developer**: System Calls, Memory, Filesystem, Debugging
    - **Interview**: [Interview Prep](interview/index.md), [Labs](labs/index.md)

---

## How to Use This Book

!!! tip "Markdown is the source of truth"
    Every page is a `.md` file in `docs/`. Edit in any text editor.
    Run `mkdocs serve` to preview locally with hot-reload.

!!! info "Templates available"
    Use the [page template](\_templates/page-template.md) for new topic pages
    and the [command template](\_templates/command-page-template.md) for command references.

!!! note "Keyboard shortcuts"
    - ++slash++ or ++"?"++ → Search
    - ++g++ ++h++ → Go home
    - ++g++ ++t++ → Scroll to top

---

## Architecture Overview

```mermaid
graph TD
    A[Markdown Source<br/>docs/*.md] -->|mkdocs build| B[Static HTML<br/>site/]
    B -->|GitHub Actions| C[gh-pages branch]
    C --> D[GitHub Pages<br/>yourusername.github.io/TheLinuxBook]

    style A fill:#0077b6,color:#fff,stroke:#023e8a
    style B fill:#06d6a0,color:#0d1117,stroke:#04a57a
    style C fill:#9d4edd,color:#fff,stroke:#7b2fbe
    style D fill:#f4a261,color:#0d1117,stroke:#c77b3c
```
