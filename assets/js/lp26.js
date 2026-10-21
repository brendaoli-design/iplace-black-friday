// Landing Pages 2026 (proposta): abas, menu de âncoras, contagem regressiva e cadastro (demonstração)

// ----- Abas "Quando é / O que é / O que esperar" -----
(function () {
  const tabs = [...document.querySelectorAll('.c26-tab')];
  if (!tabs.length) return;
  function abre(tab) {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      const p = document.getElementById(t.getAttribute('aria-controls'));
      p.hidden = !on;
      p.classList.toggle('on', on);
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => abre(t));
    t.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = tabs[(i + 1) % tabs.length]; n.focus(); abre(n); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = tabs[(i - 1 + tabs.length) % tabs.length]; n.focus(); abre(n); }
    });
  });
})();

// ----- Menu de âncoras: destaca a seção que está na tela -----
(function () {
  const links = [...document.querySelectorAll('.c26-nav a')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const alvos = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  alvos.forEach(s => io.observe(s));
})();

// ----- Contagem regressiva: <div class="LP_BlackFriday_countdown" data-end="2026-11-03T00:00:00"> -----
(function () {
  const clock = document.querySelector('[data-end]');
  if (!clock) return;
  const fim = new Date(clock.dataset.end).getTime();
  const el = id => document.getElementById('LP_BlackFriday_' + id);
  const z = n => (n < 10 ? '0' + n : '' + n);
  function tick() {
    const d = Math.max(0, fim - Date.now());
    el('days').textContent = z(Math.floor(d / 864e5));
    el('hours').textContent = z(Math.floor(d % 864e5 / 36e5));
    el('minutes').textContent = z(Math.floor(d % 36e5 / 6e4));
    el('seconds').textContent = z(Math.floor(d % 6e4 / 1e3));
  }
  tick();
  setInterval(tick, 1000);
})();

// ----- Cadastro: máscara do telefone e envio em modo demonstração -----
// Na proposta o formulário NÃO envia nada para o sistema de e-mail; só mostra a mensagem de sucesso.
(function () {
  const tel = document.getElementById('inp_37');
  if (tel) tel.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
    const er = document.getElementById('phoneError');
    if (er) er.textContent = '';
  });
})();

window.handleSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const tel = document.getElementById('inp_37');
  const er = document.getElementById('phoneError');
  let n = tel.value.replace(/\D/g, '');
  if (n.indexOf('55') !== 0) n = '55' + n;
  if (n.length < 12 || n.length > 13) {
    if (er) { er.textContent = 'Por favor, insira um telefone válido (DDD + número)'; er.style.color = '#ff4444'; }
    tel.focus();
    return;
  }
  const conteudo = document.getElementById('LP_BlackFriday_form_content');
  const ok = document.getElementById('LP_BlackFriday_successMessage');
  if (conteudo) conteudo.style.display = 'none';
  if (ok) ok.classList.add('active');
  setTimeout(() => {
    if (conteudo) conteudo.style.display = '';
    if (ok) ok.classList.remove('active');
    form.reset();
  }, 5000);
};

// ----- Máscara do CPF (000.000.000-00) -----
(function () {
  const cpf = document.getElementById('inp_cpf');
  if (!cpf) return;
  cpf.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });
})();

// ----- Movimento: luzes verdes de fundo e entrada suave das seções -----
(function () {
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches; // com "reduzir movimento": luzes paradas, sem animação
  // a cor de fundo passa para o <html>; assim as luzes (atrás do conteúdo) aparecem por cima dela
  document.documentElement.style.backgroundColor = document.querySelector('.c26') ? '#060606' : '#101010';
  document.body.style.backgroundColor = 'transparent';
  document.documentElement.classList.add('bg26-on');
  const luz = document.createElement('div');
  luz.className = 'bg26';
  luz.setAttribute('aria-hidden', 'true');
  luz.innerHTML = '<i></i><i></i><i></i>';
  document.body.prepend(luz);

  if (reduz || !('IntersectionObserver' in window)) return;
  const alvos = document.querySelectorAll('.c26-sec > .c26-wrap, .l26-sec .LP_BlackFriday_content_wrapper, .c26 .fac .wrap, .c26 .marcas .wrap');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  alvos.forEach(a => { a.classList.add('rev'); io.observe(a); });
})();
