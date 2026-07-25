---
title: Commands Reference
description: Index of all Linux command reference pages — syntax, options, examples, and internals.
---

# Commands Reference

> Each command page follows a consistent structure: description → syntax → options → examples → internals → performance → interview questions.

## Essential Commands

### File & Directory Operations

| Command | Description | Page |
|---------|-------------|------|
| `ls` | List directory contents | [→ ls](ls.md) |
| `cd` | Change directory | [→ cd](cd.md) |
| `pwd` | Print working directory | [→ pwd](pwd.md) |
| `cp` | Copy files and directories | [→ cp](cp.md) |
| `mv` | Move / rename files | [→ mv](mv.md) |
| `rm` | Remove files and directories | [→ rm](rm.md) |
| `mkdir` | Create directories | Coming soon |
| `rmdir` | Remove empty directories | Coming soon |
| `touch` | Create empty file or update timestamps | Coming soon |
| `ln` | Create hard and symbolic links | Coming soon |

### File Viewing & Editing

| Command | Description | Page |
|---------|-------------|------|
| `cat` | Concatenate and display files | Coming soon |
| `less` | Page through file content | Coming soon |
| `head` | View first N lines | Coming soon |
| `tail` | View last N lines (+ follow) | Coming soon |
| `wc` | Word, line, character count | Coming soon |
| `diff` | Compare files line by line | Coming soon |
| `sort` | Sort lines of text | Coming soon |
| `uniq` | Report or filter duplicate lines | Coming soon |

### Search & Pattern Matching

| Command | Description | Page |
|---------|-------------|------|
| `find` | Search files by name/type/time/size | Coming soon |
| `grep` | Search file contents with regex | Coming soon |
| `awk` | Pattern scanning and processing | Coming soon |
| `sed` | Stream editor for text transformation | Coming soon |
| `xargs` | Build and execute commands from stdin | Coming soon |
| `locate` | Fast filename database search | Coming soon |

### Process Management

| Command | Description | Page |
|---------|-------------|------|
| `ps` | Report process status | Coming soon |
| `top` | Dynamic real-time process viewer | Coming soon |
| `htop` | Interactive process viewer | Coming soon |
| `kill` | Send signal to a process | Coming soon |
| `killall` | Kill processes by name | Coming soon |
| `nice` | Run command with modified priority | Coming soon |
| `renice` | Alter priority of running process | Coming soon |
| `nohup` | Run command immune to hangups | Coming soon |
| `jobs` | List active shell jobs | Coming soon |
| `fg` / `bg` | Bring job to foreground/background | Coming soon |

### Networking

| Command | Description | Page |
|---------|-------------|------|
| `ip` | Show/manipulate network interfaces | Coming soon |
| `ss` | Socket statistics (netstat replacement) | Coming soon |
| `ping` | Test network connectivity | Coming soon |
| `curl` | HTTP/HTTPS client | Coming soon |
| `wget` | File downloader | Coming soon |
| `ssh` | Secure Shell client | Coming soon |
| `scp` | Secure copy over SSH | Coming soon |
| `rsync` | Efficient file synchronization | Coming soon |
| `netstat` | Network statistics (legacy) | Coming soon |
| `tcpdump` | Capture and analyze network packets | Coming soon |

### Disk & Filesystem

| Command | Description | Page |
|---------|-------------|------|
| `df` | Disk filesystem usage | Coming soon |
| `du` | Directory disk usage | Coming soon |
| `mount` | Mount filesystems | Coming soon |
| `umount` | Unmount filesystems | Coming soon |
| `fdisk` | Partition table manipulator | Coming soon |
| `lsblk` | List block devices | Coming soon |
| `blkid` | Block device attributes | Coming soon |
| `mkfs` | Create a filesystem | Coming soon |
| `fsck` | Filesystem check and repair | Coming soon |

### System Information

| Command | Description | Page |
|---------|-------------|------|
| `uname` | System information | Coming soon |
| `hostname` | Show/set system hostname | Coming soon |
| `uptime` | System uptime and load average | Coming soon |
| `free` | Memory usage | Coming soon |
| `lscpu` | CPU information | Coming soon |
| `lsmem` | Memory range information | Coming soon |
| `lspci` | PCI device list | Coming soon |
| `lsusb` | USB device list | Coming soon |
| `dmesg` | Kernel ring buffer messages | Coming soon |

### Permissions & Ownership

| Command | Description | Page |
|---------|-------------|------|
| `chmod` | Change file permissions | Coming soon |
| `chown` | Change file owner and group | Coming soon |
| `chgrp` | Change group ownership | Coming soon |
| `umask` | Set default permission mask | Coming soon |
| `getfacl` | Get file ACL | Coming soon |
| `setfacl` | Set file ACL | Coming soon |

### Text Processing

| Command | Description | Page |
|---------|-------------|------|
| `cut` | Remove sections from lines | Coming soon |
| `tr` | Translate or delete characters | Coming soon |
| `paste` | Merge lines of files | Coming soon |
| `tee` | Read stdin, write to stdout and files | Coming soon |
| `column` | Columnate lists | Coming soon |
| `jq` | JSON processor | Coming soon |

---

!!! tip "How to add a new command page"
    1. Copy `_templates/command-page-template.md`
    2. Save as `docs/fundamentals/commands/COMMAND.md`
    3. Add an entry to the `nav:` section in `mkdocs.yml`
    4. Fill in every section of the template
