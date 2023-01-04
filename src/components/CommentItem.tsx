import React from 'react';
import {Comment, CommentReply} from "../types";
import defaultProfile from "../assets/defaultProfile.png";
import CommentReplyItem from "./CommentReplyItem";

const CommentItem: React.FC<Comment> = ({id, user, text, child}) => {
  return (
    <div key={id}>
      <div className="flex items-center">
        <img className="h-10 w-10 rounded-full mr-4"
             src={user.profile_image !== null ? `https://megalab.pythonanywhere.com/${user.profile_image}` : defaultProfile}
             alt=""/>
        <div>
          <p className="font-medium text-xl">{`${user.name} ${user["last_name"]}`}</p>
          <p className="text-slate-500 ">{text}</p>
        </div>
      </div>
      <div className="pt-1.5 flex gap-8">
        <p className="underline text-violet-600">Ответить</p>
      </div>
      {child?.map((reply: CommentReply) => <CommentReplyItem key={reply.id} id={reply.id} user={reply.user}
                                                             text={reply.text}/>)}
    </div>
  );
};

export default CommentItem;
