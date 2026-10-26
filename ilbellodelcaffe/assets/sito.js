// Il Bello del Caffè · menu mobile, "aperto ora", mappa al clic, comparsa sezioni
(function () {
  document.documentElement.classList.add('js');

  var nav = document.querySelector('.nav'), btn = document.querySelector('.nav__apri');
  if (btn) btn.addEventListener('click', function () {
    var aperta = nav.classList.toggle('aperta');
    btn.setAttribute('aria-expanded', aperta ? 'true' : 'false');
  });

  // Orari: 0 = lunedì. Ora di Roma.
  var ORARI = [[630, 1530], [630, 2130], [630, 2130], [630, 2130], [630, 2130], [630, 2130], [630, 2130]];
  function adessoRoma() {
    var p = new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    var g = {}; p.forEach(function (x) { g[x.type] = x.value; });
    var giorni = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];
    return { giorno: giorni.indexOf(g.weekday.toLowerCase().slice(0, 3)), hm: parseInt(g.hour, 10) * 100 + parseInt(g.minute, 10) };
  }
  function fmt(n) { return Math.floor(n / 100) + ':' + ('0' + n % 100).slice(-2); }
  try {
    var t = adessoRoma(), o = ORARI[t.giorno];
    if (t.giorno >= 0) {
      document.querySelectorAll('.orari tr[data-g="' + t.giorno + '"]').forEach(function (r) { r.classList.add('oggi'); });
      var testo, cls;
      if (t.hm >= o[0] && t.hm < o[1]) { testo = 'Aperto ora · chiude alle ' + fmt(o[1]); cls = 'si'; }
      else if (t.hm < o[0]) { testo = 'Chiuso · apre alle ' + fmt(o[0]); cls = 'no'; }
      else { testo = 'Chiuso · domani apre alle ' + fmt(ORARI[(t.giorno + 1) % 7][0]); cls = 'no'; }
      document.querySelectorAll('[data-aperto]').forEach(function (el) { el.textContent = testo; el.classList.add(cls); });
    }
  } catch (e) {}

  // Mappa Google solo dopo il clic (privacy)
  document.querySelectorAll('[data-carica-mappa]').forEach(function (b) {
    b.addEventListener('click', function () {
      var box = b.closest('[data-mappa]');
      var f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=Il+Bello+del+Caff%C3%A8,+Via+Gabriello+Chiabrera+129,+Roma&output=embed';
      f.title = 'Mappa: Il Bello del Caffè, via Gabriello Chiabrera 129, Roma';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
      box.appendChild(f);
      box.querySelector('.mappa__velo').remove();
    });
  });

  // Comparsa morbida delle sezioni
  var el = document.querySelectorAll('.rivela');
  if (!('IntersectionObserver' in window)) { el.forEach(function (e) { e.classList.add('vista'); }); return; }
  var io = new IntersectionObserver(function (voci) {
    voci.forEach(function (v) { if (v.isIntersecting) { v.target.classList.add('vista'); io.unobserve(v.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  el.forEach(function (e) { io.observe(e); });
})();

// Recensioni: frecce e «Leggi di più»
(function () {
  var fila = document.querySelector('.recensioni-g__fila');
  if (!fila) return;
  document.querySelectorAll('.recensioni-g__frecce button').forEach(function (b) {
    b.addEventListener('click', function () {
      var carta = fila.querySelector('.rec');
      fila.scrollBy({ left: (carta ? carta.offsetWidth + 16 : 300) * +b.dataset.dir, behavior: 'smooth' });
    });
  });
  fila.querySelectorAll('.rec').forEach(function (r) {
    var p = r.querySelector('p'), piu = r.querySelector('.rec__piu');
    if (p.scrollHeight > p.clientHeight + 2) {
      piu.hidden = false;
      piu.addEventListener('click', function () {
        var aperta = r.classList.toggle('aperta');
        piu.textContent = aperta ? 'Chiudi' : 'Leggi di più';
      });
    }
  });
})();
