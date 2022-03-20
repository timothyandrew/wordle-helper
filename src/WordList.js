const MAX_WORDS = 14;

function WordList(props) {
  const words = props.words.slice(0, MAX_WORDS);

  return (
    <div className="text-center">
      <ul>
        {words.map(w => {
          return <li>
            {w}
          </li>
        })}
      </ul>

      {props.words.length > MAX_WORDS && <span>
        and {props.words.length - MAX_WORDS} more
      </span>}

    </div>
  );
}

export default WordList;