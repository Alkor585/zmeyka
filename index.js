const button= document.querySelector('#pressMe');
const secretblock = document.querySelector('#secretBlock');
function pressed() {
    button.classList.add('hidden');
    secretblock.classList.remove('hidden');
}
button.addEventListener('click', pressed);

function createGameField() {
const cells = [];

    const colCount=20;
    const rowCount=20;
    const container= document.querySelector('#gameField');
    for(let colIndex = 0; colIndex< colCount ; colIndex++)
    {

        for(let rowIndex=0; rowIndex < rowCount; rowIndex++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            container.append(cell);
            cells.push
            (
                {
                    row:rowIndex,
                    col:colIndex,
                    el:cell,
                    isShoved: true,               
                 }
            );
        }
    }
}
button.addEventListener('click',createGameField);



