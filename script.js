document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const newGameBtn = document.getElementById('newGameBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create cells for the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Handle cell click
    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            showWinnerModal(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            showWinnerModal('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => (
            gameBoard[pattern[0]] !== '' &&
            gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
            gameBoard[pattern[1]] === gameBoard[pattern[2]]
        ));
    }

    // Render the current state of the board
    function renderBoard() {
        gameBoard.forEach((value, index) => {
            const cell = document.querySelector(`.cell[data-index="${index}"]`);
            cell.textContent = value;
        });
    }

    // Show winner modal
    function showWinnerModal(message) {
        modalContent.textContent = message;
        modal.style.display = 'flex';
    }

    // Reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        renderBoard();
        modal.style.display = 'none';
    }

    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);

    // Initial board rendering
    renderBoard();
});
