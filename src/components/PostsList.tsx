import React from 'react';
import Post from "./Post";

type PostType = {
  title: string;
  content: string;
  imageUrl: string;
  datePosted: string;
}

type PostsListProps = {
  posts: PostType[];
}

const PostsList: React.FC<PostsListProps> = ({posts}) => {
  return (
    <div className="flex flex-col gap-4 pt-4 divide-y">
      {posts.map(post => {
        return <Post title={post.title} content={post.content} imageUrl={post.imageUrl} datePosted={post.datePosted}/>
      })}
    </div>
  );
};

export default PostsList;
