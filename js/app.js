"use strict";

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

// Header: hide on scroll down, show on scroll up, add "scrolled" state
function initHeader() {
  const header = $(".site-header");
  if (!header) return;

  let lastY = window.scrollY || 0;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY || 0;
    const dy = y - lastY;

    header.classList.toggle("is-scrolled", y > 10);

    if (y > 140 && dy > 10) header.classList.add("is-hidden");
    if (dy < -8) header.classList.remove("is-hidden");

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    },
    { passive: true }
  );
}

// Back-to-top visibility
function initBackToTop() {
  const back = $(".ar-bx");
  if (!back) return;

  const update = () => {
    const y = window.scrollY || 0;
    back.classList.toggle("is-visible", y > 600);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Close mobile menu when clicking a nav link
function initMobileMenuClose() {
  const check = $("#check");
  if (!check) return;

  $$("header nav a").forEach((a) => {
    a.addEventListener("click", () => {
      check.checked = false;
    });
  });
}

// Active nav link on scroll (simple scroll-spy)
function initScrollSpy() {
  const links = $$("header nav a[href^='#']");
  if (!links.length) return;

  const sections = links
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY || 0;
    const offset = 96; // header + a bit

    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop - offset;
      if (y >= top) idx = i;
    }

    links.forEach((a) => a.classList.remove("is-active"));
    links[idx]?.classList.add("is-active");
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

// Primary CTA in hero
function initLearnMore() {
  const btn = $("#learn-more");
  const target = $("#about");
  if (!btn || !target) return;

  btn.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Reveal on scroll using IntersectionObserver
function initReveal() {
  const els = $$(".js-reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));
}

// Contact form: demo submit + inline status
function initContactForm() {
  const form = $("#contact-form");
  const status = $("#form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#contact-name")?.value?.trim() ?? "";
    const email = $("#contact-email")?.value?.trim() ?? "";
    const msg = $("#contact-message")?.value?.trim() ?? "";

    if (!name || !email || !msg) {
      status.textContent = "Merci de remplir tous les champs.";
      return;
    }

    status.textContent = "Message prêt à être envoyé (démo). Merci !";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initBackToTop();
  initMobileMenuClose();
  initScrollSpy();
  initLearnMore();
  initReveal();
  initContactForm();
});


