import {useQuery} from "react-query";
import axios from "axios";

const fetchUserData = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/user/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

export const useUserData = () => {
  const userData = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(),
  })
  return userData;
}
