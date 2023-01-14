import React from "react";
import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[192px] bg-zinc-900 flex flex-col items-center pt-8 mt-auto">
      <img className="pb-10" src={logo} alt="" />
      <div className="flex gap-8">
        <Link to="/profile" className="text-white text-lg hover:text-slate-300 transition-colors">
          Мой профиль
        </Link>
        <Link to="/favorites" className="text-white text-lg hover:text-slate-300 transition-colors">
          Избранные новости
        </Link>
      </div>
    </div>
  );
};

export default Footer;
