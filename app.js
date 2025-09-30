const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's turn";
}

function handleClick(e) {
  if (!gameActive) return;
  const cell = e.target;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winCombos.some(combo => {
    return combo.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

// Start the game on load
startGame();
