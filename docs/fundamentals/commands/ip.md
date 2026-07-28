---
title: "ip — Network Interface and Routing Management"
description: "Complete reference for the ip command — interfaces, addresses, routes, links, and replacement for ifconfig/route."
---

# `ip` — Network Interface and Routing Management

## Overview

`ip` is the modern replacement for the deprecated `ifconfig`, `route`, and `arp` commands. It manages network interfaces, IP addresses, routing tables, ARP entries, and network namespaces. It is part of the `iproute2` suite.

**Command type**: External (iproute2)  
**Location**: `/usr/sbin/ip`

---

## Syntax

```bash
ip [OPTIONS] OBJECT COMMAND
```

**Objects**: `link`, `address` (or `addr`), `route`, `neighbour` (or `neigh`), `netns`

---

## Show Network Information

```bash
# Show all interfaces with addresses
ip addr show
ip a          # short form

# Show a specific interface
ip addr show eth0

# Show only IPv4 addresses
ip -4 addr show

# Show only IPv6 addresses
ip -6 addr show

# Show interface link status (UP/DOWN, MTU, MAC)
ip link show
ip l          # short form

# Show routing table
ip route show
ip r          # short form

# Show default gateway
ip route show default
ip route | grep default

# Show ARP/neighbor table
ip neighbour show
ip n
```

---

## Managing Addresses

```bash
# Add an IP address to an interface
ip addr add 192.168.1.100/24 dev eth0

# Delete an IP address
ip addr del 192.168.1.100/24 dev eth0

# Flush all addresses on an interface
ip addr flush dev eth0
```

---

## Managing Interfaces (Links)

```bash
# Bring interface UP
ip link set eth0 up

# Bring interface DOWN
ip link set eth0 down

# Set MTU
ip link set eth0 mtu 9000

# Change MAC address
ip link set eth0 address 02:11:22:33:44:55

# Rename interface
ip link set eth0 name wan0
```

---

## Managing Routes

```bash
# Add a route
ip route add 10.0.0.0/8 via 192.168.1.1

# Add default gateway
ip route add default via 192.168.1.1

# Delete a route
ip route del 10.0.0.0/8

# Replace a route (add or update)
ip route replace default via 192.168.1.254

# Show which interface a packet to an IP would use
ip route get 8.8.8.8
```

---

## Compact Output with -brief

```bash
# Brief address view (interface name, state, addresses only)
ip -brief addr show
# eth0    UP    192.168.1.10/24 fe80::1/64
# lo      UNKNOWN 127.0.0.1/8 ::1/128

# Brief link view
ip -brief link show
```

---

## Practical Examples

```bash
# Full network diagnostic snapshot
echo "=== Interfaces ===" && ip -brief addr
echo "=== Routes ===" && ip route
echo "=== Default GW ===" && ip route show default

# Find your public-facing interface
ip route get 1.1.1.1 | awk '{for(i=1;i<=NF;i++) if($i=="dev") print $(i+1)}'

# Check if an interface is up
ip link show eth0 | grep -q "state UP" && echo "UP" || echo "DOWN"

# Watch routing table changes in real time
ip monitor route
```

---

## ifconfig vs ip Quick Reference

| Old (`ifconfig`/`route`) | New (`ip`) |
|--------------------------|------------|
| `ifconfig` | `ip addr` |
| `ifconfig eth0 up` | `ip link set eth0 up` |
| `ifconfig eth0 192.168.1.1` | `ip addr add 192.168.1.1/24 dev eth0` |
| `route -n` | `ip route` |
| `route add default gw X` | `ip route add default via X` |
| `arp -n` | `ip neigh` |

---

## Interview Questions

??? question "What is the difference between `ip addr` and `ip link`?"
    `ip link` shows Layer 2 information — MAC address, MTU, link state (UP/DOWN), interface flags. `ip addr` shows Layer 3 information — IP addresses assigned to each interface — along with the link-level info. Use `ip link` for hardware/driver-level status and `ip addr` for IP configuration.

??? question "How do you find your default gateway from the command line?"
    ```bash
    ip route show default
    # default via 192.168.1.1 dev eth0
    ```
    Or extract just the gateway IP: `ip route | awk '/default/ {print $3}'`

??? question "Why was `ifconfig` deprecated in favour of `ip`?"
    `ifconfig` (part of `net-tools`) was not maintained actively and lacked support for modern Linux networking features like network namespaces, VLAN tagging, bonding, IPv6 policy routing, and many others. The `iproute2` suite (`ip`, `ss`, `tc`) is actively maintained, supports all modern kernel networking features, and provides a consistent syntax across all network objects.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `ss` | Socket statistics (replacement for `netstat`) |
| `ping` | Test connectivity |
| `traceroute` | Trace packet path |
| `nmcli` | NetworkManager command-line interface |
| `ethtool` | NIC hardware settings |
