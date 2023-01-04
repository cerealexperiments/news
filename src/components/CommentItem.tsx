import React, {useEffect, useState} from 'react';
import {Comment, CommentReply} from "../types";
import defaultProfile from "../assets/defaultProfile.png";
import CommentReplyItem from "./CommentReplyItem";
import {replyToComment} from "../helpers/data";
import {useMutation} from "react-query";
import {usePostData} from "../helpers/usePostData";

type CommentItemProps = Comment & {
  postId: number
}

const CommentItem: React.FC<CommentItemProps> = ({id, user, text, child, postId}) => {

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const postQuery = usePostData(postId);

  const replyMutation = useMutation({
    mutationFn: () => replyToComment(postId, replyText, id)
  })

  useEffect(() => {
    if (replyMutation.isSuccess) {
      postQuery.refetch();
    }
  }, [replyMutation.status])

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
      {isReplying && (<div className="pl-14 flex pt-4 gap-4 items-center">
        <p className="font-medium text-md">Вы</p>
        <input
          value={replyText}
          onChange={(event) => setReplyText(event.target.value)}
          className="border-gray-300 rounded-xl border-2 px-4 py-1 max-w-md w-full" type="text"
          placeholder="Напишите комментарий..."/>
        <button onClick={() => {
          replyMutation.mutate()
          console.log(postId, id, text)
        }}
                className="bg-violet-700 py-1 px-8 rounded-xl text-white font-medium">Ответить
        </button>
        {replyMutation.isLoading && <p>replying...</p>}
        {replyMutation.isSuccess && <p>reply submitted!</p>}
      </div>)}
      <div className="pt-1.5 flex gap-8">
        <button onClick={() => setIsReplying((prev) => !prev)} className="underline text-violet-600">Ответить</button>
      </div>
      {child?.map((reply: CommentReply) => <CommentReplyItem key={reply.id} id={reply.id} user={reply.user}
                                                             text={reply.text}/>)}
    </div>
  );
};

export default CommentItem;
