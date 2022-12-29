import React from 'react';
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import axios from "axios";

const getLikedPosts = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/like/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

const FavoritePosts = () => {

  const query = useQuery({
    queryKey: "favoritePosts",
    queryFn: getLikedPosts
  })

  return (
    <div className="max-w-screen-xl mx-auto pt-8">
      <h2 className="text-4xl font-medium pb-12">Избранные новости</h2>
      {query.isLoading && <p>Loading favorite posts...</p>}
      {query.isSuccess && <PostsList posts={query.data}/>}
    </div>
  );
};

export default FavoritePosts;
