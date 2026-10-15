// Protege a página Resultados: o conteúdo (resultados.enc.js) está criptografado e só é
// decifrado no navegador com a senha correta. Sem a senha, os dados não existem na página.
(function () {
  const D = window.RES_ENC;
  const KEY = 'res-pw';
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const cat = (a, b) => { const o = new Uint8Array(a.length + b.length); o.set(a); o.set(b, a.length); return o; };
  const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

  async function decrypt(pw) {
    const s = crypto.subtle, enc = new TextEncoder();
    const base = await s.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
    const bits = new Uint8Array(await s.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: b64(D.salt), iterations: D.iter }, base, 512));
    const iv = b64(D.iv), ct = b64(D.ct);
    const macKey = await s.importKey('raw', bits.slice(32), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const mac = new Uint8Array(await s.sign('HMAC', macKey, cat(iv, ct)));
    if (!same(mac, b64(D.mac))) throw new Error('senha');
    const aesKey = await s.importKey('raw', bits.slice(0, 32), 'AES-CBC', false, ['decrypt']);
    return new TextDecoder().decode(await s.decrypt({ name: 'AES-CBC', iv }, aesKey, ct));
  }

  function run(code) {
    document.body.classList.remove('res-locked');
    const g = document.getElementById('res-gate');
    if (g) g.remove();
    (0, eval)(code);
  }

  async function tryPw(pw) {
    const code = await decrypt(pw);
    try { sessionStorage.setItem(KEY, pw); } catch (e) {}
    run(code);
  }

  function ask() {
    const g = document.createElement('div');
    g.id = 'res-gate';
    g.innerHTML =
      '<form class="gate-box" autocomplete="off">' +
      '<h2>Conteúdo restrito</h2>' +
      '<p>Esta página contém dados de venda da iPlace. Digite a senha para visualizar.</p>' +
      '<input type="password" name="pw" placeholder="Senha" autofocus required>' +
      '<button type="submit">Entrar</button>' +
      '<span class="gate-err" role="alert"></span></form>';
    document.body.appendChild(g);
    const f = g.querySelector('form'), err = g.querySelector('.gate-err'), btn = g.querySelector('button');
    f.addEventListener('submit', async e => {
      e.preventDefault();
      err.textContent = ''; btn.disabled = true; btn.textContent = 'Verificando…';
      try { await tryPw(f.pw.value); }
      catch (x) { err.textContent = 'Senha incorreta.'; f.pw.value = ''; f.pw.focus(); btn.disabled = false; btn.textContent = 'Entrar'; }
    });
    f.pw.focus();
  }

  document.body.classList.add('res-locked');
  if (!window.crypto || !crypto.subtle) {
    document.body.insertAdjacentHTML('beforeend',
      '<div id="res-gate"><div class="gate-box"><h2>Conteúdo restrito</h2><p>Abra esta página por HTTPS ou localhost para continuar.</p></div></div>');
    return;
  }
  let saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  if (saved) tryPw(saved).catch(() => { try { sessionStorage.removeItem(KEY); } catch (e) {} ask(); });
  else ask();
})();
