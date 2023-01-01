import React from 'react';
import PostItem from "./PostItem";
import {Post} from "../types";

type PostsListProps = {
  posts: Post[];
  canDelete: boolean
}

const PostsList: React.FC<PostsListProps> = ({posts, canDelete}) => {
  return (
    <div className="flex flex-col gap-4 divide-y pb-32 flex-1">
      {posts.map(post => {
        return <PostItem key={post.id} title={post.title} text={post.text}
                         image={`https://megalab.pythonanywhere.com/${post.image}`} isLiked={post.isLiked}
                         id={post.id}
                         canDelete={canDelete}/>
      })}
    </div>
  );
};

export default PostsList;
