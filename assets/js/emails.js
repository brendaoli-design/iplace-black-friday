// Resumos de cada peça. day = dia de envio (novembro/2025)
const EMAILS = [
  { file: 'email-01.png', day: '28', phase: 'black', items: ['Black Friday', 'Ofertas iPhone', 'Carregador portátil', 'Ofertas 70%', 'Retire em loja'] },
  { file: 'email-02.png', day: '07', phase: 'aquece', items: ['Aquece', 'JBL até 70%', 'Boombox 3 em destaque', 'Preço de Black garantido'] },
  { file: 'email-03.png', day: '10', phase: 'aquece', items: ['Aquece', 'Logitech até 40%', 'Ofertas complementares', 'Ofertas 70%', 'Retire em loja'] },
  { file: 'email-04.png', day: '12', phase: 'aquece', items: ['Aquece', 'Apple Watch até 45%', 'Pulseiras e películas', 'Retire em loja'] },
  { file: 'email-05.png', day: '06', phase: 'aquece', items: ['Aquece', 'iPhone 16 Pro Max 1TB', 'AirPods Pro 2 e Watch SE', 'Ofertas 70%'] },
  { file: 'email-06.png', day: '14', phase: 'aquece', ord: 1, items: ['Aquece', 'Originais iPlace até 70%', 'Capas a partir de R$ 9,90', 'Retire em loja'] },
  { file: 'email-07.png', day: '14', phase: 'pre', items: ['Pré-Black', 'iPhone 16e', 'iPad mini, MacBook Air e Watch SE', 'Ofertas complementares', 'Ofertas 70%'] },
  { file: 'email-08.png', day: '17', phase: 'pre', items: ['Pré-Black', 'iPhone 16e', 'Compre junto', 'Ofertas 70%'] },
  { file: 'email-09.png', day: '18', phase: 'pre', items: ['Pré-Black', 'MacBook Air M1', 'Acessórios essenciais', 'Preço de Black garantido'] },
  { file: 'email-10.png', day: '21', phase: 'pre', items: ['Pré-Black', 'JBL exclusivo do site', 'Retire em loja', 'Ofertas 70%'] },
  { file: 'email-11.png', day: '19', phase: 'pre', items: ['Pré-Black', 'iPad mini', 'Comparativo de iPads', 'Ofertas 70%'] },
  { file: 'email-12.png', day: '24', phase: 'pre', ord: 2, items: ['Pré-Black', 'Headset Logitech', 'Ergonomia e bem-estar', 'MX Master 4', 'Ofertas 70%'] },
  { file: 'email-13.png', day: '27', phase: 'black', ord: 1, items: ['Black Friday', 'iPhone 16', 'Apple Watch até 45%', 'MacBook Air M4', 'Ofertas 70%', 'Retire em loja'] },
  { file: 'email-14.png', day: '27', phase: 'black', ord: 2, items: ['Black Friday', 'iPhone 17', 'Acessórios para iPhone 17'] },
  { file: 'email-15.png', day: '27', phase: 'black', ord: 5, items: ['Black Friday', 'iPhone 17 Pro', 'Acessórios para iPhone 17'] },
  { file: 'email-16.png', day: '24', phase: 'pre', ord: 1, items: ['Pré-Black', 'Melhores ofertas Apple', 'JBL e Logitech', 'Ofertas 70%'] },
  { file: 'email-17.png', day: '27', phase: 'black', ord: 4, items: ['Black Friday', 'MacBook Air M2, M3 e M4', 'Retire em loja', 'Ofertas 70%'] },
  { file: 'email-18.png', day: '14', phase: 'aquece', ord: 2, items: ['Oferta relâmpago', 'Caixa de som Harman Kardon', 'Pré-Black até 70%'] },
  { file: 'email-19.png', day: '11', phase: 'aquece', items: ['Aquece', 'Ofertas antecipadas 11.11', 'iPhone 16e', 'Só hoje'] },
  { file: 'email-20.png', day: '13', phase: 'aquece', items: ['Aquece', 'Até 70% OFF', 'Apple Watch até 45%', 'Mix de categorias', 'Cadastro Black Friday'] },
  { file: 'email-21.png', day: '26', phase: 'black', items: ['Black Friday', 'Teaser "É amanhã"'] },
  { file: 'email-22.png', day: '27', phase: 'black', ord: 3, items: ['Black Friday', 'JBL Boombox 3', 'Diferenciais do produto', 'Ofertas 70%'] },
  { file: 'email-23.png', day: '03', phase: 'aquece', items: ['Aquece', 'Oferta iPhone', 'Acessórios complementares', 'Ofertas 70%', 'Retire em loja'] }
];
const SECTIONS = [
  { key: 'aquece', title: 'Aquece Black', sub: 'As primeiras ofertas antecipadas' },
  { key: 'pre', title: 'Pré-Black', sub: 'A contagem regressiva para a Black' },
  { key: 'black', title: 'Black Friday', sub: 'O grande dia' }
];

const root = document.getElementById('sections');
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbList = document.getElementById('lb-list');
const lbPiece = document.querySelector('.lb-piece');
const ordered = [];   // ordem de exibição (seção a seção, por data de envio)
let current = 0;

const summary = e => e.items.concat('Enviado em ' + e.day + '/11');

SECTIONS.forEach(sec => {
  const list = EMAILS.filter(e => e.phase === sec.key).sort((a, b) => (a.day - b.day) || ((a.ord || 0) - (b.ord || 0)));
  const el = document.createElement('section');
  el.className = 'esec';
  el.innerHTML =
    '<div class="esec-head"><div><h2>' + sec.title + '</h2><p>' + sec.sub + '</p></div>' +
    '<div class="esec-arrows"><button class="arr prev" aria-label="Anterior">‹</button><button class="arr next" aria-label="Próximo">›</button></div></div>' +
    '<div class="track"></div>';
  const track = el.querySelector('.track');
  list.forEach(e => {
    const idx = ordered.push(e) - 1;
    const card = document.createElement('article');
    card.className = 'ecard';
    card.tabIndex = 0;
    card.innerHTML =
      '<p class="chips">' + summary(e).map(t => '<span>' + t + '</span>').join('<i class="dot"></i>') + '</p>' +
      '<div class="thumb"><img loading="lazy" src="' + imgUrl(e.file) + '" alt="E-mail: ' + e.items.join(', ') + '"></div>';
    card.addEventListener('click', () => open(idx));
    card.addEventListener('keydown', ev => { if (ev.key === 'Enter') open(idx); });
    track.appendChild(card);
  });
  const step = () => track.clientWidth * 0.8;
  el.querySelector('.prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  el.querySelector('.next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  root.appendChild(el);
});

function open(i) {
  current = (i + ordered.length) % ordered.length;
  const e = ordered[current];
  lbImg.src = imgUrl(e.file);
  lbList.innerHTML = summary(e).map(t => '<li><i class="dot"></i>' + t + '</li>').join('');
  lbPiece.scrollTop = 0;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
}
function close() { lb.hidden = true; document.body.style.overflow = ''; }

lb.addEventListener('click', ev => { if (ev.target === lb || ev.target.classList.contains('lb-body')) close(); });
lb.querySelector('.lb-close').addEventListener('click', close);
lb.querySelector('.prev').addEventListener('click', () => open(current - 1));
lb.querySelector('.next').addEventListener('click', () => open(current + 1));
document.addEventListener('keydown', ev => {
  if (lb.hidden) return;
  if (ev.key === 'Escape') close();
  if (ev.key === 'ArrowLeft') open(current - 1);
  if (ev.key === 'ArrowRight') open(current + 1);
});