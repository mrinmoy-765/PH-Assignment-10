import React from "react";
import banner from "../assets/banner.jpg";

const Banner = () => {
  const handleWatchNow = () => {
    window.open("https://www.youtube.com/watch?v=7vZp3yGxZXE", "_blank");
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      <img src={banner} alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-[90%] sm:max-w-[60%]">
        <span className="bg-red-500  text-xs sm:text-sm px-2 py-1  uppercase tracking-wide">
          Adventure
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mt-8">
          Fate/Stay Night: Unlimited
        </h1>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
          Blade Works
        </h1>
        <p className="text-sm sm:text-base mt-2">
          After 30 days of travel across the world
        </p>
        <button
          onClick={handleWatchNow}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm sm:text-base transition duration-300"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
