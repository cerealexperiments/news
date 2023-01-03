import React from 'react';
import {BiLoaderAlt} from "react-icons/bi";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center flex-1 w-full pb-8 overflow-hidden">
      <BiLoaderAlt className="animate-spin flex-1" size="30px"/>
    </div>
  );
};

export default Spinner;
