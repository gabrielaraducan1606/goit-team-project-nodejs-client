import React from "react";
import CustomSvg from "./customSvg";
import Button from "./button";
import { useSearchParams } from "react-router";

const LogoComponent = () => {
  const [, setSearchParams] = useSearchParams({});

  return (
    <div className="flex items-center justify-start max-md:justify-between w-full h-[32px]">
      <div className="flex items-center">
        <CustomSvg
          href={"/svg/symbol-defs.svg"}
          id={"icon-logo"}
          className={"size-5.5 stroke-current fill-icon-color"}
        />
        <span className="ml-2 text-logo">Task Pro</span>
      </div>

      <Button
        variant={"icon"}
        className={"md:hidden"}
        onClick={() => {
          setSearchParams({});
        }}
      >
        X
      </Button>
    </div>
  );
};

export default LogoComponent;
