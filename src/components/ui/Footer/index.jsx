import React from "react";

const index = () => {
  return (
    <div className="w-full border-t-[1px] border-offWhite border-solid flex sm:flex-row  sm:justify-start justify-between sm:items-center pt-4 pb-8">
      <a className="text-offWhite font-Satoshibold flex items-center md:text-[1.4em] text-[1.2em] w-1/2" href="#landing">
        <img
          src="./images/htn.svg"
          alt="HTN Logo"
          className="object-cover mr-2"
        />
        Events
      </a>
      <a
        href="https://github.com/NickShum222/HTN-Frontend-Challenge"
        target="_blank"
        className="text-[1em] font-Satoshi text-offWhite opacity-60 transition-all duration-300 ease-in hover:opacity-100 sm:-translate-x-1/2"
      >
        Nick Shum 2024
      </a>
    </div>
  );
};

export default index;
