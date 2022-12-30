import React from 'react';
import {IoArrowBackSharp, IoShareSocialOutline} from "react-icons/io5";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Comment, CommentReply} from "../types";
import {fetchPostData} from "../helpers/data";
import defaultImage from "../assets/defaultImage.png"

const PostPage: React.FC = () => {

  const {postId} = useParams();
  const query = useQuery({
    queryKey: [postId],
    queryFn: () => fetchPostData(Number(postId))
  });

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full pb-32">
      <div className="max-w-[845px]">
        <Link to={"/"}><IoArrowBackSharp size="30"/></Link>
        {query.isLoading && <p>Loading...</p>}
        {query.isSuccess &&
          <>
            <p className="pt-6 text-2xl font-medium">{query.data.title}</p>
            <p
              className="pt-4 text-slate-500">{query.data.text.length > 200 ? query.data.text.slice(0, 200) : query.data.text}</p>
            <img className="pt-6 max-h-[500px] h-full max-w-full object-cover object-center"
                 src={query.data.image === null ? defaultImage : `https://megalab.pythonanywhere.com/${query.data.image}`}
                 alt="post title"/>
            <p
              className="pt-4 pb-6 text-slate-500">{query.data.text.length > 200 ? query.data.text.slice(200, query.data.text.length) : null}</p>
            <IoShareSocialOutline size="24" color="#64748b"/>
            <div className="pt-12">
              <p className="text-2xl font-medium pb-8">Комментарии</p>
              {query.data.comment?.map((comment: Comment) => {
                return <div key={comment.id} className="">
                  <p className="font-medium text-xl">{`${comment.user.name} ${comment.user["last_name"]}`}</p>
                  <p className="text-slate-500 pt-1.5">{comment.text}</p>
                  <div className="pt-1.5 flex gap-8">
                    <p className="underline text-violet-600">Ответить</p>
                  </div>
                  {comment.child?.map((reply: CommentReply) => {
                    return <div key={reply.id} className="pl-14 pt-6">
                      <p className="font-medium text-xl">{`${reply.user.name} ${reply.user["last_name"]}`}</p>
                      <p className="text-slate-500 pt-1.5">{reply.text}</p>
                      <div className="pt-1.5 flex gap-8">
                        <p className="underline text-violet-600">Ответить</p>
                      </div>
                    </div>
                  })}
                </div>
              })}
            </div>
          </>
        }
        <div className="flex pt-8 gap-8">
          <input className="border-gray-300 rounded-xl border-2 px-4 py-2 max-w-md w-full" type="text"
                 placeholder="Напишите комментарий..."/>
          <button className="bg-violet-700 py-2 px-8 rounded-xl text-white font-medium">Ответить</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
