import React, {useState} from 'react';
import logo from "../assets/logo.svg";
import axios from "axios";
import {useMutation} from "react-query";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    const response = await axios.post("https://megalab.pythonanywhere.com/registration/", {
      name: name,
      ["last_name"]: lastName,
      nickname: nickname,
      password: password,
      ["password2"]: confirmPassword
    })
    console.log(response.data);
    return response.data;
  }

  const mutation = useMutation(registerUser);

  const handleSubmit = () => {
    mutation.mutate();
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
                className="py-1.5 px-8 rounded-xl bg-violet-700 text-white w-fit self-center">Регистрация
        </button>
        <>
          {mutation.isError && <p>Error occured!</p>}
          {mutation.isSuccess && <p>User registered successfully!</p>}
          {mutation.isLoading && <p>Registering user...</p>}
        </>
        <p className="text-sm text-slate-600 text-center pt-4">Уже есть логин?
          <a className="underline text-blue-800" href="src/pages/Register#"> Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
