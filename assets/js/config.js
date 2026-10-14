// Imagens hospedadas no site da iPlace. Prefixo de todos os arquivos: iplace-black-131026-
// Em localhost / arquivo aberto direto no computador, usa a cópia da pasta "arquivos para hospedar".
const IMG_PREFIX = 'iplace-black-131026-';
const IMG_HOSTED = 'https://www.iplace.com.br/file/general/' + IMG_PREFIX;
const IMG_LOCAL = 'arquivos para hospedar/' + IMG_PREFIX;
const IS_LOCAL = location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname);
const imgUrl = name => (IS_LOCAL ? IMG_LOCAL : IMG_HOSTED) + name;

// Imagens de HTML estático (ex.: logo do cabeçalho): <img data-img="logo-iplace.svg">
document.querySelectorAll('img[data-img]').forEach(i => { i.src = imgUrl(i.dataset.img); });