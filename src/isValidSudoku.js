/**
 * Checks if a given Sudoku board is valid.
 * A valid Sudoku board must satisfy the following conditions:
 * 1. Each row must contain distinct numbers from 1 to 9 (ignoring empty cells).
 * 2. Each column must contain distinct numbers from 1 to 9 (ignoring empty cells).
 * 3. Each 3x3 sub-grid must contain distinct numbers from 1 to 9 (ignoring empty cells).
 * 4. Empty cells are represented by `null`.
 * @param {number[][]} board A two-dimensional array of numbers representing the Sudoku board.
 * @returns {boolean} Returns `true` if the board is valid, otherwise `false`.
 */
export function isValidSudoku(board) {
  // Check valid rows
  for (let row = 0; row < 9; row++) {
    let rowNums = board[row].filter((square) => square);
    let distinctRowNums = [...new Set(rowNums)];
    if (rowNums.length !== distinctRowNums.length) return false;
  }

  // Check valid columns
  for (let col = 0; col < 9; col++) {
    let colNums = new Set();
    for (let row = 0; row < 9; row++) {
      if (!board[row][col]) continue;
      else if (colNums.has(board[row][col])) return false;
      colNums.add(board[row][col]);
    }
  }

  // Check valid sub-cells
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      let boxNums = new Set();
      for (let r = row; r < row + 3; r++) {
        for (let c = col; c < col + 3; c++) {
          if (!board[r][c]) continue;
          else if (boxNums.has(board[r][c])) return false;
          boxNums.add(board[r][c]);
        }
      }
    }
  }

  // If all valid, return `true`
  return true;
}