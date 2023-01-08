import React, {useState} from 'react';
import {Link} from "react-router-dom";
import logo from "../assets/logo.svg";
import {useMutation} from "react-query";
import {registerUser} from "../helpers/data";

const Register = () => {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: () => registerUser(name, lastName, nickname, password, confirmPassword)
  });

  const handleSubmit = () => {
    registerMutation.mutate();
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-center h-screen items-center">
      <div className="flex flex-col rounded-2xl shadow-modal shadow-zinc-400 px-10 py-6 max-w-lg w-screen">
        <div className="flex justify-center pb-8">
          <img className="w-32" src={logo} alt="logo"
               style={{filter: "invert(44%) sepia(19%) saturate(1714%) hue-rotate(219deg) brightness(88%) contrast(92%)"}}/>
        </div>
        <div className="flex flex-col gap-6 pb-8">
          <div className="flex justify-between items-center">
            <p>Фамилия</p>
            <input onChange={(event) => setLastName(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
          <div className="flex justify-between items-center">
            <p>Имя</p>
            <input onChange={(event) => setName(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
          <div className="flex justify-between items-center">
            <p>Никнейм</p>
            <input onChange={(event) => setNickname(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
          <div className="flex justify-between items-center">
            <p>Пароль</p>
            <input onChange={(event) => setPassword(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
          <div className="flex justify-between items-center">
            <p>Потверждение пароля</p>
            <input onChange={(event) => setConfirmPassword(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
        </div>
        <button onClick={handleSubmit}
                className="py-1.5 px-8 rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors text-white w-fit self-center">Регистрация
        </button>
        <>
          {registerMutation.isLoading && <p>Registering user...</p>}
          {registerMutation.isError && <p>Error occured!</p>}
          {registerMutation.isSuccess && <p>User registered successfully!</p>}
        </>
        <p className="text-sm text-slate-600 text-center pt-4">Уже есть логин?
          <Link to="/auth" className="pl-1 font-medium text-violet-600 hover:underline"> Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
