import React, {useState} from 'react';
import {IoArrowBackSharp, IoShareSocialOutline} from "react-icons/io5";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {Comment, CommentReply} from "../types";
import {fetchPostData, submitComment} from "../helpers/data";
import defaultImage from "../assets/defaultImage.png"
import Spinner from "../components/Spinner";

const PostPage: React.FC = () => {

  const {postId} = useParams();

  const [commentText, setCommentText] = useState<string>("");

  const postQuery = useQuery({
    queryKey: [postId],
    queryFn: () => fetchPostData(Number(postId)),
  });

  const commentMutation = useMutation({
    mutationFn: () => submitComment(Number(postId), commentText)
  })

  return (
    <div className="max-w-screen-xl flex-1 mx-auto flex pt-8 w-full">
      {postQuery.isLoading && <Spinner/>}
      <div className="max-w-[845px]">
        {postQuery.isSuccess &&
          <>
            <Link to={"/"}><IoArrowBackSharp size="30"/></Link>
            <p className="pt-6 text-2xl font-medium">{postQuery.data.title}</p>
            <p
              className="pt-4 text-slate-500">{postQuery.data.text.length > 200 ? postQuery.data.text.slice(0, 200) : postQuery.data.text}</p>
            <img className="pt-6 max-h-[500px] h-full max-w-full object-cover object-center"
                 src={postQuery.data.image === null ? defaultImage : `https://megalab.pythonanywhere.com/${postQuery.data.image}`}
                 alt="post title"/>
            <p
              className="pt-4 pb-6 text-slate-500">{postQuery.data.text.length > 200 ? postQuery.data.text.slice(200, postQuery.data.text.length) : null}</p>
            <IoShareSocialOutline size="24" color="#64748b"/>
            <div className="pt-12">
              <p className="text-2xl font-medium pb-8">Комментарии</p>
              {postQuery.data.comment?.map((comment: Comment) => {
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
            <div className="flex pt-8 gap-8 pb-32">
              <input
                onChange={(event) => setCommentText(event.target.value)}
                value={commentText}
                className="border-gray-300 rounded-xl border-2 px-4 py-2 max-w-md w-full" type="text"
                placeholder="Напишите комментарий..."/>
              <button onClick={() => commentMutation.mutate()}
                      className="bg-violet-700 py-2 px-8 rounded-xl text-white font-medium">Ответить
              </button>
              {commentMutation.isLoading && <p>submitting your comment...</p>}
              {commentMutation.isSuccess && <p>comment submitted!</p>}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default PostPage;
