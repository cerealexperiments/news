import React, {ChangeEvent, useEffect, useState} from 'react';
import defaultImage from "../assets/defaultProfile.png"
import {FiDownload, FiTrash2} from "react-icons/fi";
import PostsList from "../components/PostsList";
import {useMutation} from "react-query";
import NewPostModal from "../components/NewPostModal";
import {editUserData} from "../helpers/data";
import Spinner from "../components/Spinner";
import {useUserPosts} from "../helpers/useUserPosts";
import {useUserData} from "../helpers/useUserData";

const Profile = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setImage(event.target.files[0])
  }

  const userData = useUserData();

  const profileMutation = useMutation({
    mutationFn: () => editUserData(nickname, name, lastName, image)
  })


  const postsQuery = useUserPosts()

  useEffect(() => {
    setNickname(userData?.data?.nickname);
    setName(userData?.data?.name);
    setLastName(userData?.data?.["last_name"]);
  }, [userData?.isSuccess])

  useEffect(() => {
    userData.refetch().then(() => console.log("refetched"));
  }, [profileMutation.isSuccess])

  const handleSubmit = async () => {
    console.log(name, nickname, lastName, image)
    profileMutation.mutate();
  }

  return (
    <div className="pt-12 max-w-screen-xl mx-auto w-full flex-1 flex flex-col">
      {userData.isLoading && <Spinner/>}
      {userData.isSuccess && <>
        <div className="flex items-center justify-start gap-32">
          <div className="flex flex-col">
            <img className="bg-neutral-200 rounded-full w-72 h-72 object-cover"
                 src={userData.data["profile_image"] === null ? defaultImage : `https://megalab.pythonanywhere.com/${userData.data["profile_image"]}`}
                 alt="profile image"/>
            <div className="flex gap-6 items-baseline justify-center">
              <div className="flex items-center gap-3 pt-4">
                <input type="file"
                       onChange={handleFileChange}
                       id="profileImage"
                       className="hidden file:py-1 file:px-4 file:border file:border-gray-300 file:text-sm file:rounded file:bg-white file:border-solid w-1/2"/>
                <label htmlFor="profileImage">Добавить фото</label>
                <FiDownload size="18"/>
              </div>
              <button onClick={() => {
                setImage(null);
              }
              } className="flex items-center gap-3 pt-4">
                Удалить
                <FiTrash2 size="18"/>
              </button>
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
            {profileMutation.isLoading && <p>editing your profile...</p>}
            {profileMutation.isError && <p>error occurred!</p>}
            {profileMutation.isSuccess && <p>profile edited successfully!</p>}
          </div>
        </div>

        <div className="flex justify-between pt-24">
          <h2 className="pb-12 font-medium text-4xl">Мои публикации</h2>
          <button onClick={openModal} className="py-1 px-6 rounded-xl bg-violet-700 text-white self-baseline">Новая
            публикация
          </button>
          <NewPostModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
        {postsQuery.isLoading && <Spinner/>}
        {postsQuery.isSuccess && <PostsList canDelete={true} posts={postsQuery.data}/>}
      </>}
    </div>
  );
};

export default Profile;
