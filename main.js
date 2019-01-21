const boardFields = [...document.querySelectorAll("section.board > div")];
const btn = document.querySelector('button');

const count = () => {
 let thisCounter = 0;
 boardFields.forEach(boardField => {
  let fieldValue = [...boardField.dataset.key];
  let y = fieldValue[0];
  let x = fieldValue[1];
  let left = Math.abs(Number(x == 0 ? 0 : `${boardField.dataset.key -1}`));
  left = ("0" + left).slice(-2);
  let right = Math.abs(Number(`${y}${(x-(-1))}`));
  right = ("0" + right).slice(-2);
  let top = Math.abs(Number(`${y-1}${x}`));
  top = ("0" + top).slice(-2);
  let down = Math.abs(Number(`${y-(-1)}${(x)}`));
  down = ("0" + down).slice(-2);
  boardField.textContent = `l${left}, r${right}, t${top}, d${down}, id${boardField.dataset.key}`;


  if (document.querySelector(`[data-key='${left}']`).classList.contains('black')) {
   thisCounter++;
  }
  if (document.querySelector(`[data-key='${right}']`).classList.contains('black')) {
   thisCounter++;
  }
  if (document.querySelector(`[data-key='${top}']`).classList.contains('black')) {
   thisCounter++;
  }
  if (document.querySelector(`[data-key='${top-1}']`)) {
   if (document.querySelector(`[data-key='${top-1}']`).classList.contains('black')) {
    thisCounter++;
   }
  }
  if (document.querySelector(`[data-key='${top+1}']`)) {
   if (document.querySelector(`[data-key='${top+1}']`).classList.contains('black')) {
    thisCounter++;
   }
  }
  if (document.querySelector(`[data-key='${down}']`).classList.contains('black')) {
   thisCounter++;
  }
  if (document.querySelector(`[data-key='${down-1}']`)) {
   if (document.querySelector(`[data-key='${down-1}']`).classList.contains('black')) {
    thisCounter++;
   }
  }
  if (document.querySelector(`[data-key='${down+1}']`)) {
   if (document.querySelector(`[data-key='${down+1}']`).classList.contains('black')) {
    thisCounter++;
   }
  }
  console.log(boardField.dataset.key, thisCounter);

  if (thisCounter < 2 || thisCounter > 3) {
   boardField.classList.remove('black')
  }

  if (thisCounter == 3 && !(document.querySelector(`[data-key='${boardField.dataset.key}']`).classList.contains('black'))) {
   boardField.classList.add('black')
  }

  if (thisCounter == (2 || 3) && document.querySelector(`[data-key='${boardField.dataset.key}']`).classList.contains('black')) {
   boardField.classList.add('black')
  }
  // if (thisCounter == 4) {
  //  boardField.classList.toggle('black')
  // }

  thisCounter = 0;
 });
}

const render = () => {
 boardFields.forEach(boardField => boardField.addEventListener('click', () => {
  boardField.classList.toggle('black');
  boardField.textContent = boardField.dataset.key;
  console.log(boardField.dataset.key);
 }));
}

render();

btn.addEventListener('click', count)