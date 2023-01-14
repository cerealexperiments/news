import React, {useState, Fragment, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useMutation, useQuery} from "react-query";
import {Tag} from "../types";
import {fetchTags, submitPost} from "../helpers/data";
import {useUserPosts} from "../helpers/useUserPosts";
import Spinner from "./Spinner";
import Button from "./Button";
import FormField from "./FormField";

type NewPostModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, closeModal }) => {
  const [image, setImage] = useState<File>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState<string>("");

  const tagsQuery = useQuery({
    queryKey: "tags",
    queryFn: fetchTags,
  });

  const newPostMutation = useMutation({
    mutationFn: () => submitPost(title, text, image, tag),
  });

  const handlePost = () => {
    newPostMutation.mutate();
  };

  const postsQuery = useUserPosts();

  useEffect(() => {
    if (newPostMutation.isSuccess) {
      postsQuery.refetch().then(() => console.log("refetched"));
    }
  }, [newPostMutation.status]);

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
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-xl space-y-6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <FormField
                  label="Обложка новости"
                  value={image}
                  onChange={(event) => {
                    const target = event.target as HTMLInputElement;
                    if (!target.files) {
                      return;
                    }
                    setImage(target.files[0]);
                  }}
                  type="file"
                />
                <FormField
                  inputSize="large"
                  label="Заголовок"
                  value={title || ""}
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                />
                <FormField
                  inputSize="large"
                  label="Текст новости"
                  value={text || ""}
                  onChange={(event) => setText(event.target.value)}
                  type="textarea"
                />

                <div className="flex justify-between items-start">
                  <p>Выбрать категорию</p>
                  {tagsQuery.isLoading && <p>loading options...</p>}
                  {tagsQuery.isSuccess && <select
                      onChange={(event) => setTag(event.target.value)}
                      defaultValue="Не выбрано"
                      className="max-w-xs w-full bg-white rounded border border-gray-300 py-1 px-2"
                      name="категория">
                      {tagsQuery.data?.map((item: Tag) => {
                        return <option key={item.id} value={item.name}>{item.name}</option>
                      })}
                    </select>
                  }
                </div>

                <div className="flex justify-center">
                  {newPostMutation.isLoading
                    ? <Spinner className="mt-8 w-[128px] h-[32px] flex justify-center items-center flex-1 w-full" />
                    : <Button className="mt-8" size="thin" onClick={handlePost}>Создать</Button>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewPostModal;
