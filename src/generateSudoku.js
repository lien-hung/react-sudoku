// Helper function to check if a number can be placed in a cell
function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
    const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    const boxCol = Math.floor(col / 3) * 3 + i % 3;
    if (grid[boxRow][boxCol] === num) return false;
  }
  return true;
}

// Backtracking function to generate a complete Sudoku grid
function generateCompleteGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = [...Array(9).keys()].map(n => n + 1).sort(() => Math.random() - 0.5);
        for (let num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (generateCompleteGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Function to remove numbers while ensuring solvability
function removeNumbers(grid, difficulty = 40) {
  const puzzle = grid.map(row => [...row]);
  let attempts = difficulty;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      const backup = puzzle[row][col];
      puzzle[row][col] = 0;
      const copy = puzzle.map(row => [...row]);
      if (!hasUniqueSolution(copy)) {
        puzzle[row][col] = backup; // Restore if not solvable
      } else {
        attempts--;
      }
    }
  }
  return puzzle;
}

// Function to check if the puzzle has a unique solution
function hasUniqueSolution(grid) {
  let solutions = 0;
  function solve(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              solve(grid);
              grid[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    solutions++;
  }
  solve(grid);
  return solutions === 1;
}

// Main function to generate a Sudoku puzzle
export function generateSudoku(difficulty = 40) {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  generateCompleteGrid(grid);
  return removeNumbers(grid, difficulty);
}