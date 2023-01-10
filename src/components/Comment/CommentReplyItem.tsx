import React from 'react';
import {CommentReply} from "../../types";
import defaultProfile from "../../assets/defaultProfile.png";
import {motion} from "framer-motion";

const CommentReplyItem: React.FC<CommentReply> = ({id, user, text}) => {
  return (
    <motion.div initial={{
      opacity: 0,
    }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.3
                }} key={id} className="flex items-center pl-14 pt-6">
      <img className="h-10 w-10 rounded-full mr-4"
           src={user.profile_image !== null ? `https://megalab.pythonanywhere.com/${user.profile_image}` : defaultProfile}
           alt=""/>
      <div>
        <p className="font-medium text-xl">{`${user.name} ${user["last_name"]}`}</p>
        <p className="text-slate-500 ">{text}</p>
      </div>
    </motion.div>
  );
};

export default CommentReplyItem;
