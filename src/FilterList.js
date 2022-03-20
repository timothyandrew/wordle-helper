const styleForColor = (c) => {
  switch (c) {
    case 'green':
      return 'bg-green-400';
    case 'yellow':
      return 'bg-yellow-300';
    case 'gray':
      return 'bg-gray-400';
    default:
      break;
  }
}

function FilterList(props) {
  return (
    <div>
      {props.filters.map(([letter, color, position], i) => {
        console.log(letter, color, position);
        const positionText = (position !== null) && ` (${position + 1})`;

        return (<div className="flex flex-row items-stretch">
          <div className={styleForColor(color) + " text-center px-2 py-1 font-bold text-lg w-16"}>
            {letter.toUpperCase()}
            {positionText}
          </div>
          <button onClick={() => props.onDeleteFilter(i)} className="text-right ml-2">
            ❌
          </button>
        </div>);
      })}
    </div>
  );
}

export default FilterList;