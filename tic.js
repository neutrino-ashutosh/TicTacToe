class TicTacToe {
  constructor(size) {
      this.size = size;
      this.board = Array.from({ length: size }, () => Array(size).fill(null));
      this.currentPlayer = 'X';
      this.gameOver = false;
      this.initBoard();
  }

  initBoard() {
      const gameBoard = document.getElementById('gameBoard');
      gameBoard.style.gridTemplateColumns = `repeat(${this.size}, 50px)`;
      gameBoard.innerHTML = '';
      for (let row = 0; row < this.size; row++) {
          for (let col = 0; col < this.size; col++) {
              const cell = document.createElement('div');
              cell.classList.add('cell');
              cell.dataset.row = row;
              cell.dataset.col = col;
              cell.addEventListener('click', () => this.makeMove(row, col));
              gameBoard.appendChild(cell);
          }
      }
  }

  makeMove(row, col) {
      if (this.gameOver || this.board[row][col]) return;

      this.board[row][col] = this.currentPlayer;
      document.querySelector(`[data-row='${row}'][data-col='${col}']`).textContent = this.currentPlayer;

      if (this.checkWin(row, col)) {
          alert(`${this.currentPlayer} wins!`);
          this.gameOver = true;
          return;
      }

      if (this.isBoardFull()) {
          alert('Draw!');
          this.gameOver = true;
          return;
      }

      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWin(row, col) {
      const directions = [
          [[0, 1], [0, -1]],
          [[1, 0], [-1, 0]],
          [[1, 1], [-1, -1]],
          [[1, -1], [-1, 1]],
      ];
      for (const [dir1, dir2] of directions) {
          if (this.countInDirection(row, col, dir1) + this.countInDirection(row, col, dir2) >= this.size - 1) {
              return true;
          }
      }
      return false;
  }

  countInDirection(row, col, [dx, dy]) {
      let count = 0;
      for (let i = 1; i < this.size; i++) {
          const newRow = row + i * dx;
          const newCol = col + i * dy;
          if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size && this.board[newRow][newCol] === this.currentPlayer) {
              count++;
          } else {
              break;
          }
      }
      return count;
  }

  isBoardFull() {
      return this.board.flat().every(cell => cell);
  }
}

let game;

function startGame() {
  const gridSize = parseInt(document.getElementById('gridSize').value, 10);
  game = new TicTacToe(gridSize);
}

function restartGame() {
  if (game) {
      game.initBoard();
      game.board = Array.from({ length: game.size }, () => Array(game.size).fill(null));
      game.currentPlayer = 'X';
      game.gameOver = false;
  }
}
