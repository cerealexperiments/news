import {useQuery} from "react-query";
import {useUserData} from "./useUserData";
import axios from "axios";

export const fetchUserPosts = async (username: string) => {
  const response = await axios.get(`https://megalab.pythonanywhere.com/post/?author=${username}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  return response.data;
}

export const useUserPosts = () => {
  const userQuery = useUserData();
  const userPosts = useQuery({
    queryKey: ["users", userQuery?.data?.nickname],
    queryFn: () => fetchUserPosts(userQuery.data.nickname),
    enabled: !!userQuery?.data?.nickname
  })
  return userPosts;
}
