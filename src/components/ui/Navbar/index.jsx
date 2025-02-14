import { useEffect, useState } from "react";
import { auth } from "../../../utils/firebase";
import { useAuth } from "../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut().catch((error) => {
      console.log(error);
    });
  };

  const handleNavigate = () => {
    if (window.location.pathname === "/") {
      console.log(window.location.pathname);
      navigate("/sign-up");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="z-[100] w-full rounded-full absolute top-0 left-0 flex justify-between items-center md:py-8 sm:py-6 py-4 lg:px-[8%] md:px-[6%] px-[4%] text-offWhite backdrop-blur-md">
      <a className="flex justify-center items-center" href="/" rel="noreferrer">
        <img src="./images/htn.svg" alt="Hack the North Logo" />
        <h3 className="font-bold text-offWhite text-[1.8em] mx-3 font-Satoshibold">
          Hackathon Global Inc. 
        </h3>
      </a>
      {currentUser ? (
        <button
          className="flex justify-center items-center gap-6 border-offWhite border-[1px] py-1 px-8 text-[1.2em] font-Satoshilight transition-all duration-300 ease-in hover:bg-offWhite hover:text-primary"
          // className="mt-6 w-full border-offWhite border-[1px] border-solid text-offWhite font-Satoshilight text-[20px] py-4 transition-all duration-300 ease-in hover:bg-offWhite hover:text-primary"

          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="flex justify-center items-center gap-6 border-offWhite border-[1px] py-1 px-8 text-[1.2em] font-Satoshilight transition-all duration-300 ease-in hover:bg-offWhite hover:text-primary"
          onClick={handleNavigate}
        >
          {window.location.pathname === "/sign-up" ? "Go Back" : "Login"}
        </button>
      )}
    </div>
  );
};

export default Index;
