// Menu mobile
const btn = document.querySelector('.menu-btn');
if (btn) btn.addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));

// Visualizador de Landing Pages
const frame = document.getElementById('frame');
if (frame) {
  const phases = {
    'conteudo':     { title: 'Conteúdo · ano todo', tag: 'Ano todo', src: 'lps/conteudo/index.html' },
    'aquece':       { title: 'Aquece Black',  tag: 'Fase 1', src: 'lps/aquece.html' },
    'pre-black':    { title: 'Pré-Black',     tag: 'Fase 2', src: 'lps/pre-black.html' },
    'black-friday': { title: 'Black Friday',  tag: 'Fase 3', src: 'lps/black-friday.html' }
  };
  const iframe = frame.querySelector('iframe');

  function setPhase(key) {
    const p = phases[key] || phases['conteudo'];
    key = phases[key] ? key : 'conteudo';
    iframe.src = p.src;
    
    document.querySelectorAll('.phases button').forEach(b => b.classList.toggle('active', b.dataset.phase === key));
    history.replaceState(null, '', '#' + key);
  }
  function setDevice(mode) {
    frame.classList.toggle('mobile', mode === 'mobile');
    document.querySelectorAll('.toggle button').forEach(b => b.classList.toggle('active', b.dataset.device === mode));
  }
  document.querySelectorAll('.phases button').forEach(b => b.addEventListener('click', () => setPhase(b.dataset.phase)));
  document.querySelectorAll('.toggle button').forEach(b => b.addEventListener('click', () => setDevice(b.dataset.device)));
  setPhase(location.hash.slice(1));
}
