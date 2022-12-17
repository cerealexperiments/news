import React from 'react';
import { IoArrowBackSharp, IoShareSocialOutline } from "react-icons/io5";
import { Post } from "../types";
import { Link } from "react-router-dom";

const PostPage: React.FC<Post> = ({title, text, image, datePosted, comments}) => {
  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full">
      <div className="max-w-[845px]">
        <Link to={"/"}><IoArrowBackSharp size="30"/></Link>
        <p className="pt-4 text-slate-500">{datePosted}</p>
        <p className="pt-2 text-2xl font-medium">{title}</p>
        <p className="pt-4 text-slate-500">{text.length > 200 ? text.slice(0, 200) : text}</p>
        <img className="pt-6 h-[500px] w-full object-cover object-center" src={image} alt=""/>
        <p className="pt-4 pb-6 text-slate-500">{text.length > 200 ? text.slice(200, text.length) : null}</p>
        <IoShareSocialOutline size="24" color="#64748b"/>
        <div className="pt-12">
          <p className="text-2xl font-medium pb-8">Комментарии</p>
          {comments?.map(comment => {
            return <div className="">
              <p className="font-medium text-xl">{`${comment.user.name} ${comment.user.lastName}`}</p>
              <p className="text-slate-500 pt-1.5">{comment.text}</p>
              <div className="pt-1.5 flex gap-8">
                <p className="text-slate-500">{comment.datePosted}</p>
                <p className="underline text-violet-600">Ответить</p>
              </div>
              {comment.replies?.map(reply => {
                return <div className="pl-14 pt-6">
                  <p className="font-medium text-xl">{`${reply.user.name} ${reply.user.lastName}`}</p>
                  <p className="text-slate-500 pt-1.5">{reply.text}</p>
                  <div className="pt-1.5 flex gap-8">
                    <p className="text-slate-500">{comment.datePosted}</p>
                    <p className="underline text-violet-600">Ответить</p>
                  </div>
                </div>
              })}
            </div>
          })}
        </div>
        <input className="" type="text"/>
      </div>
    </div>
  );
};

export default PostPage;
