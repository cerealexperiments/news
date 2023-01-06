import React, {useState} from 'react';
import Filters from "../components/Filters";
import PostsList from "../components/PostsList";
import {useQuery} from "react-query";
import {fetchPosts, fetchTags} from "../helpers/data";
import Spinner from "../components/Spinner";

const Index = () => {

  const [selectedTag, setSelectedTag] = useState("");

  const postsQuery = useQuery({
    queryKey: [selectedTag],
    queryFn: () => fetchPosts("", selectedTag)
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
