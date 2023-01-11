import React from 'react';
import {BiLoaderAlt} from "react-icons/bi";
import {motion} from "framer-motion";

type SpinnerProps = {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({className= ""}) => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className={`overflow-hidden ${className}`}>
      <BiLoaderAlt className="animate-spin flex-1" size="30px"/>
    </motion.div>
  );
};

export default Spinner;
