export default function Square({ value, onSquareClick, isHighlighted, isPrefilled }) {
  return (
    <button 
      className={`square ${isHighlighted ? 'highlighted' : ''} ${isPrefilled ? 'prefilled' : ''}`}
      onClick={!isPrefilled ? onSquareClick : undefined}
      disabled={isPrefilled}
    >
      {value}
    </button>
  );
}