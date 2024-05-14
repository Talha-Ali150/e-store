import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="heroMainContainer flex w-[60%] mx-auto items-center justify-center">
      <div className="mt-10">
        <p className="text-lg font-bold">BIG DEAL DAYS</p>
        <p className="text-5xl my-3">new collections for everyone</p>
        <button className="text-white flex items-center bg-gradient-to-r from-sky-500 to-purple-500 p-3 rounded-xl mt-8" onClick={()=>{window.location.href = "#collection"}}>Latest Collection <FaLongArrowAltRight className="mx-2" /> </button>
      </div>
      <div>
        <img
          src={require("../assets/images/hero.jpg")}
          className="hidden lg:flex lg:h-[500px] lg:w-[600px]"
          alt="hero section model"
        />
      </div>
    </div>
  );
};

export default Hero;
