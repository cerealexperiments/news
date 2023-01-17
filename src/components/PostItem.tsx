import React, {Fragment, useEffect, useState} from 'react';
import {IoShareSocialOutline} from "react-icons/io5";
import {MdContentCopy} from "react-icons/md";
import {FiTrash2, FiHeart} from "react-icons/fi";
import {Post} from "../types";
import {Link} from "react-router-dom";
import {Menu, Transition} from "@headlessui/react";
import defaultImage from "../assets/defaultImage.png";
import {useMutation} from "react-query";
import {likePost, removePost, unlikePost} from "../helpers/data";
import {useUserPosts} from "../helpers/useUserPosts";
import {motion} from "framer-motion";
import {useFavoritePosts} from "../helpers/useFavoritePosts";
import Spinner from "./Spinner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

async function copyLinkToPost(postId: number) {
  const url = `${window.location.host}/post/${postId}`;
  await navigator.clipboard.writeText(url);
}

type PostItemProps = Post & {
  canDelete: boolean
}

const PostItem: React.FC<PostItemProps> = ({title, text, image, id, canDelete, is_liked}) => {

  const favoritePosts = useFavoritePosts();

  const likeMutation = useMutation({
    mutationFn: () => likePost(id)
  })

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePost(id)
  })

  const deleteMutation = useMutation({
    mutationFn: () => removePost(id)
  })

  const [isLiked, setIsLiked] = useState(is_liked);

  const handleClick = () => {
    if(canDelete) {
      deleteMutation.mutate();
    } else if(isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  }

  const postsQuery = useUserPosts();

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      postsQuery.refetch().then(() => console.log("refetched"));
    }
  }, [deleteMutation.status])

  useEffect(() => {
    if(unlikeMutation.isSuccess) {
      favoritePosts.refetch().then(() => console.log("refetched favorite posts"))
      setIsLiked(false);
    }
  }, [unlikeMutation.status])

  useEffect(() => {
    if(likeMutation.isSuccess) {
      setIsLiked(true);
    }
  }, [likeMutation.status])

  return (
    <motion.div
      key={id}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.15}}
      className="flex gap-6 [&:not(:first-child)]:pt-4">
      <img
        className="max-w-[250px] flex-1 self-start aspect-[10/7] object-cover object-center brightness-75"
        src={image !== "https://megalab.pythonanywhere.com/null" ? image : defaultImage} loading="lazy"
        alt="post image"/>
      <div className="relative flex flex-col flex-1 justify-center">
        <p className="font-medium text-lg pt-1 text-2xl">{title.length > 50 ? `${title.substring(0, 50)}...` : title}</p>
        <p className="text-slate-500 pt-1 w-10/12">{text.length > 200 ? `${text.substring(0, 200)}...` : text}</p>
        <Link to={`/post/${id}`}>
          <p className="text-violet-600 hover:underline hover:text-violet-700 font-medium transition-colors pt-1 pb-4">Читать дальше...</p>
        </Link>
        <Menu as="div" className="relative max-w-fit">
          <Menu.Button>
            <IoShareSocialOutline size="24px" color="#64748b"/>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute -right-24 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => copyLinkToPost(id)}
                        className={
                          "w-full flex items-center justify-between " +
                          classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )
                        }>
                        Скопировать ссылку
                        <MdContentCopy size={20}/>
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu.Button>
        </Menu>
        {canDelete ? deleteMutation.isLoading ? <div className="absolute top-0 right-0"><Spinner/></div> : <FiTrash2 onClick={handleClick} className="flex justify-center items-center absolute top-0 right-0 cursor-pointer hover:text-red-700 transition-colors" size="24px"/> :
          likeMutation.isLoading ? <div className="absolute top-0 right-0"><Spinner/></div> : <FiHeart onClick={handleClick} className={`${isLiked && "fill-red-600 text-red-600 hover:fill-white hover:text-black"}  absolute top-0 right-0 cursor-pointer hover:fill-red-600 hover:text-red-600 transition-colors`} size="24px"/>
        }
      </div>
    </motion.div>
  );
};

export default PostItem;
