---
title: Interactive Components Showcase
description: Demonstration of all interactive Web Components — permission calculator, signal table, process lifecycle, memory layout, and more.
---

# Interactive Components Showcase

All components are embedded directly in Markdown using raw HTML tags. They are pure Web Components — no framework, no build step required.

---

## Permission Calculator

Click the checkboxes to toggle read/write/execute bits. Octal and symbolic output update instantly.

<permission-calculator></permission-calculator>

**Usage in Markdown:**
```html
<permission-calculator></permission-calculator>
```

---

## Octal ↔ Symbolic Converter

Type any valid octal value (0–7777) to see the symbolic breakdown.

<octal-converter></octal-converter>

**Usage in Markdown:**
```html
<octal-converter></octal-converter>
```

---

## Linux Signal Reference Table

Searchable reference of all standard Linux signals. Use the search box to filter.

<signal-table></signal-table>

**Usage in Markdown:**
```html
<signal-table></signal-table>
```

---

## Process Lifecycle Diagram

Interactive SVG showing the complete Linux process state machine.

<process-lifecycle></process-lifecycle>

**Usage in Markdown:**
```html
<process-lifecycle></process-lifecycle>
```

---

## Process Memory Layout

Visual representation of a Linux process's virtual address space.

<memory-layout></memory-layout>

**Usage in Markdown:**
```html
<memory-layout></memory-layout>
```

---

## Linux Boot Sequence

Step-by-step visualization of the Linux boot process from power-on to login prompt.

<boot-sequence></boot-sequence>

**Usage in Markdown:**
```html
<boot-sequence></boot-sequence>
```

---

## File Tree

Renders a formatted filesystem tree from plain text.

<file-tree>
/
├── etc/
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── sites-enabled/
│   │       └── default
│   ├── systemd/
│   │   └── system/
│   │       └── nginx.service
│   └── hosts
├── var/
│   ├── log/
│   │   └── nginx/
│   │       ├── access.log
│   │       └── error.log
│   └── www/
│       └── html/
│           └── index.html
└── usr/
    └── bin/
        └── nginx
</file-tree>

**Usage in Markdown:**
```html
<file-tree>
/
├── etc/
│   └── hosts
└── var/
    └── log/
</file-tree>
```

---

## Component Styling Notes

!!! tip "Dark mode support"
    All components read CSS custom properties (`--tlb-border`, `--tlb-text-muted`, etc.) and automatically adapt to light/dark mode switches.

!!! info "No dependencies"
    Components use the Web Components v1 specification (Custom Elements + Shadow-free DOM). They work in all modern browsers without any JavaScript framework.

!!! note "Adding new components"
    Edit `docs/assets/js/components.js`. Define a class extending `HTMLElement`, implement `connectedCallback()`, and register with `customElements.define('your-tag', YourClass)`.
