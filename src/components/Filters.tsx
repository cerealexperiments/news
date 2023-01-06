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
      <p className="font-medium text-lg ">Фильтрация</p>
      <ul className="flex flex-col gap-2 pt-4 pb-4 max-h-64 w-full overflow-scroll">
        {tags.map(tag => {
          return <li key={tag.id} className="flex gap-4 ">
            <input value={tag.name} onChange={(event) => {
              setSelected(event.target.value);
              console.log(event.target.value);
            }} type="radio"
                   name="tag"
                   className="w-4"/>
            <label>{tag.name}</label>
          </li>
        })}
      </ul>
      <div className="flex gap-4 py-4">
        <button onClick={() => setTag(selected)}
                className="bg-violet-700 py-1.5 px-4 rounded-xl text-white font-medium">Применить
        </button>
        <button onClick={() => setTag("")}
                className="bg-violet-700 py-1.5 px-4 rounded-xl text-white font-medium">Сбросить
        </button>
      </div>
    </div>
  );
};

export default Filters;
