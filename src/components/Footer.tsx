import React from 'react';
import logo from "../assets/logo.svg"

const Footer = () => {
  return (
    <div className="h-[192px] bg-zinc-900 flex flex-col items-center pt-8 mt-auto">
      <img className="pb-10" src={logo} alt=""/>
      <div className="flex gap-8">
        <p className="text-white text-lg">Мой профиль</p>
        <p className="text-white text-lg">Избранные новости</p>
      </div>
    </div>
  );
};

export default Footer;
