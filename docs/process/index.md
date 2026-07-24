---
title: Process Management
description: Linux process lifecycle, scheduler, signals, namespaces, cgroups, and process internals.
---

# Process Management

## Overview

Every running program in Linux is a **process** — an instance of a program in execution with its own address space, file descriptors, and scheduling state. Understanding process management is core to Linux mastery.

## Process Lifecycle

<process-lifecycle></process-lifecycle>

## Creating Processes

=== "fork() + exec()"

    ```bash
    # Shell forks itself, child exec's the command
    ls /tmp
    ```

    ```c
    // Internal kernel view
    pid_t pid = fork();     // Create child (copy-on-write)
    if (pid == 0) {
        execve("/bin/ls", argv, envp);  // Replace with ls
    } else {
        wait(&status);      // Parent waits
    }
    ```

=== "vfork()"

    ```c
    // Shares parent's memory — child must exec or exit immediately
    // Faster than fork() for exec-only use cases
    pid_t pid = vfork();
    ```

=== "clone()"

    ```bash
    # Threads, containers, and namespaces use clone()
    # (Containers use clone() with namespace flags)
    unshare --pid --fork --mount-proc bash
    ```

## Process States

| State | Symbol | Description |
|-------|--------|-------------|
| Running | `R` | Executing on CPU or waiting for CPU |
| Sleeping (interruptible) | `S` | Waiting for event; wakes on signal |
| Sleeping (uninterruptible) | `D` | Waiting for I/O; cannot be interrupted |
| Stopped | `T` | Suspended by SIGSTOP or debugger |
| Zombie | `Z` | Terminated but parent hasn't `wait()`ed |
| Idle | `I` | Kernel idle thread |

```bash
# View process states
ps aux | awk '{print $8, $11}' | sort | head -20

# Find D-state (stuck I/O) processes — can indicate storage issues
ps aux | awk '$8 == "D" {print}'
```

## Signals

<signal-table></signal-table>

```bash
# Send signals
kill -15 PID        # Graceful termination (SIGTERM)
kill -9 PID         # Force kill (SIGKILL)
kill -HUP PID       # Hangup — reload config
kill -STOP PID      # Pause process
kill -CONT PID      # Resume process

# Send to all processes by name
pkill -HUP nginx
killall -9 zombie_process

# List all available signals
kill -l
```

## Process Monitoring

```bash
# Real-time — top
top
# Key shortcuts: P=CPU, M=Mem, k=kill, r=renice, q=quit

# Better: htop (interactive)
htop

# List all processes
ps aux
ps -ef

# Process tree
pstree -p

# Specific process info
ps -p 1 -o pid,ppid,state,cmd,pcpu,pmem

# Watch process in real-time
watch -n 1 'ps aux | grep nginx | grep -v grep'
```

## CPU Scheduling

Linux uses the **CFS (Completely Fair Scheduler)** for normal processes.

```bash
# View process priority
ps -o pid,ni,pri,cmd -p $$

# Change priority at launch (nice: -20=highest, 19=lowest)
nice -n 10 long_command

# Change priority of running process
renice -n 5 -p PID

# Real-time scheduling (root only)
chrt -f 50 ./realtime_app    # SCHED_FIFO priority 50
chrt -r 50 ./realtime_app    # SCHED_RR
chrt -p PID                  # Show scheduling policy
```

## Namespaces & Isolation

Namespaces are the kernel feature that makes containers possible.

| Namespace | Flag | Isolates |
|-----------|------|---------|
| PID | `CLONE_NEWPID` | Process IDs |
| Network | `CLONE_NEWNET` | Network interfaces, routes |
| Mount | `CLONE_NEWNS` | Filesystem mounts |
| UTS | `CLONE_NEWUTS` | Hostname, domain name |
| IPC | `CLONE_NEWIPC` | Message queues, semaphores |
| User | `CLONE_NEWUSER` | User/group IDs |
| Cgroup | `CLONE_NEWCGROUP` | cgroup root |
| Time | `CLONE_NEWTIME` | System clocks |

```bash
# Enter namespaces of a container/process
nsenter -t PID --pid --net --mount bash

# Create isolated environment
unshare --pid --fork --mount-proc --net bash

# View namespaces
lsns
ls -la /proc/PID/ns/
```

## cgroups — Resource Control

```bash
# View cgroup hierarchy
systemd-cgls

# CPU limit — restrict process to 50% of 1 CPU
systemd-run --scope -p CPUQuota=50% myapp

# Memory limit — kill if exceeds 512MB
systemd-run --scope -p MemoryMax=512M myapp

# View resource usage
systemd-cgtop
cat /sys/fs/cgroup/system.slice/myservice.service/memory.current
```

## Interview Questions

??? question "What is a zombie process and how do you eliminate it?"
    A zombie is a process that has terminated but whose exit status hasn't been read by its parent (parent hasn't called `wait()`). It holds only a PID and exit code — minimal resources. You cannot kill a zombie with `kill -9` because it's already dead. Solutions: (1) Fix the parent to call `wait()`, (2) Kill the parent (orphaned zombie is adopted by init/PID 1 which automatically reaps), (3) Reboot if everything else fails.

??? question "What is the difference between SIGTERM and SIGKILL?"
    **SIGTERM (15)**: Can be caught by the process. The process can perform cleanup (flush buffers, close connections, write PID files) before exiting. Always try SIGTERM first. **SIGKILL (9)**: Cannot be caught, blocked, or ignored — it is handled entirely by the kernel which immediately destroys the process. No cleanup possible. Use only as a last resort.

??? question "What is a D-state (uninterruptible sleep) process?"
    A process in the D state is waiting for an I/O operation that cannot be interrupted — typically disk I/O or an NFS operation. Unlike `S` state (interruptible sleep), D-state processes cannot be killed even with SIGKILL. Common causes: unresponsive NFS mount, slow disk, kernel bug. High D-state process count indicates storage subsystem issues.
