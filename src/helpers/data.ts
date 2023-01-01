import axios from "axios";

export const authenticateUser = async (nickname: string, password: string) => {
  const response = await axios.post("https://megalab.pythonanywhere.com/login/", {
    nickname: nickname,
    password: password,
  })
  console.log(response.data);
  return response.data;
}

export const registerUser = async (name: string, lastName: string, nickname: string, password: string, confirmPassword: string) => {
  const response = await axios.post("https://megalab.pythonanywhere.com/registration/", {
    name: name,
    ["last_name"]: lastName,
    nickname: nickname,
    password: password,
    ["password2"]: confirmPassword
  })
  console.log(response.data);
  return response.data;
}

export const fetchPosts = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/post/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data)
  return response.data;
}

export const fetchPostData = async (postId: number | undefined) => {
  const data = await axios.get(`https://megalab.pythonanywhere.com/post/${postId}/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(data.data);
  return data.data;
}

export const fetchFavoritePosts = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/like/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

export const fetchProfileData = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/user/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data);
  return response.data;
}

export const fetchTags = async () => {
  const response = await axios.get("https://megalab.pythonanywhere.com/tag/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  })
  console.log(response.data)
  return response.data;
}

export const submitPost = async (title: string, text: string, image: File | undefined, tag: string) => {
  const response = await axios.post("https://megalab.pythonanywhere.com/post/", {
    title: title,
    text: text,
    image: image,
    tag: tag
  }, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      ["Content-Type"]: "multipart/form-data"
    },
  })
  console.log(response.data);
  return response.data;
}

export const removePost = async (postId: number) => {
  const response = await axios.delete(`https://megalab.pythonanywhere.com/post/${postId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    }
  })
  console.log(response);
  return response.data;
}

export const likePost = async (postId: number) => {
  const response = await axios.post("https://megalab.pythonanywhere.com/like/", {
    post: postId
  }, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    }
  })
  console.log(response.data);
  return response.data;
}

export const editUserData = async (nickname: string, name: string, lastName: string, profileImage: null | File) => {
  const response = await axios.put("https://megalab.pythonanywhere.com/user/", {
    nickname: nickname,
    name: name,
    ["last_name"]: lastName,
    ["profile_image"]: profileImage || null
  }, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      ["Content-Type"]: "multipart/form-data"
    }
  })
  console.log(response.data);
  return response.data;
}

