import Header from "./components/Header";
import Filters from "./components/Filters";
import PostsList from "./components/PostsList";

const posts = [
  {
    title: "Заголовок новости",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    imageUrl: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022"
  },
  {
    title: "Заголовок новости",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    imageUrl: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022"
  },
  {
    title: "Заголовок новости",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    imageUrl: "https://www.pcworld.com/wp-content/uploads/2022/08/dscf0453_final-100797561-orig-1.jpg",
    datePosted: "29.11.2022"
  }
]

function App() {
  return (
    <div className="">
      <Header />
      <div className="max-w-screen-xl mx-auto pt-8 flex justify-between gap-36">
        <Filters/>
        <PostsList posts={posts}/></div>
    </div>
  )
}

export default App
