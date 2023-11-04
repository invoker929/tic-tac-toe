const cellContainer = document.querySelector(".cell-container");
const statusText = document.querySelector(".status-text");
const restartBtn = document.querySelector(".restart-btn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;

gameStart();

function gameStart() {
    cellContainer.addEventListener("click", cellClicked);
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}


function cellClicked(event) {
    if (event.target.tagName === "DIV") {
        let cell = event.target;
        let index = cell.getAttribute('cellIndex');

        if (options[index] != '' || !running)
            return;

        updateCell(cell, index);
        checkWinner();
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        let winCondition = winConditions[i];
        let a = options[winCondition[0]];
        let b = options[winCondition[1]];
        let c = options[winCondition[2]];

        if (a === '' || b === '' || c === '')
            continue;
        if (a === b && b === c) {
            running = false;
            break;
        }
    }
    if (!running) {
        statusText.textContent = `${currentPlayer} Win!`;
    } else if (!options.includes('')) {
        statusText.textContent = 'Draw!';
    } else {
        changePlayer();
    }
}

function restartGame() {
    options = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
    const cells = cellContainer.children;
    [...cells].forEach(cell => {
        cell.textContent = '';
    });
    running = true;
}