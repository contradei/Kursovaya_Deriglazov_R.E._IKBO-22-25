// Автономная сборка для запуска с диска. Исходные модули находятся рядом.
(() => {
function initTheme() {
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

const processors = [
  {
    "name": "Альфа 4",
    "socket": "AM4",
    "memory": "DDR4",
    "cores": 4,
    "threads": 8
  },
  {
    "name": "Альфа 6",
    "socket": "AM4",
    "memory": "DDR4",
    "cores": 6,
    "threads": 12
  },
  {
    "name": "Бета 8",
    "socket": "AM5",
    "memory": "DDR5",
    "cores": 8,
    "threads": 16
  }
];


function initCatalog() {
  const query = document.querySelector('#query');
  const category = document.querySelector('#category');
  const cards = [...document.querySelectorAll('[data-category]')];
  function filterCards() {
    const term = query.value.trim().toLocaleLowerCase('ru');
    let count = 0;
    for (const card of cards) {
      const matches = card.textContent.toLocaleLowerCase('ru').includes(term);
      card.hidden = !matches || (category.value !== 'Все' && card.dataset.category !== category.value);
      if (!card.hidden) count++;
    }
    document.querySelector('#count').textContent = count ? 'Найдено карточек: ' + count : 'Совпадений нет. Измените запрос или подсистему.';
  }
  query.addEventListener('input', filterCards);
  category.addEventListener('change', filterCards);
  filterCards();
  const form = document.querySelector('form');
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => requestAnimationFrame(filterCards));
}

function initCompare() {
  const first = document.querySelector('#first');
  const second = document.querySelector('#second');
  function compare() {
    const a = processors[first.value], b = processors[second.value];
    document.querySelector('#left').textContent = a.name;
    document.querySelector('#right').textContent = b.name;
    const body = document.querySelector('tbody');
    body.replaceChildren();
    for (const [key, title] of Object.entries({socket:'Сокет',memory:'Память',cores:'Ядра',threads:'Потоки'})) {
      const row = body.insertRow();
      for (const value of [title, a[key], b[key]]) row.insertCell().textContent = value;
    }
  }
  first.addEventListener('change', compare);
  second.addEventListener('change', compare);
  compare();
  const form = document.querySelector('form');
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => requestAnimationFrame(compare));
}

function initBuild() {
  const cpu = document.querySelector('#cpu');
  const board = document.querySelector('#board');
  const ram = document.querySelector('#ram');
  const boards = [{socket:'AM4', memory:'DDR4'}, {socket:'AM5', memory:'DDR5'}];
  function checkBuild() {
    const platform = boards[board.value];
    const issues = [];
    if (processors[cpu.value].socket !== platform.socket) issues.push('Сокеты процессора и платы различаются.');
    if (ram.value !== platform.memory) issues.push('Плата рассчитана на ' + platform.memory + '.');
    const result = document.querySelector('#result');
    result.classList.toggle('result--invalid', Boolean(issues.length));
    result.textContent = issues.length ? issues.join(' ') : 'Совместимо по двум проверенным параметрам: сокет и поколение памяти совпадают.';
  }
  for (const field of [cpu, board, ram]) field.addEventListener('change', checkBuild);
  checkBuild();
  const form = document.querySelector('form');
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => requestAnimationFrame(checkBuild));
}

initTheme();
const page = document.body.className;
if (page === 'page-catalog') initCatalog();
if (page === 'page-build') initBuild();
if (page === 'page-compare') initCompare();
})();
