/* ═══════════════════════════════════════════════════════
   KIOSK — interactions
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setYear();
    initStickyHeader();
    initSmoothScroll();
    initAccordion();
    initHamburger();
    initScrollReveal();
    initContactForm();
  }

  /* ── Year ── */
  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Sticky header shadow ── */
  function initStickyHeader() {
    var h = document.getElementById('header');
    if (!h) return;
    var check = function () {
      h.classList.toggle('scrolled', window.scrollY > 10);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  /* ── Smooth scroll ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          /* close mobile nav if open */
          var nav = document.getElementById('nav');
          var ham = document.getElementById('hamburger');
          if (nav) nav.classList.remove('open');
          if (ham) ham.classList.remove('open');
        }
      });
    });
  }

  /* ── Accordion ── */
  function initAccordion() {
    var img = document.getElementById('accordionImage');
    document.querySelectorAll('.accordion__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var parent = this.closest('.accordion');
        var body = parent.querySelector('.accordion__body');
        var isOpen = this.classList.contains('active');

        /* close all */
        document.querySelectorAll('.accordion__btn').forEach(function (b) {
          b.classList.remove('active');
          b.closest('.accordion').querySelector('.accordion__body').classList.remove('open');
        });

        /* toggle current */
        if (!isOpen) {
          this.classList.add('active');
          body.classList.add('open');
          /* update image */
          var newImg = parent.getAttribute('data-image');
          if (img && newImg) {
            img.style.opacity = '0.5';
            setTimeout(function () {
              img.src = newImg;
              img.style.opacity = '1';
            }, 150);
          }
        }
      });
    });
  }

  /* ── Hamburger ── */
  function initHamburger() {
    var btn = document.getElementById('hamburger');
    var nav = document.getElementById('nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ── */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Contact form → mailto ── */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = encodeURIComponent("Demande d'installation — Kiosk");
      var lines = [
        'Nom: ' + d.get('name'),
        'Entreprise: ' + d.get('company'),
        'Email: ' + d.get('email'),
        'Adresse: ' + d.get('address'),
        'Type: ' + d.get('type')
      ];
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:kioskVend@outlook.com?subject=' + subject + '&body=' + body;
    });
  }

})();
