import React from "react";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#F6F6F7] to-[#BEDBB0] p-4">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <img
          src="/images/avatar.png"
          alt="Avatar"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6"
        />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center justify-center gap-2">
          <img 
            src="/svg/icon.svg" 
            alt="Lightning Icon" 
            className="size-6"
          />
          Task Pro
        </h1>
        <p className="text-[#161616] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-2 text-sm sm:text-base md:text-lg font-poppins">
          Supercharge your productivity and take control of your tasks with Task Pro - 
          Don't wait, start achieving your goals now!
        </p>
        <div className="mt-6 flex flex-col gap-3 w-full justify-center items-center">
          <a
            href="/signup"
            className="w-[344px] h-[49px] flex items-center justify-center bg-[#161616] text-white rounded-md text-lg font-semibold font-poppins transition hover:bg-[#BEDBB0] hover:text-[#161616]"
          >
            Registration
          </a>
          <a
            href="/signin"
            className="w-[344px] h-[49px] flex items-center justify-center bg-transparent text-[#161616] rounded-md text-lg font-semibold font-poppins transition hover:bg-[#161616] hover:text-white"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}


