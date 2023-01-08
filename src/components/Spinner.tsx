import React from 'react';
import {BiLoaderAlt} from "react-icons/bi";
import {motion} from "framer-motion";

const Spinner = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex justify-center items-center flex-1 w-full pb-8 overflow-hidden">
      <BiLoaderAlt className="animate-spin flex-1" size="30px"/>
    </motion.div>
  );
};

export default Spinner;
