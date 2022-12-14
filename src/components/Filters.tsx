import React from 'react';

const Filters = () => {
  return (
    <div className="max-w-screen-xl mx-auto pt-8">
      <p className="font-medium text-lg">Фильтрация</p>
      <ul className="flex flex-col gap-2 pt-4 pb-4">
        <li className="flex gap-4">
          <input type="checkbox" className="w-4"/>
          Спорт
        </li>
        <li className="flex gap-4">
          <input type="checkbox" className="w-4"/>
          Политика
        </li>
        <li className="flex gap-4">
          <input type="checkbox" className="w-4"/>
          Звезды
        </li>
        <li className="flex gap-4">
          <input type="checkbox" className="w-4"/>
          Искусство
        </li>
        <li className="flex gap-4">
          <input type="checkbox" className="w-4"/>
          Мода
        </li>
      </ul>
      <button className="bg-purple-500 py-1 px-4 rounded-lg text-white font-medium">Применить</button>
    </div>
  );
};

export default Filters;
