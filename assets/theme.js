export function initTheme() {
  const button = document.querySelector('.theme-toggle');
  const fileMode = location.protocol === 'file:';
  let saved;
  try { saved = localStorage.getItem('atlas-theme'); } catch {}
  const requested = fileMode && new URLSearchParams(location.search).get('theme');
  function apply(dark) {
    const mode = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = mode;
    button.setAttribute('aria-pressed', String(dark));
    if (fileMode) {
      for (const link of document.querySelectorAll('a[href$=".html"], a[href*=".html?"]')) {
        const url = new URL(link.href);
        url.searchParams.set('theme', mode);
        link.href = url.href;
      }
    }
  }
  apply((requested || saved) === 'dark');
  button.addEventListener('click', () => {
    apply(document.documentElement.dataset.theme !== 'dark');
    try { localStorage.setItem('atlas-theme', document.documentElement.dataset.theme); } catch {}
  });
}
