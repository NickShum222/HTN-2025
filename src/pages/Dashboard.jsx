import React from "react";
import Landing from "../sections/Landing";
import Events from "../sections/Events";
import { Footer } from "../components";

export default function Dashboard() {
  return (
    <>
    {/* Layout of Main Dashboard */}
      <div className="bg-primary w-full min-h-[100dvh] flex flex-col z-[20] lg:px-[8%] md:px-[6%] px-[4%]">
        <Landing />
        <Events /> 
        <Footer/>
      </div>
    </>
  );
}
