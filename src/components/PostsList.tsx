import React from 'react';
import PostItem from "./PostItem";
import { Post } from "../types";

type PostsListProps = {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({posts}) => {
  return (
    <div className="flex flex-col gap-4 divide-y pb-32">
      {posts.map(post => {
        return <PostItem title={post.title} text={post.text} image={post.image} datePosted={post.datePosted} isLiked={post.isLiked} id={post.id}/>
      })}
    </div>
  );
};

export default PostsList;
