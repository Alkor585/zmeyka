function fruitAdd() {
    let fruitX = getRandomIntInclusive(0, colCount - 1);
    let fruitY = getRandomIntInclusive(0, rowCount - 1);
  
    if (!snakeCoords.some(([x, y]) => fruitX === x && fruitY === y)) {
      cells.find((cell) => cell.row === fruitY && cell.col === fruitX).el.classList.add('fruit')
    }
    setTimeout(fruitAdd, 6000);
  
  }