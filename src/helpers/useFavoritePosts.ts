import axios from "axios";
import {useQuery} from "react-query";

export const fetchFavoritePosts = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/like/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

export const useFavoritePosts = () => {
  const favoritePosts = useQuery({
    queryKey: "favoritePosts",
    queryFn: fetchFavoritePosts,
  })
  return favoritePosts
}
