# TheLinuxBook

> A professional Linux documentation website built for engineers — from shell fundamentals to kernel internals.

[![Deploy Documentation](https://github.com/Pruthviraj-333/TheLinuxBook/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pruthviraj-333/TheLinuxBook/actions/workflows/deploy.yml)
[![MkDocs Material](https://img.shields.io/badge/MkDocs-Material-blue?logo=material-design)](https://squidfunk.github.io/mkdocs-material/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Pages](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-brightgreen)](https://Pruthviraj-333.github.io/TheLinuxBook/)

**Live site**: https://Pruthviraj-333.github.io/TheLinuxBook/

---

## What is TheLinuxBook?

TheLinuxBook is a production-quality Linux documentation reference — built to grow over years and scale to thousands of pages. It is designed for:

- **SREs and DevOps engineers** who need fast, accurate command references
- **Developers** learning system-level Linux concepts
- **Interview candidates** preparing for Linux/infrastructure roles
- **Students** building a solid foundation from first principles

---

## Coverage

| Section | Topics Covered |
|---------|---------------|
| **Fundamentals** | Commands (ls, cd, cp, mv, rm, mkdir, touch, cat, grep, find, ps…), filesystem hierarchy, kernel architecture |
| **Shell & Scripting** | Bash internals, scripting patterns, job control, process substitution |
| **Process Management** | Lifecycle, signals, scheduling, namespaces, cgroups |
| **Memory Management** | Virtual memory, paging, mmap, huge pages, OOM killer, NUMA |
| **Networking** | TCP/IP stack, sockets, iptables, network namespaces |
| **Storage** | Block devices, LVM, RAID, filesystems, I/O schedulers |
| **Security** | Permissions, SELinux, AppArmor, capabilities, seccomp, audit |
| **Containers** | Namespaces, cgroups, OCI, container runtimes from scratch |
| **systemd** | Unit files, targets, journald, socket activation, service hardening |
| **Performance** | perf, eBPF, flame graphs, CPU/memory/I/O tuning |
| **Troubleshooting** | Systematic debugging methodology, kernel panic analysis |
| **Interview Prep** | 300+ curated questions with detailed expert answers |
| **Labs** | Hands-on exercises for practical skills |

---

## Key Features

- **Markdown as source of truth** — every page is a `.md` file, editable in any text editor
- **Hot-reload local preview** — `mkdocs serve` gives instant feedback
- **Mermaid diagrams** — kernel internals and system flows visualised inline
- **Syntax-highlighted code blocks** — Pygments with the Tokyo Night colour scheme
- **Content tabs** — compare approaches side by side
- **Admonitions** — Notes, Tips, Warnings, Danger callouts
- **Interview Q&A** — collapsible question/answer blocks on every command page
- **Auto-deploy** — every push to `main` triggers GitHub Actions and updates the live site
- **Mobile-responsive** — readable on any device

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Static site generator | [MkDocs](https://www.mkdocs.org/) |
| Theme | [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) |
| Diagrams | [Mermaid](https://mermaid.js.org/) |
| Syntax highlighting | [Pygments](https://pygments.org/) |
| Markdown extensions | [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/) |
| Deployment | GitHub Actions → GitHub Pages |
| Colour theme | Tokyo Night |

---

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Local Development

```bash
# Clone the repository
git clone https://github.com/Pruthviraj-333/TheLinuxBook.git
cd TheLinuxBook

# Install dependencies
pip install -r requirements.txt

# Start local dev server with hot-reload
mkdocs serve

# Open http://localhost:8000
```

### Build for Production

```bash
mkdocs build
# Output in site/
```

---

## Project Structure

```
TheLinuxBook/
├── docs/                    # All Markdown source files
│   ├── index.md             # Home page
│   ├── assets/
│   │   ├── css/             # Custom CSS (Tokyo Night theme)
│   │   └── js/              # Custom JS and Web Components
│   ├── fundamentals/
│   │   ├── commands/        # Individual command pages (ls, grep, find…)
│   │   ├── filesystem/      # Filesystem hierarchy and internals
│   │   └── kernel/          # Kernel architecture
│   ├── shell/               # Bash and shell scripting
│   ├── process/             # Process management
│   ├── memory/              # Memory management
│   ├── networking/          # Networking
│   ├── storage/             # Storage and filesystems
│   ├── security/            # Security
│   ├── containers/          # Container internals
│   ├── systemd/             # systemd
│   ├── performance/         # Performance engineering
│   ├── troubleshooting/     # Troubleshooting
│   ├── interview/           # Interview prep
│   ├── labs/                # Hands-on labs
│   ├── examples/            # Feature showcases
│   └── _templates/          # Page templates for new content
├── overrides/               # Jinja2 template overrides
├── .github/workflows/       # CI/CD pipeline
├── mkdocs.yml               # Main configuration
├── requirements.txt         # Python dependencies
└── README.md
```

---

## Adding New Content

### New Command Page

1. Copy `docs/_templates/command-page-template.md`
2. Save as `docs/fundamentals/commands/COMMAND.md`
3. Add an entry to `nav:` in `mkdocs.yml`
4. Run `mkdocs serve` to preview

### New Topic Page

1. Copy `docs/_templates/page-template.md`
2. Save in the relevant section directory
3. Add to `nav:` in `mkdocs.yml`

---

## Deployment

The site deploys automatically via GitHub Actions on every push to `main`:

1. GitHub Actions runs `mkdocs build`
2. Built files are pushed to the `gh-pages` branch
3. GitHub Pages serves the site at the URL above

**Manual trigger**: Go to Actions tab → Deploy Documentation → Run workflow

---

## Contributing

This is a personal Linux notes repository. Contributions are welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b docs/add-COMMAND`
3. Add your documentation following the templates in `docs/_templates/`
4. Open a pull request with a clear description of what was added

---

## License

MIT License — see [LICENSE](LICENSE) for details.
