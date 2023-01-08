import React from 'react';
import PostsList from "../components/PostsList";
import {useFavoritePosts} from "../helpers/useFavoritePosts";
import Spinner from "../components/Spinner";


const FavoritePosts = () => {

  const query = useFavoritePosts();

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
