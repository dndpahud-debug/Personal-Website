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

  /* ---------- Tiny DOM helper ---------- */
  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v; // only used for our own static SVG icons
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
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  }
  function fill(id, nodes) {
    var target = document.getElementById(id);
    if (!target) return;
    nodes.forEach(function (n) { target.appendChild(n); });
  }
  function stagger(nodes, step) {
    nodes.forEach(function (n, i) { n.style.setProperty("--d", Math.min(i * (step || 70), 420) + "ms"); });
    return nodes;
  }

  var ICONS = {
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    wave: '<svg viewBox="0 0 24 24"><path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
    layers: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/></svg>',
    ribbon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7"/></svg>',
  };
  var VENTURE_ICONS = ["wave", "layers", "chart", "spark"];

  /* ---------- Simple text bindings ---------- */
  $all("[data-bind]").forEach(function (node) {
    var val = get(node.getAttribute("data-bind"));
    if (typeof val === "string") node.textContent = val;
  });

  // Hero name: highlight the last word with a peach marker stroke
  var nameEl = $(".hero__name");
  if (nameEl && S.name) {
    var parts = S.name.trim().split(/\s+/);
    var last = parts.pop();
    nameEl.textContent = parts.length ? parts.join(" ") + " " : "";
    nameEl.appendChild(h("span", { class: "hl", text: last }));
  }

  var img = $("#headshot");
  if (img) { img.src = S.photo; img.alt = "Portrait of " + S.name; }
  var resume = $("#resume-link");
  if (resume) resume.href = S.resume;
  var emailLink = $("#email-link");
  if (emailLink) emailLink.href = "mailto:" + S.email;
  var li = $("#linkedin-link");
  if (li) li.href = S.linkedin;
  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Highlights ---------- */
  fill("highlights", stagger((S.highlights || []).map(function (s) {
    return h("li", { class: "stat", "data-reveal": true }, [
      h("span", { class: "stat__value", text: s.value }),
      h("span", { class: "stat__label", text: s.label }),
    ]);
  })));

  /* ---------- About ---------- */
  var about = S.about || {};
  fill("about-story", (about.paragraphs || []).map(function (p) { return h("p", { "data-reveal": true, text: p }); }));
  fill("languages", (about.languages || []).map(function (t) { return h("li", { class: "chip", text: t }); }));
  fill("interests", (about.interests || []).map(function (t) { return h("li", { class: "chip", text: t }); }));

  var journey = about.journey || [];
  var detail = $("#journey-detail");
  var stops = journey.map(function (j, i) {
    var btn = h("button", { class: "stop__btn", type: "button", "aria-pressed": "false" }, [
      h("span", { class: "stop__dot", "aria-hidden": "true" }),
      h("span", { class: "stop__place", text: j.place }),
      h("span", { class: "stop__when", text: j.when }),
      h("span", { class: "stop__note", text: j.note }),
    ]);
    var item = h("li", { class: "stop" }, [btn]);
    function activate() { setStop(i); }
    btn.addEventListener("click", activate);
    btn.addEventListener("focus", activate);
    btn.addEventListener("mouseenter", function () { if (finePointer.matches) activate(); });
    return item;
  });
  fill("journey", stops);
  var currentStop = -1;
  function setStop(i) {
    if (i === currentStop || !journey[i]) return;
    currentStop = i;
    stops.forEach(function (s, k) {
      s.classList.toggle("is-active", k === i);
      $(".stop__btn", s).setAttribute("aria-pressed", k === i ? "true" : "false");
    });
    if (detail) {
      var j = journey[i];
      detail.textContent = "";
      detail.appendChild(h("strong", { text: j.place + ", " + j.country }));
      detail.appendChild(document.createTextNode(" · " + j.when + ". " + j.note));
      detail.classList.remove("is-swapping");
      void detail.offsetWidth; // restart animation
      detail.classList.add("is-swapping");
    }
  }
  setStop(0);

  /* ---------- Experience (expandable cards) ---------- */
  fill("experience-list", stagger((S.experience || []).map(function (x, i) {
    var bodyId = "xp-body-" + i;
    var btn = h("button", { class: "xp__head", type: "button", "aria-expanded": "false", "aria-controls": bodyId }, [
      h("span", { class: "xp__titles" }, [
        h("span", { class: "xp__role", text: x.role }),
        h("span", { class: "xp__org", text: x.org }),
      ]),
      h("span", { class: "xp__dates", text: x.dates }),
      h("span", { class: "xp__toggle", "aria-hidden": "true", html: ICONS.plus }),
    ]);
    var bullets = h("ul", { class: "bullets" }, (x.bullets || []).map(function (b, k) {
      return h("li", { text: b, style: "--i:" + k });
    }));
    var card = h("article", { class: "card xp", "data-reveal": true }, [
      h("h3", { class: "xp__heading" }, [btn]),
      x.summary ? h("p", { class: "xp__summary", text: x.summary }) : null,
      h("div", { class: "xp__body", id: bodyId, role: "region", "aria-label": x.role + " details" }, [
        h("div", { class: "xp__inner" }, [bullets]),
      ]),
      h("ul", { class: "tags", "aria-label": "Skills" }, (x.tags || []).map(function (t) { return h("li", { class: "tag", text: t }); })),
    ]);
    // Move tags above the expanding body so the card reads top-to-bottom
    card.insertBefore(card.lastChild, $(".xp__body", card));

    function setOpen(open) {
      card.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    card.addEventListener("click", function (e) {
      if (e.target.closest(".xp__body")) return; // let people select bullet text
      setOpen(!card.classList.contains("is-open"));
    });
    if (i === 0) setOpen(true);
    return card;
  }), 90));

  /* ---------- Leadership ---------- */
  fill("leadership-list", stagger((S.leadership || []).map(function (l) {
    return h("article", { class: "card lead", "data-reveal": true, "data-tilt": true }, [
      h("div", { class: "lead__top" }, [
        h("h3", { class: "card__title", text: l.role }),
        h("span", { class: "card__meta", text: l.dates }),
      ]),
      h("p", { class: "card__org", text: l.org }),
      h("p", { class: "card__text", text: l.text }),
    ]);
  })));

  fill("education-list", stagger((S.education || []).map(function (e) {
    return h("article", { class: "card edu", "data-reveal": true, "data-tilt": true }, [
      h("span", { class: "card__meta", text: e.meta }),
      h("h3", { class: "card__title", text: e.school, style: "margin-top:6px" }),
      h("p", { class: "card__org", text: e.detail }),
      e.coursework && e.coursework.length
        ? h("ul", { class: "tags", "aria-label": "Relevant coursework" }, e.coursework.map(function (c) { return h("li", { class: "tag", text: c }); }))
        : null,
    ]);
  })));
  $all(".edu .tags").forEach(function (t) { t.style.marginTop = "16px"; });

  /* ---------- Ventures ---------- */
  fill("ventures-list", stagger((S.ventures || []).map(function (v, i) {
    return h("article", { class: "card venture", "data-reveal": true, "data-tilt": true }, [
      h("span", { class: "venture__icon", "aria-hidden": "true", html: ICONS[VENTURE_ICONS[i % VENTURE_ICONS.length]] }),
      h("h3", { class: "card__title", text: v.name }),
      h("p", { class: "card__text", text: v.what }),
      h("span", { class: "card__meta", text: v.status }),
      h("span", { class: "outcome" }, [h("span", { "aria-hidden": "true", html: ICONS.check }), v.outcome]),
    ]);
  })));
  $all(".outcome > span[aria-hidden]").forEach(function (s) { s.style.display = "contents"; });

  fill("awards-list", (S.awards || []).map(function (a, i) {
    return h("li", { class: "award" }, [
      h("span", { class: "award__icon", "aria-hidden": "true", html: i === 0 ? ICONS.trophy : ICONS.ribbon }),
      h("span", null, [
        h("span", { class: "award__name", text: a.name }),
        h("span", { class: "award__issuer", text: a.issuer }),
      ]),
      h("span", { class: "award__date", text: a.date }),
    ]);
  }));

  fill("skills-list", (S.skills || []).map(function (g) {
    return h("div", { class: "skill-group" }, [
      h("h4", { text: g.group }),
      h("ul", { class: "chips" }, g.items.map(function (t) { return h("li", { class: "chip", text: t }); })),
    ]);
  }));

  /* ---------- Theme toggle ---------- */
  var themeBtn = $(".theme-toggle");
  var metaThemes = $all('meta[name="theme-color"]');
  function applyThemeLabel() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (themeBtn) themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    metaThemes.forEach(function (m) { m.setAttribute("content", dark ? "#0A1F22" : "#F7F9F8"); });
  }
  applyThemeLabel();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: fine */ }
      applyThemeLabel();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $(".menu-toggle");
  var navLinks = $("#nav-links");
  function setMenu(open) {
    if (!menuBtn || !navLinks) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navLinks.classList.toggle("is-open", open);
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    $all("a", navLinks).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".nav")) setMenu(false); });
  }

  /* ---------- Nav border on scroll ---------- */
  var nav = $(".nav");
  function onScroll() { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal + scrollspy ---------- */
  var revealEls = $all("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    var links = $all(".nav__links a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $all("main section[id]").forEach(function (s) { spy.observe(s); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Button ripple (hover on desktop, press everywhere) ---------- */
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

  /* ---------- Gentle card tilt (mouse only) ---------- */
  $all("[data-tilt]").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      if (!finePointer.matches || reduceMotion.matches) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", (px * 4).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-py * 4).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", function () {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
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
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(S.email).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = h("textarea", { style: "position:fixed;opacity:0" });
        ta.value = S.email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        ta.remove();
      }
    });
  }
})();
