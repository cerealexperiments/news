import React, {useContext, useEffect, useState} from 'react';
import logo from "../assets/logo.svg";
import {useMutation} from "react-query";
import AuthContext from "../context/AuthContext";
import {Navigate} from "react-router-dom";
import {authenticateUser} from "../helpers/data";

const Auth = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(AuthContext);

  const authMutation = useMutation({
    mutationFn: () => authenticateUser(nickname, password)
  });

  useEffect(() => {
    if (authMutation.isSuccess) {
      console.log("authenticated!");
      localStorage.setItem("token", authMutation.data.token);
      login();
    }
  }, [authMutation.isSuccess])

  const handleSubmit = () => {
    authMutation.mutate();
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
                className="py-1.5 px-16 rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors font-medium text-white w-fit self-center">Войти
        </button>
        <>
          {authMutation.isError && <p>Error occurred!</p>}
          {authMutation.isSuccess && <p>User logged in successfully!</p>}
          {authMutation.isSuccess && <p>{authMutation.data.token}</p>}
          {authMutation.isSuccess && <Navigate to="/"/>
          }
          {authMutation.isLoading && <p>Authenticating user...</p>}
        </>
      </div>
    </div>
  );
};

export default Auth;
