import React from "react";

const LogoComponent = () => {
  return (
    <div className="flex items-center justify-center w-[104px] h-[32px]"
         style={{ color: "var(--text-color)" }}>
      {/* SVG Logo */}
      <img src="/public/svg/logo.svg" alt="TaskPro Logo" className="bg-[#1F1F1F] p-[8px_10px] rounded-md" />
      {/* Text */}
      <span className="ml-2 text-[16px] font-semibold leading-[100%] tracking-[-0.04em] font-poppins">
        Task Pro
      </span>
    </div>
  );
};

export default LogoComponent;


