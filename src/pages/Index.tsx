import React, {useState} from 'react';
import Filters from "../components/Filters";
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import {fetchPosts, fetchTags} from "../helpers/data";
import Spinner from "../components/Spinner";
import {useSearchParams} from "react-router-dom";

const Index = () => {

  const [selectedTag, setSelectedTag] = useState("");
  const [searchParams] = useSearchParams();
  const searchValue = (Object.fromEntries([...searchParams])).search
  console.log(`search value: ${searchValue}`);
  console.log(encodeURIComponent(selectedTag))

  const postsQuery = useQuery({
    queryKey: [selectedTag, searchValue],
    queryFn: () => fetchPosts(searchValue ? searchValue : "", selectedTag)
  });

  const tagsQuery = useQuery({
    queryKey: "tags",
    queryFn: fetchTags
  })

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full flex flex-1 justify-between gap-12">
      <div>
        {tagsQuery.isLoading ? <Spinner/> :
          <Filters setTag={setSelectedTag} tags={tagsQuery.data}/>}
      </div>
      {postsQuery.isLoading && <Spinner/>}
      {postsQuery.isSuccess && <>
        <PostsList posts={postsQuery.data}/>
      </>}
    </div>
  );
};

export default Index;
