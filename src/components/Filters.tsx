import React, {useState} from "react";
import {Tag} from "../types";
import {motion} from "framer-motion";
import Button from "./Button";

type FiltersProps = {
  tags: Tag[];
  setTag: React.Dispatch<React.SetStateAction<string>>;
};

const Filters: React.FC<FiltersProps> = ({ tags, setTag }) => {
  const [selected, setSelected] = useState("");
  const [checkedId, setCheckedId] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}>
      <p className="font-medium text-lg pb-4">Фильтрация</p>
      <ul className="flex flex-col gap-2 pb-4 max-h-64 w-full overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {tags.map((tag) => {
          return (
            <li key={tag.id} className="flex gap-4 hover:bg-slate-100 p-0.5">
              <input
                style={{WebkitAppearance: "checkbox"}}
                value={tag.name}
                checked={checkedId === tag.id}
                onChange={(event) => {
                  setCheckedId(() => {
                    setSelected(event.target.value);
                    return tag.id
                  });
                }}
                type="checkbox"
                name="tag"
                className="w-4 cursor-pointer accent-purple-600"
                id={tag.name}
              />
              <label className="cursor-pointer" htmlFor={tag.name}>{tag.name}</label>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-4 py-4 justify-center">
        <Button className="flex-1" onClick={() => setTag(selected)}>
          Применить
        </Button>
        <Button className="flex-1" onClick={() => {
          setTag("");
          setSelected("");
          setCheckedId(0);
        }}>
          Сбросить
        </Button>
      </div>
    </motion.div>
  );
};

export default Filters;
