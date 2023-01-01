import React from 'react';
import {IoShareSocialOutline, IoHeartOutline} from "react-icons/io5";
import {FiTrash2} from "react-icons/fi";
import {Post} from "../types";
import {Link} from "react-router-dom";
import defaultImage from "../assets/defaultImage.png";
import {useMutation} from "react-query";
import {likePost, removePost} from "../helpers/data";

type PostItemProps = Post & {
  canDelete: boolean
}

const PostItem: React.FC<PostItemProps> = ({title, text, image, id, canDelete}) => {

  const likeMutation = useMutation({
    mutationFn: () => likePost(id)
  })

  const deleteMutation = useMutation({
    mutationFn: () => removePost(id)
  })

  const handleClick = () => {
    canDelete ? deleteMutation.mutate() : likeMutation.mutate();
  }

  return (
    <div className="flex gap-6 [&:not(:first-child)]:pt-4">
      <img className="max-w-[250px] flex-1 h-[210px] object-cover object-center brightness-75"
           src={image !== "https://megalab.pythonanywhere.com/null" ? image : defaultImage} alt="post image"/>
      <div className="relative flex flex-col flex-1 justify-center">
        <p className="font-medium text-lg pt-1 text-2xl">{title}</p>
        <p className="text-slate-500 pt-1 w-10/12">{text}</p>
        <Link to={`/post/${id}`}>
          <p className="underline text-violet-700 pt-1 pb-4">Читать дальше...</p>
        </Link>
        <IoShareSocialOutline size="24px" color="#64748b"/>
        {deleteMutation.isLoading && <p>Deleting this post...</p>}
        {deleteMutation.isSuccess && <p>Post deleted!</p>}
        {likeMutation.isLoading && <p>Liking this post...</p>}
        {likeMutation.isSuccess && <p>Post liked!</p>}
        {canDelete ? <FiTrash2 onClick={handleClick} className="absolute top-0 right-0 cursor-pointer" size="24px"/> :
          <IoHeartOutline onClick={handleClick} className="absolute top-0 right-0 cursor-pointer" size="24px"/>}
      </div>
    </div>
  );
};

export default PostItem;
