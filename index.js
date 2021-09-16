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
let snakeCoords = [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5]];
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
      };
      cells.push(cell);
    }
  }
}

function tick() {
  move();
  for (const cell of cells) {
    if (snakeCoords.some(([x, y]) => x === cell.col && y === cell.row)) {
      cell.el.classList.add('snake');
    } else {
      cell.el.classList.remove('snake');
    }
  }
  setTimeout(tick, 1000);
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
    cells.find((cell) => cell.row === fruitY && cell.col === fruitX).el.classList.add('fruit')
  }

}

window.addEventListener('click', fruitAdd);