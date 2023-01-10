import React, {useState, Fragment, ChangeEvent, useEffect} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {useMutation, useQuery} from "react-query";
import {Tag} from "../types";
import {fetchTags, submitPost} from "../helpers/data";
import {useUserPosts} from "../helpers/useUserPosts";
import Spinner from "./Spinner";

type NewPostModalProps = {
  isOpen: boolean,
  closeModal: () => void,
}

const NewPostModal: React.FC<NewPostModalProps> = ({isOpen, closeModal}) => {

  const [image, setImage] = useState<File>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState<string>("");

  const tagsQuery = useQuery({
    queryKey: "tags",
    queryFn: fetchTags
  })

  const newPostMutation = useMutation({
    mutationFn: () => submitPost(title, text, image, tag)
  })

  const handleSubmit = () => {
    newPostMutation.mutate();
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setImage(event.target.files[0])
  }

  const postsQuery = useUserPosts();

  useEffect(() => {
    if (newPostMutation.isSuccess) {
      postsQuery.refetch().then(() => console.log("refetched"));
    }
  }, [newPostMutation.status])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2 flex gap-8 items-center justify-start">
                  <p className="w-1/2">
                    Обложка новости
                  </p>
                  <div className="flex justify-start w-full">
                    <input
                      onChange={handleFileChange}
                      className="file:py-1 file:px-4 file:border file:border-gray-300 file:text-sm file:rounded outline-none file:bg-white file:border-solid"
                      type="file" accept="image"
                      title="Загрузить"/>
                  </div>
                </div>

                <div className="mt-4 flex gap-8 items-center">
                  <p className="w-1/2">
                    Заголовок
                  </p>
                  <input onChange={(event) => setTitle(event.target.value)}
                         className="w-full py-1 border border-gray-300 rounded" type="text"/>
                </div>

                <div className="mt-4 flex gap-8 items-start">
                  <p className="w-1/2">
                    Текст новости
                  </p>
                  <textarea onChange={(event) => setText(event.target.value)} rows={4}
                            className="w-full py-1 border border-gray-300 rounded"/>
                </div>

                <div className="mt-4 flex gap-8 items-start">
                  <p className="w-1/2">
                    Выбрать категорию
                  </p>
                  {tagsQuery.isLoading && <p>loading options...</p>}
                  {tagsQuery.isSuccess && <select onChange={(event) => setTag(event.target.value)
                  } defaultValue="Не выбрано"
                                                  className="w-full bg-white rounded border border-gray-300 py-1 px-2"
                                                  name="категория">
                    {tagsQuery.data?.map((item: Tag) => {
                      return <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    })
                    }
                  </select>
                  }
                </div>

                <div className="mt-8 flex justify-center">
                  <button onClick={handleSubmit}
                          className="py-1 px-12 bg-violet-700 rounded-xl text-white font-medium">Создать
                  </button>
                </div>
                {newPostMutation.isLoading && <div className="flex justify-center items-center flex-1 w-full pt-4"><Spinner/></div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewPostModal;
