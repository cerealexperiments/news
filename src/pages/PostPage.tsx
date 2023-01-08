import React, {useState, useEffect} from 'react';
import {IoArrowBackSharp, IoShareSocialOutline} from "react-icons/io5";
import {useParams, useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import {submitComment} from "../helpers/data";
import defaultImage from "../assets/defaultImage.png"
import Spinner from "../components/Spinner";
import CommentsList from "../components/CommentsList";
import {usePostData} from "../helpers/usePostData";
import {motion} from "framer-motion";

const PostPage: React.FC = () => {

  const {postId} = useParams();

  const navigate = useNavigate();

  const [commentText, setCommentText] = useState<string>("");

  const postQuery = usePostData(Number(postId));

  const commentMutation = useMutation({
    mutationFn: () => submitComment(Number(postId), commentText)
  })

  useEffect(() => {
    postQuery.refetch().then(() => {
      console.log("refetch");
    });
  }, [commentMutation?.data])
  return (
    <div className="max-w-screen-xl flex-1 mx-auto flex pt-8 w-full">
      {postQuery.isLoading && <Spinner/>}
        {postQuery.isSuccess &&
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.15}} className="max-w-[845px]">
            <button onClick={() => navigate(-1)}><IoArrowBackSharp size="30"/></button>
            <p className="pt-6 text-2xl font-medium">{postQuery.data.title}</p>
            <p
              className="pt-4 text-slate-500">{postQuery.data.text.length > 200 ? postQuery.data.text.slice(0, 200) : postQuery.data.text}</p>
            <img className="pt-6 max-h-[500px] max-w-full object-cover object-center"
                 src={postQuery.data.image === null ? defaultImage : `https://megalab.pythonanywhere.com/${postQuery.data.image}`}
                 alt="post title"/>
            <p
              className="pt-4 pb-6 text-slate-500">{postQuery.data.text.length > 200 ? postQuery.data.text.slice(200, postQuery.data.text.length) : null}</p>
            <IoShareSocialOutline size="24" color="#64748b"/>
            <div className="pt-12">
              <p className="text-2xl font-medium pb-8">Комментарии</p>
              {postQuery.data.comment ? <CommentsList comments={postQuery.data.comment} postId={Number(postId)}/> :
                <p>No comments yet</p>}
            </div>
            <div className="flex pt-8 gap-8 pb-32">
              <input
                onChange={(event) => setCommentText(event.target.value)}
                value={commentText}
                className="border-gray-300 rounded-xl border-2 px-4 py-2 max-w-md w-full" type="text"
                placeholder="Напишите комментарий..."/>
              <button onClick={() => commentMutation.mutate()}
                      className="bg-violet-600 hover:bg-violet-700 transition-colors py-2 px-8 rounded-xl text-white font-medium">Ответить
              </button>
              {commentMutation.isLoading && <p>submitting your comment...</p>}
              {commentMutation.isSuccess && <p>comment submitted!</p>}
            </div>
          </motion.div>
        }
    </div>
  );
};

export default PostPage;
