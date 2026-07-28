---
title: "wget — Download Files from the Web"
description: "Complete reference for the wget command — syntax, options, recursive downloads, resume, and comparison with curl."
---

# `wget` — Download Files from the Web

## Overview

`wget` is a non-interactive file downloader supporting HTTP, HTTPS, and FTP. Its key advantage over `curl` is built-in **recursive downloading** and automatic **retry on failure** — making it ideal for mirroring websites and batch downloads.

**Command type**: External (GNU Wget)  
**Location**: `/usr/bin/wget`

---

## Syntax

```bash
wget [OPTIONS] URL
```

---

## Options Reference

| Option | Description |
|--------|-------------|
| `-O FILE` | Save to FILE (`-` for stdout) |
| `-q` | Quiet — no output |
| `-v` | Verbose (default) |
| `-c` | Continue / resume an interrupted download |
| `-b` | Download in background |
| `-P DIR` | Save files to DIR |
| `--limit-rate=RATE` | Limit speed (e.g., `500k`, `2M`) |
| `--tries=N` | Number of retries (0 = unlimited) |
| `--timeout=SEC` | Network timeout in seconds |
| `--no-check-certificate` | Skip TLS certificate verification |
| `-r` | Recursive download |
| `-l N` | Recursion depth limit |
| `-m` | Mirror a site (`-r -N -l inf --no-remove-listing`) |
| `-A LIST` | Accept only files matching comma-separated list |
| `-R LIST` | Reject files matching list |
| `--user=U --password=P` | HTTP/FTP authentication |

---

## Examples

### Basic Download

```bash
# Download to current directory using remote filename
wget https://example.com/file.tar.gz

# Save with a different name
wget -O myfile.tar.gz https://example.com/file.tar.gz

# Download quietly (no progress bar)
wget -q https://example.com/file.tar.gz

# Download to a specific directory
wget -P /tmp/ https://example.com/file.tar.gz
```

### Resume Interrupted Download

```bash
# Resume from where it stopped
wget -c https://example.com/largefile.iso
```

### Batch Downloads

```bash
# Download multiple URLs from a file
wget -i urls.txt

# Download list of files
cat << 'EOF' > urls.txt
https://example.com/file1.zip
https://example.com/file2.zip
https://example.com/file3.zip
EOF
wget -i urls.txt -P downloads/
```

### Mirror a Website

```bash
# Full recursive mirror
wget -m https://example.com/

# Mirror with a depth limit
wget -r -l 2 https://example.com/docs/
```

### Download with Rate Limiting

```bash
# Limit to 500 KB/s (polite downloading)
wget --limit-rate=500k https://example.com/large.iso
```

### Background Download

```bash
wget -b -q https://example.com/large.iso
# Outputs: Continuing in background, pid 12345.
# Log is written to 'wget-log'.
tail -f wget-log   # monitor progress
```

---

## wget vs curl

| Feature | `wget` | `curl` |
|---------|--------|--------|
| Recursive download | Yes (`-r`) | No |
| Resume downloads | Yes (`-c`) | Yes (`-C -`) |
| HTTP methods (POST/PUT) | Limited | Full support |
| API testing | Limited | Excellent |
| Follow redirects | Yes (default) | Yes (`-L`) |
| Progress display | Yes | Yes |
| Scripting / pipelines | Limited | Excellent |

---

## Interview Questions

??? question "When would you use wget over curl?"
    Use `wget` when you need to recursively download an entire website or directory tree (`-r`), need automatic retry and resume out of the box, or are doing a simple file download. Use `curl` when you need to make API requests with custom HTTP methods (POST/PUT/DELETE), manipulate headers precisely, or process the response programmatically in a pipeline.

??? question "How do you resume a partially downloaded file with wget?"
    Use `wget -c URL` — the `-c` (continue) flag checks if a local file with the same name exists and appends the remaining data starting from where the previous download stopped. This works for HTTP servers that support `Range` requests.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `curl` | More flexible HTTP client |
| `rsync` | Efficient file sync with resume support |
| `aria2c` | Multi-connection parallel downloader |
