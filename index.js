const button = document.querySelector('#pressMe');
const secretblock = document.querySelector('#secretBlock');
function pressed() {
  button.classList.add('hidden');
  secretblock.classList.remove('hidden');
  createGameField();
  tick();
}
button.addEventListener('click', pressed);

const cells = [];
let snakeCoords = [[25, 20], [25, 21], [25, 22], [25, 23], [25, 24], [25, 25], [25, 26], [25, 27], [25, 28], [25, 29], [25, 30]];
const colCount = 50;
const rowCount = 50;

function createGameField() {
  const container = document.querySelector('#gameField');
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      container.append(cellElement);
      if (snakeCoords.some(([x, y]) => x === colIndex && y === rowIndex)) {
        cellElement.classList.add('snake');
      }
      const cell = {
        row: rowIndex,
        col: colIndex,
        el: cellElement,
        isShoved: true,
        isFruit: false,
      };
      cells.push(cell);
    }
  }
}

let n = 0;

function tick() {
  move();
  if (n % 12 === 0) fruitAdd();
  const head = snakeCoords[snakeCoords.length - 1]
  if (cells.find((cell) => cell.col === head[0] && cell.row === head[1] && cell.isFruit)) {

    cells.find((cell) => cell.el.classList.remove('head',move),
    cell.el.classList.add('head',move))

  }
  for (const cell of cells) {
    if (snakeCoords.some(([x, y]) => x === cell.col && y === cell.row)) {
      cell.el.classList.add('snake');
    } else {
      cell.el.classList.remove('snake');
    }
    if (cell.isFruit) cell.el.classList.add('fruit');
  }
  n += 1;
  setTimeout(tick, 200);
}

const prevMoveDelta = [0, 1];
const moveDelta = [0, 1];


function move() {
  snakeCoords.shift();
  const head = snakeCoords[snakeCoords.length - 1];
  snakeCoords.push([head[0] + moveDelta[0], head[1] + moveDelta[1]]);
  prevMoveDelta[0] = moveDelta[0];
  prevMoveDelta[1] = moveDelta[1];
}

function keyBinding(event) {
  if (event.code === 'ArrowRight') {
    if (prevMoveDelta[0] !== -1) {
      moveDelta[0] = 1;
      moveDelta[1] = 0;
    }
  } else if (event.code === 'ArrowLeft') {
    if (prevMoveDelta[0] !== 1) {
      moveDelta[0] = -1;
      moveDelta[1] = 0;
    }
  } else if (event.code === 'ArrowUp') {
    if (prevMoveDelta[1] !== 1) {
      moveDelta[0] = 0;
      moveDelta[1] = -1;
    }
  } else if (event.code === 'ArrowDown') {
    if (prevMoveDelta[1] !== -1) {
      moveDelta[0] = 0;
      moveDelta[1] = 1;
    }

  }

};
window.addEventListener('keydown', keyBinding);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function fruitAdd() {
  let fruitX = getRandomIntInclusive(0, colCount - 1);
  let fruitY = getRandomIntInclusive(0, rowCount - 1);

  if (!snakeCoords.some(([x, y]) => fruitX === x && fruitY === y)) {
    const cell = cells.find((cell) => cell.row === fruitY && cell.col === fruitX);
    cell.isFruit = true;
    console.log(fruitX, fruitY);
  }
}

function fruitRemove() {
  cell.isFruit.classList.remove('fruit');
  cell.isFruit.classList.add('cell');
}