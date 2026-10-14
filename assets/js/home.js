const img = (file, alt) => ({ src: imgUrl('home-' + file), alt });
const set = (prefix, n, alt) => Array.from({ length: n }, (_, i) => img(prefix + String(i + 1).padStart(2, '0') + '.png', alt + ' ' + (i + 1)));

// type: 'single' (imagem inteira) | 'row' (banners; ≤4 lado a lado, ≥5 carrossel)
const ROWS = [
  { n: '01', title: 'Cabeçalho e banner principal', text: 'A abertura da home, com o banner do Aquece Black.',
    type: 'single', items: [img('hero.png', 'Cabeçalho e banner Aquece Black')] },
  { n: '02', title: 'Destaques da campanha', text: 'Quatro banners de oferta logo abaixo do banner principal.',
    type: 'row', items: set('black-', 4, 'Destaque Black') },
  { n: '03', title: 'Menu de produtos', text: 'Atalhos por categoria, com ícones, aplicados como uma imagem só.',
    type: 'single', items: [img('menu-produtos.png', 'Menu de produtos')] },
  { n: '04', title: 'Carrossel principal · Apple', text: 'Sete banners: com mais de 4 peças, a fileira vira carrossel.',
    type: 'row', items: set('apple-', 7, 'Banner Apple') },
  { n: '05', title: 'Mais vendidos', text: 'Vitrine de produtos do site.',
    type: 'single', items: [img('vitrine.png', 'Vitrine Mais vendidos')] },
  { n: '06', title: 'iPlace Facilita - Soluções de compra', text: 'Parcelamento, Buyback e Assinatura, o ano todo.',
    type: 'row', items: set('cards-', 4, 'Solução de compra') },
  { n: '07', title: 'Ofertas de Logitech', text: 'Quatro produtos em oferta, seguidos do banner MX Master 4.',
    type: 'row', heading: 'Confira ofertas de Logitech no Aquece Black iPlace!', items: set('logitech-', 4, 'Oferta Logitech'),
    extra: { desk: img('mx-desk.png', 'Banner MX Master 4'), mob: img('mx-mob.png', 'Banner MX Master 4') } },
  { n: '08', title: 'Ofertas de JBL', text: 'Quatro produtos em oferta.',
    type: 'row', heading: 'Confira ofertas de JBL no Aquece Black iPlace!', items: set('jbl-', 4, 'Oferta JBL') },
  { n: '09', title: 'Originais iPlace', text: 'Menu de categorias da marca própria, aplicado como uma imagem só.',
    type: 'single', items: [img('originais-menu.png', 'Menu Originais iPlace')] },
  { n: '10', title: 'Capas marcas exclusivas', text: 'Print das capas de marcas parceiras: BMW, Guess, Lacoste e Mercedes.',
    type: 'single', items: [img('capas.png', 'Capas marcas exclusivas')] },
  { n: '11', title: 'Menu de Ofertas e Serviços', text: 'Atalhos para ofertas, reembalados, seguros e garantias.',
    type: 'single', items: [img('ofertas-servicos.png', 'Menu de Ofertas e Serviços')] },
  { n: '12', title: 'iPlace Corporativo', text: 'Banner de convite ao público corporativo.',
    type: 'single', items: [img('corporativo.png', 'iPlace Corporativo')] },
  { n: '13', title: 'Prêmio Reclame Aqui', text: 'Banner de fechamento da home, com versão para celular.',
    type: 'single', pad: true, items: [img('ra-desk.png', 'Prêmio Reclame Aqui')], mob: img('ra-mob.png', 'Prêmio Reclame Aqui') }];

const root = document.getElementById('home-rows');

function picture(item, mob) {
  if (!mob) return '<img loading="lazy" src="' + item.src + '" alt="' + item.alt + '">';
  return '<picture><source media="(max-width:700px)" srcset="' + mob.src + '"><img loading="lazy" src="' + item.src + '" alt="' + item.alt + '"></picture>';
}

ROWS.forEach(r => {
  const sec = document.createElement('div');
  sec.className = 'hrow';
  let body = '';
  if (r.heading) body += '<h3 class="site-title">' + r.heading + '</h3>';
  if (r.type === 'single') {
    body += r.pad ? '<div class="hsite-pad">' + picture(r.items[0], r.mob) + '</div>' : picture(r.items[0], r.mob);
  } else {
    body += '<div class="hsite-pad"><div class="track-wrap"><button class="carr prev" aria-label="Anterior">‹</button>' +
      '<div class="htrack' + (r.items.length > 4 ? ' is-carousel' : '') + '">' +
      r.items.map(i => '<div class="hitem">' + picture(i) + '</div>').join('') +
      '</div><button class="carr next" aria-label="Próximo">›</button></div>' +
      (r.extra ? '<div class="strip-gap">' + picture(r.extra.desk, r.extra.mob) + '</div>' : '') + '</div>';
  }
  sec.innerHTML =
    '<div class="hsite" data-label="' + r.n + ' · ' + r.title + '">' + body + '</div>' +
    '<aside class="hnote"><div class="hnote-in"><span class="hnum">' + r.n + '</span><h2>' + r.title + '</h2><p>' + r.text + '</p></div></aside>';
  root.appendChild(sec);

  const track = sec.querySelector('.htrack');
  if (track) {
    const step = () => track.clientWidth * 0.8;
    sec.querySelector('.prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    sec.querySelector('.next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  }
});

// Setas só quando há o que rolar (carrossel no desktop, sempre no celular)
function syncArrows() {
  document.querySelectorAll('.track-wrap').forEach(w => {
    const t = w.querySelector('.htrack');
    w.classList.toggle('has-scroll', t.scrollWidth > t.clientWidth + 4);
  });
}
window.addEventListener('resize', syncArrows);
window.addEventListener('load', syncArrows);
syncArrows();