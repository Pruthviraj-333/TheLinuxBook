---
title: "tcpdump — Command-Line Network Packet Analyzer"
description: "Complete reference for tcpdump — filtering by interface, port, IP, protocol, pcap file capture (-w), and packet inspection."
---

# `tcpdump` — Packet Analyzer

## Overview

`tcpdump` is a powerful command-line packet analyzer. It allows users to capture and display TCP/IP and other packets being transmitted or received over a network interface.

**Command type**: External  
**Location**: `/usr/sbin/tcpdump`

---

## Syntax

```bash
tcpdump [OPTIONS] [EXPRESSION]
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-i IFACE` | Capture packets on specified interface (e.g. `-i eth0` or `-i any`) |
| `-n` | Do not resolve IP addresses to hostnames |
| `-nn` | Do not resolve hostnames OR port names to service names |
| `-c N` | Exit after receiving N packets |
| `-w FILE` | Save raw packets to pcap file for inspection in Wireshark |
| `-r FILE` | Read packets from a pcap file saved with `-w` |
| `-A` | Print packet payload in ASCII (useful for HTTP debugging) |
| `-X` | Print packet payload in Hex and ASCII |
| `-v` / `-vv` | Verbose output |

---

## Examples

### Capture Traffic on Interface

```bash
# Capture packets on eth0 (ctrl+c to stop)
sudo tcpdump -i eth0

# Capture on all interfaces without resolving IPs or ports
sudo tcpdump -i any -nn
```

### Filter by Host or IP

```bash
# Capture traffic to/from specific IP
sudo tcpdump -i eth0 host 192.168.1.50

# Filter by source or destination IP
sudo tcpdump -i eth0 src 10.0.0.5
sudo tcpdump -i eth0 dst 10.0.0.5
```

### Filter by Port or Protocol

```bash
# Capture HTTP traffic (port 80)
sudo tcpdump -i eth0 port 80

# Capture HTTPS traffic (port 443)
sudo tcpdump -i eth0 port 443

# Capture SSH traffic
sudo tcpdump -i eth0 port 22

# Capture ICMP (ping) traffic
sudo tcpdump -i eth0 icmp
```

### Save and Read PCAP Files (Wireshark Integration)

```bash
# Capture 100 packets on port 443 and save to pcap file
sudo tcpdump -i eth0 port 443 -c 100 -w /tmp/traffic.pcap

# Read and inspect pcap file
sudo tcpdump -r /tmp/traffic.pcap -nn
```

---

## Interview Questions

??? question "How do you capture HTTP request payloads in ASCII using tcpdump?"
    ```bash
    sudo tcpdump -i eth0 -n -A port 80
    ```
    `-A` prints packet content in ASCII text, allowing you to view unencrypted HTTP headers, GET/POST paths, and request bodies.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `wireshark` | GUI network protocol analyzer |
| `tshark` | CLI version of Wireshark |
| `ss` | Display socket statistics |
