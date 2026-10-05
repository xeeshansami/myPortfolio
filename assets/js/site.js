/* ============================================================
   Portfolio site logic — renders PROJECTS (projects.js), skills,
   the project modal and the in-browser portfolio assistant.
============================================================ */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const enc = u => encodeURI(u);
  const STATUS = { live: 'Live', soon: 'Launching soon', dev: 'Under development', internal: 'Enterprise', delivered: 'Delivered', private: 'Private repo' };
  // Filter keys may list several categories (space-separated) — a project matches if it has any of them.
  const CATS = [['*', 'All'], ['sbp', 'SBP Apps'], ['hbl', 'HBL Apps'], ['jsbank', 'JS Bank Apps'], ['dusky', 'Dusky Solutions'], ['freelance', 'Freelance Clients']];
  const TYPES = [['business', 'Business & ERP'], ['commerce', 'E-Commerce & Retail'], ['education healthcare', 'Education & Healthcare'], ['web', 'Websites & Web Portals'], ['media', 'Media & Utility Apps'], ['tools', 'Developer Tools']];
  const FEATURED = ['sbp-uma', 'sunwai', 'jsbvs', 'jsbl-aof', 'therapyhome', 'sareena', 'smelevate', 'pytools'];
  const inCat = (cats, f) => f === '*' || f.split(' ').some(k => cats.includes(k));
  const ICON = {
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1zm11.6 11.6 2.6 2.6-11.5 6.6 8.9-9.2zm0-2.8L6.3 1.4 17.8 8l-2.6 2.6zm3.9-1.8 2.7 1.6c.8.5.8 1.7 0 2.2l-2.7 1.6-2.9-2.9 2.9-2.5z"/></svg>',
    ios: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9s-2-.9-3.4-.9c-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1.1-2.8-4.1zM13.9 4.9c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };
  const byId = id => PROJECTS.findIndex(p => p.id === id);

  /* ---------------- Theme ---------------- */
  $('#themeBtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------------- Nav ---------------- */
  const nav = $('#nav'), links = $('#links'), menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $$('a', links).forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));
  const navSecs = $$('a', links).map(a => $(a.getAttribute('href'))).filter(Boolean);
  function onScroll() {
    nav.classList.toggle('scrolled', scrollY > 20);
    let cur = '';
    navSecs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = '#' + s.id; });
    $$('a', links).forEach(a => a.classList.toggle('active', a.getAttribute('href') === cur));
  }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('load', onScroll); onScroll();

  /* ---------------- Link buttons ---------------- */
  function linkBtn(kind, url, label, small) {
    const names = { web: 'Visit website', play: 'Google Play', ios: 'App Store' };
    if (url === undefined || url === null) return '';
    const cls = small ? 'btn btn-ghost' : (kind === 'web' ? 'btn btn-primary' : 'btn btn-ghost');
    if (!url) return `<span class="${cls} disabled" title="Coming soon">${ICON[kind]}${names[kind]} · soon</span>`;
    return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${ICON[kind]}${esc(label || names[kind])}</a>`;
  }
  const linksHtml = (p, small) => { const l = p.links || {}; return linkBtn('web', l.web, small ? 'Live site' : l.webLabel, small) + linkBtn('play', l.play, null, small) + linkBtn('ios', l.ios, null, small); };

  /* ---------------- Featured ---------------- */
  $('#featGrid').innerHTML = FEATURED.map(id => {
    const i = byId(id), p = PROJECTS[i]; if (!p) return '';
    const short = p.desc.split('. ').slice(0, 2).join('. ').replace(/\.?$/, '.');
    return `<article class="feat rv">
      <div class="media" data-i="${i}" role="button" tabindex="0" aria-label="Open ${esc(p.title)}">
        <div class="badges"><span class="tag">${esc(p.tag)}</span><span class="status ${p.status}">${STATUS[p.status]}</span></div>
        <img src="${enc(p.cover)}" alt="${esc(p.title)} screenshots" loading="lazy">
      </div>
      <div class="body">
        <span class="org">${esc(p.org)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(short)}</p>
        <div class="chips">${(p.tech || []).slice(0, 6).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <div class="actions"><button class="btn btn-primary" data-i="${i}">${ICON.info}Case study</button>${linksHtml(p, true)}</div>
      </div>
    </article>`;
  }).join('');

  /* ---------------- All projects ---------------- */
  const pgrid = $('#pgrid');
  pgrid.innerHTML = PROJECTS.map((p, i) => `
    <button class="pcard" data-i="${i}" data-cats="${p.cats.join(' ')}" data-text="${esc((p.title + ' ' + p.sub + ' ' + p.org + ' ' + p.tag + ' ' + (p.tech || []).join(' ') + ' ' + p.desc).toLowerCase())}">
      <span class="pimg"><span class="badges"><span class="tag">${esc(p.tag)}</span><span class="status ${p.status}">${STATUS[p.status]}</span></span>
        <img src="${enc(p.cover)}" alt="" loading="lazy"></span>
      <span class="pinfo"><span class="porg">${esc(p.org)}</span><span class="pt">${esc(p.title)}</span><span class="ps">${esc(p.sub)}</span></span>
    </button>`).join('') + '<p class="empty" id="pEmpty" hidden>No projects match — try another word or filter.</p>';
  const count = c => PROJECTS.filter(p => inCat(p.cats, c)).length;
  const fbtn = ([k, v]) => `<button data-f="${k}" aria-pressed="${k === '*'}">${esc(v)}<span class="n">${count(k)}</span></button>`;
  $('#filters').innerHTML = `<div class="frow"><span class="flabel">By company</span>${CATS.map(fbtn).join('')}</div><div class="frow"><span class="flabel">By product</span>${TYPES.map(fbtn).join('')}</div>`;
  let fCat = '*', fText = '';
  function applyFilter() {
    let shown = 0;
    $$('.pcard', pgrid).forEach(c => {
      const ok = inCat(c.dataset.cats.split(' '), fCat) && (!fText || fText.split(/\s+/).every(w => c.dataset.text.includes(w)));
      c.hidden = !ok; if (ok) shown++;
    });
    $('#pEmpty').hidden = shown > 0;
  }
  $$('#filters button').forEach(b => b.addEventListener('click', () => {
    $$('#filters button').forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true'); fCat = b.dataset.f; applyFilter();
  }));
  $('#psearch').addEventListener('input', e => { fText = e.target.value.trim().toLowerCase(); applyFilter(); });

  /* ---------------- Modal ---------------- */
  const pm = $('#pmodal'), pmImg = $('#pmImg'), pmThumbs = $('#pmThumbs');
  let cur = null, curImg = 0, lastFocus = null;
  function showImg(j) {
    const g = cur.gallery; curImg = (j + g.length) % g.length;
    pmImg.src = enc(g[curImg]); pmImg.alt = `${cur.title} — screenshot ${curImg + 1} of ${g.length}`;
    $$('button', pmThumbs).forEach((b, k) => b.classList.toggle('active', k === curImg));
  }
  function openProject(i) {
    const p = PROJECTS[i]; if (!p) return; cur = p;
    $('#pmOrg').textContent = p.org;
    const st = $('#pmStatus'); st.className = 'status ' + p.status; st.textContent = STATUS[p.status];
    $('#pmTitle').textContent = p.title; $('#pmSub').textContent = p.sub; $('#pmDesc').textContent = p.desc;
    $('#pmFeats').innerHTML = (p.features || []).map(f => `<li>${esc(f)}</li>`).join('');
    $('#pmTech').innerHTML = (p.tech || []).map(t => `<span class="chip">${esc(t)}</span>`).join('');
    $('#pmLinks').innerHTML = linksHtml(p, false);
    $('#pmNote').textContent = p.note || '';
    const multi = p.gallery.length > 1;
    pmThumbs.innerHTML = multi ? p.gallery.map((g, j) => `<button aria-label="Screenshot ${j + 1}"><img src="${enc(g)}" alt="" loading="lazy"></button>`).join('') : '';
    $$('button', pmThumbs).forEach((b, j) => b.addEventListener('click', () => showImg(j)));
    $('#pmPrev').hidden = $('#pmNext').hidden = !multi;
    showImg(0);
    if (!pm.classList.contains('open')) lastFocus = document.activeElement;
    pm.classList.add('open'); document.body.classList.add('lock'); pm.scrollTop = 0;
    $('#pmClose').focus({ preventScroll: true });
    if (location.hash !== '#project-' + p.id) history.replaceState(null, '', '#project-' + p.id);
  }
  function closeProject() {
    if (!pm.classList.contains('open')) return;
    pm.classList.remove('open'); document.body.classList.remove('lock'); pmImg.src = ''; cur = null;
    history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-i]');
    if (t && !e.target.closest('a')) openProject(+t.dataset.i);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.matches('.media[data-i]')) openProject(+e.target.dataset.i);
    if (!cur) return;
    if (e.key === 'Escape') closeProject();
    if (e.key === 'ArrowRight') showImg(curImg + 1);
    if (e.key === 'ArrowLeft') showImg(curImg - 1);
  });
  $('#pmClose').addEventListener('click', closeProject);
  $('#pmPrev').addEventListener('click', () => showImg(curImg - 1));
  $('#pmNext').addEventListener('click', () => showImg(curImg + 1));
  pm.addEventListener('click', e => { if (e.target === pm) closeProject(); });
  function fromHash() { const m = location.hash.match(/^#project-(.+)$/); if (m && byId(m[1]) >= 0) openProject(byId(m[1])); }
  addEventListener('hashchange', fromHash); fromHash();

  /* ---------------- Paxees section ---------------- */
  $$('.pax-links').forEach(box => {
    const keys = box.dataset.cat.split(' ');
    box.innerHTML = PROJECTS.filter(p => p.cats.includes('freelance') && keys.some(k => p.cats.includes(k)) && !['therapyhome', 'sareena'].includes(p.id))
      .map(p => `<button class="${p.status === 'live' ? 'live' : ''}" data-i="${byId(p.id)}">${esc(p.title)}</button>`).join('');
  });
  $$('[data-i-id]').forEach(b => b.dataset.i = byId(b.dataset.iId));
  $$('[data-filter-jump]').forEach(b => b.addEventListener('click', () => {
    const f = $(`#filters button[data-f="${b.dataset.filterJump}"]`); if (f) f.click();
    $('#projects').scrollIntoView({ behavior: 'smooth' });
  }));
  $$('a[data-topic]').forEach(a => a.addEventListener('click', () => { const sel = $('#contactForm select[name=topic]'); if (sel) sel.value = a.dataset.topic; }));

  /* ---------------- Skills ---------------- */
  const SK = [
    { t: 'Mobile engineering', s: 'Flutter · native Android & iOS', ic: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
      core: ['Flutter / Dart', 'Android (Kotlin, Java)', 'GetX · Riverpod · Provider', 'Firebase (FCM, Crashlytics, RTDB)'],
      more: ['iOS (Swift)', 'Platform channels', 'Maps & location', 'Offline-first / SQLite', 'Lottie animations', 'Play & App Store release'] },
    { t: 'Applied AI & ML', s: 'AI features inside real products', ic: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
      core: ['LLM chatbot integration', 'Speech-to-text / TTS', 'On-device OCR (ML Kit)', 'AI coding agents (Claude Code, Copilot)'],
      more: ['Prompt engineering', 'FastAPI model serving (CUDA)', 'Wav2Lip · RVC + VITS', 'PyTorch · TensorFlow', 'OpenCV', 'Document / PDF AI'] },
    { t: 'Backend & web', s: 'APIs, portals and dashboards', ic: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
      core: ['Node.js / Express', 'ASP.NET Core 8 MVC (C#)', 'React · Vite · MUI', 'REST & SOAP APIs'],
      more: ['Swagger / OpenAPI', 'JWT / OAuth', 'Redux Toolkit', 'Recharts', 'HTML / CSS / JS', 'Java enterprise'] },
    { t: 'Mobile & app security', s: 'Banking-grade, VAPT-proven', ic: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      core: ['VAPT remediation', 'TLS / certificate pinning', 'AES-256-GCM · Keystore / Keychain', 'Root / jailbreak / Frida detection'],
      more: ['Firebase App Check · Play Integrity', 'R8 / ProGuard obfuscation', 'Anti-repackaging', 'Secure config & secrets', 'Security headers / HSTS'] },
    { t: 'Data & cloud', s: 'Storage, hosting, delivery', ic: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
      core: ['MongoDB Atlas', 'Firebase', 'Oracle / MySQL', 'Power BI Report Server'],
      more: ['SQLite', 'Vercel', 'GitHub Pages', 'IIS', 'Cloudflare / WAF design'] },
    { t: 'Practices & tools', s: 'How I ship', ic: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      core: ['Clean Architecture / MVVM', 'Git & GitHub', 'Agile / Jira'],
      more: ['CI/CD', 'Python tooling (Tkinter, PyMuPDF)', 'Solution architecture', 'Code review', 'Localisation & RTL', 'Accessibility (WCAG)'] }
  ];
  $('#skillGrid').innerHTML = SK.map(g => `<div class="sk rv">
      <div class="sk-h"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g.ic}</svg></span><div><h3>${esc(g.t)}</h3><small>${esc(g.s)}</small></div></div>
      <div class="chips">${g.core.map(c => `<span class="chip core">${esc(c)}</span>`).join('')}${g.more.map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div>
    </div>`).join('');

  /* ---------------- Portfolio assistant (local, rule + search based) ---------------- */
  const log = $('#chatLog'), form = $('#chatForm'), input = $('#chatIn');
  const pLink = id => { const i = byId(id); return i < 0 ? '' : `<a href="#project-${id}">${esc(PROJECTS[i].title)}</a>`; };
  const SUGGEST = ['Which apps are live?', 'Banking experience?', 'What AI work have you done?', 'Tech stack?', 'Security expertise?', 'How can I hire you?', 'Download CV'];
  const INTENTS = [
    { k: ['hire', 'contact', 'email', 'reach', 'available', 'availability', 'freelance', 'whatsapp', 'phone', 'call', 'rate', 'cost', 'price'],
      a: () => `You can reach Zeeshan at <a href="mailto:info.xeeshan@gmail.com">info.xeeshan@gmail.com</a>, on <a href="https://www.linkedin.com/in/xeeshansami/" target="_blank" rel="noopener">LinkedIn</a>, or through the <a href="#contact">contact form</a>. He's open to new roles and collaborations. Client projects are handled separately through his own studio, <a href="#paxees">Paxees</a>. He works comfortably under NDA and usually replies within a day.` },
    { k: ['cv', 'resume', 'pdf', 'download'],
      a: () => `Here's the full CV and portfolio as a PDF: <a href="assets/docs/Mohammad-Zeeshan-Portfolio.pdf" target="_blank" rel="noopener">Mohammad-Zeeshan-Portfolio.pdf</a>.` },
    { k: ['live', 'store', 'play', 'download app', 'published', 'production', 'link', 'links', 'url'],
      a: () => { const live = PROJECTS.filter(p => p.status === 'live'); return `These are live right now:<ul>${live.map(p => `<li>${pLink(p.id)}: ${esc(p.sub)}</li>`).join('')}</ul>Launching soon: ${pLink('sbp-uma')}. In development: ${pLink('smelevate')}.`; } },
    { k: ['sbp', 'state bank', 'central bank', 'current', 'now', 'present'],
      a: () => `Zeeshan has been a <b>Senior Application Engineer (Mobile)</b> at the State Bank of Pakistan since March 2026. His work there:<ul><li>${pLink('sbp-uma')}: lead developer; Flutter, AskSBP AI chatbot, VAPT-hardened</li><li>${pLink('sunwai')}: complaint app (live), plus an ASP.NET Core web portal</li><li>${pLink('smelevate')}: solution and security architecture</li><li>${pLink('pytools')}: internal developer tooling</li></ul>` },
    { k: ['bank', 'banking', 'fintech', 'finance', 'hbl', 'habib', 'js bank', 'jsbl', 'biometric', 'biometrics', 'nadra', 'fingerprint', 'bvs'],
      a: () => `He has 5+ years in banking technology across <b>three banks</b>:<ul><li><b>State Bank of Pakistan</b> (2026–now): the central-bank app, Sunwai and SMElevate</li><li><b>JS Bank</b> (2023–2026): ${pLink('jsbvs')} (camera-based NADRA biometrics, 100K+ downloads), ${pLink('jsbl-aof')}, and AI lip-sync / speech features</li><li><b>HBL</b> (2021–2023): ${pLink('hbl-hr')}, ${pLink('hbl-rda')}, branch and asset survey apps</li></ul>` },
    { k: ['ai', 'ml', 'llm', 'chatbot', 'gpt', 'claude', 'machine learning', 'artificial', 'ocr', 'speech', 'voice', 'nlp', 'model'],
      a: () => `AI work that shipped in real products:<ul><li><b>AskSBP chatbot</b> in ${pLink('sbp-uma')}: voice input, text-to-speech, reasoning disclosure</li><li><b>Invoice OCR / PDF parsing</b> in ${pLink('sareena')}: Google ML Kit, preview time cut from ~10s to ~0.5s</li><li><b>Lip-sync and voice AI</b> at JS Bank: Wav2Lip and RVC + VITS served with FastAPI on CUDA</li><li>Daily use of AI coding agents (Claude Code, Copilot)</li></ul>` },
    { k: ['security', 'secure', 'vapt', 'pinning', 'encryption', 'root', 'jailbreak', 'owasp', 'pentest'],
      a: () => `Security is a specialty. In the SBP app he led VAPT remediation:<ul><li>AES-256-GCM encrypted remote config, with keys in Keystore/Keychain</li><li>Root, jailbreak, emulator and Frida/Xposed hook detection</li><li>TLS pinning and cleartext disabled</li><li>Firebase App Check (Play Integrity / App Attest) and anti-repackaging</li><li>R8, obfuscation and a hard-fail release-signing setup</li></ul>` },
    { k: ['skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'language', 'languages', 'framework'],
      a: () => `Core stack:<ul><li><b>Mobile:</b> Flutter/Dart, Android (Kotlin/Java), iOS (Swift)</li><li><b>Web and backend:</b> Node.js/Express, ASP.NET Core 8, React/Vite</li><li><b>AI:</b> LLM chatbots, STT/TTS, ML Kit OCR, FastAPI model serving</li><li><b>Data:</b> MongoDB, Firebase, Oracle/MySQL</li><li><b>Security:</b> VAPT, pinning, AES-GCM</li></ul>See <a href="#skills">Skills</a> for the full list.` },
    { k: ['flutter', 'dart'],
      a: () => `Flutter is Zeeshan's main framework. Projects: ${['sbp-uma', 'sunwai', 'smelevate', 'sareena', 'realtorscrm'].map(pLink).join(', ')}.` },
    { k: ['web', 'portal', 'react', 'asp', '.net', 'dotnet', 'node', 'website', 'dashboard'],
      a: () => `Web portals: ${pLink('sunwai')} (ASP.NET Core 8 MVC), ${pLink('therapyhome')} (React + Node + MongoDB), and ${pLink('sareena')} (React + Vite + Node, with a public marketplace).` },
    { k: ['python', 'tool', 'tools', 'script', 'scripts', 'desktop'],
      a: () => `${pLink('pytools')} is a Python desktop suite with 12 tools behind one launcher: an API client, JSON diff/inspect/format, a PDF editor and converters, image background removal, and an APK/AAB signing checker.` },
    { k: ['client', 'clients', 'freelance', 'freelancing', 'paxees', 'studio', 'agency', 'business', 'company', 'team', 'therapy', 'school', 'special', 'sareena', 'erp', 'websites'],
      a: () => `Client work runs through <a href="#paxees">Paxees</a>, Zeeshan's own software studio (a side business alongside his full-time role). 20 apps &amp; websites so far:<ul><li>${pLink('therapyhome')}: school-management platform for a special-education school at Nagan Chowrangi, Karachi (live)</li><li>${pLink('sareena')}: multi-shop mobile-parts ERP and marketplace (live)</li><li>${pLink('realtorscrm')}, ${pLink('bidfeed')} and ${pLink('ags')} (live on Google Play)</li></ul>Use the <b>Freelance Clients</b> filter to see them all.` },
    { k: ['dusky', 'arabic', 'saudi', 'rtl', 'youniform', 'gatak', 'khuta'],
      a: () => `At <b>Dusky Solutions</b> (Nov 2018 – Mar 2020) Zeeshan built Android apps including ${pLink('khutalkhair')}, ${pLink('gatak')} (both Arabic / RTL e-commerce and services apps) and ${pLink('youniform')} (school-uniform e-commerce).` },
    { k: ['experience', 'years', 'career', 'history', 'background', 'about', 'who'],
      a: () => `Mohammad Zeeshan is a <b>Senior Mobile &amp; AI Engineer</b> in Karachi with 9+ years of experience (since 2016). He is currently at the State Bank of Pakistan, after JS Bank, HBL and Dusky Solutions, and has shipped 33+ apps and portals across his roles and his studio Paxees. He holds a BS in Computer Science from Federal Urdu University.` },
    { k: ['education', 'degree', 'university', 'study', 'certification', 'certifications', 'certificate', 'training', 'nibaf', 'power bi', 'powerbi'],
      a: () => `He holds a <b>BSc in Computer Science</b> from Federal Urdu University, Karachi (2014–2018), and a diploma in Civil Architecture (AutoCAD 2D/3D). Most recently he completed <b>Power BI Report Server Training at NIBAF Pakistan</b> (May 2026). He also holds Microsoft Office Specialist (Excel) and Java (SoloLearn) certifications.` },
    { k: ['where', 'location', 'based', 'city', 'remote', 'relocate', 'country'],
      a: () => `He's based in <b>Karachi, Pakistan</b> and works comfortably with remote teams.` },
    { k: ['hi', 'hello', 'hey', 'salam', 'assalam'],
      a: () => `Hi! 👋 Ask me about Zeeshan's projects, banking or AI experience, tech stack, or how to get in touch.` }
  ];
  const words = s => s.toLowerCase().replace(/[^a-z0-9.+# ]/g, ' ').split(/\s+/).filter(Boolean);
  function answer(q) {
    const ql = ' ' + q.toLowerCase() + ' ', w = words(q);
    let best = null, bestScore = 0;
    for (const it of INTENTS) {
      let s = 0;
      for (const k of it.k) if (k.includes(' ') ? ql.includes(k) : w.includes(k)) s += k.length > 3 ? 2 : 1;
      if (s > bestScore) { bestScore = s; best = it; }
    }
    // project search
    const scored = PROJECTS.map(p => {
      const hay = (p.title + ' ' + p.sub + ' ' + p.tag + ' ' + (p.tech || []).join(' ') + ' ' + p.desc).toLowerCase();
      return { p, s: w.filter(x => x.length > 2 && hay.includes(x)).length + (w.some(x => p.title.toLowerCase().includes(x) && x.length > 3) ? 2 : 0) };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
    if (best && bestScore >= 2) return best.a();
    if (scored.length && scored[0].s >= 2) return `These projects look relevant:<ul>${scored.map(x => `<li>${pLink(x.p.id)}: ${esc(x.p.sub)}</li>`).join('')}</ul>Tap one to open the case study.`;
    if (best) return best.a();
    return `I couldn't find that in the portfolio. Try asking about live apps, banking or AI experience, the tech stack, or how to hire Zeeshan. For anything else, <a href="#contact">send him a message</a>.`;
  }
  function add(html, who) {
    const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  function ask(q) {
    q = q.trim(); if (!q) return;
    add(esc(q), 'me'); input.value = '';
    const t = add('<span class="typing"><span></span><span></span><span></span></span>', 'bot');
    setTimeout(() => { t.innerHTML = answer(q); log.scrollTop = log.scrollHeight; }, 420 + Math.random() * 300);
  }
  add(`Hi! I'm Zeeshan's portfolio assistant. Ask me about his projects, banking and AI experience, skills, or how to hire him.`, 'bot');
  $('#suggest').innerHTML = SUGGEST.map(s => `<button type="button">${esc(s)}</button>`).join('');
  $$('#suggest button').forEach(b => b.addEventListener('click', () => ask(b.textContent)));
  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
  log.addEventListener('click', e => { const a = e.target.closest('a[href^="#project-"]'); if (a) { e.preventDefault(); openProject(byId(a.getAttribute('href').slice(9))); } });
  $$('[data-open-ai]').forEach(b => b.addEventListener('click', () => { $('#assistant').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => input.focus({ preventScroll: true }), 500); }));
  const fab = $('#aiFab');
  new IntersectionObserver(en => fab.classList.toggle('hide', en[0].isIntersecting), { threshold: .2 }).observe($('#assistant'));

  /* ---------------- Reveal ---------------- */
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  // ?static (screenshots, print, crawlers) shows everything without the reveal animation
  if (/[?&]static/.test(location.search) || !('IntersectionObserver' in window)) $$('.rv').forEach(el => el.classList.add('in'));
  else $$('.rv').forEach(el => io.observe(el));

  /* ---------------- Contact form (Web3Forms) ---------------- */
  const cForm = $('#contactForm'), cStatus = $('#cStatus'), cSubmit = $('#cSubmit');
  const showStatus = (m, c) => { cStatus.textContent = m; cStatus.style.color = c; cStatus.style.display = 'block'; };
  cForm.addEventListener('submit', async e => {
    e.preventDefault();
    cSubmit.disabled = true; cSubmit.style.opacity = .6; showStatus('Sending…', 'var(--dim)');
    try {
      const data = new FormData(cForm);
      const us = data.get('user_subject'); if (us) data.set('subject', `[${data.get('topic')}] ${us}`);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) { showStatus('✓ Message sent. Thank you, I\'ll get back to you soon.', '#22c55e'); cForm.reset(); }
      else showStatus('✗ ' + (json.message || 'Something went wrong. Please try again.'), '#ef4444');
    } catch (err) { showStatus('✗ Network error. Please email info.xeeshan@gmail.com directly.', '#ef4444'); }
    finally { cSubmit.disabled = false; cSubmit.style.opacity = 1; }
  });

  $('#yr').textContent = new Date().getFullYear();
})();
