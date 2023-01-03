import React from 'react';
import {Comment, CommentReply} from "../types";
import defaultProfile from "../assets/defaultProfile.png";

type CommentsListProps = {
  comments: Comment[]
}

const CommentsList: React.FC<CommentsListProps> = ({comments}) => {
  return (
    <div className="flex flex-col gap-8">
      {comments.map((comment: Comment) => {
        return <div key={comment.id}>
          <div className="flex items-center">
            <img className="h-10 w-10 rounded-full mr-4"
                 src={comment.user.profile_image !== null ? `https://megalab.pythonanywhere.com/${comment.user.profile_image}` : defaultProfile}
                 alt=""/>
            <div>
              <p className="font-medium text-xl">{`${comment.user.name} ${comment.user["last_name"]}`}</p>
              <p className="text-slate-500 ">{comment.text}</p>
            </div>
          </div>
          <div className="pt-1.5 flex gap-8">
            <p className="underline text-violet-600">Ответить</p>
          </div>
          {comment.child?.map((reply: CommentReply) => {
            return <div key={reply.id} className="flex items-center pl-14 pt-6">
              <img className="h-10 w-10 rounded-full mr-4"
                   src={reply.user.profile_image !== null ? `https://megalab.pythonanywhere.com/${reply.user.profile_image}` : defaultProfile}
                   alt=""/>
              <div>
                <p className="font-medium text-xl">{`${reply.user.name} ${reply.user["last_name"]}`}</p>
                <p className="text-slate-500 ">{reply.text}</p>
              </div>
            </div>
          })}
        </div>
      })}
    </div>
  );
};

export default CommentsList;
