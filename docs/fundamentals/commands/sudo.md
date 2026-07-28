---
title: "sudo — Execute Command as Another User (Superuser Do)"
description: "Complete reference for sudo — root privilege escalation, environment preservation (-E), user impersonation (-u), and visudo configuration."
---

# `sudo` — Superuser Do

## Overview

`sudo` allows a permitted user to execute a command as the superuser (root) or another specified user, as determined by security policies in `/etc/sudoers`.

**Command type**: External  
**Location**: `/usr/bin/sudo`

---

## Syntax

```bash
sudo [OPTIONS] COMMAND
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-u USER` | Run command as specified USER instead of root |
| `-i` | Simulate initial login shell (loads root environment variables) |
| `-s` | Run shell specified by SHELL environment variable |
| `-E` | Preserve existing user environment variables |
| `-v` | Update (validate) user cached credentials timestamp |
| `-k` | Invalidate (revoke) cached credentials timestamp (forces password entry next time) |
| `-l` | List permitted commands for current user |

---

## Examples

### Basic Superuser Execution

```bash
# Update system packages with root privileges
sudo apt update && sudo apt upgrade
```

### Run Command as Another User

```bash
# Run command as user 'postgres'
sudo -u postgres psql

# Run command as user 'www-data'
sudo -u www-data php artisan migrate
```

### Preserve Environment Variables (-E)

```bash
# Pass custom environment variable through to privileged command
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
sudo -E kubectl get nodes
```

### Listing Sudo Rights

```bash
sudo -l
```

---

## The `/etc/sudoers` Configuration (`visudo`)

!!! caution "Never edit `/etc/sudoers` with a normal editor"
    Always use the `visudo` command to edit `/etc/sudoers`. `visudo` checks syntax before saving to prevent accidental syntax errors that can lock all users out of root access.

```bash
sudo visudo
```

Sample `/etc/sudoers` entries:
```etc
# Grant user 'devops' full passwordless sudo access
devops ALL=(ALL:ALL) NOPASSWD: ALL

# Allow user 'developer' to restart Nginx service only without password
developer ALL=(root) NOPASSWD: /usr/bin/systemctl restart nginx
```

---

## Interview Questions

??? question "What is the difference between `sudo -i` and `sudo su`?"
    `sudo -i` invokes an interactive login shell using systemd/sudo configuration, loading root's `.bash_profile` and setting `PWD` to `/root`. `sudo su` executes the `su` binary under sudo, which can leave non-standard environment variables intact. `sudo -i` is preferred for clean root sessions.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `su` | Switch user identity |
| `visudo` | Safely edit `/etc/sudoers` file |
