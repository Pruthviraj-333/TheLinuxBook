---
title: Linux Interview Prep
description: 300+ curated Linux interview questions with expert answers — categorized by topic and difficulty.
---

# Linux Interview Prep

## Overview

This section contains carefully selected Linux interview questions organized by topic, with expert-level answers. Each answer goes beyond surface-level responses to demonstrate deep understanding.

!!! tip "How to use this section"
    - Use the `???` collapsible blocks to test yourself before reading the answer
    - Focus on **understanding**, not memorization — interviewers probe depth
    - For each question, try to explain it aloud before revealing the answer

## Topics

- [Processes & Scheduling](#processes-scheduling)
- [Memory Management](#memory-management)
- [Filesystem](#filesystem)
- [Networking](#networking)
- [Security](#security)
- [systemd](#systemd)
- [Performance](#performance)
- [Kernel](#kernel)

---

## Processes & Scheduling

??? question "⭐ What happens when you run a command in bash?"
    1. Bash reads the command line and performs word splitting, globbing, and variable expansion
    2. Bash calls `fork()` — creating a child process (copy of bash)
    3. The child calls `execve()` with the command path and arguments
    4. The kernel replaces the child's address space with the new program
    5. The program runs; bash waits with `waitpid()`
    6. When the program exits, `waitpid()` returns the exit status
    7. Bash sets `$?` and displays the next prompt

??? question "⭐ What is the difference between a process and a thread?"
    A **process** is an independent execution unit with its own virtual address space, file descriptor table, and PID. A **thread** shares the address space and file descriptors with other threads in the same process (they have separate stacks and registers). In Linux, both are implemented via `clone()` with different flag combinations. `pthread_create()` uses `CLONE_VM|CLONE_FS|CLONE_FILES|CLONE_SIGHAND`. Context switching between threads is cheaper than between processes (no page table switch).

??? question "What is a context switch and what does it cost?"
    A context switch is the kernel saving the current process's CPU state (registers, program counter, stack pointer) and restoring another process's state. Cost: (1) CPU cycles to save/restore registers, (2) TLB flush (when switching between different address spaces — costly!), (3) CPU cache pollution — the new process will have many cache misses initially. Linux avoids TLB flushes using ASID (Address Space IDs). Measure with `vmstat` cs column or `pidstat -w`.

??? question "What is `wait()` and what happens if a parent never calls it?"
    `wait()` is a system call that makes the parent block until a child process exits and retrieves its exit status. If a parent never calls `wait()`, the exited child becomes a **zombie** — it holds its PID and exit status but no other resources. Zombies accumulate until the parent exits (at which point init/systemd adopts and reaps them) or until the parent is fixed to call `wait()`. Many zombies can exhaust the PID space.

??? question "Explain the Linux process scheduler (CFS)"
    The **Completely Fair Scheduler (CFS)** is the default Linux scheduler for normal processes. Key concepts: (1) **vruntime**: virtual runtime — how much CPU time a process has used, weighted by priority/nice value. (2) CFS maintains a red-black tree sorted by vruntime. The process with the lowest vruntime runs next. (3) Higher-priority processes (lower nice value) have their vruntime accumulate more slowly, so they run more often. (4) CFS targets a **scheduling period** (typically 6ms) within which every runnable process gets at least one timeslice. The scheduler tries to be "fair" — every process receives CPU proportional to its weight.

---

## Memory Management

??? question "⭐ What is virtual memory and why does it exist?"
    Virtual memory is a kernel abstraction that gives each process its own private address space, independent of physical RAM. Benefits: (1) **Isolation** — one process cannot access another's memory (protection via MMU/page tables), (2) **More memory than RAM** — pages can be swapped to disk when RAM is full, (3) **Efficient sharing** — shared libraries are mapped once in physical memory, shared across many processes with COW, (4) **Simplified programming** — every program can use the same address ranges without conflict.

??? question "What is swappiness and how does it affect system behavior?"
    `vm.swappiness` (0–200, default 60) controls how aggressively the kernel swaps anonymous pages vs reclaiming page cache. **Low swappiness (10)**: Kernel prefers to reclaim file-backed page cache over swapping anonymous memory (good for databases where RAM holds critical data). **High swappiness (100+)**: More aggressive swapping. **0**: Never swap unless absolutely necessary (memory pressure forces it). For database servers (MySQL, PostgreSQL), the common recommendation is swappiness=10. For general systems, 60 is fine.

??? question "Explain the OOM killer algorithm"
    When the kernel is critically low on memory and cannot free any, it invokes the **OOM killer** to select a victim process. Selection is based on `oom_score` (0–1000): (1) Processes consuming more memory get higher scores, (2) Root processes get a -30 penalty, (3) `oom_score_adj` allows manual adjustment (-1000 = never kill, +1000 = always kill first). The kernel picks the process with the highest `oom_score`, sends SIGKILL, and frees its memory. Check via `dmesg | grep oom` or `journalctl -k | grep "Out of memory"`.

---

## Filesystem

??? question "⭐ What is an inode?"
    An inode (index node) is a data structure in the filesystem that stores all metadata about a file **except its name**. Contents: file type, permissions, UID/GID, hard link count, file size, timestamps (atime/mtime/ctime), and pointers to data blocks. Each file has exactly one inode. Filenames exist only in directory entries, which map name strings to inode numbers. This enables hard links (multiple names → same inode) and efficient renaming within a filesystem (just update the directory entry, not the inode or data).

??? question "How does `ext4` handle large files efficiently?"
    ext4 uses a combination of **direct block pointers** (12 blocks in inode), **indirect blocks** (single, double, triple indirection), and **extents**. The modern approach uses **extents**: a contiguous range of blocks described by (start block, length). A single extent can describe millions of contiguous blocks, making large file access O(1). The inode holds up to 4 extents directly; larger files use an extent tree. This is far more efficient than the old block-pointer approach for large sequential files.

??? question "What is the dentry cache and why does it matter?"
    The **dentry cache (dcache)** is a kernel in-memory cache that maps path components to inode numbers, avoiding repeated disk lookups. When you `open("/usr/bin/bash")`, the kernel traverses each component (`/`, `usr`, `bin`, `bash`), checking the dcache at each step. Cache hits avoid disk I/O. The dcache can grow large on systems with many files. It is reclaimed automatically under memory pressure. You can observe it via `cat /proc/meminfo | grep Slab` and `slabtop | grep dentry`.

---

## Networking

??? question "⭐ Explain the TCP 3-way handshake"
    1. **SYN**: Client sends TCP segment with SYN flag, initial sequence number (ISN) X, source port. 2. **SYN-ACK**: Server receives, responds with SYN+ACK: acknowledges client's ISN (ACK=X+1), sends its own ISN Y. 3. **ACK**: Client acknowledges server's ISN (ACK=Y+1). Connection is established. Why three steps? Two steps can't guarantee both sides agree the connection is established (client might have missed the SYN-ACK). Three steps are the minimum for mutual synchronization of sequence numbers. Sequence numbers prevent replay attacks and out-of-order delivery issues.

??? question "What is TIME_WAIT and why does it exist?"
    After a TCP connection closes (FIN/FIN-ACK/ACK), the initiating side enters **TIME_WAIT** for **2×MSL** (Maximum Segment Lifetime, typically 60s total). Why: (1) **Ensures final ACK delivery** — if the last ACK is lost, the remote end will retransmit FIN, and TIME_WAIT allows sending another ACK. (2) **Prevents old packet confusion** — delayed packets from the old connection can't be mistaken for a new connection with the same 4-tuple. High TIME_WAIT counts are normal for HTTP servers. Fix: `SO_REUSEADDR` socket option, `tcp_tw_reuse` sysctl, or shorter keepalive timeouts.

---

## Kernel

??? question "⭐ What is a system call and how does it work on x86_64?"
    A system call is the mechanism for user-space code to request kernel services. On x86_64: (1) Program places syscall number in `rax`, arguments in `rdi`, `rsi`, `rdx`, `r10`, `r8`, `r9`. (2) Executes `syscall` instruction — CPU switches from ring 3 to ring 0, saves user-space registers, loads kernel stack. (3) Kernel's syscall handler dispatches to the appropriate function via the syscall table. (4) Kernel validates arguments, performs the operation, places return value in `rax`. (5) `sysret` instruction returns to ring 3. The switch has overhead (~100ns) — this is why batching I/O with `io_uring` improves performance.

??? question "What is a kernel module and how is it loaded?"
    A kernel module is a piece of kernel code that can be loaded and unloaded at runtime without rebooting. It runs in kernel space (ring 0) with full privileges. Loading sequence: (1) `insmod`/`modprobe` reads the `.ko` (kernel object) ELF file. (2) Kernel verifies the module's kernel version, license, and symbol references. (3) Memory is allocated in the kernel, module code is copied and relocated. (4) `module_init()` function is called — registers the module (adds driver hooks, creates /proc entries, etc.). Unloading calls `module_exit()`. `modprobe` (vs `insmod`) automatically resolves module dependencies.

---

## Practice Problems

!!! example "Scenario 1: Memory Leak Investigation"
    Your service is consuming 2GB RAM and growing. Walk through your investigation.
    
    *Expected answer*: Check `/proc/PID/maps`, `pmap -x PID`, compare RSS over time with `watch`, use `valgrind --leak-check=full` for dev environment, check for file descriptor leaks with `lsof -p PID | wc -l`, analyze allocator with `jemalloc` heap profiling.

!!! example "Scenario 2: High I/O Wait"
    `top` shows 40% `wa` (I/O wait). Diagnose and fix.
    
    *Expected answer*: `iostat -x 1` to identify the device, `iotop` to find the process, `lsof -p PID` to find the file, check if it's random or sequential I/O, consider: read cache tuning (`vm.dirty_*`), I/O scheduler change, SSD upgrade, application-level caching (Redis/memcached).
