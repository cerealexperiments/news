import React from 'react';
import { IoArrowBackSharp, IoShareSocialOutline } from "react-icons/io5";
import { Post } from "../types";
import { Link } from "react-router-dom";

const testPost: Post = {
  id: 1,
  title: "Заголовок новости",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.\n" +
    "              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.\n" +
    "              Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
  image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
  isLiked: false,
  comments: [
    {
      id: 1,
      user: {
        id: 1,
        name: "Олег",
        lastName: "Петров",
      },
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      replies: [
        {
          id: 2,
          user: {
            id: 2,
            name: "Лейн",
            lastName: "Ивакура"
          },
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        }
      ]
    }
  ]
}

const PostPage: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full pb-32">
      <div className="max-w-[845px]">
        <Link to={"/"}><IoArrowBackSharp size="30"/></Link>
        <p className="pt-6 text-2xl font-medium">{testPost.title}</p>
        <p className="pt-4 text-slate-500">{testPost.text.length > 200 ? testPost.text.slice(0, 200) : testPost.text}</p>
        <img className="pt-6 h-[500px] w-full object-cover object-center" src={testPost.image} alt=""/>
        <p className="pt-4 pb-6 text-slate-500">{testPost.text.length > 200 ? testPost.text.slice(200, testPost.text.length) : null}</p>
        <IoShareSocialOutline size="24" color="#64748b"/>
        <div className="pt-12">
          <p className="text-2xl font-medium pb-8">Комментарии</p>
          {testPost.comments?.map(comment => {
            return <div className="">
              <p className="font-medium text-xl">{`${comment.user.name} ${comment.user.lastName}`}</p>
              <p className="text-slate-500 pt-1.5">{comment.text}</p>
              <div className="pt-1.5 flex gap-8">
                <p className="underline text-violet-600">Ответить</p>
              </div>
              {comment.replies?.map(reply => {
                return <div className="pl-14 pt-6">
                  <p className="font-medium text-xl">{`${reply.user.name} ${reply.user.lastName}`}</p>
                  <p className="text-slate-500 pt-1.5">{reply.text}</p>
                  <div className="pt-1.5 flex gap-8">
                    <p className="underline text-violet-600">Ответить</p>
                  </div>
                </div>
              })}
            </div>
          })}
        </div>
        <div className="flex pt-8 gap-8">
          <input className="border-gray-300 rounded-xl border-2 px-4 py-2 max-w-md w-full" type="text" placeholder="Напишите комментарий..."/>
          <button className="bg-violet-700 py-2 px-8 rounded-xl text-white font-medium">Ответить</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
