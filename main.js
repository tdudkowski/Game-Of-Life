const boardFields = [...document.querySelectorAll("section.board > div")];
const btn = document.querySelector('button');

const render = () => {
 boardFields.forEach(boardField => boardField.addEventListener('click', () => {
  boardField.classList.toggle('black');
  boardField.textContent = boardField.dataset.key;
  console.log(boardField.dataset.key);
 }));
}

render();

const move = () => {
 boardFields.forEach(boardField => {
  let fieldValue = [...boardField.dataset.key];
  let y = fieldValue[0];
  let x = fieldValue[1];
  let left = Number(x == 0 ? 0 : `${boardField.dataset.key -1}`);
  let right = Number(`${y}${(x-(-1))}`);
  let top = Number(`${y-1}${x}`);
  let down = Number(`${y-(-1)}${(x)}`);
  boardField.textContent = `l${left}, r${right}, t${top}, d${down}, id${boardField.dataset.key}, x${x}, y${y}`;
  // boardField.textContent = boardField.dataset.key;
 });
}

btn.addEventListener('click', move)