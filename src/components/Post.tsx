import React from 'react';
import { IoShareSocialOutline, IoHeartOutline } from "react-icons/io5";

type PostProps = {
  title: string;
  content: string;
  imageUrl: string;
  datePosted: string;
}

const Post: React.FC<PostProps> = ({title, content, imageUrl, datePosted}) => {
  return (
    <div className="flex gap-6 [&:not(:first-child)]:pt-4">
      <img className="max-w-[250px] h-[210px] object-cover object-center brightness-75" src="https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg" alt="post image"/>
      <div className="relative">
        <p className="text-slate-500">{datePosted}</p>
        <p className="font-medium text-lg pt-1 text-2xl">{title}</p>
        <p className="text-slate-500 pt-1">{content}</p>
        <p className="underline text-purple-700 pt-1 pb-4">Читать дальше...</p>
        <IoShareSocialOutline size="24px" color="#64748b"/>
        <IoHeartOutline className="absolute top-0 right-0" size="24px"/>
      </div>
    </div>
  );
};

export default Post;
