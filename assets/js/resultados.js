// =====================================================================
// Resultados · LPs Black Friday 2025
// Valores: exatamente os do arquivo dados-black-friday-2025.md.
// Exceção pedida: o comparativo "Club vs. LP Black Friday" foi convertido para % (ver nota 5).
// =====================================================================

const GLOSS = {
  'Site total': 'Todo o site iplace.com.br no período, incluindo as LPs.',
  'LP Black Friday': 'Página principal da campanha, aberta a todo o público.',
  'LP Club (Bradesco)': 'Página exclusiva para clientes Bradesco.',
  '% do site': 'Quanto o número da página representa do total do site.',
  'Club em % da LP Black Friday': 'Quanto o Club representa da LP principal, em %. 100% = igual; acima de 100%, o Club é maior; abaixo, menor.',
  'Sessões': 'Visitas que começaram na página.',
  'Novos usuários': 'Pessoas que acessaram o site pela primeira vez.',
  'Adições ao carrinho': 'Vezes em que um produto foi colocado no carrinho.',
  'Conversão (sessões → adições)': '% das visitas que geraram uma adição ao carrinho.',
  'Compras': 'Pedidos concluídos.',
  'Conversão (adições → compras)': '% das adições ao carrinho que viraram compra.',
  'Abandono de carrinho': '% das adições ao carrinho que não viraram compra.',
  'Receita': 'Valor vendido nas visitas que começaram na página.',
  'Ticket médio': 'Valor médio de cada pedido (receita ÷ compras).',
  'Conversão geral': '% das visitas que terminaram em compra.',
  'Taxa de rejeição': '% das visitas que saíram sem interagir. Quanto menor, melhor.',
  'Tempo médio de engajamento': 'Tempo médio de interação ativa por visita.',
  'Pedidos (est.)': 'Pedidos estimados: receita ÷ ticket médio da fase.'
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// Termo com tooltip (foco por teclado, passar o mouse ou tocar)
const T = (label, key) => '<span class="tip" tabindex="0" data-tip="' + esc(GLOSS[key || label]) + '">' + label + '</span>';
// "R$ 3.234,77" / "0,22%" / "13,3%" -> número (usado só para o tamanho das barras)
const num = s => parseFloat(String(s).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
const el = id => document.getElementById(id);

// ---------------------------------------------------------------- 0. Destaques
el('s0').innerHTML =
  '<div class="kpis">' +
  '<div class="kpi kpi-hero"><span class="kpi-label">Receita das duas LPs</span>' +
  '<strong class="kpi-big">R$ 5,1 mi</strong><span class="kpi-exact">R$ 5.145.129,35</span></div>' +
  '<div class="kpi kpi-rev"><span class="kpi-label">Receita LP Black Friday</span><strong class="kpi-rv">R$ 3,1 mi</strong><span class="kpi-exact">R$ 3.118.321,01</span></div>' +
  '<div class="kpi kpi-rev"><span class="kpi-label">Receita LP Club</span><strong class="kpi-rv">R$ 2,0 mi</strong><span class="kpi-exact">R$ 2.026.808,34</span></div>' +
  [
    ['Compras das duas LPs', '1.266'],
    ['Participação das duas LPs nas sessões do site', '14,6%'],
    ['Participação das duas LPs na receita do site', '5,3%']
  ].map(k => '<div class="kpi kpi-s"><span class="kpi-label">' + k[0] + '</span><strong class="kpi-val">' + k[1] + '</strong></div>').join('') +
  '</div>';

// ---------------------------------------------------------------- 1. Peso das LPs no site + funil
// [etapa, chave glossário, site, LP BF, % site BF, LP Club, % site Club, conversão (opcional)]
const ETAPAS = [
  ['Sessões', 'Sessões', '3.247.175', '433.123', '13,3%', '40.507', '1,2%', null],
  ['Novos usuários', 'Novos usuários', '2.067.801', '314.313', '15,2%', '28.067', '1,4%', null],
  ['Adições ao carrinho', 'Adições ao carrinho', '190.188', '10.396', '5,5%', '4.293', '2,3%',
    { key: 'Conversão (sessões → adições)', nome: 'Conversão (sessões → adições)', site: '5,9% das sessões', bf: '2,4% das sessões', club: '10,6% das sessões' }],
  ['Compras', 'Compras', '21.548', '964', '4,5%', '302', '1,4%',
    { key: 'Conversão (adições → compras)', nome: 'Conversão (adições → compras)',
      site: '11,3% das adições · 89% de abandono de carrinho', bf: '9,3% das adições · 91% de abandono de carrinho', club: '7,0% das adições · 93% de abandono de carrinho' }],
  ['Receita', 'Receita', 'R$ 96.533.345,43', 'R$ 3.118.321,01', '3,2%', 'R$ 2.026.808,34', '2,1%', null]
];
// Gráfico enxuto: só Sessões, Adições ao carrinho e Receita. Barras coladas, em tons de verde.
const GRAF = ['Sessões', 'Adições ao carrinho', 'Receita'];
const barRow = (cls, nome, val, w, pct) =>
  '<div class="srow"><span class="sl">' + nome + '</span><div class="st"><i class="' + cls + '" style="width:' + Math.max(w, 0.8) + '%"></i></div>' +
  '<b class="sv">' + val + '</b>' + (pct ? '<span class="pct">' + pct + ' do site</span>' : '<span></span>') + '</div>';

const etapasHTML = ETAPAS.filter(e => GRAF.includes(e[0])).map(e =>
  '<div class="stg"><h4>' + T(e[0], e[1]) + '</h4><div class="sbars">' +
  barRow('b-site', T('Site total'), e[2], 100, null) +
  barRow('b-bf', T('LP Black', 'LP Black Friday'), e[3], num(e[4]), e[4]) +
  barRow('b-club', T('LP Club', 'LP Club (Bradesco)'), e[5], num(e[6]), e[6]) +
  '</div></div>').join('');

// 20 páginas de destino do relatório do GA4 (sessões), em ordem decrescente
const PAGINAS = [
  ['/', '471.448'], ['/checkout', '16.484'], ['/iphone/lancamentos-iphone/cat266382605', '63.822'],
  ['/iphone-17/iphone-17-pro/cat266382503', '94.117'], ['/iphone/iphone-air/cat266382502', '26.874'],
  ['/black-friday', '433.123'], ['/home', '57.977'], ['/iplace-facilita', '21.475'],
  ['/iphone-17-pro-256gb-laranja-cosmico-mg8h4be-a/100072466', '30.567'], ['/iplace-club-black-friday', '40.507'],
  ['/iphone/iphone-17/cat266382501', '38.977'], ['/iphone-17/iphone-17/cat266382501', '29.471'],
  ['/searchresults', '56.823'], ['/apple-iphone-16e-128gb-preto-md1q4br-a/100060277', '30.897'],
  ['/iphone-16/iphone-16/cat266381401', '37.251'], ['/iphone-17/iphone-17-pro-max/cat266382504', '26.624'],
  ['/iplace/iphone/cat1300011', '23.712'], ['/iplace-club', '27.134'],
  ['/iphone-15/iphone-15/cat266380440', '37.793'], ['/apple-iphone-15-128gb-rosa-mtp13br-a/227972', '11.779']
].sort((x, y) => num(y[1]) - num(x[1]));
// Origem das sessões da LP Black Friday (GA4 · origem/mídia da sessão). Meta reúne todos os anúncios.
const LP_TOTAL = 433123;
const META_PARTES = [['meta / ads', 94791], ['META-ADS / ESTATICO-FEED-INTERESSES', 34380], ['META-ADS / ESTATICO-FEED-QUENTES', 13210],
  ['META-ADS / VIDEO-FEED-QUENTE', 5838], ['META-ADS / VIDEO-FEED-INTERESSES', 5818], ['META-ADS / ESTATICO-FEED-SEMELHANTES', 5015], ['META-ADS / REEL-FEED-INTERESSES', 4797]];
const INSTA_PARTES = [['instagram / link-da-bio', 23485], ['ig-story / social-cpc', 3202]];
const soma = a => a.reduce((s, p) => s + p[1], 0);
const OUTROS_LISTADOS = [['(direct) / (none)', 164165], ['google / cpc', 26927], ['(not set)', 8385], ['google / organic', 6526], ['voxusmediamanager / cpl', 6024], ['email-rmt / email', 5843]];
const demais = LP_TOTAL - soma(META_PARTES) - soma(INSTA_PARTES) - soma(OUTROS_LISTADOS);
const fmtN = n => n.toLocaleString('pt-BR');
const fmtP = n => (n / LP_TOTAL * 100).toFixed(1).replace('.', ',') + '%';
const ORIGENS = [
  { n: 'Direto', v: 164165, neutro: true, tip: '(direct) / (none)' },
  { n: 'Meta · todos os anúncios', v: soma(META_PARTES), tip: 'meta / ads (' + fmtN(94791) + ') + campanhas META-ADS (' + fmtN(soma(META_PARTES) - 94791) + ')' },
  { n: 'Google · busca paga', v: 26927, tip: 'google / cpc' },
  { n: 'Instagram · bio e stories', v: soma(INSTA_PARTES), tip: 'instagram / link-da-bio (' + fmtN(23485) + ') + ig-story / social-cpc (' + fmtN(3202) + ')' },
  { n: 'Não definido', v: 8385, neutro: true, tip: '(not set)' },
  { n: 'Google · orgânico', v: 6526, tip: 'google / organic' },
  { n: 'Voxus (cpl)', v: 6024, tip: 'voxusmediamanager / cpl' },
  { n: 'E-mail', v: 5843, tip: 'email-rmt / email' }
].sort((a, b) => b.v - a.v).concat([{ n: 'Demais origens', v: demais, neutro: true, tip: 'Diferença entre o total da página e as origens acima' }]);
const origemHTML = ORIGENS.map(o =>
  '<div class="orow' + (o.neutro ? ' neutro' : '') + '" title="' + esc(o.tip) + '"><span class="op">' + o.n + '</span>' +
  '<div class="pt"><i style="width:' + o.v / ORIGENS[0].v * 100 + '%"></i></div><b>' + fmtN(o.v) + '</b><span class="opct">' + fmtP(o.v) + '</span></div>').join('');
const origemCard =
  '<div class="rcard"><h3 class="card-title">Origem das sessões da LP Black Friday</h3>' +
  '<p class="mini top">Sessões por origem / mídia · total da página: ' + fmtN(LP_TOTAL) + '</p><div class="origens">' + origemHTML + '</div></div>';
// Itens do GA4 ("Compras de e-commerce: Nome do item", 01 a 30/11/2025, todos os usuários): os 50 itens listados no relatório.
// [nome, itens comprados, receita do item]
const ITENS = [
  ['Apple iPhone 16 128GB Preto', '462', '2.635.841,07'],
  ['Apple iPhone 16e 128GB Preto', '654', '2.710.445,19'],
  ['Apple iPhone 15 128GB Preto', '434', '2.275.882,37'],
  ['Apple iPhone 17 Pro 256GB Laranja-cósmico', '373', '4.341.754,80'],
  ['Apple iPhone 17 Pro Max 256GB Laranja-cósmico', '564', '7.345.804,64'],
  ['Apple iPhone 17 Pro 256GB Azul-intenso', '338', '3.919.369,82'],
  ['Apple iPhone 15 256GB Preto', '310', '1.748.788,71'],
  ['Apple iPhone 16e 128GB Branco', '424', '1.794.521,27'],
  ['Apple iPhone 17 Pro 256GB Prateado', '283', '3.340.612,57'],
  ['Apple iPhone 17 256GB Preto', '217', '1.766.830,86'],
  ['Apple iPhone 16 128GB Branco', '340', '1.946.163,18'],
  ['Apple iPhone 15 128GB Rosa', '293', '1.529.819,30'],
  ['Apple iPhone 16 256GB Preto', '224', '1.383.829,74'],
  ['Carregador iPhone, iPad, Apple Watch e AirPods Apple USB-C - 20W', '755', '169.615,73'],
  ['Apple iPhone 17 256GB Lavanda', '151', '1.232.320,38'],
  ['Apple AirPods Pro 3', '153', '390.669,92'],
  ['Apple iPhone 17 Pro Max 256GB Prateado', '354', '4.606.801,93'],
  ['JBL Boombox 3, Caixa de Som Bluetooth, Preto', '327', '572.106,10'],
  ['Apple iPhone 16 256GB Branco', '220', '1.371.226,75'],
  ['Apple iPhone 16 128GB Rosa', '210', '1.302.950,71'],
  ['Kit Viagem Lightning, Mistertech, Branco', '878', '126.966,67'],
  ['Apple iPhone 15 128GB Azul', '251', '1.313.324,36'],
  ['Apple iPhone 17 256GB Azul-névoa', '117', '959.787,55'],
  ['Apple iPhone 16 128GB Ultramarino', '160', '972.074,59'],
  ['Apple iPhone 16e 256GB Preto', '191', '876.478,83'],
  ['Apple iPhone 17 Pro 512GB Laranja-cósmico', '89', '1.193.858,66'],
  ['Apple iPhone 16 Pro Max 256GB Titânio branco', '67', '750.354,32'],
  ['(Assinatura) Apple iPhone 17 Pro 256GB Azul-intenso', '163', '955.017,00'],
  ['Carregador Universal, Mistertech, USB-C/ USB, 30W, Branco', '1.381', '80.144,79'],
  ['(Assinatura) Apple iPhone 17 Pro Max 256GB Laranja-cósmico', '84', '615.636,00'],
  ['Apple iPhone 17 Pro Max 256GB Azul-intenso', '171', '2.209.344,87'],
  ['(Assinatura) Apple iPhone 17 Pro 256GB Prateado', '112', '665.448,00'],
  ['Apple iPhone 13 512GB (PRODUCT)RED', '11', '39.100,75'],
  ['(Assinatura) Apple iPhone 17 Pro Max 256GB Azul-intenso', '0', '0,00'],
  ['Cabo USB-C para Lightning Apple, 1 metro, Branco', '558', '109.339,44'],
  ['(Assinatura) Apple iPhone 17 Pro 256GB Laranja-cósmico', '80', '472.920,00'],
  ['Apple iPhone 16 Pro Max 1TB Titânio branco', '50', '654.928,79'],
  ['Apple iPhone 16 Plus 128GB Preto', '70', '526.021,56'],
  ['Apple iPhone 17 256GB Branco', '106', '865.585,52'],
  ['Apple iPhone 16e 256GB Branco', '124', '559.252,79'],
  ['Apple iPhone 17 Pro 512GB Azul-intenso', '41', '546.902,20'],
  ['Apple iPhone 17 Pro Max 512GB Laranja-cósmico', '130', '1.871.841,55'],
  ['Apple iPhone 14 128GB Azul', '59', '279.720,17'],
  ['Carregador Veicular Turbo 30W, 2 saídas, Originais iPlace', '409', '24.628,51'],
  ['Apple iPhone 17 Pro Max 512GB Prateado', '128', '1.837.105,24'],
  ['Apple iPhone 16 256GB Rosa', '84', '564.359,18'],
  ['Apple iPhone 17 Pro 512GB Prateado', '57', '755.593,90'],
  ['Apple iPhone 15 256GB Azul', '95', '550.620,21'],
  ['Carregador USB-C/USB, 30W, 2 Portas, Originais iPlace', '509', '94.215,65'],
  ['Apple iPhone 16 256GB Ultramarino', '90', '564.753,07']
];
const ITENS_TOTAL_SITE = { itens: 25573, receita: 100048169.67 };
const grupoDe = n => {
  if (/^\(Assinatura\)/.test(n)) return 'iPhone com assinatura';
  if (/JBL/.test(n)) return 'JBL';
  if (/^Apple AirPods/.test(n)) return 'AirPods';
  if (/^(Carregador|Cabo|Kit)/.test(n)) return 'Acessórios';
  if (/iPhone 16e/.test(n)) return 'iPhone 16e';
  if (/iPhone 17 Pro/.test(n)) return 'iPhone 17 Pro e Pro Max';
  if (/iPhone 16/.test(n)) return 'iPhone 16';
  return 'Outros iPhones';
};
const GRUPO_TIP = {
  'iPhone 17 Pro e Pro Max': 'iPhone 17 Pro e 17 Pro Max (sem assinatura)',
  'iPhone 16': 'Todos os iPhone 16, incluindo 16 Plus e 16 Pro Max',
  'iPhone 16e': 'Todos os iPhone 16e',
  'Outros iPhones': 'iPhone 17 (padrão), 15, 14 e 13',
  'iPhone com assinatura': 'Todos os iPhone vendidos por assinatura, de qualquer modelo',
  'Acessórios': 'Carregadores, cabos e kits',
  'JBL': 'Todos os itens JBL',
  'AirPods': 'Todos os AirPods'
};
const GRUPO_COR = {
  'iPhone 17 Pro e Pro Max': '#c6d30d', 'iPhone 16': '#e3ef4b', 'Outros iPhones': '#8f9a0a', 'iPhone 16e': '#f5f5f7',
  'iPhone com assinatura': '#9a9aa6', 'Acessórios': '#5b6606', 'JBL': '#6a6a75', 'AirPods': '#3a3a42'
};
const numQ = s => parseInt(String(s).replace(/\./g, ''), 10);
const fmtBRL = n => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const itens = ITENS.map(i => ({ nome: i[0], q: numQ(i[1]), rec: num(i[2]), recTxt: 'R$ ' + i[2], qTxt: i[1] }));

// Lista: os 15 itens de maior receita
const listaHTML = itens.slice().sort((a, b) => b.rec - a.rec).slice(0, 15).map((i, k) =>
  '<div class="irow"><span class="ir">' + (k + 1) + '</span><span class="in" title="' + esc(i.nome) + '">' + esc(i.nome) + '</span><b class="iq">' + i.qTxt + '</b><b class="irec">' + i.recTxt + '</b></div>').join('');

// Pizza: receita por grupo; a quantidade de itens aparece ao passar o mouse
const grupos = {};
itens.forEach(i => { const g = grupoDe(i.nome); (grupos[g] = grupos[g] || { nome: g, q: 0, rec: 0 }); grupos[g].q += i.q; grupos[g].rec += i.rec; });
const gLista = Object.values(grupos).sort((a, b) => b.rec - a.rec);
const gTotal = gLista.reduce((s, g) => s + g.rec, 0);
function fatia(cx, cy, r, a0, a1) {
  const p = a => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return 'M' + cx + ',' + cy + ' L' + x0.toFixed(2) + ',' + y0.toFixed(2) + ' A' + r + ',' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + x1.toFixed(2) + ',' + y1.toFixed(2) + ' Z';
}
let ang = -Math.PI / 2;
const fatias = gLista.map(g => {
  const a1 = ang + g.rec / gTotal * Math.PI * 2;
  const d = fatia(150, 150, 140, ang, a1);
  ang = a1;
  return '<path class="slice tip" tabindex="0" d="' + d + '" fill="' + GRUPO_COR[g.nome] + '" data-tip="' + esc(g.nome + ' · ' + fmtN(g.q) + ' itens · ' + fmtBRL(g.rec)) + '"></path>';
}).join('');
const legendaHTML = gLista.map(g =>
  '<div class="lg" title="' + esc(GRUPO_TIP[g.nome]) + '"><i style="background:' + GRUPO_COR[g.nome] + '"></i><span>' + g.nome + '</span><b>' + fmtBRL(g.rec) + '</b></div>').join('');

const itensPair =
  '<div class="pair">' +
  '<div class="rcard"><h3 class="card-title">Itens de maior receita em novembro</h3>' +
  '<p class="mini top">15 maiores por receita, entre os 50 itens do relatório · 01 a 30/11/2025</p>' +
  '<div class="ihead"><span></span><span>Item</span><span>Itens</span><span>Receita</span></div><div class="itens">' + listaHTML + '</div></div>' +
  '<div class="rcard"><h3 class="card-title">Receita por grupo de produto</h3>' +
  '<p class="mini top">Tamanho da fatia = receita · passe o mouse para ver a quantidade de itens</p>' +
  '<div class="pie"><svg viewBox="0 0 300 300" role="img" aria-label="Pizza: receita por grupo de produto">' + fatias + '</svg></div>' +
  '<div class="legenda">' + legendaHTML + '</div></div></div>';
const LPS = { '/black-friday': 'LP Black Friday', '/iplace-club-black-friday': 'LP Club' };
const maxPag = num(PAGINAS[0][1]);
const paginasHTML = PAGINAS.map(p =>
  '<div class="prow' + (LPS[p[0]] ? ' hl' : '') + '"><span class="pp" title="' + esc(p[0]) + '">' + esc(p[0]) + '</span>' +
  '<div class="pt"><i style="width:' + num(p[1]) / maxPag * 100 + '%"></i></div><b>' + p[1] + '</b>' +
  (LPS[p[0]] ? '<span class="ptag">' + LPS[p[0]] + '</span>' : '<span></span>') + '</div>').join('');
// Funil: título da etapa em cima; valor e conversão (+ texto auxiliar) lado a lado
const stepRow = (nome, key, valor) =>
  '<div class="fstep s1"><span class="fl">' + T(nome, key) + '</span><b class="fv">' + valor + '</b></div>';
const step = (cls, nome, key, valor, conv, convKey, base) =>
  '<div class="fstep ' + cls + '"><span class="fl">' + T(nome, key) + '</span><div class="frow"><b class="fv">' + valor + '</b>' +
  '<div class="fc"><b class="fv">' + T(conv, convKey) + '</b><small>de conversão<br>' + base + '</small></div></div></div>';
const FUNIL = [
  { nome: 'LP Black Friday', key: 'LP Black Friday', s: '433.123', a: '10.396', c: '964', c1: '2,4%', c2: '9,3%', ab: '91%' },
  { nome: 'LP Club (Bradesco)', key: 'LP Club (Bradesco)', s: '40.507', a: '4.293', c: '302', c1: '10,6%', c2: '7,0%', ab: '93%' }
];
const funilHTML = FUNIL.map(f =>
  '<div class="funnel"><h4>' + T(f.nome, f.key) + '</h4>' +
  stepRow('Sessões', 'Sessões', f.s) +
  step('s2', 'Adições ao carrinho', 'Adições ao carrinho', f.a, f.c1, 'Conversão (sessões → adições)', 'das sessões') +
  step('s3', 'Compras', 'Compras', f.c, f.c2, 'Conversão (adições → compras)', 'das adições') +
  '<p class="fab"><b>' + f.ab + '</b> de abandono de carrinho</p><span class="seal">Oportunidade de reversão</span></div>').join('');
el('s1').innerHTML =
  '<header class="sec-head"><span class="sec-n">01</span><div><h2>Peso das LPs no site</h2>' +
  '<p>Quanto cada página representa do site e como o funil se comporta.</p></div></header>' +
  '<div class="rcard"><div class="stgs">' + etapasHTML + '</div></div>' +
  '<div class="pair"><div class="rcard"><h3 class="card-title">Posição entre as páginas de entrada do site</h3>' +
  '<p class="mini top">Sessões por página de destino · total do site: 3.247.175</p><div class="pages">' + paginasHTML + '</div></div>' + origemCard + '</div>' + itensPair +
  '<div class="rcard"><h3 class="card-title">Funil de conversão</h3><div class="funnels">' + funilHTML + '</div></div>';
// ---------------------------------------------------------------- 2. LP Black Friday x LP Club
// Comparativo em %: valor do Club ÷ valor da LP Black Friday (ver nota 5). Selo: quanto o Club está acima da LP Black Friday.
const COMP = [
  { t: 'Adições ao carrinho ÷ sessões', key: 'Conversão (sessões → adições)', a: '2,4%', b: '10,6%', p: '+340%' },
  { t: 'Ticket médio', key: 'Ticket médio', a: 'R$ 3.234,77', b: 'R$ 6.711,29', p: '+110%' },
  { t: 'Conversão geral', key: 'Conversão geral', a: '0,22%', b: '0,75%', p: '+240%' }
];
const compHTML = COMP.map(c => {
  const max = Math.max(num(c.a), num(c.b));
  return '<div class="cmp"><h4 class="cmp-t">' + T(c.t, c.key) + '</h4>' +
    '<div class="bar"><span class="bl">LP Black Friday</span><div class="bt"><i class="b-bf" style="width:' + (num(c.a) / max * 100) + '%"></i></div><b>' + c.a + '</b></div>' +
    '<div class="bar"><span class="bl">LP Club</span><div class="bt"><i class="b-club" style="width:' + (num(c.b) / max * 100) + '%"></i></div><b>' + c.b + '</b></div>' +
    '<div class="cmp-pill"><span class="badge-x">' + c.p + '</span></div></div>';
}).join('');
// [rótulo, chave glossário, LP BF, LP Club, Club em % da LP BF]
const COMPTAB = [
  { grupo: 'Tamanho' },
  ['Sessões', 'Sessões', '433.123', '40.507', '9%'],
  ['Receita', 'Receita', 'R$ 3.118.321,01', 'R$ 2.026.808,34', '65%'],
  ['Compras', 'Compras', '964', '302', '31%'],
  { grupo: 'Valor e eficiência' },
  ['Ticket médio (receita ÷ compras)', 'Ticket médio', 'R$ 3.234,77', 'R$ 6.711,29', '210%'],
  ['Conversão geral (compras ÷ sessões)', 'Conversão geral', '0,22%', '0,75%', '340%'],
  ['Adições ao carrinho ÷ sessões', 'Conversão (sessões → adições)', '2,4%', '10,6%', '440%'],
  ['Compras ÷ adições ao carrinho', 'Conversão (adições → compras)', '9,3%', '7,0%', '75%'],
  { grupo: 'Comportamento' },
  ['Novos usuários (% dos usuários da página)', 'Novos usuários', '87%', '80%', '92%'],
  ['Taxa de rejeição', 'Taxa de rejeição', '2,26%', '8,49%', '376%'],
  ['Tempo médio de engajamento', 'Tempo médio de engajamento', '41s', '1min21', '200%']
];
const compRows = COMPTAB.map(r => {
  if (r.grupo) return '<tr class="grp"><td colspan="4">' + r.grupo + '</td></tr>';
  const w = Math.min(num(r[4]), 450) / 450 * 100;
  return '<tr><th scope="row">' + T(r[0], r[1]) + '</th><td>' + r[2] + '</td><td>' + r[3] + '</td>' +
    '<td class="vs"><div class="vsb"><b>' + r[4] + '</b><span class="vst"><i style="width:' + w + '%"></i><u></u></span></div></td></tr>';
}).join('');

el('s2').innerHTML =
  '<header class="sec-head"><span class="sec-n">03</span><div><h2>LP Black Friday x LP Club</h2>' +
  '<p>Públicos diferentes, mesmo objetivo. Os percentuais mostram o Club em relação à LP principal.</p></div></header>' +
  '<div class="rcard"><h3 class="card-title">Comparativo entre páginas</h3><div class="cmps">' + compHTML + '</div></div>' +
  '<div class="rcard"><p class="read">Como ler: <b>100%</b> = o Club é igual à LP Black Friday · acima de 100%, o Club é maior · abaixo, menor.</p>' +
  '<div class="table-wrap"><table class="rtable cmpt"><thead><tr><th>Métrica</th>' +
  '<th>' + T('LP Black Friday') + '<small>Aberto, todos os canais</small></th>' +
  '<th>' + T('LP Club (Bradesco)') + '<small>Exclusivo clientes Bradesco</small></th>' +
  '<th>' + T('Club em % da LP Black Friday') + '<small>Segmentado</small></th></tr></thead><tbody>' + compRows + '</tbody></table></div></div>';

// ---------------------------------------------------------------- 3. Fases da campanha
const MEDIAS = [
  ['Aquece', '03 a 16/11', '14', '16.679', '322', 'R$ 78.936'],
  ['Pré-Black', '17 a 26/11', '10', '9.950', '337', 'R$ 107.045'],
  ['Black Friday', '27 a 30/11', '4', '23.649', '629', 'R$ 235.692']
];
const TOTAIS = [
  ['Aquece', '233.501', '4.508', 'R$ 1.105.103,85', 'R$ 3.369,22', '328', '38s'],
  ['Pré-Black', '99.500', '3.373', 'R$ 1.070.448,56', 'R$ 3.224,24', '332', '49s'],
  ['Black Friday', '94.594', '2.515', 'R$ 942.768,60', 'R$ 3.101,21', '304', '43s'],
  ['Total campanha', '427.595', '10.396', 'R$ 3.118.321,01', 'R$ 3.234,77', '964', '42s']
];
const PARTIC = [
  ['Aquece', '50,0%', '54,6%', '43,4%', '35,4%', '34,0%'],
  ['Pré-Black', '35,7%', '23,3%', '32,4%', '34,3%', '34,4%'],
  ['Black Friday', '14,3%', '22,1%', '24,2%', '30,2%', '31,5%']
];
const TONES = ['#6f7a06', '#a8b80c', '#e3ef4b'];   // um tom por fase
const PHASE_CLS = ['f1', 'f2', 'f3'];
const GREEN = '#c6d30d';

const tbl = (head, rows) => '<div class="table-wrap"><table class="rtable"><thead><tr>' + head.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div>';
const tr = (cells, cls) => '<tr' + (cls ? ' class="' + cls + '"' : '') + '><th scope="row">' + cells[0] + '</th>' + cells.slice(1).map(c => '<td>' + c + '</td>').join('') + '</tr>';
const seg = (vals) => PHASE_CLS.map((c, i) => '<i class="seg ' + c + '" style="width:' + num(vals[i]) + '%"><em>' + vals[i] + '</em></i>').join('');
const legend = () => '<div class="stk-legend">' + ['Aquece', 'Pré-Black', 'Black Friday'].map((n, i) => '<span><i class="dot" style="background:' + TONES[i] + '"></i>' + n + '</span>').join('') + '</div>';

// Gráfico de colunas. groups: [{label, sub, cols:[{label, tip, text, pct, tone}]}]  (pct = altura 0–100)
function colChart(groups, cls) {
  return '<div class="cc ' + (cls || '') + '"><div class="cc-groups">' + groups.map(g =>
    '<div class="ccg"><div class="ccg-cols">' + g.cols.map(c =>
      '<div class="cc-col"><span class="cv"' + (c.title ? ' title="' + esc(c.title) + '"' : '') + '>' + c.text + '</span><span class="cbw"><i class="cb" style="height:' + Math.max(c.pct, 1.5) + '%;background:' + c.tone + '"></i></span>' +
      (c.label ? '<span class="cl">' + (c.tip ? T(c.label, c.tip) : c.label) + (c.sub ? '<small>' + c.sub + '</small>' : '') + '</span>' : '<span class="cl"></span>') + '</div>').join('') +
    '</div>' + (g.label ? '<div class="ccg-label"><b>' + (g.tip ? T(g.label, g.tip) : g.label) + '</b></div>' : '') + '</div>').join('') +
    '</div></div>';
}
const maxOf = (rows, i) => Math.max.apply(null, rows.map(r => num(r[i])));

// "R$ 1,1 mi" para o destaque; o valor exato fica abaixo
const MI = ['R$ 1,1 mi', 'R$ 1,1 mi', 'R$ 0,9 mi'];
const macro =
  '<div class="rcard"><h3 class="card-title">Participação em dias e em receita</h3>' +
  '<div class="timeline">' + MEDIAS.map((m, i) =>
    '<div class="tl ' + PHASE_CLS[i] + '" style="flex:0 1 auto;width:' + PARTIC[i][4].replace(',', '.').replace('%', '') + '%"><b>' + m[0] + ' · ' + m[2] + ' dias</b><span>' + m[1] + '</span>' +
    '<div class="tl-rev"><small>' + T('Receita') + '</small><strong>' + MI[i] + '</strong><em>' + TOTAIS[i][3] + '</em></div></div>').join('') + '</div>' +
  '<div class="stack"><span class="stk-l">Dias</span><div class="stk">' + seg(PARTIC.map(p => p[1])) + '</div></div>' +
  '<div class="stack"><span class="stk-l">' + T('Receita') + '</span><div class="stk">' + seg(PARTIC.map(p => p[4])) + '</div></div>' +
  legend() + '</div>';
// Mergulho: médias por dia (agrupado por período)
const MX = [maxOf(MEDIAS, 3), maxOf(MEDIAS, 4), maxOf(MEDIAS, 5)];
const mediasChart = colChart(MEDIAS.map(m => ({
  label: m[0],
  cols: [
    { label: 'Sessões', tip: 'Sessões', text: m[3], pct: num(m[3]) / MX[0] * 100, tone: GREEN },
    { label: 'Adições', tip: 'Adições ao carrinho', text: m[4], pct: num(m[4]) / MX[1] * 100, tone: GREEN },
    { label: 'Receita', tip: 'Receita', text: m[5], pct: num(m[5]) / MX[2] * 100, tone: GREEN }
  ]
})), 'g3');
// Totais (agrupado por tópico, uma coluna por fase)
const TOP = [['Sessões', 1, 'Sessões'], ['Adições ao carrinho', 2, 'Adições ao carrinho'], ['Receita', 3, 'Receita'],
  ['Ticket médio', 4, 'Ticket médio'], ['Pedidos (est.)', 5, 'Pedidos (est.)'], ['Engajamento', 6, 'Tempo médio de engajamento']];
const totaisChart = legend() + colChart(TOP.map(t => {
  const mx = maxOf(TOTAIS.slice(0, 3), t[1]);
  return { label: t[0], tip: t[2], cols: TOTAIS.slice(0, 3).map((r, i) => (t[1] === 3 ? { text: MI[i], title: r[t[1]], pct: num(r[t[1]]) / mx * 100, tone: TONES[i] } : { text: r[t[1]], pct: num(r[t[1]]) / mx * 100, tone: TONES[i] })) };
}), 'g3');

// Participação de cada fase (agrupado por item; escala real 0–60%)
const PTOP = [['Dias', 1, null], ['Sessões', 2, 'Sessões'], ['Adições ao carrinho', 3, 'Adições ao carrinho'], ['Receita', 4, 'Receita'], ['Pedidos', 5, 'Pedidos (est.)']];
const particChart = legend() + colChart(PTOP.map(t => ({
  label: t[0], tip: t[2], cols: PARTIC.map((r, i) => ({ text: r[t[1]], pct: num(r[t[1]]) / 60 * 100, tone: TONES[i] }))
})), 'g5');

el('s3').innerHTML =
  '<header class="sec-head"><span class="sec-n">02</span><div><h2>Fases da campanha · LP Black Friday</h2>' +
  '<p>Aquece, Pré-Black e Black Friday oficial: como a receita e a eficiência mudaram a cada fase.</p></div></header>' +
  '<h3 class="subhead">Dados macro</h3>' + macro +
  '<h3 class="subhead">Mergulho nos dados de venda</h3>' +
  
  '<div class="rcard"><h3 class="card-title">Totais</h3>' + totaisChart +
  tbl(['Fase', T('Sessões'), T('Adições ao carrinho'), T('Receita'), T('Ticket médio'), T('Pedidos (est.)'), T('Engajamento', 'Tempo médio de engajamento')],
    TOTAIS.map((r, i) => tr(r, i === 3 ? 'total' : '')).join('')) + '</div>' +
  '<div class="rcard"><h3 class="card-title">Médias por dia</h3>' + mediasChart +
  tbl(['Fase', 'Período', 'Dias', T('Sessões') + '/dia', T('Adições ao carrinho') + '/dia', T('Receita') + '/dia'], MEDIAS.map(r => tr(r)).join('')) + '</div>' +
  '<div class="rcard"><h3 class="card-title">Participação de cada fase no total</h3>' + particChart +
  tbl(['Fase', 'Dias', T('Sessões'), T('Adições ao carrinho'), T('Receita'), T('Pedidos', 'Pedidos (est.)')], PARTIC.map(r => tr(r)).join('')) + '</div>';

// ---------------------------------------------------------------- 4. Insights (texto fixo)
el('insights').innerHTML =
  '<div class="ins-in"><div class="ins-col">' +
  '<h3 class="ins-h">Performance</h3><ul class="ins-list perf">' +
  '<li><strong>R$ 5,1 milhões e 1.266 pedidos gerados por duas páginas.</strong> A LP Black Friday sozinha captou R$ 3,1 mi; a LP Club, R$ 2,0 mi.</li>' +
  '<li><strong>A LP Black Friday foi a 2ª maior porta de entrada do site</strong>, atrás apenas da home: 13,3% de todas as sessões do período.</li>' +
  '<li><strong>Atraiu público novo:</strong> respondeu por 15,2% dos novos usuários do site — acima da sua participação nas sessões.</li>' +
  '<li><strong>Quem chegou, navegou:</strong> taxa de rejeição de 2,26%.</li>' +
  '<li><strong>LP Club, público de alto valor:</strong> com 9% do tráfego das LPs, gerou 65% da receita da LP principal. Ticket médio 2,1x maior e conversão 3,4x maior.</li>' +
  '<li><strong>Black Friday oficial concentrou o resultado:</strong> 14% dos dias da campanha e 30% da receita da LP. Receita/dia 3,0x a do Aquece.</li>' +
  '<li><strong>Pré-Black foi a fase mais eficiente:</strong> conversão mais que dobrou em relação ao Aquece (0,14% → 0,33%).</li></ul></div>' +
  '<div class="ins-col"><h3 class="ins-h learn">Aprendizados e melhorias</h3><ul class="ins-list">' +
  '<li><strong>Abandono de carrinho no Club (93%):</strong> é a página com maior intenção (10,6% das sessões adicionam ao carrinho), mas só 7% das adições viram compra. Com a taxa média do site (11,3%), seriam cerca de 184 pedidos a mais. Investigar checkout deste público: validação do benefício Bradesco, meios de pagamento, frete.</li>' +
  '<li><strong>Ticket menor na LP Black Friday (R$ 3.234,77):</strong> a vitrine direciona para produtos de menor valor. Testar mais destaque para produtos de ticket alto.</li>' +
  '<li><strong>Receita das LPs está subestimada:</strong> quando o cliente sai para o gateway de pagamento e volta, o GA4 inicia nova sessão no /checkout e a venda deixa de ser atribuída à LP de entrada. Correção: incluir os domínios de pagamento em "Listar referências indesejadas" no GA4, antes da Black Friday 2026.</li>' +
  '<li><strong>Próximo passo de mensuração:</strong> medir a receita influenciada (sessões que passaram pela LP em qualquer momento da navegação), não só a de entrada.</li></ul></div></div>';

// ---------------------------------------------------------------- Notas de rodapé
el('notes').innerHTML =
  '<h4>Notas</h4><ol>' +
  '<li>Receita, compras e sessões atribuídas por página de entrada (GA4): consideram visitas que começaram na página. Os dados usam a página de destino sem parâmetros de URL (query string).</li>' +
  '<li>Abandono de carrinho aproximado: 100% − (compras ÷ adições ao carrinho). Um mesmo pedido pode ter mais de uma adição ao carrinho, então o abandono real tende a ser menor.</li>' +
  '<li>Pedidos por fase estimados: receita ÷ ticket médio da fase.</li>' +
  '<li>Quadro geral (destaques e seções 01 e 03) e fases (seção 02) vêm de relatórios distintos. A soma das fases confere com o quadro geral em receita, compras e adições ao carrinho; nas sessões a soma das fases é 427.595, contra 433.123 no quadro geral.</li>' +
  '<li>Comparativo Club x LP Black Friday em %: valor do Club ÷ valor da LP Black Friday. Sessões, receita e compras seguem o arquivo de dados (9%, 65% e 31%); ticket médio, conversão geral e adições ÷ sessões vêm dos multiplicadores do arquivo (2,1x, 3,4x e 4,4x) escritos em %; os demais (compras ÷ adições, novos usuários, taxa de rejeição e engajamento) foram calculados sobre os valores exibidos.</li>' +
  '<li>Posição entre as páginas de entrada: 20 páginas de destino do relatório do GA4, ordenadas por sessões. Não é o ranking completo do site.</li>' +
  '<li>Origem das sessões da LP Black Friday: Meta reúne meta / ads e todas as campanhas META-ADS; Instagram reúne link da bio e stories; Demais origens é a diferença para o total da página (linhas não exibidas no relatório). Percentuais calculados sobre as 433.123 sessões da página.</li>' +
  '<li>Itens e receita por produto: relatório do GA4 Compras de e-commerce por nome do item, 01 a 30/11/2025, todos os usuários, site inteiro. Os 50 itens do relatório estão entre os mais vistos, não necessariamente os mais vendidos, e somam R$ 67.420.679,21 (67,4% dos R$ 100.048.169,67 do relatório). Grupos: iPhone 16 inclui 16 Plus e 16 Pro Max; Outros iPhones reúne iPhone 17 (padrão), 15, 14 e 13; iPhone com assinatura reúne todos os modelos vendidos por assinatura.</li></ol>';

// ---------------------------------------------------------------- Tooltips (hover, foco e toque)
const tipbox = document.createElement('div');
tipbox.className = 'tipbox';
tipbox.setAttribute('role', 'tooltip');
tipbox.hidden = true;
document.body.appendChild(tipbox);
let tipFor = null;

function showTip(target) {
  tipFor = target;
  tipbox.textContent = target.dataset.tip;
  tipbox.hidden = false;
  const r = target.getBoundingClientRect(), b = tipbox.getBoundingClientRect();
  let left = r.left + r.width / 2 - b.width / 2;
  left = Math.max(8, Math.min(left, innerWidth - b.width - 8));
  let top = r.bottom + 8;
  if (top + b.height > innerHeight - 8) top = r.top - b.height - 8;   // sem cobrir o dado
  tipbox.style.left = left + 'px';
  tipbox.style.top = top + 'px';
}
function hideTip() { tipbox.hidden = true; tipFor = null; }

document.addEventListener('mouseover', e => { const t = e.target.closest('.tip'); if (t) showTip(t); });
document.addEventListener('mouseout', e => { if (e.target.closest('.tip')) hideTip(); });
document.addEventListener('focusin', e => { const t = e.target.closest('.tip'); if (t) showTip(t); });
document.addEventListener('focusout', hideTip);
document.addEventListener('click', e => {            // toque no celular
  const t = e.target.closest('.tip');
  if (t) { tipFor === t ? hideTip() : showTip(t); } else hideTip();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });
window.addEventListener('scroll', hideTip, { passive: true });
