import React from 'react';
import Filters from "../components/Filters";
import PostsList from "../components/PostsList";
import axios from "axios";
import {useQuery} from "react-query";

const fetchPosts = async () => {
  const data = await axios.get("https://megalab.pythonanywhere.com/post/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(data.data)
  return data.data;
}

const Index = () => {
  const query = useQuery("posts", fetchPosts);

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full flex gap-36">
      <Filters/>
      {query.isLoading && <p className="flex justify-center w-full">Loading...</p>}
      {query.isError && <p>You need to authorize first</p>}
      {query.isSuccess && <PostsList posts={query.data}/>}
    </div>
  );
};

export default Index;
