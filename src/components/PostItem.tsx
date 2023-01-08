import React, {useEffect} from 'react';
import {IoShareSocialOutline} from "react-icons/io5";
import {FiTrash2, FiHeart} from "react-icons/fi";
import {Post} from "../types";
import {Link} from "react-router-dom";
import defaultImage from "../assets/defaultImage.png";
import {useMutation} from "react-query";
import {likePost, removePost, unlikePost} from "../helpers/data";
import {useUserPosts} from "../helpers/useUserPosts";
import {motion} from "framer-motion";
import {useFavoritePosts} from "../helpers/useFavoritePosts";

type PostItemProps = Post & {
  canDelete: boolean
}

const PostItem: React.FC<PostItemProps> = ({title, text, image, id, canDelete, is_liked}) => {

  const favoritePosts = useFavoritePosts();

  const likeMutation = useMutation({
    mutationFn: () => likePost(id)
  })

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePost(id)
  })

  const deleteMutation = useMutation({
    mutationFn: () => removePost(id)
  })

  const handleClick = () => {
    if(canDelete) {
      deleteMutation.mutate();
    } else if(is_liked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  }

  const postsQuery = useUserPosts();

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      postsQuery.refetch().then(() => console.log("refetched"));
    }
  }, [deleteMutation.status])

  useEffect(() => {
    if(unlikeMutation.isSuccess) {
      favoritePosts.refetch().then(() => console.log("refetched favorite posts"))
    }
  }, [unlikeMutation.status])

  return (
    <motion.div key={id}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.15
                }}
                className="flex gap-6 [&:not(:first-child)]:pt-4">
      <img className="max-w-[250px] flex-1 self-start aspect-[10/7] object-cover object-center brightness-75"
           src={image !== "https://megalab.pythonanywhere.com/null" ? image : defaultImage} loading="lazy"
           alt="post image"/>
      <div className="relative flex flex-col flex-1 justify-center">
        <p
          className="font-medium text-lg pt-1 text-2xl">{title.length > 50 ? `${title.substring(0, 50)}...` : title}</p>
        <p className="text-slate-500 pt-1 w-10/12">{text.length > 200 ? `${text.substring(0, 200)}...` : text}</p>
        <Link to={`/post/${id}`}>
          <p className="text-violet-600 hover:underline hover:text-violet-700 font-medium transition-colors pt-1 pb-4">Читать дальше...</p>
        </Link>
        <IoShareSocialOutline size="24px" color="#64748b"/>
        {deleteMutation.isLoading && <p>Deleting this post...</p>}
        {deleteMutation.isSuccess && <p>Post deleted!</p>}
        {likeMutation.isLoading && <p>Liking this post...</p>}
        {likeMutation.isSuccess && <p>Post liked!</p>}
        {unlikeMutation.isLoading && <p>unliking this post...</p>}
        {unlikeMutation.isSuccess && <p>Post unliked!</p>}
        {canDelete ? <FiTrash2 onClick={handleClick} className="flex justify-center items-center absolute top-0 right-0 cursor-pointer hover:text-red-700 transition-colors" size="24px"/> :
          <FiHeart onClick={handleClick} className={`${is_liked && "fill-red-600 text-red-600 hover:fill-white hover:text-black"}  absolute top-0 right-0 cursor-pointer hover:fill-red-600 hover:text-red-600 transition-colors`} size="24px"/>}
      </div>
    </motion.div>
  );
};

export default PostItem;
