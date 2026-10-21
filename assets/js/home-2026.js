// Home 2026 (proposta): troca de fase pelo hash da URL, links ilustrativos e modal do Facilita
const LOGOS = {
  'aquece': 'proposta-home-logo-aquece-black.svg',
  'pre-black': 'proposta-home-logo-pre-black.svg',
  'black-friday': 'proposta-home-logo-black-friday.svg'
};
const ALTS = { 'aquece': 'Aquece Black', 'pre-black': 'Pré-Black', 'black-friday': 'Black Friday' };

function setFase() {
  if (document.body.hasAttribute('data-fixo') || !document.getElementById('logo')) return; // páginas de LP têm o logo da fase fixo
  const f = LOGOS[location.hash.slice(1)] ? location.hash.slice(1) : 'aquece';
  document.body.dataset.fase = f;
  const logo = document.getElementById('logo');
  logo.src = imgUrl(LOGOS[f]);
  logo.alt = ALTS[f] + ' iPlace';
}
window.addEventListener('hashchange', setFase);
setFase();

// Plano B: o menu lateral também pode avisar a troca de fase por mensagem
window.addEventListener('message', e => {
  if (e.data && e.data.fase && LOGOS[e.data.fase]) location.hash = e.data.fase;
});

// Links do cabeçalho e dos botões são só ilustrativos
document.addEventListener('click', e => { if (e.target.closest('[data-nolink]')) e.preventDefault(); });

// ===== Modal do iPlace Facilita =====
const LINK = 'https://www.iplace.com.br/'; // provisório: trocar pelo link de cada "Saiba mais"
const BANCOS = imgUrl('proposta-home-bancos.svg');
const MODAIS = {
  parcelamento: {
    cls: 'c1',
    title: 'Programa de parcelamento',
    body: `
      <div class="m-duo">
        <div><small>Você parcela</small><b>70% em 21x</b><p>É o valor que ocupa o seu limite de crédito. Parcelas fixas, sem reajuste.</p></div>
        <div><small>Ao final do plano</small><b>30% restante</b><p>Você paga o valor residual ou devolve o aparelho em bom estado.</p></div>
      </div>
      <div class="m-bancos"><span>Disponível para clientes</span><img src="${BANCOS}" alt="Bradesco, Banco do Brasil, BTG Pactual e PortoBank"></div>
      <h4>Como funciona</h4>
      <ol class="m-steps">
        <li><b>Escolha o HojePay</b><span>na hora de adicionar o produto ao seu carrinho.</span></li>
        <li><b>Faça a adesão</b><span>Inicie a jornada de compra, e faça a adesão à carteira digital HojePay, tudo sem sair do site.</span></li>
        <li><b>Na 22ª parcela, você decide:</b><span>trocar e renovar, devolver e encerrar, ou pagar os 30% e ficar com o aparelho.</span></li>
      </ol>
      <p class="m-note">Para devolver, o produto deve estar em excelentes condições físicas e funcionando plenamente. A opção não vale para AirPods.</p>`
  },
  assinatura: {
    cls: 'c2',
    title: 'Assinatura iPlace Club',
    lead: 'Assine e use o novo iPhone com parcelas mensais, seguro incluso e troca programada, em ciclos de 21 meses.',
    cta: 'Saiba mais sobre a Assinatura',
    sub: `<div class="m-brand"><span>Exclusivo banco Bradesco</span><svg class="m-bradesco" viewBox="0 9 100 19.6" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bradesco"><path d="M28.0472 17.0701C27.3182 17.0773 26.5992 17.2432 25.9402 17.5561V12.4523C25.1002 12.7718 24.3092 13.2081 23.5912 13.7485C23.4342 13.8743 23.3082 14.0349 23.2242 14.2177C23.1392 14.4005 23.0992 14.6005 23.1052 14.8017V27.2777C24.3072 27.6748 25.5662 27.8665 26.8322 27.8448C30.5582 27.8448 32.6652 25.5765 32.6652 22.3359C32.6652 19.0954 31.2062 17.0701 28.0472 17.0701ZM26.9942 25.5765C26.6352 25.596 26.2772 25.5408 25.9402 25.4144V19.7435C26.4552 19.5335 27.0052 19.4236 27.5612 19.4194C29.0192 19.4194 29.7482 20.3916 29.7482 22.2549C29.7482 24.1182 28.8572 25.5765 26.9942 25.5765ZM9.41421 22.4169L8.28021 23.065C8.11821 23.1461 8.1182 23.2271 8.1182 23.3891V27.5208C8.1182 27.6828 8.19921 27.7638 8.28021 27.7638H9.41421V22.4169ZM39.8752 17.1511C39.3192 17.1441 38.7702 17.2733 38.2762 17.5275C37.7812 17.7817 37.3572 18.1531 37.0392 18.6093C36.9602 18.1705 36.8522 17.7375 36.7152 17.3131L35.5812 17.1511L34.4472 17.3131V27.6018C34.8912 27.7454 35.3592 27.8005 35.8242 27.7638L37.2822 27.6018V22.579C37.2822 20.5536 38.3362 19.5005 39.7132 19.5005H40.6852C40.8062 18.7492 40.8062 17.9834 40.6852 17.2321L39.8752 17.1511ZM11.5202 21.2017L10.0622 22.0119H9.98121V27.6018H11.6012C11.6872 27.6018 11.7702 27.5676 11.8302 27.5069C11.8912 27.4461 11.9252 27.3637 11.9252 27.2777V21.4448C11.9412 21.3928 11.9402 21.3368 11.9202 21.2859C11.9012 21.2349 11.8652 21.192 11.8182 21.164C11.7722 21.1359 11.7172 21.1244 11.6632 21.1313C11.6092 21.1381 11.5582 21.1629 11.5202 21.2017ZM9.25221 13.1004C8.05621 13.0912 6.8622 13.1998 5.6872 13.4245C6.3162 12.6069 7.1272 11.9471 8.0552 11.4971C8.9832 11.0471 10.0032 10.8194 11.0342 10.832C12.6122 10.832 14.1472 11.3437 15.4092 12.2903C15.5712 12.4523 15.7332 12.5333 15.8952 12.3713C15.9292 12.3409 15.9572 12.3035 15.9762 12.2616C15.9952 12.2197 16.0052 12.1742 16.0052 12.1283C16.0052 12.0823 15.9952 12.0368 15.9762 11.9949C15.9572 11.953 15.9292 11.9156 15.8952 11.8852C15.1702 11.0014 14.2542 10.2941 13.2152 9.81695C12.1762 9.33973 11.0432 9.1051 9.9002 9.13081C8.3662 9.15847 6.8762 9.64368 5.6202 10.5242C4.3642 11.4047 3.40021 12.6403 2.85221 14.0726L0.25921 15.1257C0.0432103 15.2878 -0.0378012 15.4498 0.0161988 15.6118C0.0331988 15.6585 0.0592088 15.7008 0.0952088 15.7355C0.130209 15.7702 0.173209 15.7964 0.220209 15.812C0.267209 15.8276 0.316213 15.8323 0.365213 15.8257C0.414213 15.8191 0.461207 15.8014 0.502207 15.7739C1.16521 15.5645 1.84221 15.4021 2.52821 15.2878C2.45721 15.6615 2.4302 16.042 2.4472 16.422C2.4252 17.7099 2.73421 18.982 3.34321 20.1167C3.95321 21.2513 4.8442 22.2106 5.9302 22.903C6.0922 22.984 6.33521 22.984 6.41621 22.822C6.49721 22.66 6.4972 22.498 6.3352 22.3359C5.6582 21.723 5.1192 20.9721 4.7562 20.1337C4.3922 19.2953 4.21321 18.3888 4.22921 17.4751C4.20421 16.6036 4.39921 15.7399 4.79621 14.9637L7.0642 14.8017C12.5732 14.8017 17.2722 16.665 17.2722 19.0144C17.2722 21.3638 15.7332 21.4448 13.8702 22.2549C13.4642 22.4169 13.4642 22.579 13.4642 22.741C13.4642 22.903 13.7082 22.984 13.9512 22.903C17.1912 21.9309 19.5402 20.1486 19.5402 18.1232C19.5402 16.0979 15.0042 13.1004 9.25221 13.1004ZM57.7792 14.8017V17.2321L56.3202 17.0701C53.1612 17.0701 51.0552 19.1764 51.0552 22.579C51.0552 25.9815 53.0802 27.8448 56.3202 27.8448C57.7792 27.8866 59.2332 27.6671 60.6142 27.1967V12.4523C59.7742 12.7718 58.9832 13.2081 58.2652 13.7485C58.0962 13.8641 57.9622 14.0229 57.8772 14.2083C57.7912 14.3936 57.7572 14.5987 57.7792 14.8017ZM57.7792 25.4144C57.3872 25.5434 56.9752 25.5983 56.5632 25.5765C54.7002 25.5765 53.9712 24.3613 53.9712 22.579C53.9712 20.7967 54.7002 19.3384 56.5632 19.3384L57.7792 19.5005V25.4144ZM86.7812 25.5765C85.4042 25.5765 84.4322 24.4423 84.4322 22.498C84.4322 20.5536 85.2422 19.4194 86.7812 19.4194C87.4182 19.4023 88.0512 19.5125 88.6452 19.7435C88.8182 19.0303 89.1502 18.3656 89.6172 17.7992C88.6492 17.2744 87.5572 17.0224 86.4572 17.0701C83.2982 17.0701 81.5162 19.2574 81.5162 22.498C81.5162 25.7385 83.3792 27.8448 86.5382 27.8448C87.6292 27.8985 88.7162 27.6755 89.6982 27.1967C89.2222 26.5815 88.8392 25.8989 88.5642 25.1714C88.0112 25.4491 87.4002 25.5881 86.7812 25.5765ZM45.1412 17.0701C44.1052 17.049 43.0712 17.1579 42.0622 17.3941C41.9002 18.1415 41.9002 18.9151 42.0622 19.6625C42.9052 19.4229 43.7792 19.3136 44.6552 19.3384C46.1132 19.3384 46.8422 19.9055 46.8422 21.1207V21.2828L45.4652 21.1207C43.1152 21.1207 41.0092 22.0119 41.0092 24.3613C41.0092 26.7106 42.8722 27.8448 45.6272 27.8448C46.9412 27.8151 48.2472 27.6246 49.5152 27.2777V21.3638C49.5152 18.5283 47.9762 17.1511 45.1412 17.0701ZM46.8422 25.5765H45.6272C44.3312 25.5765 43.6012 25.1714 43.6012 24.2802C43.6012 23.3891 44.3312 22.984 45.6272 22.984H46.8422V25.5765ZM94.7212 17.0701C91.5612 17.0701 89.7792 19.2574 89.7792 22.498C89.7792 25.7385 91.6422 27.8448 94.7212 27.8448C97.7992 27.8448 99.6632 25.7385 99.6632 22.498C99.6632 19.2574 97.8802 17.0701 94.7212 17.0701ZM94.7212 25.5765C93.1002 25.5765 92.6952 24.2802 92.6952 22.498C92.6952 20.7157 93.1002 19.3384 94.7212 19.3384C96.3412 19.3384 96.8272 20.6346 96.8272 22.498C96.8272 24.3613 96.2602 25.5765 94.7212 25.5765ZM67.0952 17.0701C64.0982 17.0701 62.2342 19.0954 62.2342 22.498C62.2342 25.9005 64.1792 27.8448 67.5812 27.8448C68.6892 27.8817 69.7922 27.6886 70.8222 27.2777C70.9832 26.5575 70.9832 25.8106 70.8222 25.0904C69.8812 25.4027 68.8972 25.5667 67.9052 25.5765C66.2852 25.5765 65.2322 24.9283 64.9892 23.3081H71.3892C71.4872 22.828 71.5422 22.3399 71.5512 21.8498C71.5512 18.7713 69.7692 17.0701 67.0952 17.0701ZM64.9892 21.2017C64.9992 20.9357 65.0622 20.6743 65.1742 20.4326C65.2852 20.1908 65.4432 19.9734 65.6392 19.7928C65.8352 19.6123 66.0642 19.472 66.3142 19.3801C66.5642 19.2883 66.8292 19.2466 67.0952 19.2574C68.3912 19.2574 68.8782 20.0676 68.8782 21.2017H64.9892ZM78.0322 21.5258L76.8172 21.0397C76.1692 20.7157 75.8452 20.5536 75.8452 20.0676C75.8452 19.5815 76.4122 19.2574 77.1412 19.2574C78.0522 19.2818 78.9532 19.4458 79.8142 19.7435C79.9772 19.0508 79.9772 18.3299 79.8142 17.6372C78.8472 17.2086 77.7922 17.0143 76.7362 17.0701C74.5482 17.0701 72.9282 18.2043 72.9282 19.9865C72.9282 21.7688 73.5762 22.4169 75.5212 23.2271L76.4122 23.5511C77.2222 23.8752 77.4652 24.1182 77.4652 24.6853C77.4652 25.2524 76.6552 25.5765 76.0072 25.5765C74.9532 25.5915 73.9072 25.3988 72.9282 25.0094C72.6872 25.7186 72.6872 26.4875 72.9282 27.1967C74.0222 27.6837 75.2162 27.9057 76.4122 27.8448C78.5992 27.8448 80.3812 26.7106 80.3812 24.6853C80.3812 22.66 79.6522 22.1739 78.0322 21.5258Z" fill="#CC092F"/></svg></div>`,
    body: `
      <h4>Por que escolher</h4>
      <div class="m-grid">
        <div><b>Acesso ao novo iPhone de forma fácil</b></div>
        <div><b>Menor parcela do mercado</b></div>
        <div><b>Troque e atualize a cada 21 meses</b></div>
        <div><b>Seguro contra roubo e furto qualificado</b></div>
      </div>
      <div class="m-callout"><p>No 21º mês você quita a parcela final, devolve o aparelho e encerra o ciclo, ou renova a assinatura com um novo modelo.</p></div>`
  },
  buyback: {
    cls: 'c3',
    title: 'Troque seu aparelho atual e economize no novo.',
    cta: 'Saiba mais e avalie o seu usado',
    href: 'https://www.iplace.com.br/buyback',
    body: `
      <h4>Saiba mais como fazer o Buyback</h4>
      <div class="m-duo stack">
        <div><small>Online, no site</small><b>Compre seu novo Apple, envie seu aparelho usado e receba o valor dele em Pix</b><p>Faça a avaliação do seu usado, enquanto compra o novo, e adicione o Buyback na compra. Depois de já estar com o produto novo em mãos, você recebe as instruções para enviar o usado. Ao chegar na iPlace, ele passa por uma avaliação técnica para confirmar as condições informadas na avaliação prévia, e assim confirmar o valor a ser pago. Concluída a análise, o valor final do aparelho é creditado via PIX ou transferência bancária.</p></div>
        <div><small>Na loja iPlace</small><b>Desconto na hora</b><p>A avaliação é feita no balcão e o valor do seu usado já entra como desconto na compra do novo produto Apple.</p></div>
      </div>
      <p class="m-text"><b>Produtos aceitos:</b> iPhone, iPad, Apple Watch e Android.</p>
      <p class="m-note">Confira todos os modelos aceitos na <a href="https://www.iplace.com.br/buyback" target="_blank" rel="noopener">página do Buyback</a>.</p>`
  }
};

const modal = document.getElementById('modal') || document.createElement('div'); // sem modal na página: bloco inerte
let ultimoCard = null;
function fecha() { modal.hidden = true; document.body.classList.remove('lock'); if (ultimoCard) ultimoCard.focus(); }
document.querySelectorAll('.fac-card').forEach(c => c.addEventListener('click', () => {
  const d = MODAIS[c.dataset.modal];
  ultimoCard = c;
  document.getElementById('m-pic').className = 'modal-pic ' + d.cls;
  document.getElementById('m-img').src = c.querySelector('.fac-img').src;
  const corpo = document.getElementById('m-body');
  corpo.innerHTML =
(d.eyebrow ? `<span class="modal-eyebrow">${d.eyebrow}</span>` : '') + `<h3 id="m-t">${d.title}</h3>` + (d.sub || '') + (d.lead ? `<p class="m-lead">${d.lead}</p>` : '') + d.body +    (d.cta ? `<a class="modal-cta" href="${d.href || LINK}" target="_blank" rel="noopener">${d.cta}</a>` : '');
  corpo.scrollTop = 0;
  modal.hidden = false;
  document.body.classList.add('lock');
  modal.querySelector('.modal-x').focus();
}));
modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) fecha(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) fecha(); });

// ===== Bento do hero: cada quadrado é uma esteira de produtos, movida uma de cada vez =====
(function () {
  const tiles = [...document.querySelectorAll('.bento .tile')];
  if (!tiles.length) return;
  const estado = tiles.map(t => {
    const nomes = t.dataset.imgs.split(',');
    const track = document.createElement('div');
    track.className = 'track';
    // o primeiro produto se repete no fim, para a esteira voltar ao início sem "pulo"
    [...nomes, nomes[0]].forEach((n, i) => {
      const im = document.createElement('img');
      im.src = imgUrl('proposta-home-bento-' + n + '.png');
      im.alt = '';
      im.draggable = false;
      if (i > 0) im.loading = 'lazy';
      track.appendChild(im);
    });
    t.appendChild(track);
    const s = { track, total: nomes.length, pos: 0, busy: false };
    track.addEventListener('transitionend', e => {
      if (e.target !== track) return;
      s.busy = false;
      if (s.pos === s.total) { // chegou no clone: volta ao início sem animar
        track.style.transition = 'none';
        s.pos = 0;
        track.style.transform = 'translateX(0)';
        void track.offsetWidth;
        track.style.transition = '';
      }
    });
    return s;
  });

  function avanca(s) {
    if (s.busy) return;
    s.busy = true;
    s.pos += 1;
    s.track.style.transform = `translateX(${-100 * s.pos}%)`;
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // ordem da linha do tempo: grande, JBL, relógio, iPhone, AirPods (nunca dois quadrados vizinhos em seguida)
  const ordem = [0, 3, 2, 4, 1].map(i => estado[i]);
  let k = 0;
  setInterval(() => { if (!document.hidden) { avanca(ordem[k % ordem.length]); k++; } }, 1700);
})();

// ===== Bolinhas de paginação dos carrosséis do celular (Facilita e Marcas) =====
document.querySelectorAll('.fac-grid, .marcas-grid').forEach(grid => {
  const cards = [...grid.children].filter(c => c.matches('.fac-card, .marca'));
  // posição do card dentro da área rolável (não depende de offsetParent)
  const pos = c => c.getBoundingClientRect().left - grid.getBoundingClientRect().left + grid.scrollLeft;
  const dots = document.createElement('div');
  dots.className = 'dots';
  dots.setAttribute('aria-hidden', 'true');
  cards.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.tabIndex = -1;
    b.addEventListener('click', () => grid.scrollTo({ left: pos(c) - 16, behavior: 'smooth' }));
    dots.appendChild(b);
  });
  grid.after(dots);
  const marca = () => {
    // card mais próximo do início visível
    const ini = grid.scrollLeft;
    let ativo = 0, menor = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(pos(c) - 16 - ini);
      if (d < menor) { menor = d; ativo = i; }
    });
    if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4) ativo = cards.length - 1;
    [...dots.children].forEach((b, i) => b.classList.toggle('on', i === ativo));
  };
  grid.addEventListener('scroll', marca, { passive: true });
  window.addEventListener('resize', marca);
  marca();
});
