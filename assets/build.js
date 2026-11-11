const cpu = document.querySelector('#cpu');
const board = document.querySelector('#board');
const ram = document.querySelector('#ram');
const boards = [{socket:'AM4', memory:'DDR4'}, {socket:'AM5', memory:'DDR5'}];
function checkBuild() {
  const platform = boards[board.value];
  const issues = [];
  if (processors[cpu.value].socket !== platform.socket) issues.push('Сокеты процессора и платы различаются.');
  if (ram.selectedOptions[0].text !== platform.memory) issues.push('Плата рассчитана на ' + platform.memory + '.');
  const result = document.querySelector('#result');
  result.classList.toggle('bad', Boolean(issues.length));
  result.textContent = issues.length ? issues.join(' ') : 'Совместимо по двум проверенным параметрам: сокет и поколение памяти совпадают.';
}
for (const field of [cpu, board, ram]) field.addEventListener('change', checkBuild);
checkBuild();
