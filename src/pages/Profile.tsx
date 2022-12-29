import React, {Fragment, useEffect, useState} from 'react';
import defaultPic from "../assets/defaultProfile.svg"
import {FiDownload, FiTrash2} from "react-icons/fi";
import axios from "axios";
import PostsList from "../components/PostsList";
import {Post} from "../types";
import {Dialog, Transition} from "@headlessui/react";
import {useQuery} from "react-query";

const getProfileData = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/user/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

const getUserPosts = async (username: string) => {
  const response = await axios.get(`https://megalab.pythonanywhere.com/post/?author=${username}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

const Profile = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const query = useQuery("profile", getProfileData);

  const userNickname = query.data?.nickname;

  const postsQuery = useQuery({
    queryKey: "userPosts",
    queryFn: () => getUserPosts(userNickname),
    enabled: !!userNickname
  })


  useEffect(() => {
    setNickname(query?.data?.nickname);
    setName(query?.data?.name);
    setLastName(query?.data?.["last_name"]);
  }, [query?.isSuccess])

  const handleSubmit = async () => {
    console.log(name, nickname, lastName)
  }

  return (
    <div className="pt-12 max-w-screen-xl mx-auto w-full">
      {query.isLoading && <p>Loading user data...</p>}
      {query.isSuccess && <>
        <div className="flex items-center justify-start gap-32">
          <div className="flex flex-col ">
            <img className="p-12 bg-neutral-200 rounded-full" src={defaultPic} alt="profile image"/>
            <div className="flex gap-4">
              <p className="flex items-center gap-3 pt-4">
                Добавить фото
                <FiDownload size="18"/>
              </p>
              <p className="flex items-center gap-3 pt-4">
                Удалить
                <FiTrash2 size="18"/>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4 pb-8">
              <div className="flex justify-between items-center">
                <p>Фамилия</p>
                <input onChange={(event) => setLastName(event.target.value)} value={lastName}
                       className="max-w-sm border border-slate-300 rounded-xl p-1.5"
                       type="text"/>
              </div>
              <div className="flex justify-between space-x-4 items-center">
                <p>Имя</p>
                <input onChange={(event) => setName(event.target.value)} value={name}
                       className="max-w-sm border border-slate-300 rounded-xl p-1.5"
                       type="text"/>
              </div>
              <div className="flex justify-between space-x-4 items-center">
                <p>Никнейм</p>
                <input onChange={(event) => setNickname(event.target.value)} value={nickname}
                       className="max-w-sm border border-slate-300 rounded-xl p-1.5"
                       type="text"/>
              </div>
            </div>
            <button onClick={handleSubmit}
                    className="bg-violet-700 py-2 px-8 rounded-xl text-white font-medium self-end">Сохранить
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-24">
          <h2 className="pb-12 font-medium text-4xl">Мои публикации</h2>
          <button onClick={openModal} className="py-1 px-6 rounded-xl bg-violet-700 text-white self-baseline">Новая
            публикация
          </button>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25"/>
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel
                      className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div className="mt-2 flex gap-8 items-center justify-start">
                        <p className="w-1/2">
                          Обложка новости
                        </p>
                        <div className="flex justify-start w-full">
                          <button className="py-1 px-4 border border-gray-300 text-sm rounded">Загрузить</button>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-8 items-center">
                        <p className="w-1/2">
                          Заголовок
                        </p>
                        <input className="w-full py-1 border border-gray-300 rounded" type="text"/>
                      </div>

                      <div className="mt-4 flex gap-8 items-center">
                        <p className="w-1/2">
                          Краткое описание
                        </p>
                        <input className="w-full py-1 border border-gray-300 rounded" type="text"/>
                      </div>

                      <div className="mt-4 flex gap-8 items-start">
                        <p className="w-1/2">
                          Текст новости
                        </p>
                        <textarea rows={4} className="w-full py-1 border border-gray-300 rounded"/>
                      </div>

                      <div className="mt-4 flex gap-8 items-start">
                        <p className="w-1/2">
                          Выбрать категорию
                        </p>
                        <select className="w-full bg-white rounded border border-gray-300 py-1 px-2" name="категория">
                          <option disabled>Не выбрано</option>
                          <option>Politics</option>
                          <option>Sports</option>
                        </select>
                      </div>

                      <div className="mt-8 flex justify-center">
                        <button className="py-1 px-12 bg-violet-700 rounded-xl text-white font-medium">Создать</button>
                      </div>

                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        {postsQuery.isLoading && <p>Loading your posts...</p>}
        {postsQuery.isSuccess && <PostsList posts={postsQuery.data}/>}
      </>}
    </div>
  );
};

export default Profile;
