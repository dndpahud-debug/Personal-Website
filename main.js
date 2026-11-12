/* =====================================================================
   David Pahud: site behaviour
   Content lives in content.js. You shouldn't need to edit this file.
   ===================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ---------- Tiny DOM helpers ---------- */
  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v; // only for our own static SVG icons
        else if (k === "style") node.style.cssText = v;
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, S); }
  function fill(id, nodes) {
    var target = document.getElementById(id);
    if (target) nodes.forEach(function (n) { if (n) target.appendChild(n); });
  }
  function icon(name, cls) { return h("span", { class: cls || "icon", "aria-hidden": "true", html: ICONS[name] }); }

  var ICONS = {
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  };

  /* ---------- Simple bindings ---------- */
  $all("[data-bind]").forEach(function (node) {
    var val = get(node.getAttribute("data-bind"));
    if (typeof val === "string") node.textContent = val;
  });

  var LINKS = { email: "mailto:" + S.email, linkedin: S.linkedin, resume: S.resume };
  $all("[data-href]").forEach(function (a) {
    var url = LINKS[a.getAttribute("data-href")];
    if (url) a.setAttribute("href", url);
  });

  /* ---------- Giant name: one span per letter so each can bounce ---------- */
  var nameH1 = $(".name");
  var nameRow = $(".name__row");
  if (nameRow && S.name) {
    var words = S.name.trim().split(/\s+/);
    var lastWord = words.pop();
    var addLetters = function (target, text) {
      text.split("").forEach(function (ch) {
        target.appendChild(ch === " " ? document.createTextNode(" ") : h("span", { class: "char", text: ch }));
      });
    };
    addLetters($(".name__word--first", nameRow), words.join(" "));
    addLetters($(".name__word--last", nameRow), lastWord);
    if (nameH1) nameH1.setAttribute("aria-label", S.name);
  }

  /* ---------- Hero bento tiles ---------- */
  var HB = S.hero || {};
  (function () {
    var t = $("#tile-highlight"), x = HB.highlight;
    if (t && x) {
      [h("p", { class: "tile__label", text: x.label || "Highlight" }),
       h("p", { class: "tile__big", text: x.title }),
       x.sub ? h("p", { class: "tile__sub", text: x.sub }) : null,
       x.text ? h("p", { class: "tile__text", text: x.text }) : null].forEach(function (n) { if (n) t.appendChild(n); });
    } else if (t) t.remove();

    var b = $("#tile-bases"), hb = HB.homeBases;
    if (b && hb && hb.places && hb.places.length) {
      var p = hb.places;
      b.appendChild(h("p", { class: "tile__label", text: hb.label || "Home bases" }));
      // Pacific view: the Philippines on the left, California on the right
      b.appendChild(h("div", { "aria-hidden": "true", html:
        '<svg class="route" viewBox="0 0 300 86">' +
        '<path class="route__line" d="M26 58Q150 -8 274 58"/>' +
        '<circle class="route__dot route__dot--home" cx="26" cy="58" r="7"/>' +
        '<circle class="route__ring" cx="274" cy="58" r="11"/>' +
        '<circle class="route__dot" cx="274" cy="58" r="7"/>' +
        '<text class="route__label" x="26" y="84" text-anchor="middle">' + (p[1] ? "PH" : "") + '</text>' +
        '<text class="route__label" x="274" y="84" text-anchor="middle">CA</text></svg>' }));
      b.appendChild(h("ul", { class: "bases" }, p.map(function (pl) {
        return h("li", null, [
          h("span", { class: "bases__mark", "aria-hidden": "true" }),
          h("span", null, [h("span", { class: "bases__name", text: pl.name }), h("span", { class: "bases__detail", text: pl.detail })]),
        ]);
      })));
    } else if (b) b.remove();

    var e = $("#tile-extra"), ex = HB.extraTile;
    if (e && ex) {
      e.appendChild(h("p", { class: "tile__label", text: ex.label }));
      e.appendChild(h("p", { class: "tile__title", text: ex.title }));
      if (ex.text) e.appendChild(h("p", { class: "tile__text", text: ex.text }));
      if (ex.link) e.appendChild(h("a", { class: "tile__link", href: ex.link }, [
        h("span", { text: ex.linkText || "Read more" }),
        h("span", { "aria-hidden": "true", style: "display:contents", html: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' }),
      ]));
    } else if (e) e.remove();
  })();
  var img = $("#headshot");
  if (img) { img.src = S.photo; img.alt = "Portrait of " + S.name; }
  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Expandable entries ("Read more") ---------- */
  var entryCount = 0;
  function expandable(entry, moreContent, startOpen) {
    var id = "more-" + entryCount++;
    var btn = h("button", { class: "read-more", type: "button", "aria-expanded": "false", "aria-controls": id }, [
      h("span", { class: "read-more__label", text: "Read more" }),
      icon("chevron"),
    ]);
    var more = h("div", { class: "entry__more", id: id }, [h("div", { class: "entry__more-inner" }, moreContent)]);
    entry.classList.add("entry--toggle");
    entry.appendChild(more);
    entry.appendChild(btn);
    function set(open) {
      entry.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      $(".read-more__label", btn).textContent = open ? "Show less" : "Read more";
    }
    entry.addEventListener("click", function (e) {
      if (e.target.closest(".entry__more") || e.target.closest("a")) return; // allow selecting / clicking inside
      if (window.getSelection && String(window.getSelection()).length > 0 && !e.target.closest(".read-more")) return;
      set(!entry.classList.contains("is-open"));
    });
    set(!!startOpen);
  }

  function bulletList(items) {
    return h("ul", { class: "bullets" }, (items || []).map(function (b, k) { return h("li", { text: b, style: "--i:" + k }); }));
  }
  function tagList(items, extraClass) {
    if (!items || !items.length) return null;
    return h("ul", { class: "tags " + (extraClass || "") }, items.map(function (t) { return h("li", { class: "tag", text: t }); }));
  }

  /* ---------- About ---------- */
  var about = S.about || {};
  (function () {
    var entry = h("article", { class: "entry", "data-reveal": true }, [
      h("h3", { class: "entry__title", text: about.title }),
      about.subtitle ? h("p", { class: "entry__sub", text: about.subtitle }) : null,
      h("p", { class: "entry__text", text: about.summary }),
    ]);
    var journey = h("ol", { class: "journey", "aria-label": "Where I've lived" }, (about.journey || []).map(function (j) {
      return h("li", null, [
        h("span", { class: "journey__dot", "aria-hidden": "true" }),
        h("div", null, [
          h("span", { class: "journey__place", text: j.place }),
          h("span", { class: "journey__when", text: j.when }),
        ]),
        h("p", { class: "journey__note", text: j.note }),
      ]);
    }));
    var extra = h("div", { class: "about-extra" }, [
      about.languages ? h("div", null, [h("h4", { text: "Languages" }), tagList(about.languages)]) : null,
      about.interests ? h("div", null, [h("h4", { text: "Outside work" }), tagList(about.interests)]) : null,
    ]);
    expandable(entry, [journey, extra], false);
    fill("about-entry", [entry]);
  })();

  /* ---------- Experience ---------- */
  fill("experience-list", (S.experience || []).map(function (x, i) {
    var entry = h("article", { class: "entry", "data-reveal": true }, [
      h("h3", { class: "entry__title", text: x.role }),
      h("p", { class: "entry__sub", text: x.org + " · " + x.dates }),
      h("p", { class: "entry__text", text: x.summary }),
    ]);
    expandable(entry, [bulletList(x.bullets), tagList(x.tags, "tags--spaced")], i === 0);
    return entry;
  }));

  /* ---------- Leadership ---------- */
  fill("leadership-list", (S.leadership || []).map(function (l) {
    return h("article", { class: "entry", "data-reveal": true }, [
      h("h3", { class: "entry__title", text: l.role }),
      h("p", { class: "entry__sub", text: l.org + " · " + l.dates }),
      h("p", { class: "entry__text", text: l.text }),
    ]);
  }));

  /* ---------- Education ---------- */
  fill("education-list", (S.education || []).map(function (e) {
    return h("article", { class: "entry", "data-reveal": true }, [
      h("h3", { class: "entry__title", text: e.school }),
      h("p", { class: "entry__sub", text: e.detail }),
      h("p", { class: "entry__meta", text: e.meta }),
      e.text ? h("p", { class: "entry__text", text: e.text }) : null,
      tagList(e.coursework, "tags--spaced"),
    ]);
  }));

  /* ---------- Ventures & awards ---------- */
  fill("ventures-list", (S.ventures || []).map(function (v) {
    return h("article", { class: "entry", "data-reveal": true }, [
      h("h3", { class: "entry__title", text: v.name }),
      h("p", { class: "entry__sub", text: v.status }),
      h("p", { class: "entry__text", text: v.what }),
      v.outcome ? h("p", { class: "outcome" }, [icon("check"), v.outcome]) : null,
    ]);
  }));
  $all(".outcome > .icon").forEach(function (s) { s.style.display = "contents"; });

  fill("awards-list", (S.awards || []).map(function (a) {
    return h("li", { "data-reveal": true }, [
      h("div", { class: "arrow-item" }, [
        icon("arrow"),
        h("span", null, [
          h("span", { class: "arrow-list__title", text: a.name }),
          h("span", { class: "arrow-list__sub", text: a.issuer + " · " + a.date }),
        ]),
      ]),
    ]);
  }));
  $all(".arrow-list .icon").forEach(function (s) { s.style.display = "contents"; });

  /* ---------- Sidebar ---------- */
  fill("skills-list", (S.skills || []).map(function (t) { return h("li", { class: "pill", text: t }); }));
  fill("highlights", (S.highlights || []).map(function (x) {
    var a = h("a", { href: x.link || "#about" }, [
      icon("arrow"),
      h("span", { class: "arrow-list__title" }, [
        h("strong", { text: x.value }),
        h("span", { class: "sweep", text: x.label }),
      ]),
    ]);
    return h("li", null, [a]);
  }));
  $all("#highlights .icon").forEach(function (s) { s.style.display = "contents"; });

  /* ---------- Soccer ball in the footer ---------- */
  (function () {
    var ball = $("#ball");
    if (!ball) return;
    function pt(cx, cy, r, deg) { var a = (deg * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    function pent(cx, cy, r, rot) {
      var p = [];
      for (var k = 0; k < 5; k++) p.push(pt(cx, cy, r, rot + k * 72).map(function (n) { return n.toFixed(2); }).join(","));
      return p.join(" ");
    }
    var c = 32, svg = '<svg viewBox="0 0 64 64"><defs><clipPath id="ballclip"><circle cx="32" cy="32" r="28"/></clipPath></defs>';
    svg += '<circle cx="32" cy="32" r="30" fill="#F7F9F8" stroke="none"/>';
    svg += '<g clip-path="url(#ballclip)" fill="#0E2A2E" stroke="#0E2A2E" stroke-width="1.4">';
    svg += '<polygon points="' + pent(c, c, 8, -90) + '"/>';
    for (var k = 0; k < 5; k++) {
      var ang = -90 + k * 72;
      var inner = pt(c, c, 8, ang), outer = pt(c, c, 17, ang);
      svg += '<line x1="' + inner[0].toFixed(2) + '" y1="' + inner[1].toFixed(2) + '" x2="' + outer[0].toFixed(2) + '" y2="' + outer[1].toFixed(2) + '"/>';
      var pc = pt(c, c, 27, ang + 36);
      svg += '<polygon points="' + pent(pc[0], pc[1], 6.5, ang + 36 + 180) + '"/>';
    }
    svg += '</g><circle cx="32" cy="32" r="29" fill="none" stroke="rgba(14,42,46,.35)" stroke-width="1.5"/></svg>';
    ball.innerHTML = svg;
    ball.addEventListener("click", function () {
      if (reduceMotion.matches) return;
      ball.classList.remove("is-kicked");
      void ball.offsetWidth;
      ball.classList.add("is-kicked");
    });
    ball.addEventListener("animationend", function () { ball.classList.remove("is-kicked"); });
  })();

  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  var desktopFx = function () { return finePointer.matches && !reduceMotion.matches && window.innerWidth > 820; };

  /* ---------- Fit the giant name to the content width ---------- */
  var mqStacked = window.matchMedia("(max-width: 640px)");
  function fitName() {
    if (!nameH1 || !nameRow) return;
    nameH1.style.fontSize = "100px";
    var stacked = mqStacked.matches;
    var gap = parseFloat(getComputedStyle(nameRow).columnGap) || 0;
    var total = 0;
    $all(".name__word", nameRow).forEach(function (w) { total += w.getBoundingClientRect().width; });
    var pill = $(".name__pill", nameRow);
    total += stacked || !pill ? gap : pill.getBoundingClientRect().width + 2 * gap;
    var avail = nameH1.clientWidth;
    if (!total || !avail) return;
    nameH1.style.fontSize = clamp((100 * avail * (stacked ? 0.98 : 0.965)) / total, 36, 210) + "px";
  }
  fitName();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
  var fitTimer;
  window.addEventListener("resize", function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitName, 120); });

  /* ---------- Springy letters ---------- */
  $all(".char").forEach(function (c) {
    c.addEventListener("pointerenter", function () {
      if (reduceMotion.matches || c.classList.contains("is-boing")) return;
      c.classList.add("is-boing");
    });
    c.addEventListener("animationend", function () { c.classList.remove("is-boing"); });
  });

  /* ---------- Magnetic buttons ---------- */
  var magnets = $all(".magnetic").map(function (el) { return { el: el, x: 0, y: 0 }; });
  if (magnets.length) {
    var magPending = false, magEvt = null;
    document.addEventListener("pointermove", function (e) {
      if (!desktopFx()) return;
      magEvt = e;
      if (magPending) return;
      magPending = true;
      requestAnimationFrame(function () {
        magPending = false;
        magnets.forEach(function (m) {
          var r = m.el.getBoundingClientRect();
          var cx = r.left + r.width / 2 - m.x, cy = r.top + r.height / 2 - m.y; // center without the current pull
          var dx = magEvt.clientX - cx, dy = magEvt.clientY - cy, reach = 64;
          var near = Math.abs(dx) < r.width / 2 + reach && Math.abs(dy) < r.height / 2 + reach;
          var nx = near ? clamp(dx * 0.2, -10, 10) : 0, ny = near ? clamp(dy * 0.3, -7, 7) : 0;
          if (nx !== m.x || ny !== m.y) {
            m.x = nx; m.y = ny;
            m.el.style.setProperty("--mx", nx.toFixed(1) + "px");
            m.el.style.setProperty("--my", ny.toFixed(1) + "px");
          }
        });
      });
    }, { passive: true });
  }

  /* ---------- Bento tiles lift and tilt toward the cursor ---------- */
  $all("[data-tilt]").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      if (!desktopFx()) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", (px * 5).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-py * 5).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", function () {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  });

  /* ---------- Reactive dot grid in the hero ---------- */
  (function () {
    var canvas = $(".dot-grid"), hero = $(".hero");
    if (!canvas || !hero || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var dots = [], w = 0, hgt = 0, color = "", raf = 0;
    var mouse = { x: -9999, y: -9999, on: false };
    var GAP = 26, R = 120, PUSH = 14;
    function enabled() { return finePointer.matches && window.innerWidth > 820; }
    function readColor() { color = getComputedStyle(root).getPropertyValue("--dot").trim() || "rgba(247,249,248,0.14)"; }
    function draw() {
      ctx.clearRect(0, 0, w, hgt);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i], x = d.x + d.ox, y = d.y + d.oy;
        ctx.moveTo(x + 1.3, y);
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
      }
      ctx.fill();
    }
    function build() {
      if (!enabled()) { dots = []; return; }
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; hgt = hero.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(hgt * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (var y = GAP / 2; y < hgt; y += GAP) {
        for (var x = (w % GAP) / 2; x < w; x += GAP) dots.push({ x: x, y: y, ox: 0, oy: 0, vx: 0, vy: 0 });
      }
      readColor();
      draw();
    }
    function step() {
      var moving = false;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i], tx = 0, ty = 0;
        if (mouse.on) {
          var dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.01) { var f = 1 - dist / R; f *= f; tx = (dx / dist) * PUSH * f; ty = (dy / dist) * PUSH * f; }
        }
        // a small spring toward the target offset
        d.vx = (d.vx + (tx - d.ox) * 0.12) * 0.74;
        d.vy = (d.vy + (ty - d.oy) * 0.12) * 0.74;
        d.ox += d.vx; d.oy += d.vy;
        if (Math.abs(d.vx) > 0.01 || Math.abs(d.vy) > 0.01 || Math.abs(tx - d.ox) > 0.05 || Math.abs(ty - d.oy) > 0.05) moving = true;
      }
      draw();
      raf = moving || mouse.on ? requestAnimationFrame(step) : 0;
    }
    function kick() { if (!raf && dots.length) raf = requestAnimationFrame(step); }
    hero.addEventListener("pointermove", function (e) {
      if (!dots.length || reduceMotion.matches) return;
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
      kick();
    });
    hero.addEventListener("pointerleave", function () { mouse.on = false; kick(); });
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(build, 150); });
    window.addEventListener("themechange", function () { if (dots.length) { readColor(); draw(); } });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    build();
  })();

  /* ---------- Theme toggle ---------- */
  var themeBtn = $(".theme-toggle");
  var metaTheme = $('meta[name="theme-color"]');
  function syncTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (themeBtn) themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    if (metaTheme) metaTheme.setAttribute("content", dark ? "#0A1F22" : "#F7F9F8");
  }
  syncTheme();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: fine */ }
      syncTheme();
      window.dispatchEvent(new Event("themechange"));
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $(".menu-toggle");
  var nav = $("#nav-links");
  function setMenu(open) {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".site-header")) setMenu(false); });
  }

  /* ---------- Header background once you scroll ---------- */
  var header = $(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 12); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal + active nav link ---------- */
  var revealEls = $all("[data-reveal]");
  // Gentle stagger for items that sit next to each other
  revealEls.forEach(function (el) {
    var sibs = el.parentElement ? $all(":scope > [data-reveal]", el.parentElement) : [];
    var idx = sibs.indexOf(el);
    if (idx > 0) el.style.setProperty("--d", Math.min(idx * 60, 300) + "ms");
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    var links = $all(".nav a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.getAttribute("data-spy-for") || en.target.id;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $all("[data-spy]").forEach(function (s) { spy.observe(s); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
  // Belt and braces: reveal anything already on screen, even if the observer is slow to fire
  function revealInView() {
    var limit = window.innerHeight * 0.95;
    revealEls.forEach(function (el) {
      if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < limit) el.classList.add("is-visible");
    });
  }
  setTimeout(revealInView, 60);
  var revealTick = false;
  window.addEventListener("scroll", function () {
    if (revealTick) return;
    revealTick = true;
    setTimeout(function () { revealTick = false; revealInView(); }, 120);
  }, { passive: true });

  /* ---------- Button ripple ---------- */
  function ripple(btn, e) {
    if (reduceMotion.matches) return;
    var r = btn.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 2.4;
    var x = (e.clientX || r.left + r.width / 2) - r.left;
    var y = (e.clientY || r.top + r.height / 2) - r.top;
    var dot = h("span", { class: "ripple", style: "--size:" + size + "px;--x:" + x + "px;--y:" + y + "px" });
    btn.appendChild(dot);
    dot.addEventListener("animationend", function () { dot.remove(); });
  }
  $all(".btn").forEach(function (btn) {
    btn.addEventListener("pointerenter", function (e) { if (finePointer.matches) ripple(btn, e); });
    btn.addEventListener("pointerdown", function (e) { if (!finePointer.matches) ripple(btn, e); });
  });

  /* ---------- Copy email ---------- */
  var copyBtn = $("#copy-email");
  if (copyBtn) {
    var tip = $(".copy-tip", copyBtn);
    var timer;
    copyBtn.addEventListener("click", function () {
      function done() {
        tip.textContent = "Copied!";
        copyBtn.classList.add("is-copied");
        clearTimeout(timer);
        timer = setTimeout(function () { copyBtn.classList.remove("is-copied"); tip.textContent = ""; }, 1800);
      }
      function fallback() {
        var ta = h("textarea", { style: "position:fixed;opacity:0" });
        ta.value = S.email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        ta.remove();
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(S.email).then(done, fallback);
      else fallback();
    });
  }
})();
