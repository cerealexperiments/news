import React from 'react';
import { IoShareSocialOutline, IoHeartOutline } from "react-icons/io5";
import { Post } from "../types";
import { Link } from "react-router-dom";


const PostItem: React.FC<Post> = ({title, text, image}) => {
  return (
    <div className="flex gap-6 [&:not(:first-child)]:pt-4">
      <img className="max-w-[250px] h-[210px] object-cover object-center brightness-75" src={image} alt="post image"/>
      <div className="relative flex flex-col justify-center">
        <p className="font-medium text-lg pt-1 text-2xl">{title}</p>
        <p className="text-slate-500 pt-1 w-10/12">{text}</p>
        <Link to={"/post"}><p className="underline text-violet-700 pt-1 pb-4">Читать дальше...</p></Link>
        <IoShareSocialOutline size="24px" color="#64748b"/>
        <IoHeartOutline className="absolute top-0 right-0" size="24px"/>
      </div>
    </div>
  );
};

export default PostItem;
