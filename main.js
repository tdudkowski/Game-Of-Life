const boardFields = [...document.querySelectorAll("section.board > div")];
const btn = document.querySelector('button');

const countFields = function (panelResult) {
 let thisCounter = 0;

 boardFields.forEach(boardField => {
  let fieldValue = [...boardField.dataset.key];
  let y = fieldValue[0] + fieldValue[1];
  let x = fieldValue[2] + fieldValue[3];

  let left = Math.abs(Number(`${y}${x-1}`));
  if (x != 11) {
   left = ("00" + left).slice(-4);
  } else {
   // console.log(x)
   x = 19;
   left = Math.abs(Number(`${y}${x-1}`));
   left = ("00" + left).slice(-4);
  }
  let right = Math.abs(Number(`${y}${x-(-1)}`));
  right = ("00" + right).slice(-4);
  let top = Math.abs(Number(`${y-1}${x}`));
  if (top <= '019') {
   top = ("00" + top).slice(-4);
  } else {
   top = ("0" + top).slice(-4);
  }
  let down = Math.abs(Number(`${y-(-1)}${x}`));
  down = ("0" + down).slice(-4);

  let topL = Math.abs(Number(`${y-1}${x-1}`));
  topL = ("00" + topL).slice(-4);
  let topR = Math.abs(Number(`${y-1}${x-(-1)}`));
  topR = ("00" + topR).slice(-4);
  let downL = Math.abs(Number(`${y-(-1)}${x-1}`));
  downL = ("00" + downL).slice(-4);
  let downR = Math.abs(Number(`${y-(-1)}${x-(-1)}`));
  downR = ("00" + downR).slice(-4);
  boardField.textContent = `l${downL}, r${downR} id${boardField.dataset.key}`;

  // // boardField.textContent = `l${left}, r${right}, t${top}, d${down}, id${boardField.dataset.key}`;
  // boardField.textContent = `tl${topL}, tr${topR}, dl${downL}, dr${downR}, y${y}, x${x}`;

  let valOfIt = panelResult.filter(val => {
   return val.id === boardField.dataset.key
  })

  if (left.length != 0 && x != 10) {
   left = panelResult.filter(function (val) {
    return val.id == Number(left);
   })
  }

  // console.log(Object.values(left)[0].val, right[0], Object.values(valOfIt)[0]);

  right = panelResult.filter(val => {
   return val.id === right
  })

  top = panelResult.filter(val => {
   return val.id === top
  })

  down = panelResult.filter(val => {
   return val.id === down
  })

  // boardField.textContent = `l${left}, r${right}, id${boardField.dataset.key}`;

  topL = panelResult.filter(val => {
   return val.id === topL
  })

  topR = panelResult.filter(val => {
   return val.id === topR
  })

  downL = panelResult.filter(val => {
   return val.id === downL
  })

  downR = panelResult.filter(val => {
   return val.id === downR
  })

  // // console.log(panelResult[boardField.dataset.key], Object.values(valOfIt)[0].val, thisCounter, left[0].val, right[0].val);
  // // console.log(boardField.dataset.key, thisCounter);

  if (left.length != 0 && Object.values(left)[0].val) {
   thisCounter++;
  }

  if (right.length != 0 && Object.values(right)[0].val) {
   thisCounter++;
  }

  if (top.length != 0 && Object.values(top)[0].val) {
   thisCounter++;
  }

  if (down.length != 0 && Object.values(down)[0].val) {
   thisCounter++;
  }

  if (topL.length != 0 && Object.values(topL)[0].val) {
   thisCounter++;
  }

  if (topR.length != 0 && Object.values(topR)[0].val) {
   thisCounter++;
  }

  if (downL.length != 0 && Object.values(downL)[0].val) {
   thisCounter++;
  }

  if (downR.length != 0 && Object.values(downR)[0].val) {
   thisCounter++;
  }

  if (thisCounter < 2 || thisCounter > 3) {
   boardField.classList.remove('black')
  }

  if (thisCounter == 3 && !valOfIt[0].val) {
   boardField.classList.add('black')
  }

  if ((thisCounter == 2 || thisCounter == 3) && valOfIt[0].val) {
   boardField.classList.add('black')
  }

  // if (thisCounter == 4) {
  //  boardField.classList.toggle('black')
  // }

  thisCounter = 0;
 })
}

const countPanel = () => {
 const panelResult = [];
 boardFields.forEach(boardField => {
  let fieldValue = [...boardField.dataset.key];
  let y = fieldValue[0] + fieldValue[1];
  let x = fieldValue[2] + fieldValue[3];

  let wob = document.querySelector(`[data-key='${y}${x}']`).classList.contains('black');

  panelResult.push({
   id: boardField.dataset.key,
   val: wob // wob = white OR black
  });
 });
 countFields(panelResult);
}

const render = () => {
 boardFields.forEach(boardField => boardField.addEventListener('click', () => {
  boardField.classList.toggle('black');
  boardField.textContent = boardField.dataset.key;
  console.log(boardField.dataset.key);
 }));
}

render();

btn.addEventListener('click', countPanel)