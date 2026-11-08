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
