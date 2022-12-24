import React, {Fragment, useState} from 'react';
import defaultPic from "../assets/defaultProfile.svg"
import { FiDownload, FiTrash2 } from "react-icons/fi";
import PostsList from "../components/PostsList";
import {Post} from "../types";
import { Dialog, Transition } from "@headlessui/react";

const posts: Post[] = [
  {
    id: 1,
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    isLiked: false
  },
  {
    id: 2,
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    isLiked: false
  },
  {
    id: 3,
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    isLiked: false
  }
]

const Profile = () => {

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="pt-12 max-w-screen-xl mx-auto w-full">
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
              <input className="max-w-sm border border-slate-300 rounded-xl p-1.5" type="text"/>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <p>Имя</p>
              <input className="max-w-sm border border-slate-300 rounded-xl p-1.5" type="text"/>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <p>Никнейм</p>
              <input className="max-w-sm border border-slate-300 rounded-xl p-1.5" type="text"/>
            </div>
          </div>
          <button className="bg-violet-700 py-2 px-8 rounded-xl text-white font-medium self-end">Сохранить</button>
        </div>
      </div>

      <div className="flex justify-between pt-24">
        <h2 className="pb-12 font-medium text-4xl">Мои публикации</h2>
        <button onClick={openModal} className="py-1 px-6 rounded-xl bg-violet-700 text-white self-baseline">Новая публикация</button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                        <option disabled selected>Не выбрано</option>
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
      <PostsList posts={posts} />
    </div>
  );
};

export default Profile;
