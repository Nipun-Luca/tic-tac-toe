const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameOver = false;

// Add click event listeners to cells
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOver && cell.textContent === '') {
            cell.textContent = currentPlayer;

            if (checkForWin(currentPlayer)) {
                gameOver = true;
                setTimeout(() => {
                    alert(`Player ${currentPlayer} wins!`);
                }, 10);
            } else if (isBoardFull()) {
                gameOver = true;
                setTimeout(() => {
                    alert('It\'s a draw!');
                }, 10);
            } else {
                currentPlayer = 'O'; // Switch to the computer's turn
                makeComputerMove();
            }
        }
    });
});

// Function to check if a player has won
function checkForWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        if (cells[combo[0]].textContent === player &&
            cells[combo[1]].textContent === player &&
            cells[combo[2]].textContent === player) {
            return true;
        }
    }

    return false;
}

// Function to check if the board is full (a draw)
function isBoardFull() {
    return [...cells].every(cell => cell.textContent !== '');
}

// Function to make a computer move
function makeComputerMove() {
    if (!gameOver) {
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            emptyCells[randomIndex].textContent = 'O';

            if (checkForWin('O')) {
                gameOver = true;
                setTimeout(() => {
                    alert('Computer wins!');
                }, 10);
            } else if (isBoardFull()) {
                gameOver = true;
                setTimeout(() => {
                    alert('It\'s a draw!');
                }, 10);
            } else {
                currentPlayer = 'X'; // Switch back to the player's turn
            }
        }
    }
}
