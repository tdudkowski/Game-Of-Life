const boardFields = [...document.querySelectorAll("section.board > div")];
const btn = document.querySelector('button');

const countFields = function (panelResult) {
 let thisCounter = 0;

 // 3. MAKE NEW STEP
 boardFields.forEach(boardField => {
  let fieldValue = [...boardField.dataset.key];
  let y = Number(fieldValue[0] + fieldValue[1]);
  let x = Number(fieldValue[2] + fieldValue[3]);

  // 3.1 FIND NEIGHBOURS
  // left
  let left = `${y}${x-1}`;
  if (x == 10) { // tu trzeba bedzie zmienic na 10
   // x = 19;
   // left = `${y}${x-1}`;
   left = '10'; //normalizacja
   left = ("0" + left).slice(-4);
  } else {
   left = ("00" + left).slice(-4);
  }
  // right
  let right = `${y}${x+1}`;
  right = ("00" + right).slice(-4);
  // top
  let top = `${y-1}${x}`;
  if (top <= '019') {
   top = ("00" + top).slice(-4);
  } else {
   top = ("0" + top).slice(-4);
  }
  // down
  let down = `${y+1}${x}`;
  down = ("0" + down).slice(-4);
  // top-left
  let topL = `${y-1}${x-1}`;
  topL = ("00" + topL).slice(-4);
  // top-right
  let topR = `${y-1}${x+1}`;
  topR = ("00" + topR).slice(-4);
  // down-left
  let downL = `${y+1}${x-1}`;
  downL = ("00" + downL).slice(-4);
  // down-right
  let downR = `${y+1}${x+1}`;
  downR = ("00" + downR).slice(-4);

  // show ID
  boardField.textContent = `id${boardField.dataset.key}, dl${downL}, dr${downR}`;

  // 3.2 COLLECTING VALUES
  let valOfIt = panelResult.filter(val => {
   return val.id === boardField.dataset.key
  })

  if (left.length != 0 && x != 10) {
   left = panelResult.filter(function (val) {
    return val.id == Number(left);
   })
  }

  right = panelResult.filter(val => {
   return val.id === right
  })

  top = panelResult.filter(val => {
   return val.id === top
  })

  down = panelResult.filter(val => {
   return val.id === down
  })

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

  // 3.3 COUNTING POTENTIAL
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

  // 3.4 DEAD OR ALIVE
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

  // reset counter
  thisCounter = 0;
 })
}

// 2. MAKE AN ARRAY
const countPanel = () => {
 const panelResult = [];
 boardFields.forEach(boardField => {
  let fieldValue = [...boardField.dataset.key];
  let y = fieldValue[0] + fieldValue[1];
  let x = fieldValue[2] + fieldValue[3];

  let wob = document.querySelector(`[data-key='${y}${x}']`).classList.contains('black');

  // write to an array
  panelResult.push({
   id: boardField.dataset.key,
   val: wob // wob = white OR black
  });
 });
 countFields(panelResult);
}

// 1. CLICK2BLACK
const render = () => {
 boardFields.forEach(boardField => boardField.addEventListener('click', () => {
  boardField.classList.toggle('black');
  boardField.textContent = boardField.dataset.key;
 }));
}

render();

btn.addEventListener('click', countPanel)