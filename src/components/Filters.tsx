import React, {useState} from 'react';
import {Tag} from "../types";

type FiltersProps = {
  tags: Tag[];
  setTag: React.Dispatch<React.SetStateAction<string>>
}

const Filters: React.FC<FiltersProps> = ({tags, setTag}) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="">
      <p className="font-medium text-lg pb-4">Фильтрация</p>
      <ul
        className="flex flex-col gap-2 pb-4 max-h-64 w-full overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {tags.map(tag => {
          return <li key={tag.id} className="flex gap-4 hover:bg-slate-100 p-0.5">
            <input value={tag.name} onChange={(event) => {
              setSelected(event.target.value);
              console.log(event.target.value);
            }} type="radio"
                   name="tag"
                   className="w-4 cursor-pointer"/>
            <label>{tag.name}</label>
          </li>
        })}
      </ul>
      <div className="flex gap-4 py-4 justify-center">
        <button onClick={() => setTag(selected)}
                className="bg-violet-600 hover:bg-violet-700 transition-colors py-1.5 px-4 rounded-xl text-white font-medium">Применить
        </button>
        <button onClick={() => setTag("")}
                className="bg-violet-600 hover:bg-violet-700 transition-colors py-1.5 px-4 rounded-xl text-white font-medium">Сбросить
        </button>
      </div>
    </div>
  );
};

export default Filters;
