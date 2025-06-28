import { useState } from "react";
import Board from "./Board";
import { isValidSudoku } from "./isValidSudoku";
import { generateSudoku } from "./generateSudoku";

export default function Game() {
  const [history, setHistory] = useState([generateSudoku()]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSudoku = history[currentMove];

  function handlePlay(nextSudoku) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSudoku];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const isFull = currentSudoku.every(row => row.every(cell => cell !== 0));
  const isValid = isValidSudoku(currentSudoku);

  let status;
  if (isFull && isValid) {
    status = "Winner";
  } else if (!isValid) {
    status = "Invalid board";
  }

  return (
    <div className="game">
      <Board initialSudoku={history[0]} sudoku={currentSudoku} onPlay={handlePlay} />
      <div className="status">{status || "Valid board"}</div>
    </div>
  )
}