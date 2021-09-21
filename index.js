const button = document.querySelector('#pressMe');
const secretblock = document.querySelector('#secretBlock');
const sign = document.querySelector('#signn');
const buttonR = document.querySelector('#buttonRestart')
function pressed() {

  button.classList.add('hidden');
  secretblock.classList.remove('hidden');
  createGameField();
  tick();
}
button.addEventListener('click', pressed);
buttonR.addEventListener('click', buttonRestartPressed);

const cells = [];
let snakeCoords = [[25, 20], [25, 21], [25, 22], [25, 23], [25, 24], [25, 25], [25, 26], [25, 27], [25, 28], [25, 29], [25, 30]];
const colCount = 50;
const rowCount = 50;

function createGameField() {
  function monitorSettings() {
    const cellSize=Math.floor(Math.min(window.innerHeight, window.innerWidth) / 50)
  

    gameField.style['grid-template-columns'] = `repeat(50, ${cellSize}px)`;
    gameField.style['grid-template-rows'] = `repeat(50, ${cellSize}px)`;
  }
  monitorSettings();
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
let needGrowUp = false;
let fruitExistNumber = 0;
const maxFruitExistNumber = 3;


function tick() {
  move();
  const head = snakeCoords[snakeCoords.length - 1];

  if (fruitExistNumber < maxFruitExistNumber) fruitAdd();
  const fruitCell = cells.find((cell) => cell.col === head[0] && cell.row === head[1] && cell.isFruit);

  if (fruitCell != null) {
    fruitCell.isFruit = false;
    needGrowUp = true;
    fruitExistNumber -= 1;
  } else needGrowUp = false;
  for (const cell of cells) {
    if (snakeCoords.some(([x, y]) => x === cell.col && y === cell.row)) {
      cell.el.classList.add('snake');
    } else {
      cell.el.classList.remove('snake');
    }
    if (cell.isFruit) cell.el.classList.add('fruit');
    else cell.el.classList.remove('fruit');
  }

  n += 1;
  const snakeIsDeath = !checkSnakeIsAlive(head);
  if (snakeIsDeath) {
    secretblock.classList.add('hidden');
    sign.classList.remove('hidden');
    sign.classList.add('sign');
    buttonR.classList.remove('hidden')
    buttonR.classList.add('buttonRestart')
  }
  if (!snakeIsDeath) setTimeout(tick, 100);
}


const prevMoveDelta = [0, 1];
const moveDelta = [0, 1];


function move() {
  if (!needGrowUp) snakeCoords.shift();

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
    fruitExistNumber += 1;
    const cell = cells.find((cell) => cell.row === fruitY && cell.col === fruitX);
    cell.isFruit = true;

  }

}

const notGameField = !cells.some((cell) => cell.row === y && cell.col === x)

function checkSnakeIsAlive([headX, headY]) {
  console.log(headX, headY)
  if (headX < 0 || headX >= 50 || headY < 0 || headY >= 50) {
    return false;
  }

  return !snakeCoords.some(([x, y], index) => (
    index !== snakeCoords.length - 1 && headX === x && headY === y
  ));
}
function buttonRestartPressed(){
 window.location.reload()
}
 