import { processors } from './models.js';

export function initCompare() {
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
