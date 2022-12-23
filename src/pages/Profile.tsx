import React from 'react';
import defaultPic from "../assets/defaultProfile.svg"
import { FiDownload, FiTrash2 } from "react-icons/fi";
import PostsList from "../components/PostsList";
import {Post} from "../types";

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
        <button className="py-1 px-6 rounded-xl bg-violet-700 text-white self-baseline">Новая публикация</button>
      </div>
      <PostsList posts={posts} />
    </div>
  );
};

export default Profile;
