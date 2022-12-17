import Header from "./components/Header";
import Filters from "./components/Filters";
import PostsList from "./components/PostsList";
import Footer from "./components/Footer";
import { Post  } from "./types";


const posts: Post[] = [
  {
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022",
    isLiked: false
  },
  {
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022",
    isLiked: false
  },
  {
    title: "Заголовок новости",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022",
    isLiked: false
  }
]

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="max-w-screen-xl mx-auto pt-8 flex justify-between gap-36">
        <Filters/>
        <PostsList posts={posts}/>
      </div>
      <Footer />
    </div>
  )
}

export default App
