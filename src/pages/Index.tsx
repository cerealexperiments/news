import React, {useState} from 'react';
import Filters from "../components/Filters";
import PostsList from "../components/Layout/PostsList";
import {useQuery} from "react-query";
import {fetchPosts, fetchTags} from "../helpers/data";
import Spinner from "../components/Spinner";
import {useSearchParams} from "react-router-dom";

const Index = () => {

  const [selectedTag, setSelectedTag] = useState("");
  const [searchParams] = useSearchParams();
  const searchValue = (Object.fromEntries([...searchParams])).search

  const postsQuery = useQuery({
    queryKey: [selectedTag, searchValue],
    queryFn: () => fetchPosts(searchValue ? searchValue : "", encodeURIComponent(selectedTag))
  });

  const tagsQuery = useQuery({
    queryKey: "tags",
    queryFn: fetchTags
  })

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full flex flex-1 justify-between gap-12">
      <div>
        {tagsQuery.isLoading
          ? <Spinner className="flex justify-center items-center flex-1 w-full pb-8"/>
          : <Filters setTag={setSelectedTag} tags={tagsQuery.data}/>}
      </div>
      {postsQuery.isLoading && <Spinner className="flex justify-center items-center flex-1 w-full pb-8"/>}
      {postsQuery.isSuccess && <>
        <PostsList posts={postsQuery.data}/>
      </>}
    </div>
  );
};

export default Index;
