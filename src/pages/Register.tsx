import React, {useState, useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import {useMutation} from "react-query";
import {registerUser} from "../helpers/data";
import Button from "../components/Button";
import { notifySuccess, notifyError } from "../helpers/notifications";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: () =>
      registerUser(name, lastName, nickname, password, confirmPassword),
  });

  useEffect(() => {
    if (registerMutation.isSuccess) {
      notifySuccess("Регистрация выполнена успешно");
      navigate("/auth");
    } else if (registerMutation.isError) {
      notifyError("Не удалось зарегистрироваться");
    }
  }, [registerMutation.status]);

  const handleSubmit = () => {
    registerMutation.mutate();
  };

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-center h-screen items-center">
      <div className="flex flex-col rounded-2xl shadow-modal shadow-zinc-400 px-10 py-6 max-w-lg w-screen">
        <div className="flex justify-center pb-8">
          <img className="w-32"
            src={logo}
            alt="logo"
            style={{
              filter:
                "invert(44%) sepia(19%) saturate(1714%) hue-rotate(219deg) brightness(88%) contrast(92%)",
            }}
          />
        </div>
        <div className="flex flex-col gap-6 pb-8">
          <FormField label="Фамилия" value={lastName} onChange={(event) => setLastName(event.target.value)} type="text"/>
          <FormField label="Имя" value={name} onChange={(event) => setName(event.target.value)} type="text"/>
          <FormField label="Никнейм" value={nickname} onChange={(event) => setNickname(event.target.value)} type="text"/>
          <FormField label="Пароль" value={password} onChange={(event) => setPassword(event.target.value)} type="password"/>
          <FormField label="Потверждение пароля" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password"/>
        </div>
        {registerMutation.isLoading
          ? <Spinner className="self-center" />
          : <Button className="self-center" size="thin" onClick={handleSubmit}>Регистрация</Button>
        }
        <p className="text-sm text-slate-600 text-center pt-4">
          Уже есть логин?
          <Link
            to="/auth"
            className="pl-1 font-medium text-violet-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
