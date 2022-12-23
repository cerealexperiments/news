import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Root from "./pages/Root";
import PostPage from "./pages/PostPage";
import Index from "./pages/Index";
import FavoritePosts from "./pages/FavoritePosts";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

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
        path: "/profile",
        element: <Profile/>
      },

      {
        path: "/post",
        element: <PostPage />
      },
      {
        path: "/favorites",
        element: <FavoritePosts />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/auth",
    element: <Auth />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
