import { motion } from "framer-motion";
import { landingSlideUp } from "../utils/motion";

const Landing = () => {
  return (
    <motion.div
      variants={landingSlideUp(0)}
      initial="initial"
      animate="animate"
      id="landing"
      className="w-full h-[100dvh] flex flex-col justify-center items-center relative overflow-clip"
    >
      <h1 className="z-10 font-Satoshibold bg-clip-text text-transparent bg-gradient-to-r from-[#F2A64A] via-[#FD2DF8] to-[#1AF8FE] from-[20%] via-[50%] to-[90%] lg:text-landingTitle md:text-[100px] sm:text-[80px] text-[12.077vw] leading-[1.1] tracking-tight">
        Hack the North
      </h1>
      <h2 className=" z-10 font-Satoshibold text-offWhite leading-[1.1] lg:text-landingSub md:text-[85px] sm:text-[70px] text-[9.662vw]">
        EVENTS
      </h2>
      <div className="z-10 text-offWhite opacity-70 lg:text-[24px] md:text-[22px] sm:text-[20px] text-[16px] font-SatoshiMedium flex md:flex-row flex-col justify-center items-center mt-4">
        <div>September 15-17, 2023 &#x2022; In-person event</div>
        <span className="md:inline hidden mx-2"> &#x2022;</span>
        <div>
          <img
            className="inline mb-1 mr-2 max-sm:h-[12px]"
            src="./images/mlh.svg"
            alt="MLH Logo"
          />
          Official Member
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;
