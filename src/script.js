const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameOver = false;

// Mode buttons
const vsAIBtn = document.getElementById('vsAIBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
let vsAISelected;

(function () {
  vsAIBtn.classList.add('selected', 'bg-blue-700');
  vsAISelected = true;
})();

// Outcome message element
const outcomeMessage = document.querySelector('.outcome');

// Reset button
const resetButton = document.getElementById('reset');

// Function to reset the game
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  outcomeMessage.textContent = '';
  gameOver = false;
  currentPlayer = 'X';
  if (vsAISelected && currentPlayer === 'O') {
    makeComputerMove();
  }
}

// Add click event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameOver && cell.textContent === '') {
      cell.textContent = currentPlayer;

      if (checkForWin(currentPlayer)) {
        gameOver = true;
        outcomeMessage.textContent = `Player ${currentPlayer} wins!`;
      } else if (isBoardFull()) {
        gameOver = true;
        outcomeMessage.textContent = 'It\'s a draw!';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        if (vsAISelected && currentPlayer === 'O') {
          makeComputerMove();
        }
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
          outcomeMessage.textContent = 'Computer wins!';
        } else if (isBoardFull()) {
          gameOver = true;
          outcomeMessage.textContent = 'It\'s a draw!';
        } else {
          currentPlayer = 'X'; // Switch back to the player's turn
        }
      }
    }
  }
  

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);

// Add click event listeners to mode buttons
vsAIBtn.addEventListener('click', () => {
  vsAIBtn.classList.add('selected', 'bg-blue-700');
  twoPlayerBtn.classList.remove('selected', 'bg-blue-700');
  vsAISelected = true;
  resetGame();
});

twoPlayerBtn.addEventListener('click', () => {
  twoPlayerBtn.classList.add('selected', 'bg-blue-700');
  vsAIBtn.classList.remove('selected', 'bg-blue-700');
  vsAISelected = false;
  resetGame();
});

// Initial setup
resetGame();