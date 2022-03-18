import dict from './dict.json'
import './App.css';
import { useState } from 'react';

function App() {
  const [locked, setLocked] = useState([null, null, null, null, null]);
  const [misplaced, setMisplaced] = useState([null, null, null, null, null]);
  const [wrong, setWrong] = useState(new Set());

  const MAX_WORDS = 20;

  const updateLocked = (e, i) => {
    const value = e.target.value === "" ? null : e.target.value;
    setLocked([0, 1, 2, 3, 4].map((mi) => mi === i ? value : locked[mi]));
  };

  const updateMisplaced = (e, i) => {
    const value = e.target.value === "" ? null : e.target.value.split(",").map(v => v.trim()).filter(v => v !== "");
    setMisplaced([0, 1, 2, 3, 4].map((mi) => mi === i ? value : misplaced[mi]));
  };

  const updateWrong = (e) => {
    const values = e.target.value === "" ? [] : e.target.value.split(",").map(v => v.trim()).filter(v => v !== "");
    setWrong(new Set([...values]));
  };

  const words = dict.filter(w => {
    const checkLocked = locked.every((l, i) => l === null || l[0] === w[i]);
    const checkMisplaced = misplaced.every((m, i) => m === null || m.every(l => w[i] !== l[0] && w.includes(l[0])))
    const checkWrong = [...wrong].every(l => !w.includes(l[0]));

    return checkLocked && checkMisplaced && checkWrong;
  });

  return (
    <div>
      <div>
        <h1>Green</h1>
        <ul>
          {[0, 1, 2, 3, 4].map(i => {
            return (
              <li key={i}>{i+1}: <input type="text" value={locked[i]} onChange={(e) => updateLocked(e, i)}></input></li>
            );
          })}
        </ul>
        <p>{JSON.stringify(locked)}</p>
      </div>

      <div>
        <h1>Yellow</h1>
        <ul>
          {[0, 1, 2, 3, 4].map(i => {
            return (
              <li key={i}>{i+1}: <input type="text" onChange={(e) => updateMisplaced(e, i)}></input></li>
            );
          })}
        </ul>
        <p>{JSON.stringify(misplaced)}</p>
      </div>


      <div>
        <h1>Gray</h1>
        <ul>
          <input type="text" onChange={(e) => updateWrong(e)}></input>
        </ul>
        <p>{JSON.stringify([...wrong])}</p>
      </div>


      <div>
        <ul>
          {words.slice(0, MAX_WORDS).map(w => <li key={w}>{w}</li>)}

          {words.length > MAX_WORDS && <div>
            and {words.length - MAX_WORDS} more...
          </div>}
        </ul>
      </div>
    </div>
  );
}

export default App;
