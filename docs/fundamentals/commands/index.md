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
| **`free`** | Check available memory (RAM) | `free -h` | Coming soon |

---

## All Commands Categorized

### 📁 File & Directory Operations

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `ls` | List files and folders in a directory | [Full Guide →](ls.md) |
| `cd` | Change current working directory | [Full Guide →](cd.md) |
| `pwd` | Print your current location path | [Full Guide →](pwd.md) |
| `cp` | Make a copy of files or directories | [Full Guide →](cp.md) |
| `mv` | Move files to another folder or rename them | [Full Guide →](mv.md) |
| `rm` | Remove/delete files or directories | [Full Guide →](rm.md) |
| `mkdir` | Create a new empty folder | [Full Guide →](mkdir.md) |
| `rmdir` | Delete an empty folder | Coming soon |
| `touch` | Create an empty file instantly | [Full Guide →](touch.md) |
| `ln` | Create shortcuts (symbolic or hard links) | Coming soon |

---

### 📄 File Viewing & Editing

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `cat` | View whole file content in terminal | [Full Guide →](cat.md) |
| `less` | View long files page by page | Coming soon |
| `head` | Show first 10 lines of a file | [Full Guide →](head.md) |
| `tail` | Show last 10 lines (great for log tracking) | [Full Guide →](tail.md) |
| `wc` | Count words, lines, and characters | Coming soon |
| `diff` | Compare two files side by side | Coming soon |
| `sort` | Sort text lines alphabetically or numerically | Coming soon |
| `uniq` | Find and remove duplicate lines | Coming soon |

---

### 🔍 Searching & Filtering

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `find` | Find files by name, size, or date | [Full Guide →](find.md) |
| `grep` | Search for specific words/patterns in text | [Full Guide →](grep.md) |
| `awk` | Extract columns and process structured text | Coming soon |
| `sed` | Find and replace text automatically | Coming soon |
| `xargs` | Pass search results into another command | Coming soon |

---

### ⚙️ Process & System Control

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `ps` | List active programs running on your system | [Full Guide →](ps.md) |
| `top` | Live task manager showing CPU and RAM usage | Coming soon |
| `htop` | Colorful, interactive process task manager | Coming soon |
| `kill` | Stop a running program using its Process ID (PID) | [Full Guide →](kill.md) |
| `killall` | Stop all instances of a program by name | Coming soon |

---

### 🌐 Networking & Downloads

| Command | Simple Explanation | Full Guide |
|---------|--------------------|------------|
| `ping` | Test connection speed to a website or server | [Full Guide →](ping.md) |
| `curl` | Download files or send web requests | [Full Guide →](curl.md) |
| `wget` | Direct file downloader from the web | Coming soon |
| `ssh` | Connect securely to a remote Linux server | [Full Guide →](ssh.md) |
| `ip` | Check your IP address and network interfaces | Coming soon |
