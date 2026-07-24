---
title: Bash Scripting & Shell Internals
description: Bash scripting from basics to advanced — functions, arrays, process substitution, traps, job control, and shell internals.
---

# Bash Scripting & Shell Internals

## Overview

Bash (Bourne Again Shell) is the default shell on most Linux distributions. Mastering Bash means mastering Linux automation — from simple one-liners to production-grade scripts that manage infrastructure.

## Script Structure Template

```bash title="script-template.sh"
#!/usr/bin/env bash
# =============================================================================
# Script Name  : script-template.sh
# Description  : What this script does
# Author       : Pruthviraj
# Usage        : ./script-template.sh [OPTIONS] <arg>
# =============================================================================

set -euo pipefail        # e=exit on error, u=undefined vars, o=pipefail
IFS=$'\n\t'              # Safer word splitting

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"

# ── Logging ──────────────────────────────────────────────────────────────────
log()  { printf '[%s] %s\n'  "$(date +%H:%M:%S)" "$*" >&2; }
info() { printf '\e[32m[INFO]\e[0m  %s\n' "$*" >&2; }
warn() { printf '\e[33m[WARN]\e[0m  %s\n' "$*" >&2; }
err()  { printf '\e[31m[ERR]\e[0m   %s\n' "$*" >&2; exit 1; }

# ── Cleanup on exit ──────────────────────────────────────────────────────────
cleanup() {
  local exit_code=$?
  # Clean up temp files, etc.
  exit "$exit_code"
}
trap cleanup EXIT INT TERM

# ── Main ─────────────────────────────────────────────────────────────────────
main() {
  info "Starting ${SCRIPT_NAME}"
  # Your logic here
}

main "$@"
```

## Variables & Data Types

=== "Variables"

    ```bash
    # Assignment — no spaces around =
    name="Linux"
    count=42
    pi=3.14159

    # Read-only
    readonly VERSION="6.0"

    # Environment variable
    export PATH="$PATH:/usr/local/bin"

    # Command substitution
    today=$(date +%Y-%m-%d)
    files=$(find /tmp -name "*.log" -mtime +7)

    # Arithmetic
    result=$(( 5 * 3 + 2 ))
    (( count++ ))
    ```

=== "Arrays"

    ```bash
    # Indexed array
    fruits=("apple" "banana" "cherry")
    echo "${fruits[0]}"         # apple
    echo "${fruits[@]}"         # all elements
    echo "${#fruits[@]}"        # count: 3
    fruits+=("date")            # append

    # Associative array (Bash 4+)
    declare -A config
    config[host]="localhost"
    config[port]="5432"
    echo "${config[host]}"

    # Iterate
    for fruit in "${fruits[@]}"; do
      echo "$fruit"
    done

    # Iterate associative
    for key in "${!config[@]}"; do
      echo "${key} = ${config[$key]}"
    done
    ```

=== "String Operations"

    ```bash
    str="Hello, World!"

    echo "${#str}"          # Length: 13
    echo "${str:7:5}"       # Substring: World
    echo "${str/World/Linux}"  # Replace first
    echo "${str//l/L}"      # Replace all
    echo "${str^^}"         # Uppercase: HELLO, WORLD!
    echo "${str,,}"         # Lowercase: hello, world!

    # Strip prefix/suffix
    file="report_2024.tar.gz"
    echo "${file%.tar.gz}"  # report_2024 (strip suffix)
    echo "${file#report_}" # 2024.tar.gz (strip prefix)
    ```

## Control Flow

```bash
# if / elif / else
if [[ -f /etc/passwd ]]; then
  echo "File exists"
elif [[ -d /etc/passwd ]]; then
  echo "Is a directory"
else
  echo "Not found"
fi

# Compact one-liner
[[ -z "$var" ]] && echo "empty" || echo "not empty"

# case statement
case "$OS" in
  ubuntu|debian) pkg_manager="apt" ;;
  centos|rhel)   pkg_manager="yum" ;;
  arch)          pkg_manager="pacman" ;;
  *)             err "Unknown OS: $OS" ;;
esac

# for loop
for i in {1..10}; do echo "$i"; done
for f in /var/log/*.log; do wc -l "$f"; done

# while loop
while IFS= read -r line; do
  echo "Line: $line"
done < /etc/hosts

# until loop
until ping -c1 google.com &>/dev/null; do
  echo "Waiting for network..."
  sleep 2
done
```

## Functions

```bash
# Basic function
greet() {
  local name="${1:?Usage: greet <name>}"   # Required argument
  local greeting="${2:-Hello}"             # Optional with default
  echo "${greeting}, ${name}!"
}
greet "Linux" "Welcome"

# Function with return value
is_root() {
  [[ $(id -u) -eq 0 ]]
}

if is_root; then
  echo "Running as root"
fi

# Function returning data
get_os() {
  if [[ -f /etc/os-release ]]; then
    source /etc/os-release
    echo "$NAME"
  else
    echo "Unknown"
  fi
}
os=$(get_os)
```

## Process Management

```bash
# Background process
long_running_task &
pid=$!
echo "Started PID: $pid"

# Wait for background job
wait $pid
echo "Exit code: $?"

# Job control
sleep 100 &   # Start in background
jobs          # List jobs
fg %1         # Bring job 1 to foreground
bg %1         # Send job 1 to background
kill %1       # Kill job 1

# Subshell
(
  cd /tmp
  echo "In subshell: $(pwd)"
)
echo "Back in parent: $(pwd)"
```

## Traps & Signal Handling

```bash
# Trap Ctrl+C
trap 'echo "Interrupted!"; exit 130' INT

# Cleanup on exit
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

# Trap multiple signals
trap 'cleanup' EXIT INT TERM QUIT

# Ignore a signal
trap '' PIPE   # Ignore broken pipe

# Reset to default
trap - INT
```

## Advanced Features

=== "Process Substitution"

    ```bash
    # diff two command outputs without temp files
    diff <(ls /etc) <(ls /usr/share)

    # Read from process as if it's a file
    while IFS= read -r line; do
      echo "-> $line"
    done < <(find /tmp -name "*.log")
    ```

=== "Here Documents"

    ```bash
    cat <<'EOF' > /tmp/config.yml
    server:
      host: localhost
      port: 8080
    EOF

    # Send to command
    ssh user@host <<'EOF'
      hostname
      uptime
      df -h
    EOF
    ```

=== "Parameter Expansion"

    ```bash
    var="value"

    ${var:-default}   # Use default if unset or empty
    ${var:=default}   # Assign default if unset or empty
    ${var:?error}     # Error if unset or empty
    ${var:+other}     # Use 'other' if var is set

    # Indirect reference
    key="PORT"
    echo "${!key}"    # Value of $PORT

    # All variables matching prefix
    echo "${!HOME*}" # HOME (and HOME-related vars)
    ```

## Interview Questions

??? question "What does `set -euo pipefail` do?"
    - `-e`: Exit immediately if any command returns non-zero exit code
    - `-u`: Treat unset variables as errors (prevents silent bugs)
    - `-o pipefail`: The exit code of a pipeline is the exit code of the last failing command (without this, `false | true` would succeed)
    Together, these three options make Bash scripts fail loudly and early rather than silently continuing after errors.

??? question "What is the difference between `$*` and `$@`?"
    Both expand to all positional parameters. Unquoted, they behave the same. **Quoted**: `"$*"` expands to a single string with parameters joined by `$IFS` (first char). `"$@"` expands to separate quoted strings for each parameter — preserving spaces. Always use `"$@"` when passing arguments to preserve them faithfully.

??? question "What does `2>&1` mean?"
    Redirect file descriptor 2 (stderr) to wherever fd 1 (stdout) currently points. Order matters: `cmd > file 2>&1` redirects stdout to file first, then stderr to the same. `cmd 2>&1 > file` redirects stderr to current stdout (terminal), then redirects stdout to file — so stderr still goes to terminal.
