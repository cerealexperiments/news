import React from 'react';
import defaultPic from "../assets/default.svg"

const Profile = () => {
  return (
    <div className="pt-12 max-w-screen-xl mx-auto w-full">
      <div className="flex items-center justify-start gap-32">
        <div>
          <img className="p-12 bg-gray-200 rounded-full" src={defaultPic} alt="profile image"/>
          <p className="inline-block pt-4">Добавить фото</p>
          <p className="pl-6 inline-block">Удалить</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4 pb-8">
            <div className="flex justify-between items-center">
              <p>Фамилия</p>
              <input className="max-w-sm border border-slate-300 rounded-md p-1" type="text"/>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <p>Имя</p>
              <input className="max-w-sm border border-slate-300 rounded-md p-1" type="text"/>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <p>Никнейм</p>
              <input className="max-w-sm border border-slate-300 rounded-md p-1" type="text"/>
            </div>
          </div>
          <button className="bg-purple-700 py-1.5 px-8 rounded-xl text-white font-medium self-end">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
