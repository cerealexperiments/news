import React, {useState} from 'react';
import logo from "../assets/logo.svg";
import {useMutation} from "react-query";
import axios from "axios";

const Auth = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const authenticateUser = async () => {
    const response = await axios.post("https://megalab.pythonanywhere.com/login/", {
      nickname: nickname,
      password: password,
    })
    console.log(response.data);
    return response.data;
  }

  const mutation = useMutation(authenticateUser);

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
            <p>Никнейм</p>
            <input onChange={(event) => setNickname(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
          <div className="flex justify-between items-center">
            <p>Пароль</p>
            <input onChange={(event) => setPassword(event.target.value)}
                   className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
          </div>
        </div>
        <button onClick={handleSubmit}
                className="py-1.5 px-16 rounded-xl bg-violet-700 text-white w-fit self-center">Войти
        </button>
        <>
          {mutation.isError && <p>Error occured!</p>}
          {mutation.isSuccess && <p>User logged in successfully!</p>}
          {mutation.isSuccess && <p>{mutation.data.token}</p>}
          {mutation.isLoading && <p>Authenticating user...</p>}
        </>
      </div>
    </div>
  );
};

export default Auth;
