const TBD = '[dados a completar]';
const pushes = Array.from({ length: 20 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return ['webpush-' + n + '.png', 'Web push ' + n];
});

// kind: 'acao' mostra resumo da ação; 'canal' mostra só título + receita do canal
// items: [arquivo, legenda]; a ordem dos blocos abaixo é a ordem de exibição no grid
const ACOES = [
  {
    id: 'dupla', kind: 'acao',
    title: 'Data dupla 11.11', short: 'Ação especial do dia 11.11 com banners, e-mail e topo mobile.',
    dir: 'dupla/', cols: 2, place: [['email.png'], ['banner-oferta-produto.png', 'banner-site-mob.png']],
    items: [
      ['banner-site-desk.png', 'Banner do site · desktop'],
      ['banner-site-mob.png', 'Banner do site · mobile'],
      ['banner-oferta-produto.png', 'Banner de oferta de produto'],
      ['email.png', 'E-mail']
    ],
    nome: 'Data dupla 11.11 · Ofertas antecipadas', produto: 'iPhone 16e 128GB', preco: 'R$ 3.499 no Pix',
    receitaNov: TBD, receitaOut: TBD, crescimento: TBD
  },
  {
    id: 'modal', kind: 'acao',
    title: 'Modal focado em acessórios', short: 'Modal no site para destacar acessórios com oferta competitiva.',
    dir: 'modal/', cols: 2,
    items: [
      ['01.png', 'Modal no site · versão 01'],
      ['02.png', 'Modal no site · versão 02']
    ],
    nome: 'Modal no site focado em acessórios · R$ 200 OFF', produto: 'Acessórios Originais iPlace', preco: 'R$ 200 OFF em compras acima de R$ 500',
    receitaNov: TBD, receitaOut: TBD, crescimento: TBD
  },
  {
    id: 'pushs', kind: 'canal',
    title: 'Web Pushs', short: 'Disparos ao longo de todo o mês, em paralelo às demais ações.',
    dir: 'pushs/', cols: 3, items: pushes,
    heading: 'Web Pushs · todos disparados durante a Black',
    receita: TBD
  },
  {
    id: 'relampago', kind: 'acao',
    title: 'Oferta relâmpago', short: 'Oferta de tempo limitado com comunicação em site, e-mail e push.',
    dir: 'relampago/', cols: 3,
    items: [
      ['banner-site-desk.png', 'Banner do site · desktop'],
      ['banner-site-mob.png', 'Banner do site · mobile'],
      ['email.png', 'E-mail'],
      ['stories-instagram.png', 'Stories do Instagram'],
      ['webpush.png', 'Web push']
    ],
    nome: 'Oferta relâmpago', produto: 'Caixa de Som Harman Kardon Go + Play 3', preco: 'R$ 1.249 no Pix (de R$ 2.499)',
    receitaNov: TBD, receitaOut: TBD, crescimento: TBD
  }
];

const mainGrid = document.getElementById('bento-main');
const detail = document.getElementById('detail');
const creatives = document.getElementById('bento-creatives');
const info = document.getElementById('detail-info');

// Ilustrações dos cards (vetores do Figma + criativos reais), sem fundo escurecido
const ART = {
  dupla: '<div class="art-dupla"><span class="ad-top">Ofertas antecipadas</span><b class="ad-num">11.11</b><span class="ad-tag">Só hoje</span></div>',
  modal: '<div class="art-modal"><div class="am-win"><i class="am-x">✕</i><small>Compre seu iPhone e ganhe</small><strong>R$ 200 OFF</strong><span class="am-btn">Quero aproveitar</span></div></div>',
  pushs: '<div class="art-pushs"><img class="p1" src="' + imgUrl('acoes-pushs-capa-1.png') + '" alt=""><img class="p2" src="' + imgUrl('acoes-pushs-capa-2.png') + '" alt=""><img class="p3" src="' + imgUrl('acoes-pushs-capa-3.png') + '" alt=""></div>',
  relampago: '<div class="art-rel"><img src="' + imgUrl('acoes-relampago-logo.svg') + '" alt="Oferta Relâmpago"><span class="ar-price">R$ 1.249 <small>no Pix</small></span></div>'
};

ACOES.forEach((a, i) => {
  const el = document.createElement('a');
  el.href = '#' + a.id;
  el.className = 'bblock b' + (i + 1) + ' k-' + a.id;
  el.innerHTML =
    '<div class="bart">' + ART[a.id] + '</div>' +
    '<div class="btext"><span class="num">0' + (i + 1) + '</span><h3>' + a.title + '</h3><p>' + a.short + '</p>' +
    '<span class="go">Ver ação <i>→</i></span></div>';
  mainGrid.appendChild(el);
  if (i === 2) {
    const intro = document.createElement('div');
    intro.className = 'bblock intro';
    intro.innerHTML = '<div class="btext"><h3>Ações paralelas</h3><p>Clique em uma para explorar</p></div>';
    mainGrid.appendChild(intro);
  }
});

function row(label, value) {
  return '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>';
}

let token = 0;

function openAction(id) {
  const a = ACOES.find(x => x.id === id);
  if (!a) return closeAction(true);
  const mine = ++token;
  creatives.innerHTML = '';

  if (a.kind === 'canal') {
    info.innerHTML = '<span class="lb-tag">Canal</span><h2>' + a.heading + '</h2>' +
      '<dl class="facts">' + row('Receita total do canal', a.receita) + '</dl>';
  } else {
    info.innerHTML = '<span class="lb-tag">Ação</span><h2>' + a.nome + '</h2><dl class="facts">' +
      row('Nome da ação', a.nome) + row('Produto foco', a.produto) + row('Preço do produto', a.preco) +
      row('Receita do item em novembro', a.receitaNov) + row('Receita do item em outubro', a.receitaOut) +
      row('Crescimento entre os meses', a.crescimento) + '</dl>';
  }
  detail.hidden = false;
  document.body.style.overflow = 'hidden';
  detail.scrollTop = 0;

  // Carrega todas as peças e distribui em colunas (masonry): banners largos no topo,
  // as demais sempre na coluna mais baixa, para o conjunto ficar equilibrado
  const loaded = a.items.map(([file, caption]) => new Promise(res => {
    const img = new Image();
    img.alt = caption;
    img.onload = img.onerror = () => res({ img, caption });
    img.src = imgUrl('acoes-' + a.id + '-' + file);
  }));
  Promise.all(loaded).then(list => {
    if (mine !== token) return;
    const cols = window.innerWidth < 700 ? 1 : a.cols;
    const gap = 18;
    const colW = ((creatives.clientWidth || 800) - gap * (cols - 1)) / cols;
    const wide = list.filter(p => cols > 1 && p.img.naturalWidth / p.img.naturalHeight >= 2.4);
    const rest = list.filter(p => !wide.includes(p));

    const fig = p => {
      const f = document.createElement('figure');
      f.innerHTML = '<figcaption>' + p.caption + '</figcaption><div class="iw"></div>';
      f.querySelector('.iw').appendChild(p.img);
      return f;
    };
    if (wide.length) {
      const w = document.createElement('div');
      w.className = 'mwide';
      wide.forEach(p => w.appendChild(fig(p)));
      creatives.appendChild(w);
    }
    const wrap = document.createElement('div');
    wrap.className = 'mcols';
    const colEls = Array.from({ length: cols }, () => { const c = document.createElement('div'); c.className = 'mcol'; wrap.appendChild(c); return c; });
    const heights = colEls.map(() => 0);
    if (a.place && cols > 1) {
      a.place.forEach((names, ci) => names.forEach(n => {
        const p = rest.find(x => x.img.src.endsWith('-' + n));
        if (p) colEls[ci].appendChild(fig(p));
      }));
    } else rest.forEach(p => {
      const h = Math.min(colW, p.img.naturalWidth) / p.img.naturalWidth * p.img.naturalHeight * (colW / Math.min(colW, p.img.naturalWidth)) + 40;
      const k = heights.indexOf(Math.min(...heights));
      colEls[k].appendChild(fig(p));
      heights[k] += h + gap;
    });
    creatives.appendChild(wrap);
  });
}

function closeAction(silent) {
  detail.hidden = true;
  document.body.style.overflow = '';
  if (!silent) history.replaceState(null, '', location.pathname);
}

document.getElementById('detail-back').addEventListener('click', () => closeAction());
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !detail.hidden) closeAction(); });
window.addEventListener('hashchange', () => location.hash ? openAction(location.hash.slice(1)) : closeAction(true));
if (location.hash) openAction(location.hash.slice(1));
