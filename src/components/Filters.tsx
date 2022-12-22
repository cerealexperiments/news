import React from 'react';

const filterValues = ["Спорт", "Политика", "Звезды", "Искусство", "Мода"];

const Filters = () => {
  return (
    <div>
      <p className="font-medium text-lg">Фильтрация</p>
      <ul className="flex flex-col gap-2 pt-4 pb-4">
        {filterValues.map(item => {
          return <li key={item} className="flex gap-4">
            <input type="checkbox" className="w-4"/>
            <label>{item}</label>
          </li>
        })}
      </ul>
      <button className="bg-violet-700 py-1.5 px-8 rounded-xl text-white font-medium">Применить</button>
    </div>
  );
};

export default Filters;
