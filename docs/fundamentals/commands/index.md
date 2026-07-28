---
title: Essential Linux Commands Reference
description: Quick start cheat sheet and simple reference for all core Linux commands.
---

# Essential Linux Commands Reference

> Simple, easy-to-understand reference for Linux terminal commands. Every command page includes a **TL;DR Quick Start**, **Step-by-Step Examples**, and **Cheat Sheets**.

---

## TL;DR — 10 Most Useful Commands

If you only learn 10 commands today, start with these:

| Command | Quick Explanation | Example Usage | Detailed Guide |
|---------|-------------------|---------------|----------------|
| **`ls`** | See files in your folder | `ls -lh` | [View Guide →](ls.md) |
| **`cd`** | Move into another folder | `cd /var/log` | [View Guide →](cd.md) |
| **`pwd`** | Show your current folder path | `pwd` | [View Guide →](pwd.md) |
| **`cp`** | Copy a file or folder | `cp -r src/ dst/` | [View Guide →](cp.md) |
| **`mv`** | Move or rename a file | `mv old.txt new.txt` | [View Guide →](mv.md) |
| **`rm`** | Delete a file or folder | `rm -i file.txt` | [View Guide →](rm.md) |
| **`cat`** | Print file content on screen | `cat /etc/os-release` | [View Guide →](cat.md) |
| **`grep`** | Search text inside files | `grep "error" app.log` | [View Guide →](grep.md) |
| **`ps`** | See running programs | `ps aux` | [View Guide →](ps.md) |
| **`free`** | Check available memory (RAM) | `free -h` | [View Guide →](free.md) |

---

## All Commands Categorized

### File, Permissions & Directory Operations

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `ls` | List files and folders in a directory | [Full Guide →](ls.md) |
| `cd` | Change current working directory | [Full Guide →](cd.md) |
| `pwd` | Print your current location path | [Full Guide →](pwd.md) |
| `cp` | Make a copy of files or directories | [Full Guide →](cp.md) |
| `mv` | Move files to another folder or rename them | [Full Guide →](mv.md) |
| `rm` | Remove/delete files or directories | [Full Guide →](rm.md) |
| `mkdir` | Create a new empty folder | [Full Guide →](mkdir.md) |
| `rmdir` | Delete an empty folder | [Full Guide →](rmdir.md) |
| `touch` | Create an empty file instantly | [Full Guide →](touch.md) |
| `ln` | Create shortcuts (symbolic or hard links) | [Full Guide →](ln.md) |
| `chmod` | Change file permissions (read, write, execute) | [Full Guide →](chmod.md) |
| `chown` | Change file owner and group | [Full Guide →](chown.md) |
| `tar` | Archive and compress directories (.tar.gz) | [Full Guide →](tar.md) |

---

### File Viewing, Disk Storage & Editing

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `cat` | View whole file content in terminal | [Full Guide →](cat.md) |
| `less` | View long files page by page | [Full Guide →](less.md) |
| `head` | Show first 10 lines of a file | [Full Guide →](head.md) |
| `tail` | Show last 10 lines (great for log tracking) | [Full Guide →](tail.md) |
| `wc` | Count words, lines, and characters | [Full Guide →](wc.md) |
| `diff` | Compare two files side by side | [Full Guide →](diff.md) |
| `sort` | Sort text lines alphabetically or numerically | [Full Guide →](sort.md) |
| `uniq` | Find and remove duplicate lines | [Full Guide →](uniq.md) |
| `df` | Check filesystem disk space and inodes | [Full Guide →](df.md) |
| `du` | Calculate directory sizes and find large files | [Full Guide →](du.md) |

---

### Searching & Filtering

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `find` | Find files by name, size, or date | [Full Guide →](find.md) |
| `grep` | Search for specific words/patterns in text | [Full Guide →](grep.md) |
| `awk` | Extract columns and process structured text | [Full Guide →](awk.md) |
| `sed` | Find and replace text automatically | [Full Guide →](sed.md) |
| `xargs` | Pass search results into another command | [Full Guide →](xargs.md) |

---

### Process, System & Service Control

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `ps` | List active programs running on your system | [Full Guide →](ps.md) |
| `top` | Live task manager showing CPU and RAM usage | [Full Guide →](top.md) |
| `htop` | Colorful, interactive process task manager | [Full Guide →](htop.md) |
| `kill` | Stop a running program using its Process ID (PID) | [Full Guide →](kill.md) |
| `killall` | Stop all instances of a program by name | [Full Guide →](killall.md) |
| `free` | Check system memory (RAM) and swap usage | [Full Guide →](free.md) |
| `systemctl` | Manage system services and background daemons | [Full Guide →](systemctl.md) |
| `journalctl` | Query and filter systemd binary logs | [Full Guide →](journalctl.md) |
| `sudo` | Execute commands with root privileges | [Full Guide →](sudo.md) |

---

### Networking, DNS & Diagnostics

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `ping` | Test connection speed to a website or server | [Full Guide →](ping.md) |
| `curl` | Download files or send web requests | [Full Guide →](curl.md) |
| `wget` | Direct file downloader from the web | [Full Guide →](wget.md) |
| `ssh` | Connect securely to a remote Linux server | [Full Guide →](ssh.md) |
| `ip` | Check your IP address and network interfaces | [Full Guide →](ip.md) |
| `ss` | Inspect listening TCP/UDP ports and sockets | [Full Guide →](ss.md) |
| `dig` | Perform DNS record lookups and traces | [Full Guide →](dig.md) |
| `tcpdump` | Capture and analyze network traffic packets | [Full Guide →](tcpdump.md) |
