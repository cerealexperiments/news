import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Root from "./pages/Root";
import PostPage from "./pages/PostPage";
import Index from "./pages/Index";
import FavoritePosts from "./pages/FavoritePosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "/post",
        element: <PostPage id={1} title={"Заголовок новости"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."} datePosted={"29.11.2022"} isLiked={false} image="https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg"/>
      },
      {
        path: "/favorites",
        element: <FavoritePosts />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
