import { useState } from "react";
import Square from "./Square";

export default function Board({ initialSudoku, sudoku, onPlay }) {
  const [selectedCell, setSelectedCell] = useState(null);

  function handleClick(row, col) {
    setSelectedCell({ row, col });
  }

  function handleNumberSelect(number) {
    if (!selectedCell) return;

    const nextSudoku = sudoku.map((row) => [...row]);
    nextSudoku[selectedCell.row][selectedCell.col] = number;
    setSelectedCell(null);
    onPlay(nextSudoku);
  }
  
  const NumberSelector = () => {
    const rows = Array.from({ length: 3 }, (_, i) => {
      const startNum = i * 3 + 1;
      return (
        <div key={i} className="number-selector-row">
          {Array.from({ length: 3 }, (_, j) => {
            const number = startNum + j;
            return (
              <button key={number} onClick={() => handleNumberSelect(number)}>
                {number}
              </button>
            );
          })}
        </div>
      );
    });

    return (
      <div className="number-selector">
        {rows}
      </div>
    );
  };

  let boardRows = [];
  for (let row = 0; row < 9; row++) {
    let boardRow = [];
    for (let col = 0; col < 9; col++) {
      boardRow.push(
        <Square
          key={9 * row + col}
          value={sudoku[row][col] !== 0 ? sudoku[row][col] : null}
          onSquareClick={() => handleClick(row, col)}
          isHighlighted={
            selectedCell?.row === row && selectedCell?.col === col
          }
          isPrefilled={initialSudoku[row][col] !== 0}
        />
      );
    }
    boardRows.push(
      <div key={row} className="board-row">
        {boardRow}
      </div>
    );
  }

  return (
    <>
      <div className="game-main">
        <div className="game-board">
          {boardRows}
        </div>
        <NumberSelector />
      </div>
    </>
  );
}