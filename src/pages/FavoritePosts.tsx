import React from 'react';
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import {fetchFavoritePosts} from "../helpers/data";
import Spinner from "../components/Spinner";


const FavoritePosts = () => {

  const query = useQuery({
    queryKey: "favoritePosts",
    queryFn: fetchFavoritePosts
  })

  return (
    <div className="max-w-screen-xl w-full mx-auto pt-8 flex-1 flex flex-col">
      {query.isLoading && <Spinner/>}
      {query.isSuccess && <>
        <h2 className="text-4xl font-medium pb-12">Избранные новости</h2>
        <PostsList posts={query.data}/>
      </>}
    </div>
  );
};

export default FavoritePosts;
