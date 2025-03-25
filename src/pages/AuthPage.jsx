import React, { useState } from "react";

export default function RegistrationPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F6F6F7] to-[#BEDBB0] p-4">
      <div
        className="bg-[#151515] text-white rounded-lg p-6 shadow-lg"
        style={{ width: "424px", height: "395px", borderRadius: "8px" }}
      >
        {/* Tab-uri Registration & Log In */}
        <div className="flex gap-4 justify-start mb-[40px]">
        <button
         className={`font-[Poppins] font-medium text-[18px] leading-[100%] tracking-[-2%] transition-colors duration-200 bg-transparent border-none outline-none ${
         isRegister ? "text-white" : "text-white/30 hover:text-white/30"
        }`}
            style={{ width: "106px", height: "27px" }}
            onClick={() => setIsRegister(true)}
          >
            Registration
          </button>
          <button
         className={`font-[Poppins] font-medium text-[18px] leading-[100%] tracking-[-2%] transition-transparent duration-200 bg-transparent border-none outline-none whitespace-nowrap ${
         isRegister ? "text-white/30 bg-transparent/30 hover:text-white" : "text-white"
        }`}è
            style={{ width: "51px", height: "27px" }}
            onClick={() => setIsRegister(false)}
          >
            Log In
          </button>
        </div>

        {/* Formular */}
        <form className="space-y-[14px]">
          {isRegister && (
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-[14px] pl-[18px] bg-[#1F1F1F] text-white rounded-md border border-[#BEDBB0] focus:outline-none"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-[14px] pl-[18px] bg-[#1F1F1F] text-white rounded-md border border-[#BEDBB0] focus:outline-none"
            />
          </div>

          {/* Input parolă cu icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full p-[14px] pl-[18px] pr-[40px] bg-[#1F1F1F] text-white rounded-md border border-[#BEDBB0] focus:outline-none"
            />
            <img
              src="/svg/eye.svg"
              alt="Show Password"
              className="absolute top-[16px] right-[18px] w-[16.5px] h-[12px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Buton */}
          <button
            className="w-full py-[14px] text-[#161616] bg-[#BEDBB0] rounded-md hover:bg-[#151515] hover:text-[#FFFFFF] transition text-center mt-[24px]"
          >  {isRegister ? "Register Now" : "Log In Now"}
          </button>
        </form>
      </div>
    </div>
  );
}


