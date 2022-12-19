import React from 'react';
import {Post} from "../types";
import PostsList from "../components/PostsList";
import Filters from "../components/Filters";

const posts: Post[] = [
  {
    id: 1,
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022",
    isLiked: false
  },
  {
    id: 2,
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022",
    isLiked: false
  },
  {
    id: 3,
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022",
    isLiked: false
  }
]


const FavoritePosts = () => {
  return (
    <div className="max-w-screen-xl mx-auto pt-8">
      <h2 className="text-4xl font-medium pb-12">Избранные новости</h2>
      <PostsList posts={posts}/>
    </div>
  );
};

export default FavoritePosts;
