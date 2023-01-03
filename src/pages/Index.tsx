import React from 'react';
import Filters from "../components/Filters";
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import {fetchPosts} from "../helpers/data";
import Spinner from "../components/Spinner";

const Index = () => {

  const postsQuery = useQuery({
    queryKey: "posts",
    queryFn: fetchPosts
  });

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full flex flex-1 gap-36">
      {postsQuery.isLoading && <Spinner/>}
      {postsQuery.isError && <p>You need to authorize first</p>}
      {postsQuery.isSuccess && <>
        <Filters/>
        <PostsList posts={postsQuery.data}/>
      </>}
    </div>
  );
};

export default Index;
