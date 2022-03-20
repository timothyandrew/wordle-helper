import dict from './dict.json'
import './App.css';
import { useState } from 'react';
import WordList from './WordList';
import FilterList from './FilterList';
import CommandArea from './CommandArea';
import _ from 'lodash';

const words = _.shuffle(dict);

function App() {
  const [filters, setFilters] = useState([]);

  const onCreateFilter = (letter, color, position) => {
    setFilters([...filters, [letter.toLowerCase(), color, (position !== null) ? position - 1 : null]]);
  };

  const onDeleteFilter = (i) => {
    setFilters(filters.filter((f, fi) => fi !== i));
  }

  const filteredWords = filters.length === 0 ? words : words.filter(w => {
    return filters.every(([letter, color, position]) => {
      if (color === 'green') {
        return w[position] === letter;
      }

      if (color === 'yellow') {
        return w[position] !== letter && w.includes(letter);

      }

      if (color === 'gray') {
        return !w.includes(letter);
      }

      console.error("PANIC");
      return true;
    });
  });



  return (
    <div className="container mx-auto px-2 flex flex-col h-screen">
      <div className="flex flex-row justify-around h-3/5 overflow-scroll">
        <WordList words={filteredWords} />
        <FilterList filters={filters} onDeleteFilter={onDeleteFilter} />
      </div>
      <div className="">
        <CommandArea onCreateFilter={onCreateFilter} />
      </div>
    </div>
  );
}

export default App;
