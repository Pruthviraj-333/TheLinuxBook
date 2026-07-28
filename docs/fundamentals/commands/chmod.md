---
title: "chmod — Change File Mode Bits (Permissions)"
description: "Complete reference for chmod — numeric octal permissions (755, 644), symbolic notation (u+x), SUID, SGID, and Sticky Bit."
---

# `chmod` — Change File Permissions

## Overview

`chmod` (change mode) modifies the file system access permissions of files and directories. Linux classifies permissions into three categories: **Owner (User)**, **Group**, and **Others**.

**Command type**: External (GNU coreutils)  
**Location**: `/usr/bin/chmod`  
**Standard**: POSIX.1-2017

---

## Permission Structure

File permissions consist of 3 triplets plus special permission bits:

```
  File Type (- for file, d for dir)
  |
  |  User (Owner)   Group       Others
  |  r w x          r - x       r - x
  -  1 1 1          1 0 1       1 0 1
     | | |          | | |       | | |
     4 2 1          4 0 1       4 0 1   => Octal: 755
```

| Permission | Bit | Value for File | Value for Directory |
|------------|-----|----------------|---------------------|
| `r` (Read) | 4 | Read file contents | List directory contents (`ls`) |
| `w` (Write) | 2 | Modify file contents | Create/delete files inside directory |
| `x` (Execute) | 1 | Run script/binary | Enter directory (`cd`) |

---

## Octal Notation Reference

| Octal | Permission | Usage Context |
|-------|------------|---------------|
| `777` | `rwxrwxrwx` | Full access for everyone (**Security Risk**) |
| `755` | `rwxr-xr-x` | Executable scripts / Directories (Owner can write, others read/execute) |
| `700` | `rwx------` | Private directory / SSH private keys directory (`~/.ssh`) |
| `644` | `rw-r--r--` | Standard file permissions (Owner edit, others read) |
| `600` | `rw-------` | Sensitive configuration / SSH private keys (`id_ed25519`) |

---

## Symbolic Mode Notation

```bash
chmod [WHO][OPERATOR][PERMISSION] FILE
```

- **WHO**: `u` (user), `g` (group), `o` (others), `a` (all)
- **OPERATOR**: `+` (add), `-` (remove), `=` (set exact)
- **PERMISSION**: `r`, `w`, `x`, `s` (SUID/SGID), `t` (sticky)

---

## Examples

### Octal Mode

```bash
# Make script executable by owner and readable by everyone
chmod 755 deploy.sh

# Restrict SSH private key to owner read/write only
chmod 600 ~/.ssh/id_ed25519

# Secure SSH directory
chmod 700 ~/.ssh
```

### Symbolic Mode

```bash
# Add execute permission for owner only
chmod u+x script.sh

# Remove write permission from group and others
chmod go-w file.txt

# Set exact permissions for all (read and write only)
chmod a=rw data.txt
```

### Recursive Permissions

```bash
# Apply permissions to a directory and all its contents recursively
chmod -R 755 /var/www/html

# Recommended SRE Pattern: Set 755 on directories and 644 on files separately
find /var/www/html -type d -exec chmod 755 {} +
find /var/www/html -type f -exec chmod 644 {} +
```

---

## Special Permissions (SUID, SGID, Sticky Bit)

| Special Bit | Octal Value | Symbol | Effect on Files | Effect on Directories |
|-------------|-------------|--------|-----------------|-----------------------|
| **SUID** | `4000` | `u+s` | Runs process with file owner's privileges (e.g. `/usr/bin/passwd`) | N/A |
| **SGID** | `2000` | `g+s` | Runs process with group's privileges | New files created inside inherit parent directory group |
| **Sticky Bit** | `1000` | `o+t` | N/A | Users can only delete files they own (e.g. `/tmp`) |

```bash
# Set Sticky Bit on shared temp directory
chmod 1777 /shared/tmp
# or
chmod o+t /shared/tmp

# Set SGID on group collaborative folder
chmod 2775 /data/team_share
# or
chmod g+s /data/team_share
```

---

## Interview Questions

??? question "Why is chmod 777 considered a major security vulnerability?"
    `777` grants read, write, and execute access to every user on the system. Any compromised unprivileged process or malicious local user can modify, overwrite, or execute arbitrary code in that directory/file.

??? question "What does the Sticky Bit do on directory /tmp?"
    The Sticky Bit (`chmod +t`) ensures that even if a directory is world-writable, users can only delete or rename files that they personally own, preventing users from removing other users' temporary files.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `chown` | Change file owner and group |
| `umask` | Set default permissions for newly created files |
| `ls -l` | Display permissions |
