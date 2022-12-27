import React from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Index from "./Index";
import FavoritePosts from "./FavoritePosts";
import NotFound from "./NotFound";
import PostPage from "./PostPage";
import Profile from "./Profile";

const Root = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header/>
        <Routes>
          <Route index element={<Index/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="post/:postId" element={<PostPage/>}/>
          <Route path="/favorites" element={<FavoritePosts/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default Root;
