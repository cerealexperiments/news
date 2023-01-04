import {useQuery} from "react-query";
import axios from "axios";

export const fetchPostData = async (postId: number | undefined) => {
  const data = await axios.get(`https://megalab.pythonanywhere.com/post/${postId}/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(data.data);
  return data.data;
}

export const usePostData = (postId: number) => {
  const postData = useQuery({
    queryKey: [postId],
    queryFn: () => fetchPostData(postId),
  })
  return postData;
}
