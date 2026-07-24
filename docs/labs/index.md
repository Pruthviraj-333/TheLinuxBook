---
title: Hands-On Labs
description: Practical Linux labs — exercises with step-by-step instructions, expected output, and explanations.
---

# Hands-On Labs

## Overview

Labs reinforce theoretical knowledge through hands-on practice. Each lab includes objectives, prerequisites, step-by-step instructions, and verification steps.

!!! warning "Prerequisites"
    All labs require a Linux system or VM. Recommended: Ubuntu 22.04 LTS or later.
    Some labs require root/sudo access.

## Lab Index

| Lab | Topic | Difficulty | Time |
|-----|-------|-----------|------|
| [Lab 1: Process Explorer](#lab-1) | Process Management | ⭐ Beginner | 20 min |
| [Lab 2: Filesystem Investigation](#lab-2) | Filesystem | ⭐ Beginner | 25 min |
| [Lab 3: Permission Mastery](#lab-3) | Permissions | ⭐⭐ Intermediate | 30 min |
| [Lab 4: Bash Script Challenge](#lab-4) | Bash Scripting | ⭐⭐ Intermediate | 45 min |
| [Lab 5: Network Analysis](#lab-5) | Networking | ⭐⭐ Intermediate | 35 min |
| [Lab 6: Performance Triage](#lab-6) | Performance | ⭐⭐⭐ Advanced | 60 min |
| [Lab 7: Container from Scratch](#lab-7) | Containers | ⭐⭐⭐ Advanced | 60 min |
| [Lab 8: systemd Service](#lab-8) | systemd | ⭐⭐ Intermediate | 40 min |

---

## Lab 1: Process Explorer {#lab-1}

### Objective
Understand process creation, process states, and the /proc filesystem.

### Steps

**Step 1**: Create a background sleep process and find it.
```bash
sleep 300 &
echo "PID: $!"
```

**Step 2**: Explore its /proc entry.
```bash
PID=$!
ls /proc/$PID/
cat /proc/$PID/status
cat /proc/$PID/cmdline | tr '\0' ' '
ls -la /proc/$PID/fd/
cat /proc/$PID/maps | head -20
```

**Step 3**: Check its state and resource usage.
```bash
ps -p $PID -o pid,ppid,state,ni,pri,vsz,rss,cmd
```

**Step 4**: Create a zombie process.
```bash
# Create a script that produces a zombie
cat > /tmp/zombie_demo.sh << 'EOF'
#!/bin/bash
# Child exits but parent doesn't wait
bash -c 'exit 0' &
child=$!
echo "Child PID: $child (will become zombie)"
sleep 30 &  # Keep parent alive
wait        # Now actually wait (to see it was zombie first, remove this)
EOF
bash /tmp/zombie_demo.sh &
sleep 1
ps aux | grep -E 'Z|zombie_demo'
```

**Step 5**: Kill the background process.
```bash
kill $PID
```

### Verification
- [ ] Successfully listed /proc/$PID directory
- [ ] Read cmdline and status files
- [ ] Understood all fields in `ps` output
- [ ] Observed process state transitions

---

## Lab 2: Filesystem Investigation {#lab-2}

### Objective
Understand inodes, hard links, soft links, and disk usage.

### Steps

**Step 1**: Explore inodes.
```bash
# Create test files
mkdir /tmp/inode_lab && cd /tmp/inode_lab
echo "Hello" > file1.txt
ls -li file1.txt    # Note inode number
```

**Step 2**: Create hard link — same inode.
```bash
ln file1.txt hardlink.txt
ls -li file1.txt hardlink.txt  # Same inode!
stat file1.txt                  # Note link count = 2
```

**Step 3**: Create soft link — different inode.
```bash
ln -s file1.txt softlink.txt
ls -li file1.txt softlink.txt   # Different inodes
ls -la softlink.txt             # Shows -> target
```

**Step 4**: Delete original — observe behavior.
```bash
rm file1.txt
cat hardlink.txt    # Still works! (same inode, data preserved)
cat softlink.txt    # Broken! (target path no longer exists)
```

**Step 5**: Find inode usage.
```bash
df -i /tmp
```

### Verification
- [ ] Observed same inode number for hard links
- [ ] Saw link count change with hard links
- [ ] Confirmed soft link breaks when target deleted
- [ ] Hard link survives original deletion

---

## Lab 7: Container from Scratch {#lab-7}

### Objective
Build a minimal container using only Linux kernel features (no Docker).

### Steps

**Step 1**: Create a minimal rootfs.
```bash
mkdir -p /tmp/mycontainer/{bin,proc,sys,dev,tmp}
# Copy busybox as our "shell"
cp /usr/bin/busybox /tmp/mycontainer/bin/
ls /tmp/mycontainer/
```

**Step 2**: Launch with isolated namespaces.
```bash
sudo unshare \
  --pid \
  --fork \
  --mount-proc=/tmp/mycontainer/proc \
  --net \
  --uts \
  chroot /tmp/mycontainer /bin/busybox sh
```

**Step 3**: Inside the container — verify isolation.
```bash
# Inside container:
hostname            # Should show isolated hostname
hostname mycontainer
ps aux              # Only sees our processes (PID namespace)
ip addr             # No network interfaces (network namespace)
```

**Step 4** (different terminal): Verify from host.
```bash
# On host:
lsns | grep unshare    # See new namespaces
ps aux | grep unshare  # Find our container's host PID
```

### Verification
- [ ] Container has isolated PID namespace (ps only shows own processes)
- [ ] Container has isolated network namespace
- [ ] Can set hostname without affecting host
- [ ] Container's PID 1 is our `busybox sh`

---

## Lab 8: systemd Service {#lab-8}

### Objective
Write, install, and manage a custom systemd service.

### Steps

**Step 1**: Create a simple server script.
```bash
cat > /usr/local/bin/mywebserver.py << 'EOF'
#!/usr/bin/env python3
import http.server
import socketserver

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
EOF
chmod +x /usr/local/bin/mywebserver.py
```

**Step 2**: Create the unit file.
```bash
sudo tee /etc/systemd/system/mywebserver.service << 'EOF'
[Unit]
Description=My Python Web Server
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /usr/local/bin/mywebserver.py
WorkingDirectory=/var/www
Restart=on-failure
RestartSec=5s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF
```

**Step 3**: Enable and start.
```bash
sudo mkdir -p /var/www
echo "Hello from systemd service!" | sudo tee /var/www/index.html
sudo systemctl daemon-reload
sudo systemctl enable --now mywebserver
sudo systemctl status mywebserver
curl http://localhost:8080/
```

**Step 4**: View logs.
```bash
journalctl -u mywebserver -f
```

**Step 5**: Simulate failure + auto-restart.
```bash
sudo systemctl kill -s KILL mywebserver  # Force kill
sleep 6
systemctl status mywebserver    # Should have auto-restarted
```

### Verification
- [ ] Service starts successfully
- [ ] HTTP server responds on port 8080
- [ ] Logs appear in journalctl
- [ ] Service auto-restarts after SIGKILL
- [ ] Service starts automatically on reboot
