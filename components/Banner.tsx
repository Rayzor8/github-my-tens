import React from "react";
import { BsGithub } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="flex gap-4 justify-center items-center mb-4">
      <BsGithub className="text-6xl" />
      <h1 className="text-2xl">Search Repository Github</h1>
    </div>
  );
};

export default Banner;
