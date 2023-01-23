import React, {useContext, useEffect, useState} from 'react';
import logo from "../assets/logo.svg";
import {useMutation} from "react-query";
import AuthContext from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {authenticateUser} from "../helpers/data";
import Button from "../components/Button";
import {notifySuccess, notifyError} from "../helpers/notifications";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";

const Auth = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const authMutation = useMutation({
    mutationFn: () => authenticateUser(nickname, password)
  });

  useEffect(() => {
    if (authMutation.isSuccess) {
      localStorage.setItem("token", authMutation.data.token);
      login();
      notifySuccess("Вход выполнен успешно");
      navigate("/");
    } else if(authMutation.isError) {
      notifyError("Не удалось войти в аккаунт");
    }
  }, [authMutation.status])

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
          <FormField label="Никнейм" value={nickname} onChange={(event) => setNickname(event.target.value)} type="text"/>
          <FormField label="Пароль" value={password} onChange={(event) => setPassword(event.target.value)} type="password"/>
        </div>
        {authMutation.isLoading
          ? <Spinner className="self-center"/>
          : <Button className="self-center" size="thin" onClick={handleSubmit}>Войти</Button>}
        <p className="text-sm text-slate-600 text-center pt-4">
          Нет аккаунта?
          <Link
            to="/register"
            className="pl-1 font-medium text-violet-600 hover:underline">
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
