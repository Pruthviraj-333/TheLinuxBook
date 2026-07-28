---
title: "curl — Transfer Data with URLs"
description: "Complete reference for the curl command — syntax, HTTP methods, headers, auth, file downloads, and practical API examples."
---

# `curl` — Transfer Data with URLs

## Overview

`curl` transfers data to or from a server using a URL. It supports dozens of protocols — HTTP, HTTPS, FTP, SFTP, SCP, SMTP, and more. It is the standard tool for testing APIs, downloading files, and debugging HTTP services from the command line.

**Command type**: External  
**Location**: `/usr/bin/curl`

---

## Syntax

```bash
curl [OPTIONS] URL
```

---

## Options Reference

### Basic

| Option | Description |
|--------|-------------|
| `-o FILE` | Save output to FILE |
| `-O` | Save with the remote filename |
| `-s` | Silent — no progress or errors |
| `-S` | Show errors even when silent |
| `-v` | Verbose — show request/response headers |
| `-i` | Include response headers in output |
| `-I` | Fetch headers only (HEAD request) |
| `-L` | Follow HTTP redirects |
| `-w FORMAT` | Write-out — output specific info after completion |

### HTTP Method and Data

| Option | Description |
|--------|-------------|
| `-X METHOD` | Set HTTP method (GET, POST, PUT, DELETE, PATCH) |
| `-d DATA` | Send data in request body (implies POST) |
| `-F KEY=VALUE` | Multipart form data |
| `-G` | Send `-d` data as query string with GET |

### Headers and Auth

| Option | Description |
|--------|-------------|
| `-H 'Header: Value'` | Add request header |
| `-u user:pass` | HTTP Basic authentication |
| `--oauth2-bearer TOKEN` | Bearer token auth |
| `-k` | Allow insecure TLS (skip cert verification) |
| `--cert FILE` | Client certificate |

### Speed and Retry

| Option | Description |
|--------|-------------|
| `--limit-rate SPEED` | Limit transfer speed (e.g., `1M`) |
| `--retry N` | Retry N times on failure |
| `--retry-delay N` | Wait N seconds between retries |
| `--connect-timeout N` | Timeout for connection phase |
| `-m N` | Maximum total time for request |

---

## Examples

### Download a File

```bash
# Download to stdout (display)
curl https://example.com

# Save to a file
curl -o myfile.html https://example.com

# Save with the remote filename
curl -O https://example.com/archive.tar.gz

# Download multiple files
curl -O https://example.com/file1.zip -O https://example.com/file2.zip

# Resume an interrupted download
curl -C - -O https://example.com/largefile.iso
```

### HTTP GET with Headers

```bash
# Simple GET
curl https://api.example.com/users

# GET with custom header
curl -H "Authorization: Bearer mytoken" https://api.example.com/users

# GET with query parameters
curl "https://api.example.com/search?q=linux&page=1"

# Show response headers
curl -i https://example.com

# Show only headers (HEAD request)
curl -I https://example.com
```

### HTTP POST

```bash
# POST JSON body
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Pruthvi", "role": "engineer"}' \
  https://api.example.com/users

# POST form data
curl -X POST \
  -F "username=pruthvi" \
  -F "password=secret" \
  https://example.com/login
```

### PUT and DELETE

```bash
# PUT — update a resource
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}' \
  https://api.example.com/users/42

# DELETE
curl -X DELETE https://api.example.com/users/42
```

### Follow Redirects

```bash
# -L follows HTTP 301/302 redirects
curl -L https://bit.ly/shortened-url
```

### Test Response Time

```bash
# Print HTTP response code and timing
curl -o /dev/null -s -w "Status: %{http_code}\nTime: %{time_total}s\n" \
  https://example.com
```

### Basic and Bearer Auth

```bash
# Basic auth
curl -u admin:password https://api.example.com/admin

# Bearer token
curl -H "Authorization: Bearer eyJhbGci..." https://api.example.com/me
```

### Verbose for Debugging

```bash
# Shows full TLS handshake, request headers, response headers
curl -v https://api.example.com/health

# Extra verbose (includes SSL details)
curl -vv https://api.example.com/health
```

---

## Interview Questions

??? question "What is the difference between `curl -o` and `curl -O`?"
    `-o FILE` saves output to the filename you specify. `-O` saves using the filename from the URL (the last path component). For example, `curl -O https://example.com/archive.tar.gz` saves as `archive.tar.gz`, while `curl -o myarchive.tar.gz https://example.com/archive.tar.gz` saves as `myarchive.tar.gz`.

??? question "How do you test an API endpoint that requires a JSON body?"
    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer TOKEN" \
      -d '{"key": "value"}' \
      https://api.example.com/endpoint
    ```
    The `-H "Content-Type: application/json"` header tells the server to interpret the body as JSON, and `-d` provides the body.

??? question "How do you check just the HTTP response code of a URL?"
    ```bash
    curl -o /dev/null -s -w "%{http_code}" https://example.com
    ```
    `-o /dev/null` discards the body, `-s` hides progress, and `-w "%{http_code}"` prints only the status code.

---

## Related Commands

| Command | Description |
|---------|-------------|
| `wget` | Simpler file downloader |
| `httpie` / `http` | Human-friendly HTTP client |
| `jq` | Parse and format JSON responses |
| `ssh` | Secure shell for remote access |
