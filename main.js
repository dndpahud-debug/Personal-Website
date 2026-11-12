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

  // Hero name with a peach marker under the last word
  var nameEl = $(".hero__name");
  if (nameEl && S.name) {
    var parts = S.name.trim().split(/\s+/);
    var last = parts.pop();
    nameEl.textContent = parts.length ? parts.join(" ") + " " : "";
    nameEl.appendChild(h("span", { class: "hl", text: last }));
  }
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

  /* ---------- Hero arcs: dashes slide on hover / tap ---------- */
  var art = $(".hero__art");
  if (art) {
    art.addEventListener("pointerenter", function () { if (finePointer.matches) art.classList.add("is-playing"); });
    art.addEventListener("pointerleave", function () { if (finePointer.matches) art.classList.remove("is-playing"); });
    art.addEventListener("click", function () { if (!finePointer.matches) art.classList.toggle("is-playing"); });
  }

  /* ---------- Theme toggle ---------- */
  var themeBtn = $(".theme-toggle");
  var metaTheme = $('meta[name="theme-color"]');
  function syncTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (themeBtn) themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    if (metaTheme) metaTheme.setAttribute("content", dark ? "#12333A" : "#DDE9E6");
  }
  syncTheme();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: fine */ }
      syncTheme();
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
