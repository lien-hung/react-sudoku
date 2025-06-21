export default function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button 
      className={`square ${isHighlighted ? 'highlighted' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}