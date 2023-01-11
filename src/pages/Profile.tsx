import React, {ChangeEvent, useEffect, useState} from 'react';
import defaultImage from "../assets/defaultProfile.png"
import {FiDownload, FiTrash2} from "react-icons/fi";
import PostsList from "../components/Layout/PostsList";
import {useMutation} from "react-query";
import NewPostModal from "../components/NewPostModal";
import {editUserData} from "../helpers/data";
import Spinner from "../components/Spinner";
import {useUserPosts} from "../helpers/useUserPosts";
import {useUserData} from "../helpers/useUserData";
import {motion} from "framer-motion";
import Button from "../components/Button";
import {notifyError, notifySuccess} from "../helpers/notifications";

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
    console.log(userData.status);
    if(userData.isSuccess) {
      setNickname(userData?.data?.nickname);
      setName(userData?.data?.name);
      setLastName(userData?.data?.["last_name"]);
    }
  }, [userData?.status])

  useEffect(() => {
    if(profileMutation.isSuccess) {
      userData.refetch();
      notifySuccess("Profile updated successfully");
    } else if(profileMutation.isError) {
      notifyError("Could not update profile");
    }
  }, [profileMutation.status])

  const handleSubmit = async () => {
    profileMutation.mutate();
  }

  return (
    <div className="pt-12 max-w-screen-xl mx-auto w-full flex-1 flex flex-col">
      {userData.isLoading && <Spinner className="flex justify-center items-center flex-1 w-full pb-8"/>}
      {userData.isSuccess && <>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.15}} className="flex items-center justify-start gap-32">
          <div className="flex flex-col">
            <img className="bg-neutral-200 rounded-full w-72 h-72 object-cover"
                 src={userData.data["profile_image"] === null ? defaultImage : `https://megalab.pythonanywhere.com/${userData.data["profile_image"]}`}
                 alt="profile image"/>
            <div className="flex gap-6 items-baseline items-center pt-4 justify-center">
              <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors p-1.5">
                <input type="file"
                       onChange={handleFileChange}
                       id="profileImage"
                       className="hidden file:py-1 file:px-4 file:border file:border-gray-300 file:text-sm file:rounded file:bg-white file:border-solid w-1/2"/>
                <label className="cursor-pointer" htmlFor="profileImage">Добавить фото</label>
                <FiDownload size="18"/>
              </div>
              <button onClick={() => {
                setImage(null);
              }
              } className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors p-1.5">
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
            {profileMutation.isLoading
              ? <Spinner className="self-end w-[128px] h-[40px] flex justify-center items-center"/>
              : <Button className="self-end" size="large" onClick={handleSubmit}>Сохранить</Button>
            }
          </div>
        </motion.div>

        <div className="flex justify-between pt-24">
          <h2 className="pb-12 font-medium text-4xl">Мои публикации</h2>
          <Button className="px-6" onClick={openModal}>
            Новая публикация
          </Button>
          <NewPostModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
        {postsQuery.isLoading && <Spinner className="flex justify-center items-center flex-1 w-full pb-8 "/>}
        {postsQuery.isSuccess && <PostsList canDelete={true} posts={postsQuery.data}/>}
      </>}
    </div>
  );
};

export default Profile;
