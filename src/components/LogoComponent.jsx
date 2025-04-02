import React from "react";
import CustomSvg from "./customSvg";

const LogoComponent = () => {
  return (
    <div className="flex items-center justify-center w-[104px] h-[32px]" >
      <CustomSvg
        href={"/svg/symbol-defs.svg"}
        id={"icon-logo"}
        className={"size-5.5 fill-current stroke-current fill-[var(--color-icon-color)]"}
      />
      <span className="ml-2 text-[var(--color-logo)]">
        Task Pro
      </span>
    </div>
  );
};

export default LogoComponent;