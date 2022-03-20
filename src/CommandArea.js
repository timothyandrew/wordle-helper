import _ from "lodash";
import { useState } from "react";

function CommandArea(props) {
  // letter -> color -> position
  const [stage, setStage] = useState('letter');

  const [letter, setLetter] = useState(null);
  const [color, setColor] = useState(null);
  const [position, setPosition] = useState(null);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const reset = () => {
    setStage('letter');
    setLetter(null);
    setColor(null);
    setPosition(null);
  };

  const onClickLetter = (l) => {
    setLetter(l);
    setStage('color');
  };

  const onClickColor = (c) => {
    setColor(c);
    
    if (c !== 'gray') {
      setStage('position');
    } else {
      props.onCreateFilter(letter, c, null);
      reset();
    }
  };

  const onClickPosition = (p) => {
    setPosition(p);
    props.onCreateFilter(letter, color, p);
    reset();
  };

  const containerStyle = "flex flex-row flex-wrap justify-center";

  return (
    <div className="mt-8">
      {stage === 'letter' && <div className={containerStyle}>
        {letters.map(l => {
          return <button className="border px-2 py-1 m-1" onClick={() => onClickLetter(l)}>
            {l}
          </button>
        })}
      </div>}

      {stage === 'color' && <div className={containerStyle}>
        {['green', 'yellow', 'gray'].map(c => {
          return <button className="border px-4 py-2 m-1" onClick={() => onClickColor(c)}>
            {_.startCase(c)}
          </button>
        })}
      </div>}

      {stage === 'position' && <div className={containerStyle}>
        {[1, 2, 3, 4, 5].map(p => {
          return <button className="border px-4 py-2 m-1" onClick={() => onClickPosition(p)}>
            {p}
          </button>
        })}
      </div>}
    </div>
  );
}

export default CommandArea;