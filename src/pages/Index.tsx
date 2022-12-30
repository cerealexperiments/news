import React from 'react';
import Filters from "../components/Filters";
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import {fetchPosts} from "../helpers/data";

const Index = () => {

  const postsQuery = useQuery({
    queryKey: "posts",
    queryFn: fetchPosts
  });

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full flex gap-36">
      <Filters/>
      {postsQuery.isLoading && <p className="flex justify-center w-full">Loading...</p>}
      {postsQuery.isError && <p>You need to authorize first</p>}
      {postsQuery.isSuccess && <PostsList posts={postsQuery.data}/>}
    </div>
  );
};

export default Index;
