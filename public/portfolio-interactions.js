(function () {
  'use strict';

  function safeGet(k, fb) {
    try {
      const v = window.localStorage.getItem(k);
      return v !== null ? JSON.parse(v) : fb;
    } catch (e) { return fb; }
  }
  function safeSet(k, v) {
    try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { }
  }

  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function toast(msg) {
    const stack = document.getElementById('toastStack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'pointer-events-auto px-4 py-3 rounded-2xl bg-ink text-paper border border-volt/40 font-mono text-xs shadow-2xl transition-all duration-300';
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(function () {
      el.style.opacity = '0';
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }, 3000);
  }

  function copyValue(val, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).then(function () {
        toast('✓ Copied ' + label);
      }).catch(function () { fallbackCopy(val, label); });
    } else {
      fallbackCopy(val, label);
    }
  }
  function fallbackCopy(val, label) {
    const ta = document.createElement('textarea');
    ta.value = val;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('✓ Copied ' + label); } catch (e) { }
    document.body.removeChild(ta);
  }

  // 1. Preloader Curtain
  const curtain = document.getElementById('curtainLoader');
  const skipBtn = document.getElementById('skipLoaderBtn');
  function liftCurtain() {
    if (!curtain) return;
    curtain.style.transform = 'translateY(-100%)';
    setTimeout(function () { curtain.style.display = 'none'; }, 450);
  }
  if (skipBtn) skipBtn.addEventListener('click', liftCurtain);
  setTimeout(liftCurtain, 180);

  // 2. Live IST Clock
  const clockEl = document.getElementById('liveClock');
  function updateClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const str = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
      clockEl.textContent = 'IST ' + str;
    } catch (e) {
      clockEl.textContent = 'KATNI, IN';
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  // 3. Theme Toggle
  const htmlEl = document.documentElement;
  const savedTheme = safeGet('rv_rebuilt_theme', 'dark');
  if (savedTheme === 'light') htmlEl.classList.remove('dark');
  else htmlEl.classList.add('dark');

  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const isDark = htmlEl.classList.toggle('dark');
      safeSet('rv_rebuilt_theme', isDark ? 'dark' : 'light');
      updateThreeColors(isDark);
      toast(isDark ? 'Obsidian Dark Mode active' : 'Editorial Light Mode active');
    });
  }

  // 5. Custom Cursor & Magnetic Buttons
  // 6. Three.js Interactive 3D WebGL Sculpture
  const threeContainer = document.getElementById('threeContainer');
  const webglCoords = document.getElementById('webglCoords');
  let wireframeMesh, facetedMesh, particleCloud, outerRing, scene, camera, renderer;
  let targetRotX = 0.25;
  let targetRotY = 0.4;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  function updateThreeColors(isDark) {
    if (!wireframeMesh || !facetedMesh || !particleCloud || !outerRing) return;
    const accentHex = isDark ? 0xE2FF32 : 0xD94E1F;
    wireframeMesh.material.color.setHex(accentHex);
    particleCloud.material.color.setHex(accentHex);
    outerRing.material.color.setHex(isDark ? 0x52525B : 0x71717A);
    facetedMesh.material.color.setHex(isDark ? 0x18181B : 0xE4E4E7);
  }

  function initThreeJS() {
    if (!threeContainer || typeof window.THREE === 'undefined') return;
    const w = threeContainer.clientWidth || 400;
    const h = threeContainer.clientHeight || 340;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 5.2;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    threeContainer.appendChild(renderer.domElement);

    const isDark = htmlEl.classList.contains('dark');
    const accentHex = isDark ? 0xE2FF32 : 0xD94E1F;

    const geo = new THREE.IcosahedronGeometry(1.55, 1);

    // Mode 1: Wireframe Matrix
    const wireMat = new THREE.MeshBasicMaterial({ color: accentHex, wireframe: true, transparent: true, opacity: 0.85 });
    wireframeMesh = new THREE.Mesh(geo, wireMat);
    scene.add(wireframeMesh);

    // Mode 2: Faceted Kinetic Solid
    const solidMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x18181B : 0xE4E4E7,
      roughness: 0.3,
      metalness: 0.7,
      flatShading: true
    });
    facetedMesh = new THREE.Mesh(geo, solidMat);
    facetedMesh.visible = false;
    scene.add(facetedMesh);

    // Mode 3: Particle Cloud
    const pGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const pMat = new THREE.PointsMaterial({ color: accentHex, size: 0.055 });
    particleCloud = new THREE.Points(pGeo, pMat);
    particleCloud.visible = false;
    scene.add(particleCloud);

    // Orbital Ring
    const ringGeo = new THREE.TorusGeometry(2.15, 0.015, 12, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: isDark ? 0x52525B : 0x71717A, transparent: true, opacity: 0.65 });
    outerRing = new THREE.Mesh(ringGeo, ringMat);
    outerRing.rotation.x = Math.PI / 3;
    scene.add(outerRing);

    // Lights
    const pLight1 = new THREE.PointLight(0xffffff, 1.4);
    pLight1.position.set(5, 5, 5);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(accentHex, 1.2);
    pLight2.position.set(-5, -3, 3);
    scene.add(pLight2);

    threeContainer.addEventListener('mousedown', function (e) {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });
    window.addEventListener('mouseup', function () { isDragging = false; });
    window.addEventListener('mousemove', function (e) {
      const rect = threeContainer.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (webglCoords) {
        webglCoords.textContent = 'X:' + nx.toFixed(2) + ' Y:' + ny.toFixed(2);
      }
      if (isDragging) {
        targetRotY += (e.clientX - prevMouseX) * 0.01;
        targetRotX += (e.clientY - prevMouseY) * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        targetRotY = nx * 0.65;
        targetRotX = ny * 0.45;
      }
    });

    window.addEventListener('resize', function () {
      if (!threeContainer || !renderer || !camera) return;
      const nw = threeContainer.clientWidth;
      const nh = threeContainer.clientHeight;
      if (nw > 0 && nh > 0) {
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }
    });

    function animate() {
      window.requestAnimationFrame(animate);
      const time = Date.now() * 0.0006;
      [wireframeMesh, facetedMesh, particleCloud].forEach(function (m) {
        if (!m) return;
        m.rotation.y += (targetRotY + time - m.rotation.y) * 0.06;
        m.rotation.x += (targetRotX - m.rotation.x) * 0.06;
      });
      if (outerRing) {
        outerRing.rotation.z += 0.004;
      }
      renderer.render(scene, camera);
    }
    animate();
  }
  initThreeJS();

  document.querySelectorAll('.mesh-mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const mode = btn.getAttribute('data-mesh-mode');
      document.querySelectorAll('.mesh-mode-btn').forEach(function (b) {
        b.className = 'mesh-mode-btn px-2.5 py-1 rounded-full border hairline hover:border-[var(--accent)]';
      });
      btn.className = 'mesh-mode-btn px-2.5 py-1 rounded-full accent-bg font-semibold';
      if (wireframeMesh && facetedMesh && particleCloud) {
        wireframeMesh.visible = mode === 'wireframe';
        facetedMesh.visible = mode === 'faceted';
        particleCloud.visible = mode === 'particles';
      }
    });
  });

  // 7. Featured Case Studies Interactive Stage
  const caseStudies = {
    todo: {
      tag: 'CASE STUDY 01 // CLIENT-SIDE STATE & PERSISTENCE',
      title: 'Todo Application',
      liveUrl: 'https://todoo21.ccbp.tech/',
      repoUrl: 'https://github.com/rahul07632',
      problem: 'Everyday task lists often lose state on browser reload without a backend database. The goal was to engineer a fast, zero-latency task manager with persistent browser storage.',
      architecture: 'Built with modular JavaScript DOM manipulation, Bootstrap responsive styling, and JSON serialization synced to browser localStorage on every create, toggle, and delete action.',
      stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap', 'LocalStorage API']
    },
    wiki: {
      tag: 'CASE STUDY 02 // ASYNCHRONOUS REST API',
      title: 'Wikipedia Search Application',
      liveUrl: 'https://wikipedia987.ccbp.tech/',
      repoUrl: 'https://github.com/rahul07632',
      problem: 'Users searching encyclopedia topics need instant feedback without full page reloads, with clear loading indicators while waiting on network requests.',
      architecture: 'Implemented asynchronous Fetch API requests triggered on keyboard submission, parsing JSON payloads into dynamic article cards with clickable source URLs and summaries.',
      stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Fetch API / REST', 'Bootstrap']
    },
    countries: {
      tag: 'CASE STUDY 03 // REAL-TIME SEARCH & DIRECTORY',
      title: 'Countries Search Application',
      liveUrl: 'https://population212.ccbp.tech/',
      repoUrl: 'https://github.com/rahul07632',
      problem: 'Browsing global country population records requires instant filtering across large datasets without lag on desktop or mobile viewports.',
      architecture: 'Fetches country flag and population datasets via REST API and filters results on every keystroke using case-insensitive array filtering and responsive grid cards.',
      stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'REST API', 'Bootstrap Grid']
    }
  };

  const caseNarrativeCol = document.getElementById('caseNarrativeCol');
  const stageBrowserUrl = document.getElementById('stageBrowserUrl');
  const caseSandboxBody = document.getElementById('caseSandboxBody');

  // Todo Sandbox State
  let todoItems = safeGet('rv_rebuilt_todos', [
    { id: 1, text: 'Test persistent localStorage sync', done: true },
    { id: 2, text: 'Explore Rahul\'s live CCBP deployments', done: false }
  ]);

  function renderTodoSandbox() {
    if (!caseSandboxBody) return;
    caseSandboxBody.innerHTML =
      '<div class="space-y-4">' +
      '<div class="flex items-center justify-between">' +
      '<span class="font-display font-bold text-sm">Interactive Todo Sandbox</span>' +
      '<span class="font-mono text-[11px] text-volt">' + todoItems.filter(function (i) { return !i.done; }).length + ' active</span>' +
      '</div>' +
      '<form id="sbTodoForm" class="flex gap-2">' +
      '<input id="sbTodoInput" type="text" placeholder="Add a new task..." class="case-sandbox-input flex-1 px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[var(--accent)]" />' +
      '<button type="submit" class="px-4 py-2 rounded-xl bg-volt text-ink font-mono text-xs font-bold">+ Add</button>' +
      '</form>' +
      '<ul class="space-y-2 max-h-48 overflow-y-auto">' +
      todoItems.map(function (t) {
        return '<li class="case-sandbox-list-item flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-xs">' +
          '<label class="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">' +
          '<input type="checkbox" data-id="' + t.id + '" ' + (t.done ? 'checked' : '') + ' class="sb-chk" />' +
          '<span class="truncate ' + (t.done ? 'line-through case-sandbox-muted' : '') + '">' + t.text.replace(/[<>&]/g, '') + '</span>' +
          '</label>' +
          '<button type="button" data-del="' + t.id + '" class="sb-del case-sandbox-muted hover:text-rose-400">✕</button>' +
          '</li>';
      }).join('') +
      '</ul>' +
      '</div>';

    const f = document.getElementById('sbTodoForm');
    if (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        const inp = document.getElementById('sbTodoInput');
        if (!inp || !inp.value.trim()) return;
        todoItems.unshift({ id: Date.now(), text: inp.value.trim(), done: false });
        safeSet('rv_rebuilt_todos', todoItems);
        renderTodoSandbox();
      });
    }
    caseSandboxBody.querySelectorAll('.sb-chk').forEach(function (c) {
      c.addEventListener('change', function () {
        const id = Number(c.getAttribute('data-id'));
        todoItems = todoItems.map(function (t) { return t.id === id ? { id: t.id, text: t.text, done: !t.done } : t; });
        safeSet('rv_rebuilt_todos', todoItems);
        renderTodoSandbox();
      });
    });
    caseSandboxBody.querySelectorAll('.sb-del').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = Number(b.getAttribute('data-del'));
        todoItems = todoItems.filter(function (t) { return t.id !== id; });
        safeSet('rv_rebuilt_todos', todoItems);
        renderTodoSandbox();
      });
    });
  }

  function renderWikiSandbox() {
    if (!caseSandboxBody) return;
    caseSandboxBody.innerHTML =
      '<div class="space-y-4">' +
      '<form id="sbWikiForm" class="flex gap-2">' +
      '<input id="sbWikiInput" type="text" value="React (software)" placeholder="Search Wikipedia API..." class="case-sandbox-input flex-1 px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[var(--accent)]" />' +
      '<button type="submit" class="px-4 py-2 rounded-xl bg-volt text-ink font-mono text-xs font-bold">Search</button>' +
      '</form>' +
      '<div id="sbWikiOut" class="space-y-2 max-h-52 overflow-y-auto text-xs">Loading live Wikipedia results...</div>' +
      '</div>';

    async function runWiki(q) {
      const out = document.getElementById('sbWikiOut');
      if (!out) return;
      out.innerHTML = '<div class="font-mono case-sandbox-muted">Querying Wikipedia REST API...</div>';
      try {
        const r = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(q) + '&utf8=&format=json&origin=*&srlimit=3');
        const d = await r.json();
        const list = (d && d.query && d.query.search) || [];
        out.innerHTML = list.map(function (item) {
          return '<div class="case-sandbox-card p-3 rounded-xl border">' +
            '<a href="https://en.wikipedia.org/?curid=' + item.pageid + '" target="_blank" rel="noopener noreferrer" class="font-semibold text-volt hover:underline">' + item.title + ' ↗</a>' +
            '<p class="text-[11px] case-sandbox-muted mt-1">' + item.snippet.replace(/<\/?[^>]+(>|$)/g, '') + '...</p>' +
            '</div>';
        }).join('') || '<div class="case-sandbox-muted">No results found.</div>';
      } catch (e) {
        out.innerHTML = '<div class="case-sandbox-card p-3 rounded-xl border"><strong class="text-volt">React (software)</strong><p class="text-[11px] case-sandbox-muted mt-1">Open-source front-end JavaScript library for building user interfaces.</p></div>';
      }
    }
    runWiki('React (software)');
    const wf = document.getElementById('sbWikiForm');
    if (wf) {
      wf.addEventListener('submit', function (e) {
        e.preventDefault();
        const inp = document.getElementById('sbWikiInput');
        if (inp && inp.value.trim()) runWiki(inp.value.trim());
      });
    }
  }

  function renderCountriesSandbox() {
    if (!caseSandboxBody) return;
    const data = [
      { name: 'India', flag: '🇮🇳', pop: '1,428,627,663' },
      { name: 'United States', flag: '🇺🇸', pop: '339,996,563' },
      { name: 'Japan', flag: '🇯🇵', pop: '123,294,513' },
      { name: 'Germany', flag: '🇩🇪', pop: '83,294,633' },
      { name: 'United Kingdom', flag: '🇬🇧', pop: '67,736,802' },
      { name: 'Canada', flag: '🇨🇦', pop: '38,781,291' }
    ];
    caseSandboxBody.innerHTML =
      '<div class="space-y-4">' +
      '<input id="sbCountryInput" type="text" placeholder="Filter countries (e.g., India, Japan)..." class="case-sandbox-input w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[var(--accent)]" />' +
      '<div id="sbCountryOut" class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto"></div>' +
      '</div>';
    function draw(q) {
      const out = document.getElementById('sbCountryOut');
      if (!out) return;
      const matches = data.filter(function (c) { return c.name.toLowerCase().includes(q.toLowerCase()); });
      out.innerHTML = matches.map(function (c) {
        return '<div class="case-sandbox-card p-3 rounded-xl border flex items-center gap-3">' +
          '<span class="text-2xl">' + c.flag + '</span>' +
          '<div><div class="font-semibold text-xs">' + c.name + '</div><div class="font-mono text-[10px] text-volt">Pop: ' + c.pop + '</div></div>' +
          '</div>';
      }).join('') || '<div class="col-span-2 text-xs case-sandbox-muted">No matching country.</div>';
    }
    draw('');
    const ci = document.getElementById('sbCountryInput');
    if (ci) ci.addEventListener('input', function () { draw(ci.value); });
  }

  function selectCaseStudy(id) {
    const cs = caseStudies[id];
    if (!cs || !caseNarrativeCol) return;
    if (stageBrowserUrl) stageBrowserUrl.textContent = cs.liveUrl;

    caseNarrativeCol.innerHTML =
      '<div class="font-mono text-xs uppercase tracking-wider accent-text">' + cs.tag + '</div>' +
      '<h3 class="font-display font-extrabold text-2xl sm:text-4xl">' + cs.title + '</h3>' +
      '<div class="space-y-4 text-sm leading-relaxed">' +
      '<div><strong class="font-mono text-xs uppercase opacity-60 block mb-1">The Challenge</strong><p class="opacity-85">' + cs.problem + '</p></div>' +
      '<div><strong class="font-mono text-xs uppercase opacity-60 block mb-1">Engineering Solution</strong><p class="opacity-85">' + cs.architecture + '</p></div>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2">' +
      cs.stack.map(function (s) {
        return '<span class="px-3 py-1 rounded-full border hairline font-mono text-[11px]">' + s + '</span>';
      }).join('') +
      '</div>' +
      '<div class="flex flex-wrap gap-3 pt-2">' +
      '<a href="' + cs.liveUrl + '" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full accent-bg font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:opacity-90">Open Live Deployment ↗</a>' +
      '<a href="' + cs.repoUrl + '" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full border hairline font-mono text-xs uppercase tracking-wider hover:border-[var(--accent)] inline-flex items-center gap-2">GitHub ↗</a>' +
      '</div>';

    if (id === 'todo') renderTodoSandbox();
    else if (id === 'wiki') renderWikiSandbox();
    else renderCountriesSandbox();
  }

  selectCaseStudy('todo');
  document.querySelectorAll('.case-tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-case-id');
      document.querySelectorAll('.case-tab-btn').forEach(function (b) {
        b.className = 'case-tab-btn text-left p-5 rounded-2xl surface-box hover:border-[var(--accent)] transition-all';
      });
      btn.className = 'case-tab-btn text-left p-5 rounded-2xl accent-bg transition-all';
      selectCaseStudy(id);
    });
  });

  // 8. Stack Ledger Inspector
  const stackLayers = {
    frontend: {
      title: 'Frontend Architecture',
      summary: 'Crafting accessible, responsive user interfaces with modern JavaScript, component state, and clean CSS design systems.',
      items: [
        { name: 'React.js', role: 'Component architecture, Hooks, SPA state flows' },
        { name: 'JavaScript (ES6+)', role: 'Async/await, Fetch API, DOM events, ES modules' },
        { name: 'HTML5 & CSS3', role: 'Semantic markup, CSS Grid, Flexbox, responsive media queries' },
        { name: 'Tailwind CSS & Bootstrap', role: 'Rapid utility styling, dark/light themes, responsive grids' }
      ]
    },
    backend: {
      title: 'Backend & APIs',
      summary: 'Designing RESTful endpoints, server-side routing, and Python problem-solving workflows.',
      items: [
        { name: 'Node.js', role: 'Server-side JavaScript runtime & NPM ecosystem' },
        { name: 'Express.js', role: 'REST API routing, middleware & JSON responses' },
        { name: 'Python', role: 'Object-oriented programming, DSA & backend scripting' },
        { name: 'REST APIs', role: 'HTTP methods, status handling & third-party endpoint integration' }
      ]
    },
    database: {
      title: 'Databases & Storage',
      summary: 'Modeling relational tables, querying structured datasets, and persisting client-side state.',
      items: [
        { name: 'SQL / SQLite', role: 'Relational schemas, JOIN queries, aggregations & CRUD' },
        { name: 'MongoDB', role: 'Document-based NoSQL collections for MERN applications' },
        { name: 'LocalStorage API', role: 'Client-side JSON serialization & session persistence' }
      ]
    },
    tooling: {
      title: 'Workflow & Deployment',
      summary: 'Modern version control, bundling, environment configuration, and cloud hosting pipelines.',
      items: [
        { name: 'Git & GitHub', role: 'Branching, commit hygiene & repository hosting (rahul07632)' },
        { name: 'Vite', role: 'Fast ES-module bundling and local development server' },
        { name: 'Netlify & Vercel', role: 'Continuous Git deployment & .env secret management' },
        { name: 'EmailJS', role: 'Serverless contact form integration & mail routing' }
      ]
    }
  };

  const stackInspector = document.getElementById('stackInspector');
  function renderStackLayer(key) {
    const layer = stackLayers[key];
    if (!layer || !stackInspector) return;
    stackInspector.innerHTML =
      '<div>' +
      '<span class="font-mono text-xs uppercase accent-text">SELECTED LAYER</span>' +
      '<h3 class="font-display font-extrabold text-2xl sm:text-3xl mt-1">' + layer.title + '</h3>' +
      '<p class="text-sm opacity-80 mt-2">' + layer.summary + '</p>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
      layer.items.map(function (it) {
        return '<div class="p-4 rounded-2xl border hairline bg-[var(--bg)]">' +
          '<div class="font-display font-bold text-base">' + it.name + '</div>' +
          '<div class="text-xs opacity-75 mt-1">' + it.role + '</div>' +
          '</div>';
      }).join('') +
      '</div>';
  }
  renderStackLayer('frontend');
  document.querySelectorAll('.stack-row-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const layer = btn.getAttribute('data-layer');
      document.querySelectorAll('.stack-row-btn').forEach(function (b) {
        b.className = 'stack-row-btn w-full text-left py-5 px-4 flex items-center justify-between hover:bg-[var(--surface)] transition-all';
      });
      btn.className = 'stack-row-btn w-full text-left py-5 px-4 flex items-center justify-between accent-bg transition-all';
      renderStackLayer(layer);
    });
  });

  // 9. Contact actions removed to avoid mail client / direct-send options.

  // 10. Resume Modal
  const resumeModal = document.getElementById('resumeModal');
  function showResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('hidden');
    resumeModal.classList.add('flex');
  }
  ['openResumeBtn', 'heroResumeBtn', 'overlayResumeBtn'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', function () {
      if (menuOverlay) { menuOverlay.classList.add('hidden'); menuOverlay.classList.remove('flex'); }
      showResume();
    });
  });

  // 11. Scroll Reveal Observer
  const reveals = document.querySelectorAll('.editorial-reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('is-in');
      });
    }, { threshold: 0.04, rootMargin: '0px 0px 40px 0px' });
    reveals.forEach(function (r) { obs.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-in'); });
  }

  initIcons();
})();
