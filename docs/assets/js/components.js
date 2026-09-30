/**
 * TheLinuxBook — Interactive Web Components
 * Self-contained Custom Elements (Web Components spec).
 * Embeddable in Markdown via raw HTML blocks.
 * Zero dependencies. No build step required.
 */

/* =============================================================================
   1. Permission Calculator  <permission-calculator>
   Click the rwx bits to toggle; see octal + symbolic output live.
   ============================================================================= */
class PermissionCalculator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="tlb-perm-calc" style="
        border:1px solid var(--tlb-border,#30363d);
        border-radius:12px;
        overflow:hidden;
        max-width:540px;
        font-family:'JetBrains Mono',monospace;
      ">
        <div style="background:#0077b6;color:#fff;padding:.75rem 1.2rem;font-weight:700;font-size:.9rem;letter-spacing:.04em;">
          🔐 Permission Calculator
        </div>
        <div style="padding:1.2rem;">
          <table style="width:100%;border-collapse:collapse;text-align:center;">
            <thead>
              <tr style="color:var(--tlb-text-muted,#8b949e);font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;">
                <th style="width:34%;padding:.4rem 0;">Owner</th>
                <th style="width:33%;padding:.4rem 0;">Group</th>
                <th style="width:33%;padding:.4rem 0;">Others</th>
              </tr>
            </thead>
            <tbody>
              <tr id="perm-bits-${this._id()}">
                ${['owner','group','others'].map(g=>`
                  <td style="padding:.5rem 0;">
                    ${['r','w','x'].map((b,i)=>`
                      <label style="display:inline-block;margin:0 4px;cursor:pointer;">
                        <input type="checkbox" data-group="${g}" data-bit="${b}" data-val="${4>>i}"
                          style="accent-color:#00b4d8;width:16px;height:16px;cursor:pointer;"
                          ${b==='r'||b==='w'&&g==='owner'||b==='x'&&g==='owner'?'checked':''}>
                        <span style="display:block;font-weight:700;font-size:1rem;color:var(--tlb-accent,#00b4d8);">${b}</span>
                      </label>
                    `).join('')}
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
          <div style="margin-top:1rem;padding:.8rem 1rem;background:var(--tlb-bg-code,#1a2236);border-radius:8px;font-size:.9rem;">
            <div style="margin-bottom:.4rem;">
              <span style="color:var(--tlb-text-muted,#8b949e);font-size:.75rem;">OCTAL</span>
              <span id="perm-octal-${this._id()}" style="float:right;color:#ffd166;font-weight:700;font-size:1.2rem;">755</span>
            </div>
            <div>
              <span style="color:var(--tlb-text-muted,#8b949e);font-size:.75rem;">SYMBOLIC</span>
              <span id="perm-sym-${this._id()}" style="float:right;color:#06d6a0;font-weight:700;">rwxr-xr-x</span>
            </div>
          </div>
        </div>
      </div>`;

    // Wire up events
    const uid = this._uid;
    this.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
      cb.addEventListener('change', () => this._update());
    });
    this._update();
  }

  _id() { return this._uid || (this._uid = Math.random().toString(36).slice(2,7)); }

  _update() {
    const groups = ['owner','group','others'];
    const octal = groups.map(g=>{
      let v=0;
      this.querySelectorAll(`input[data-group="${g}"]`).forEach(cb=>{
        if(cb.checked) v+=parseInt(cb.dataset.val);
      });
      return v;
    });
    const sym = groups.map((g,gi)=>{
      const bits = ['r','w','x'];
      return bits.map((b,bi)=>{
        const cb = this.querySelector(`input[data-group="${g}"][data-bit="${b}"]`);
        return cb&&cb.checked ? b : '-';
      }).join('');
    }).join('');

    this.querySelector('[id^="perm-octal-"]').textContent = octal.join('');
    this.querySelector('[id^="perm-sym-"]').textContent = sym;
  }
}
customElements.define('permission-calculator', PermissionCalculator);

/* =============================================================================
   2. Octal Permission Converter  <octal-converter>
   Type any octal value (0-7777), see symbolic + description.
   ============================================================================= */
class OctalConverter extends HTMLElement {
  connectedCallback() {
    const id = Math.random().toString(36).slice(2,7);
    this.innerHTML = `
      <div style="border:1px solid var(--tlb-border,#30363d);border-radius:12px;overflow:hidden;max-width:420px;">
        <div style="background:#9d4edd;color:#fff;padding:.75rem 1.2rem;font-weight:700;font-size:.9rem;">
          🔢 Octal ↔ Symbolic Converter
        </div>
        <div style="padding:1.2rem;">
          <label style="font-size:.8rem;color:var(--tlb-text-muted,#8b949e);font-weight:600;">Enter octal (e.g. 755)</label><br>
          <input id="oct-in-${id}" type="text" maxlength="4" placeholder="755"
            style="font-family:'JetBrains Mono',monospace;font-size:1.5rem;font-weight:700;color:#ffd166;
              background:var(--tlb-bg-code,#1a2236);border:1px solid var(--tlb-border,#30363d);
              border-radius:6px;padding:.4rem .8rem;width:100%;margin:.4rem 0 1rem;outline:none;">
          <div id="oct-out-${id}" style="font-family:'JetBrains Mono',monospace;font-size:.9rem;line-height:1.8;"></div>
        </div>
      </div>`;

    const inp = this.querySelector(`#oct-in-${id}`);
    const out = this.querySelector(`#oct-out-${id}`);
    const sym = n => ['r','w','x'].map((b,i)=>(n>>(2-i))&1?b:'-').join('');
    const desc = (v,who)=>`<span style="color:var(--tlb-text-muted,#8b949e);font-size:.78rem;">${who}:</span> <strong style="color:#06d6a0;">${sym(v)}</strong> (${v})`;

    inp.value = '755';
    const update = () => {
      const val = inp.value.trim();
      if(!/^[0-7]{1,4}$/.test(val)){ out.innerHTML='<span style="color:#e63946;">Invalid octal</span>'; return; }
      const parts = val.padStart(4,'0').split('').map(Number);
      const labels=['Special','Owner','Group','Others'];
      out.innerHTML = parts.map((v,i)=>desc(v,labels[i])).join('<br>');
    };
    inp.addEventListener('input', update);
    update();
  }
}
customElements.define('octal-converter', OctalConverter);

/* =============================================================================
   3. Signal Reference Table  <signal-table>
   Searchable, filterable Linux signals reference.
   ============================================================================= */
class SignalTable extends HTMLElement {
  connectedCallback() {
    const signals = [
      [1,'SIGHUP','Hangup — terminal closed or process restart'],
      [2,'SIGINT','Interrupt — Ctrl+C from keyboard'],
      [3,'SIGQUIT','Quit — Ctrl+\\ generates core dump'],
      [9,'SIGKILL','Kill — cannot be caught or ignored'],
      [10,'SIGUSR1','User-defined signal 1'],
      [11,'SIGSEGV','Segmentation fault — invalid memory access'],
      [12,'SIGUSR2','User-defined signal 2'],
      [13,'SIGPIPE','Broken pipe — write to closed pipe'],
      [14,'SIGALRM','Alarm — timer set by alarm() expired'],
      [15,'SIGTERM','Termination — graceful shutdown (default kill)'],
      [17,'SIGCHLD','Child — child process stopped or exited'],
      [18,'SIGCONT','Continue — resume stopped process'],
      [19,'SIGSTOP','Stop — cannot be caught or ignored (Ctrl+Z)'],
      [20,'SIGTSTP','Terminal stop — Ctrl+Z from keyboard'],
      [28,'SIGWINCH','Window change — terminal resized'],
    ];

    const id = Math.random().toString(36).slice(2,7);
    this.innerHTML = `
      <div style="border:1px solid var(--tlb-border,#30363d);border-radius:12px;overflow:hidden;max-width:680px;">
        <div style="background:#0d1117;color:#fff;padding:.75rem 1.2rem;font-weight:700;font-size:.9rem;display:flex;justify-content:space-between;align-items:center;">
          📡 Linux Signal Reference
          <input id="sig-search-${id}" placeholder="Search…"
            style="font-size:.8rem;padding:.3rem .6rem;border-radius:6px;border:1px solid #30363d;background:#1a2236;color:#e6edf3;outline:none;width:140px;">
        </div>
        <div style="overflow-x:auto;">
          <table id="sig-table-${id}" style="width:100%;border-collapse:collapse;font-size:.85rem;">
            <thead>
              <tr style="background:#161b22;color:#8b949e;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;">
                <th style="padding:.6rem 1rem;text-align:left;">No.</th>
                <th style="padding:.6rem 1rem;text-align:left;">Name</th>
                <th style="padding:.6rem 1rem;text-align:left;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${signals.map(([n,name,desc])=>`
                <tr style="border-top:1px solid #21262d;" class="sig-row">
                  <td style="padding:.5rem 1rem;color:#ffd166;font-weight:700;font-family:'JetBrains Mono',monospace;">${n}</td>
                  <td style="padding:.5rem 1rem;color:#06d6a0;font-weight:700;font-family:'JetBrains Mono',monospace;">${name}</td>
                  <td style="padding:.5rem 1rem;color:#8b949e;">${desc}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;

    const search = this.querySelector(`#sig-search-${id}`);
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      this.querySelectorAll('.sig-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
}
customElements.define('signal-table', SignalTable);

/* =============================================================================
   4. Process Lifecycle Diagram  <process-lifecycle>
   SVG state machine: new → ready → running → blocked → terminated
   ============================================================================= */
class ProcessLifecycle extends HTMLElement {
  connectedCallback() {
    const states = {
      NEW: {
        name: 'NEW',
        linux: 'Kernel Allocation',
        color: '#00b4d8',
        desc: 'Process is being spawned via fork(), vfork(), or clone(). The kernel allocates a new PID, copies/shares the parent mm_struct (via Copy-On-Write), and sets up task_struct before admitting it to the ready queue.'
      },
      READY: {
        name: 'READY',
        linux: 'TASK_RUNNING (Runqueue)',
        color: '#06d6a0',
        desc: 'Process is loaded and runnable, residing in the CFS (Completely Fair Scheduler) runqueue. It is actively waiting for an available CPU core to be assigned by the scheduler.'
      },
      RUNNING: {
        name: 'RUNNING',
        linux: 'TASK_RUNNING (On CPU)',
        color: '#ffd166',
        desc: 'Process instructions are executing on an assigned CPU core. It runs until its time-slice expires (preempted), it calls a blocking syscall like read() (blocked), or calls exit().'
      },
      BLOCKED: {
        name: 'BLOCKED / WAITING',
        linux: 'TASK_INTERRUPTIBLE / TASK_UNINTERRUPTIBLE (D)',
        color: '#f4a261',
        desc: 'Process is removed from the runqueue and placed on a wait-queue waiting for an event (disk I/O, network packet, lock, or timer). Once ready, the kernel wakes it up and moves it back to READY.'
      },
      TERMINATED: {
        name: 'TERMINATED',
        linux: 'EXIT_ZOMBIE / EXIT_DEAD',
        color: '#e63946',
        desc: 'Process finished execution via exit() or an unhandled signal. Memory, file descriptors, and virtual address space are freed, but its exit status remains in the process table until the parent reaps it with wait().'
      }
    };

    const id = Math.random().toString(36).slice(2, 7);

    this.innerHTML = `
      <div style="border:1px solid var(--tlb-border,#30363d);border-radius:12px;overflow:hidden;max-width:640px;background:#0d1117;box-shadow:0 4px 20px rgba(0,0,0,0.25);">
        <div style="background:#161b22;color:#e6edf3;padding:.75rem 1.2rem;font-weight:700;font-size:.9rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #21262d;">
          <div style="display:flex;align-items:center;gap:.5rem;">
            <span>⚙️</span>
            <span>Process Lifecycle</span>
          </div>
          <span style="font-size:.72rem;color:#8b949e;font-weight:normal;">Click any state for kernel details</span>
        </div>
        <div style="padding:1.2rem 1rem .8rem;text-align:center;overflow-x:auto;">
          <svg viewBox="0 0 620 270" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:inline-block;vertical-align:middle;user-select:none;">
            <defs>
              <marker id="arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#00b4d8"/>
              </marker>
              <marker id="arrow-preempt-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ffd166"/>
              </marker>
              <marker id="arrow-exit-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e63946"/>
              </marker>
              <filter id="glow-${id}" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2"/>
              </filter>
            </defs>

            <!-- Transition 1: NEW -> READY (fork) -->
            <line x1="116" y1="120" x2="194" y2="72" stroke="#00b4d8" stroke-width="1.8" marker-end="url(#arrow-${id})"/>
            <text x="144" y="88" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" fill="#cbd5e1" text-anchor="middle"
              style="paint-order:stroke;stroke:#0d1117;stroke-width:3px;stroke-linejoin:round;">fork()</text>

            <!-- Transition 2: READY -> RUNNING (schedule) - curved over top -->
            <path d="M 288 56 Q 375 56 390 104" fill="none" stroke="#00b4d8" stroke-width="1.8" marker-end="url(#arrow-${id})"/>
            <text x="345" y="47" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" fill="#cbd5e1" text-anchor="middle"
              style="paint-order:stroke;stroke:#0d1117;stroke-width:3px;stroke-linejoin:round;">schedule</text>

            <!-- Transition 3: RUNNING -> READY (preempt) - dashed inner curve -->
            <path d="M 352 118 Q 306 108 274 76" fill="none" stroke="#ffd166" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#arrow-preempt-${id})"/>
            <text x="306" y="125" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" fill="#ffd166" text-anchor="middle"
              style="paint-order:stroke;stroke:#0d1117;stroke-width:3px;stroke-linejoin:round;">preempt</text>

            <!-- Transition 4: RUNNING -> BLOCKED (I/O wait) -->
            <line x1="352" y1="152" x2="286" y2="198" stroke="#00b4d8" stroke-width="1.8" marker-end="url(#arrow-${id})"/>
            <text x="330" y="186" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" fill="#cbd5e1" text-anchor="middle"
              style="paint-order:stroke;stroke:#0d1117;stroke-width:3px;stroke-linejoin:round;">I/O wait</text>

            <!-- Transition 5: BLOCKED -> READY (I/O done) - clean vertical line -->
            <line x1="240" y1="188" x2="240" y2="82" stroke="#00b4d8" stroke-width="1.8" marker-end="url(#arrow-${id})"/>
            <text x="230" y="135" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" fill="#cbd5e1" text-anchor="end"
              style="paint-order:stroke;stroke:#0d1117;stroke-width:3px;stroke-linejoin:round;">I/O done</text>

            <!-- Transition 6: RUNNING -> TERMINATED (exit) -->
            <line x1="442" y1="135" x2="482" y2="135" stroke="#e63946" stroke-width="1.8" marker-end="url(#arrow-exit-${id})"/>
            <text x="462" y="123" font-size="10" font-family="'JetBrains Mono',monospace" font-weight="600" fill="#f87171" text-anchor="middle"
              style="paint-order:stroke;stroke:#0d1117;stroke-width:3px;stroke-linejoin:round;">exit()</text>

            <!-- State Nodes -->
            <!-- NEW -->
            <g class="plc-node-${id}" data-state="NEW" style="cursor:pointer;" tabindex="0">
              <ellipse cx="70" cy="135" rx="46" ry="25" fill="#111c2e" stroke="#0077b6" stroke-width="2" filter="url(#glow-${id})"/>
              <text x="70" y="133" text-anchor="middle" font-size="12" fill="#00b4d8" font-weight="bold" font-family="system-ui,sans-serif">NEW</text>
              <text x="70" y="146" text-anchor="middle" font-size="7.5" fill="#64748b" font-family="system-ui,sans-serif">created</text>
            </g>

            <!-- READY -->
            <g class="plc-node-${id}" data-state="READY" style="cursor:pointer;" tabindex="0">
              <ellipse cx="240" cy="55" rx="48" ry="26" fill="#0d2822" stroke="#06d6a0" stroke-width="2" filter="url(#glow-${id})"/>
              <text x="240" y="53" text-anchor="middle" font-size="12" fill="#06d6a0" font-weight="bold" font-family="system-ui,sans-serif">READY</text>
              <text x="240" y="66" text-anchor="middle" font-size="7.5" fill="#6ee7b7" font-family="system-ui,sans-serif">runqueue</text>
            </g>

            <!-- RUNNING -->
            <g class="plc-node-${id}" data-state="RUNNING" style="cursor:pointer;" tabindex="0">
              <ellipse cx="390" cy="135" rx="52" ry="26" fill="#2d2412" stroke="#ffd166" stroke-width="2" filter="url(#glow-${id})"/>
              <text x="390" y="133" text-anchor="middle" font-size="12" fill="#ffd166" font-weight="bold" font-family="system-ui,sans-serif">RUNNING</text>
              <text x="390" y="146" text-anchor="middle" font-size="7.5" fill="#fde68a" font-family="system-ui,sans-serif">on CPU</text>
            </g>

            <!-- BLOCKED -->
            <g class="plc-node-${id}" data-state="BLOCKED" style="cursor:pointer;" tabindex="0">
              <ellipse cx="240" cy="215" rx="50" ry="26" fill="#2b1b17" stroke="#f4a261" stroke-width="2" filter="url(#glow-${id})"/>
              <text x="240" y="213" text-anchor="middle" font-size="12" fill="#f4a261" font-weight="bold" font-family="system-ui,sans-serif">BLOCKED</text>
              <text x="240" y="226" text-anchor="middle" font-size="7.5" fill="#fdba74" font-family="system-ui,sans-serif">waiting I/O</text>
            </g>

            <!-- TERMINATED -->
            <g class="plc-node-${id}" data-state="TERMINATED" style="cursor:pointer;" tabindex="0">
              <ellipse cx="538" cy="135" rx="52" ry="26" fill="#2c161a" stroke="#e63946" stroke-width="2" filter="url(#glow-${id})"/>
              <text x="538" y="133" text-anchor="middle" font-size="11.5" fill="#e63946" font-weight="bold" font-family="system-ui,sans-serif">TERMINATED</text>
              <text x="538" y="146" text-anchor="middle" font-size="7.5" fill="#fca5a5" font-family="system-ui,sans-serif">zombie / dead</text>
            </g>
          </svg>
        </div>

        <!-- Interactive Info Box -->
        <div id="plc-info-${id}" style="margin:0 1rem .8rem;padding:.75rem 1rem;background:#161b22;border:1px solid #21262d;border-radius:8px;text-align:left;transition:all 0.2s ease;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.3rem;">
            <div id="plc-title-${id}" style="font-size:.85rem;font-weight:700;color:#06d6a0;display:flex;align-items:center;gap:.5rem;">
              <span>READY</span>
              <span id="plc-badge-${id}" style="font-size:.7rem;padding:.15rem .45rem;border-radius:4px;background:rgba(6,214,160,0.15);color:#06d6a0;font-weight:600;font-family:'JetBrains Mono',monospace;">TASK_RUNNING (Runqueue)</span>
            </div>
          </div>
          <div id="plc-desc-${id}" style="font-size:.8rem;color:#c9d1d9;line-height:1.5;">
            Process is loaded and runnable, residing in the CFS (Completely Fair Scheduler) runqueue. It is actively waiting for an available CPU core to be assigned.
          </div>
        </div>

        <div style="padding:.4rem 1.2rem .8rem;font-size:.76rem;color:#8b949e;line-height:1.5;border-top:1px solid #161b22;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.4rem;">
          <span>Solid cyan = normal flow</span>
          <span style="color:#ffd166;">Dashed yellow = preemption</span>
          <span style="color:#f87171;">Red = process termination</span>
        </div>
      </div>`;

    const infoBox = this.querySelector(`#plc-info-${id}`);
    const titleEl = this.querySelector(`#plc-title-${id}`);
    const badgeEl = this.querySelector(`#plc-badge-${id}`);
    const descEl = this.querySelector(`#plc-desc-${id}`);
    const nodes = this.querySelectorAll(`.plc-node-${id}`);

    const selectState = (key) => {
      const state = states[key];
      if (!state) return;
      titleEl.firstElementChild.textContent = state.name;
      titleEl.style.color = state.color;
      badgeEl.textContent = state.linux;
      badgeEl.style.color = state.color;
      badgeEl.style.background = `${state.color}22`;
      descEl.textContent = state.desc;

      nodes.forEach(node => {
        const el = node.querySelector('ellipse');
        if (node.dataset.state === key) {
          el.setAttribute('stroke-width', '3.5');
          node.style.transform = 'scale(1.04)';
          node.style.transformOrigin = `${el.getAttribute('cx')}px ${el.getAttribute('cy')}px`;
        } else {
          el.setAttribute('stroke-width', '2');
          node.style.transform = 'scale(1)';
        }
      });
    };

    nodes.forEach(node => {
      node.style.transition = 'transform 0.15s ease';
      node.addEventListener('click', () => selectState(node.dataset.state));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectState(node.dataset.state);
        }
      });
    });

    selectState('READY');
  }
}
customElements.define('process-lifecycle', ProcessLifecycle);

/* =============================================================================
   5. Memory Layout Visualizer  <memory-layout>
   Visual of a process's virtual address space.
   ============================================================================= */
class MemoryLayout extends HTMLElement {
  connectedCallback() {
    const segments = [
      { name: 'Kernel Space', color: '#e63946', detail: 'Not accessible from user space', addr: '0xFFFF…' },
      { name: 'Stack ↓',     color: '#f4a261', detail: 'Local vars, function frames, grows downward', addr: '0x7FFF…' },
      { name: 'Shared Libs', color: '#9d4edd', detail: 'mmap() region, dynamically linked libraries', addr: '~0x7F00' },
      { name: 'Heap ↑',      color: '#06d6a0', detail: 'malloc() memory, grows upward', addr: '~0x0060' },
      { name: 'BSS',         color: '#4285f4', detail: 'Uninitialised global/static variables (zeroed)', addr: '' },
      { name: 'Data',        color: '#00b4d8', detail: 'Initialised global/static variables', addr: '' },
      { name: 'Text (Code)', color: '#ffd166', detail: 'Read-only executable instructions', addr: '0x0040' },
    ];

    this.innerHTML = `
      <div style="border:1px solid var(--tlb-border,#30363d);border-radius:12px;overflow:hidden;max-width:460px;">
        <div style="background:#0d1117;color:#fff;padding:.75rem 1.2rem;font-weight:700;font-size:.9rem;">
          🧠 Process Memory Layout
        </div>
        <div style="padding:1.2rem;">
          ${segments.map(s=>`
            <div style="display:flex;align-items:stretch;margin-bottom:3px;" title="${s.detail}">
              <div style="width:70px;text-align:right;padding-right:.5rem;font-size:.72rem;color:#8b949e;font-family:'JetBrains Mono',monospace;padding-top:6px;">${s.addr}</div>
              <div style="flex:1;background:${s.color}22;border:1px solid ${s.color};border-radius:4px;padding:.4rem .8rem;">
                <span style="font-weight:700;color:${s.color};font-size:.82rem;">${s.name}</span>
                <span style="color:#8b949e;font-size:.75rem;display:block;">${s.detail}</span>
              </div>
            </div>`).join('')}
          <div style="margin-top:.5rem;text-align:center;font-size:.75rem;color:#8b949e;">
            Low addresses (0x0000) → High addresses (0xFFFF…)
          </div>
        </div>
      </div>`;
  }
}
customElements.define('memory-layout', MemoryLayout);

/* =============================================================================
   6. Boot Sequence Visualizer  <boot-sequence>
   Step-by-step Linux boot flow.
   ============================================================================= */
class BootSequence extends HTMLElement {
  connectedCallback() {
    const steps = [
      { icon:'⚡', name:'Power On / POST', desc:'BIOS/UEFI runs Power-On Self-Test, initializes hardware' },
      { icon:'💾', name:'Bootloader (GRUB2)', desc:'Loads kernel image and initial RAM disk (initramfs)' },
      { icon:'🐧', name:'Kernel Init', desc:'Decompresses, initializes memory, mounts root filesystem' },
      { icon:'🌀', name:'initramfs', desc:'Temporary root FS, loads drivers, transitions to real root' },
      { icon:'1️⃣', name:'PID 1 — systemd', desc:'First user-space process, reads unit files, starts services' },
      { icon:'🎯', name:'Target: multi-user', desc:'Network, services, login daemons started' },
      { icon:'🖥️', name:'Login Prompt', desc:'Getty spawns login shell or display manager' },
    ];

    this.innerHTML = `
      <div style="border:1px solid var(--tlb-border,#30363d);border-radius:12px;overflow:hidden;max-width:500px;">
        <div style="background:#0d1117;color:#fff;padding:.75rem 1.2rem;font-weight:700;font-size:.9rem;">
          🚀 Linux Boot Sequence
        </div>
        <div style="padding:1.2rem;">
          ${steps.map((s,i)=>`
            <div style="display:flex;gap:.8rem;margin-bottom:${i<steps.length-1?'0':'0'};">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <div style="width:36px;height:36px;border-radius:50%;background:rgba(0,119,182,.15);border:2px solid #0077b6;
                  display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">${s.icon}</div>
                ${i<steps.length-1?'<div style="width:2px;flex:1;min-height:16px;background:linear-gradient(#0077b6,#00b4d8);margin:2px 0;"></div>':''}
              </div>
              <div style="padding-bottom:${i<steps.length-1?'8':'0'}px;">
                <div style="font-weight:700;color:#00b4d8;font-size:.875rem;">${i+1}. ${s.name}</div>
                <div style="color:#8b949e;font-size:.8rem;line-height:1.5;">${s.desc}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }
}
customElements.define('boot-sequence', BootSequence);

/* =============================================================================
   7. File Tree  <file-tree src="...">
   Renders a nicely formatted expandable file tree from text content.
   Usage: <file-tree>
            /
            ├── etc/
            │   └── hostname
            └── home/
   </file-tree>
   ============================================================================= */
class FileTree extends HTMLElement {
  connectedCallback() {
    const raw = this.textContent.trim();
    const lines = raw.split('\n');
    const rendered = lines.map(line => {
      const isDir = line.trim().endsWith('/');
      const icon = isDir ? '📁' : '📄';
      const color = isDir ? '#00b4d8' : '#8b949e';
      const escapedLine = line.replace(/&/g,'&amp;').replace(/</g,'&lt;');
      return `<div style="color:${color};font-family:'JetBrains Mono',monospace;font-size:.85rem;white-space:pre;">${icon} ${escapedLine}</div>`;
    }).join('');

    this.innerHTML = `
      <div style="border:1px solid var(--tlb-border,#30363d);border-radius:8px;overflow:hidden;">
        <div style="background:#161b22;color:#58a6ff;padding:.5rem 1rem;font-size:.75rem;font-weight:600;letter-spacing:.04em;border-bottom:1px solid #30363d;">
          📂 FILESYSTEM TREE
        </div>
        <div style="background:#0d1117;padding:1rem 1.2rem;overflow-x:auto;">${rendered}</div>
      </div>`;
  }
}
customElements.define('file-tree', FileTree);

console.log('[TheLinuxBook] Interactive components loaded ✓');
