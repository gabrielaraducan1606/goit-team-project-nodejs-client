import React from "react";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-green-200 p-4">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        
        {/* Avatar */}
        <img
          src="/images/avatar.png"
          alt="Avatar"
          className="w-24 h-24 mx-auto mb-6"
        />

        {/* Titlu Task Pro */}
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2">
          <img 
            src="/svg/icon.svg" 
            alt="Lightning Icon" 
            className="size-6"
          />
          Task Pro
        </h1>

        {/* Text descriptiv */}
        <p className="text-[#161616] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-6 text-sm sm:text-base md:text-lg">
          Supercharge your productivity and take control of your tasks with Task Pro. 
          Don't wait, start achieving your goals now!
        </p>

        {/* Butoane */}
        <div className="mt-6 flex flex-col gap-3 w-full items-center">
          
          {/* Registration */}
          <a
            href="/signup"
            className="w-[344px] h-[49px] flex items-center justify-center bg-[#161616] text-white rounded-md hover:bg-[#BEDBB0] transition text-lg font-semibold"
          >
            Registration
          </a>

          {/* Log In */}
          <a
            href="/signin"
            className="w-[344px] h-[49px] flex items-center justify-center text-[#161616] rounded-md hover:bg-[#161616] hover:text-white transition text-lg font-semibold"
          >
            Log In
          </a>

        </div>
      </div>
    </div>
  );
}

