import React, {useEffect, useState} from 'react';
import defaultPic from "../assets/defaultProfile.svg"
import {FiDownload, FiTrash2} from "react-icons/fi";
import axios from "axios";
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import NewPostModal from "../components/NewPostModal";
import {fetchProfileData} from "../helpers/data";

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

  const profileQuery = useQuery({
    queryKey: "profile",
    queryFn: fetchProfileData
  });

  const userNickname = profileQuery.data?.nickname;

  const postsQuery = useQuery({
    queryKey: "userPosts",
    queryFn: () => getUserPosts(userNickname),
    enabled: !!userNickname
  })

  useEffect(() => {
    setNickname(profileQuery?.data?.nickname);
    setName(profileQuery?.data?.name);
    setLastName(profileQuery?.data?.["last_name"]);
  }, [profileQuery?.isSuccess])

  const handleSubmit = async () => {
    console.log(name, nickname, lastName)
  }

  return (
    <div className="pt-12 max-w-screen-xl mx-auto w-full">
      {profileQuery.isLoading && <p>Loading user data...</p>}
      {profileQuery.isSuccess && <>
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
                <input onChange={(event) => setLastName(event.target.value)} value={lastName || ""}
                       className="max-w-sm border border-slate-300 rounded-xl p-1.5"
                       type="text"/>
              </div>
              <div className="flex justify-between space-x-4 items-center">
                <p>Имя</p>
                <input onChange={(event) => setName(event.target.value)} value={name || ""}
                       className="max-w-sm border border-slate-300 rounded-xl p-1.5"
                       type="text"/>
              </div>
              <div className="flex justify-between space-x-4 items-center">
                <p>Никнейм</p>
                <input onChange={(event) => setNickname(event.target.value)} value={nickname || ""}
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
          <NewPostModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
        {postsQuery.isLoading && <p>Loading your posts...</p>}
        {postsQuery.isSuccess && <PostsList posts={postsQuery.data}/>}
      </>}
    </div>
  );
};

export default Profile;
