/* =========================================================
   G-Group — מע"ר בן צבי — interactions
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     ▼▼▼  ערכו כאן — פרטי קשר ומספרי העסקה  ▼▼▼
     ------------------------------------------------------- */
  var CONFIG = {
    // מספר וואטסאפ בפורמט בינלאומי, ללא + וללא מקפים. לדוגמה: '972501234567'
    whatsapp: '972500000000',
    // מספר לחיוג
    phone: '+972-50-000-0000',

    // כתובת לשליחת הטופס (Formspree / Make / Zapier / כל endpoint שמקבל POST).
    // כל עוד הערך ריק — הטופס נפתח בוואטסאפ עם הפרטים מוכנים לשליחה.
    formEndpoint: '',

    // פרמטרי העסקה — משמשים את המחשבון ואת כרטיס המחיר
    pricePerUnit: 690000,   // ₪ ליחידה
    landPerUnit: 16,        // מ"ר קרקע ליחידה
    far: 14,                // רח"ק — מכפיל זכויות הבנייה
    residentialShare: 0.5,  // מרכיב המגורים מתוך שטחי הבנייה

    // מלאי להצגה בפס ההתקדמות
    unitsTotal: 60,
    unitsLeft: 14
  };
  /* -------------------------------------------------------
     ▲▲▲  סוף אזור העריכה  ▲▲▲
     ------------------------------------------------------- */

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nf = new Intl.NumberFormat('he-IL');
  function num(n) { return nf.format(Math.round(n)); }

  /* ---------- year ---------- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* =====================================================
     NAV — stuck state + mobile menu
     ===================================================== */
  var nav = $('#nav');
  var navToggle = $('#navToggle');
  var mobileMenu = $('#mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.setAttribute('aria-label', open ? 'פתיחת תפריט' : 'סגירת תפריט');
      mobileMenu.classList.toggle('is-open', !open);
      mobileMenu.setAttribute('aria-hidden', String(open));
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    $$('a', mobileMenu).forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'פתיחת תפריט');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* =====================================================
     SCROLL — progress bar, nav state, sticky CTA
     ===================================================== */
  var progressBar = $('#progressBar');
  var stickyBar = $('#stickyBar');
  var waFloat = $('#waFloat');
  var heroEl = $('#hero');
  var leadEl = $('#lead');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar) progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('is-stuck', y > 40);

    // show the sticky CTA once the hero is behind us, hide it over the lead form
    var heroH = heroEl ? heroEl.offsetHeight : 600;
    var pastHero = y > heroH * 0.72;
    var atLead = false;
    if (leadEl) {
      var r = leadEl.getBoundingClientRect();
      atLead = r.top < window.innerHeight * 0.85 && r.bottom > 0;
    }
    var show = pastHero && !atLead;
    if (stickyBar) stickyBar.classList.toggle('show', show);
    if (waFloat) waFloat.classList.toggle('show', pastHero);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* =====================================================
     REVEAL on scroll
     ===================================================== */
  var revealables = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* =====================================================
     COUNT-UP numbers
     ===================================================== */
  function countUp(el) {
    var to = parseFloat(el.dataset.to);
    var dec = parseInt(el.dataset.dec || '0', 10);
    var pre = el.dataset.prefix || '';
    var suf = el.dataset.suffix || '';
    var dur = 1500;
    var t0 = null;

    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      var v = to * eased;
      el.textContent = pre + (dec ? v.toFixed(dec) : num(v)) + suf;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = pre + (dec ? to.toFixed(dec) : num(to)) + suf;
    }
    requestAnimationFrame(step);
  }

  var counters = $$('.count');
  if ('IntersectionObserver' in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      var dec = parseInt(el.dataset.dec || '0', 10);
      var to = parseFloat(el.dataset.to);
      el.textContent = pre + (dec ? to.toFixed(dec) : num(to)) + suf;
    });
  }

  /* =====================================================
     TOWER — the ×14 stack animation
     ===================================================== */
  var tower = $('#tower');
  if (tower) {
    if (reduced || !('IntersectionObserver' in window)) {
      tower.classList.add('go');
    } else {
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { tower.classList.add('go'); tio.disconnect(); }
        });
      }, { threshold: 0.4 });
      tio.observe(tower);
    }
  }

  /* =====================================================
     CALCULATOR
     ===================================================== */
  var units = $('#units');
  if (units) {
    var unitsOut = $('#unitsOut');
    var oPrice = $('#oPrice');
    var oLand = $('#oLand');
    var oRights = $('#oRights');
    var oResi = $('#oResi');
    var oPerSqm = $('#oPerSqm');

    function paintRange() {
      var min = parseFloat(units.min), max = parseFloat(units.max);
      var pct = ((parseFloat(units.value) - min) / (max - min)) * 100;
      units.style.setProperty('--p', pct + '%');
    }

    function calc() {
      var n = parseInt(units.value, 10);
      var price = n * CONFIG.pricePerUnit;
      var land = n * CONFIG.landPerUnit;
      var rights = land * CONFIG.far;
      var resi = rights * CONFIG.residentialShare;

      if (unitsOut) unitsOut.textContent = n;
      if (oPrice) oPrice.textContent = num(price) + ' ₪';
      if (oLand) oLand.textContent = num(land) + ' מ״ר';
      if (oRights) oRights.textContent = num(rights) + ' מ״ר';
      if (oResi) oResi.textContent = num(resi) + ' מ״ר';
      if (oPerSqm) oPerSqm.textContent = num(price / resi) + ' ₪';

      paintRange();
      syncLinks();
    }

    units.addEventListener('input', calc);
    calc();
  }

  /* =====================================================
     AVAILABILITY BAR
     ===================================================== */
  var availBar = $('#availBar');
  var availTxt = $('#availTxt');
  if (availTxt) availTxt.textContent = CONFIG.unitsLeft + ' מתוך ' + CONFIG.unitsTotal;
  if (availBar) {
    var soldPct = ((CONFIG.unitsTotal - CONFIG.unitsLeft) / CONFIG.unitsTotal) * 100;
    if ('IntersectionObserver' in window && !reduced) {
      var aio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { availBar.style.width = soldPct + '%'; aio.disconnect(); }
        });
      }, { threshold: 0.5 });
      aio.observe(availBar);
    } else {
      availBar.style.width = soldPct + '%';
    }
  }

  /* =====================================================
     CONTACT LINKS (whatsapp / tel)
     ===================================================== */
  function waMessage() {
    var n = units ? parseInt(units.value, 10) : 1;
    var txt = 'היי, הגעתי מהאתר של G-Group — מע"ר בן צבי.\n' +
      'מעניין אותי מידע על יחידות קרקע' + (n > 1 ? ' (' + n + ' יחידות)' : '') + '.\n' +
      'אשמח לקבל את המצגת המלאה ואת מסמכי העסקה.';
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(txt);
  }

  function syncLinks() {
    var url = waMessage();
    [$('#waLink'), $('#waFloat')].forEach(function (a) { if (a) a.href = url; });
    var tel = $('#telLink');
    if (tel) {
      tel.href = 'tel:' + CONFIG.phone.replace(/[^\d+]/g, '');
      var span = $('span', tel);
      if (span) span.textContent = CONFIG.phone;
    }
  }
  syncLinks();

  /* =====================================================
     LEAD FORM
     ===================================================== */
  var form = $('#leadForm');
  if (form) {
    var successBox = $('#formSuccess');
    var submitBtn = $('#submitBtn');

    function setError(id, msg) {
      var err = $('.err[data-for="' + id + '"]');
      if (err) err.textContent = msg || '';
      var input = document.getElementById(id);
      if (input && input.closest('.field')) {
        input.closest('.field').classList.toggle('invalid', !!msg);
      }
    }

    function validPhone(v) {
      var digits = v.replace(/\D/g, '');
      return digits.length >= 9 && digits.length <= 15;
    }

    function validate() {
      var ok = true;
      var name = $('#fName'), phone = $('#fPhone'), mail = $('#fMail'), okBox = $('#fOk');

      if (!name.value.trim() || name.value.trim().length < 2) {
        setError('fName', 'נא למלא שם מלא'); ok = false;
      } else setError('fName', '');

      if (!validPhone(phone.value)) {
        setError('fPhone', 'נא למלא מספר טלפון תקין'); ok = false;
      } else setError('fPhone', '');

      if (mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) {
        setError('fMail', 'כתובת אימייל לא תקינה'); ok = false;
      } else setError('fMail', '');

      if (!okBox.checked) {
        setError('fOk', 'נא לאשר יצירת קשר'); ok = false;
      } else setError('fOk', '');

      return ok;
    }

    ['fName', 'fPhone', 'fMail'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('blur', function () { if (el.value.trim()) validate(); });
    });

    function showSuccess() {
      if (successBox) {
        successBox.hidden = false;
        successBox.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var bad = $('.field.invalid input, .field.invalid select');
        if (bad) bad.focus();
        return;
      }

      var data = {
        name: $('#fName').value.trim(),
        phone: $('#fPhone').value.trim(),
        email: $('#fMail').value.trim(),
        units: $('#fUnits').value,
        note: $('#fNote').value.trim(),
        source: 'G-Group — מע"ר בן צבי landing',
        page: location.href
      };

      if (CONFIG.formEndpoint) {
        submitBtn.disabled = true;
        var label = $('span', submitBtn);
        var original = label ? label.textContent : '';
        if (label) label.textContent = 'שולח…';

        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('bad status ' + res.status);
          showSuccess();
        }).catch(function () {
          // network / endpoint failure — fall back to WhatsApp so the lead isn't lost
          window.open(buildWa(data), '_blank', 'noopener');
          showSuccess();
        }).then(function () {
          submitBtn.disabled = false;
          if (label) label.textContent = original;
        });
      } else {
        window.open(buildWa(data), '_blank', 'noopener');
        showSuccess();
      }
    });

    function buildWa(d) {
      var unitsLabel = d.units === '0' ? 'עוד לא החלטתי' : d.units + ' יחידות';
      var lines = [
        'פנייה מהאתר — G-Group · מע"ר בן צבי',
        'שם: ' + d.name,
        'טלפון: ' + d.phone
      ];
      if (d.email) lines.push('אימייל: ' + d.email);
      lines.push('כמות מבוקשת: ' + unitsLabel);
      if (d.note) lines.push('הערה: ' + d.note);
      return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
    }
  }

  /* =====================================================
     FAQ — one open at a time
     ===================================================== */
  var qas = $$('.qa');
  qas.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) qas.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* =====================================================
     CURSOR GLOW + MAGNETIC BUTTONS (desktop only)
     ===================================================== */
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !reduced) {
    var glow = $('#cursorGlow');
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
    var glowRaf = null;

    document.addEventListener('mousemove', function (e) {
      gx = e.clientX; gy = e.clientY;
      document.body.classList.add('has-cursor');
      if (!glowRaf) glowRaf = requestAnimationFrame(loop);
    }, { passive: true });

    function loop() {
      cx += (gx - cx) * 0.1;
      cy += (gy - cy) * 0.1;
      if (glow) glow.style.transform = 'translate3d(' + (cx - 260) + 'px,' + (cy - 260) + 'px,0)';
      if (Math.abs(gx - cx) > 0.4 || Math.abs(gy - cy) > 0.4) {
        glowRaf = requestAnimationFrame(loop);
      } else {
        glowRaf = null;
      }
    }

    $$('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.16;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        btn.style.transform = 'translate(' + dx + 'px,' + (dy - 3) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* =====================================================
     HERO PARALLAX (subtle)
     ===================================================== */
  if (!reduced && heroEl) {
    var heroImg = $('.hero-media img', heroEl);
    var heroBody = $('.hero-body', heroEl);
    var pTicking = false;

    window.addEventListener('scroll', function () {
      if (pTicking) return;
      pTicking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        if (y < window.innerHeight * 1.2) {
          if (heroImg) heroImg.style.translate = '0 ' + (y * 0.16) + 'px';
          if (heroBody) {
            heroBody.style.translate = '0 ' + (y * 0.06) + 'px';
            heroBody.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.78)));
          }
        }
        pTicking = false;
      });
    }, { passive: true });
  }

  /* =====================================================
     SMOOTH ANCHORS (respects reduced motion)
     ===================================================== */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

})();
