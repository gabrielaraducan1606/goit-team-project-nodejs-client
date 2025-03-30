import React from "react";
import { Link } from "react-router";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#F6F6F7] to-[#BEDBB0] p-4">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <img
          src="/images/avatar.png"
          alt="Avatar"
          className="size-16 sm:size-20 md:size-24 mx-auto mb-6"
        />
        <h1 className="text-xl text-[#161616] sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center justify-center gap-2">
          <img src="/svg/icon.svg" alt="Lightning Icon" className="size-6" />
          Task Pro
        </h1>
        <p className="text-[#161616] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-2 text-sm">
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
        <div className="mt-6 flex flex-col gap-3 w-full justify-center items-center">
          <Link
            to={"/auth"}
            className="w-[21.5rem] h-[3rem] flex items-center justify-center bg-[#161616] text-white rounded-md text-sm font-semibold transition"
          >
            Registration
          </Link>
          <Link
            to={"/auth"}
            className=" flex items-center justify-center bg-transparent text-[#161616] text-sm font-semibold transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
