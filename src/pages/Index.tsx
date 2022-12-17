import React from 'react';
import {Post} from "../types";
import Filters from "../components/Filters";
import PostsList from "../components/PostsList";

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

const Index = () => {
  return (
    <div className="max-w-screen-xl mx-auto pt-8 flex justify-between gap-36">
      <Filters/>
      <PostsList posts={posts}/>
    </div>
  );
};

export default Index;
