/**
 * TheLinuxBook — Custom JavaScript Enhancements
 * Lightweight, vanilla JS only. No frameworks.
 * Features: scroll progress, back-to-top, external links, keyboard shortcuts.
 */

(function () {
  "use strict";

  /* ─────────────────────────────────────────────────────────────
     1. Scroll Progress Bar
     ───────────────────────────────────────────────────────────── */
  function initProgressBar() {
    const bar = document.createElement("div");
    bar.id = "tlb-progress-bar";
    document.body.prepend(bar);

    document.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────────
     2. Back-to-Top Button
     ───────────────────────────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.createElement("button");
    btn.id = "tlb-back-to-top";
    btn.innerHTML = "↑";
    btn.setAttribute("aria-label", "Back to top");
    btn.setAttribute("title", "Back to top");
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     3. Copy Toast Notification
     ───────────────────────────────────────────────────────────── */
  function initCopyToast() {
    const toast = document.createElement("div");
    toast.className = "tlb-copy-toast";
    toast.textContent = "✓ Copied!";
    document.body.appendChild(toast);

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".md-clipboard");
      if (!btn) return;
      toast.classList.add("show");
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.remove("show"), 1800);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     4. External Link Indicator
         Adds rel="noopener noreferrer" and target="_blank"
         to all external links automatically.
     ───────────────────────────────────────────────────────────── */
  function initExternalLinks() {
    const origin = window.location.origin;
    document.querySelectorAll('.md-content a[href^="http"]').forEach((link) => {
      if (!link.href.startsWith(origin)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────
     5. Keyboard Shortcuts
         ?       → focus search
         g h     → go home
         g t     → scroll to top
         Esc     → close search / blur focus
     ───────────────────────────────────────────────────────────── */
  function initKeyboardShortcuts() {
    let lastKey = "";
    let lastKeyTime = 0;

    document.addEventListener("keydown", (e) => {
      // Don't fire when typing in input/textarea
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const now = Date.now();
      const key = e.key.toLowerCase();

      // ? → focus search
      if (key === "?" || (e.shiftKey && e.key === "?")) {
        e.preventDefault();
        const searchInput = document.querySelector(".md-search__input");
        if (searchInput) searchInput.focus();
        return;
      }

      // Esc → blur everything
      if (key === "escape") {
        document.activeElement?.blur();
        return;
      }

      // Two-key sequences (g h = go home, g t = go top)
      if (key === "g" || (lastKey === "g" && now - lastKeyTime < 800)) {
        if (lastKey === "g") {
          if (key === "h") {
            window.location.href = "/TheLinuxBook/";
          } else if (key === "t") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          lastKey = "";
          return;
        }
      }

      lastKey = key;
      lastKeyTime = now;
    });
  }

  /* ─────────────────────────────────────────────────────────────
     6. Collapsible Long Code Blocks
         Code blocks > 35 lines get a "Show more" toggle.
     ───────────────────────────────────────────────────────────── */
  function initCollapsibleCode() {
    const THRESHOLD = 35;
    document.querySelectorAll(".md-typeset pre").forEach((pre) => {
      const lineCount = (pre.textContent.match(/\n/g) || []).length;
      if (lineCount <= THRESHOLD) return;

      const wrapper = document.createElement("div");
      wrapper.className = "tlb-collapsible-code collapsed";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement("button");
      btn.className = "tlb-expand-btn";
      btn.textContent = "▼ Show full code (" + lineCount + " lines)";
      wrapper.appendChild(btn);

      btn.addEventListener("click", () => {
        const collapsed = wrapper.classList.toggle("collapsed");
        btn.textContent = collapsed
          ? "▼ Show full code (" + lineCount + " lines)"
          : "▲ Collapse";
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     7. Image Zoom Fallback
         If glightbox plugin is not active, add basic click-to-zoom.
     ───────────────────────────────────────────────────────────── */
  function initImageZoomFallback() {
    // glightbox handles zoom natively when installed
    // This is a no-op if glightbox is active
    if (window.GLightbox) return;

    document.querySelectorAll(".md-content img:not([data-no-zoom])").forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.style.cssText =
          "position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;";
        const clone = img.cloneNode();
        clone.style.cssText = "max-width:92vw;max-height:92vh;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,0.6);";
        overlay.appendChild(clone);
        document.body.appendChild(overlay);
        overlay.addEventListener("click", () => overlay.remove());
        document.addEventListener("keydown", function esc(e) {
          if (e.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", esc); }
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     8. Smooth Anchor Navigation
     ───────────────────────────────────────────────────────────── */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const target = document.getElementById(this.getAttribute("href").slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, this.getAttribute("href"));
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     Init — run after DOM ready
     ───────────────────────────────────────────────────────────── */
  function init() {
    initProgressBar();
    initBackToTop();
    initCopyToast();
    initExternalLinks();
    initKeyboardShortcuts();
    initCollapsibleCode();
    initImageZoomFallback();
    initSmoothAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-run on MkDocs instant navigation (SPA-like page transitions)
  document.addEventListener("DOMContentSwitch", init);
})();
