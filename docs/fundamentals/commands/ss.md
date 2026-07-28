---
title: "ss — Socket Statistics"
description: "Complete reference for ss — inspecting listening TCP/UDP ports, socket states, process associations, and netstat replacement."
---

# `ss` — Socket Statistics

## Overview

`ss` is used to dump socket statistics. It displays information similar to `netstat`, but retrieves data directly from kernel netlink sockets, making it significantly faster.

**Command type**: External (iproute2)  
**Location**: `/usr/sbin/ss`

---

## Syntax

```bash
ss [OPTIONS] [FILTER]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-t` | Show TCP sockets |
| `-u` | Show UDP sockets |
| `-l` | Show listening sockets only |
| `-a` | Show all sockets (listening and established) |
| `-p` | Show process using the socket (requires root / sudo) |
| `-n` | Numeric — do not resolve service names or hostnames |
| `-e` | Show detailed socket information |
| `-m` | Show socket memory usage |
| `-4` | Show IPv4 sockets only |
| `-6` | Show IPv6 sockets only |
| `-s` | Print summary statistics |

---

## Examples

### View All Listening TCP & UDP Ports (DevOps Standard Command)

```bash
sudo ss -tulpn
```

Sample output:
```
Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       512            0.0.0.0:80          0.0.0.0:*      users:(("nginx",pid=1234,fd=6))
tcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=888,fd=3))
tcp    LISTEN  0       100          127.0.0.1:5432        0.0.0.0:*      users:(("postgres",pid=1500,fd=5))
```

### Check Established Connections

```bash
# Show established TCP connections
ss -t -a state established

# Filter by destination port (e.g. port 443)
ss -t -a state established dport = :443
```

### Socket Summary Statistics

```bash
ss -s
```

---

## Quick Reference: netstat vs ss

| Old (`netstat`) | Modern (`ss`) | Description |
|-----------------|---------------|-------------|
| `netstat -tulpn` | `ss -tulpn` | Listening TCP/UDP ports with processes |
| `netstat -an` | `ss -an` | All sockets with numeric ports |
| `netstat -s` | `ss -s` | Socket summary stats |

---

## Interview Questions

??? question "How do you find which process is listening on port 8080 using ss?"
    ```bash
    sudo ss -tulpn | grep :8080
    ```
    The `-p` flag displays process name and PID. `sudo` is required to inspect processes owned by other users.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `ip` | Network interface and routing management |
| `lsof` | List open files and network sockets (`lsof -i :8080`) |
| `netstat` | Legacy socket statistics utility |
