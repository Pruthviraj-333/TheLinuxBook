---
title: Linux Fundamentals
description: Core Linux concepts — commands, filesystem, kernel architecture, and system internals.
---

# Linux Fundamentals

> The foundation of everything you need to know to be a Linux power user, engineer, or SRE.

## Overview

This section covers the essential building blocks of Linux knowledge. Whether you are starting fresh or revisiting fundamentals with engineering depth, this is where to begin.

## Section Map

```mermaid
graph LR
    A[Fundamentals] --> B[Commands]
    A --> C[Filesystem]
    A --> D[Kernel]
    B --> B1[ls, cd, cp, mv, rm]
    B --> B2[find, grep, awk, sed]
    B --> B3[ps, top, kill, nice]
    C --> C1[FHS Hierarchy]
    C --> C2[Inodes & Links]
    C --> C3[Permissions & ACL]
    D --> D1[System Calls]
    D --> D2[Kernel Modules]
    D --> D3[/proc & /sys]

    style A fill:#0077b6,color:#fff
```

## Core Topics

<div class="tlb-grid">
  <a class="tlb-card" href="commands/index.md">
    <span class="tlb-card-title">Commands Reference</span>
    <span class="tlb-card-desc">Every essential Linux command with syntax, options, real examples, and kernel internals.</span>
  </a>
  <a class="tlb-card" href="filesystem/index.md">
    <span class="tlb-card-title">Filesystem</span>
    <span class="tlb-card-desc">FHS directory structure, inodes, hard and soft links, VFS, and ext4 internals.</span>
  </a>
  <a class="tlb-card" href="kernel/index.md">
    <span class="tlb-card-title">Kernel Architecture</span>
    <span class="tlb-card-desc">Kernel subsystems, system calls, modules, /proc, /sys, and the boot process.</span>
  </a>
</div>

## Prerequisites

!!! note "Assumed knowledge"
    - Basic computer science concepts (processes, memory, files)
    - Comfort using a terminal
    - Any Linux distribution installed (Ubuntu, Fedora, Arch, etc.)

## Learning Path

1. Start with **[Essential Commands](commands/index.md)** — the vocabulary of Linux
2. Understand **[Filesystem Hierarchy](filesystem/index.md)** — where everything lives and why
3. Explore **[Kernel Architecture](kernel/index.md)** — how Linux actually works under the hood
4. Practice in the **[Labs](../labs/index.md)** — reinforce everything hands-on
