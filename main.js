const boardFields = [...document.querySelectorAll("section.board > div")];

const render = () => {
 boardFields.forEach(boardField => boardField.addEventListener('click', () => {
  boardField.classList.toggle('black');
 }));
}

render();