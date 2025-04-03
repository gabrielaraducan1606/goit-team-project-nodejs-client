import React from "react";
import { cn } from "../utils/cn";
import { tv } from "tailwind-variants";
import Button from "./button";
import { createPortal } from "react-dom";

const modalStyles = tv({
  base: "bg-modal-bg border border-primary rounded-lg p-6 flex flex-col gap-6 animate-jump-in animate-once animate-duration-250 animate-ease-linear animate-normal relative",
  variants: {
    size: {
      md: "h-fit w-[20.938rem] sm:w-[21.875rem]",
      lg: "h-fit w-[20.938rem] sm:w-[25rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const BackupModal = ({
  children,
  size,
  className,
  open,
  closeModal,
  ...props
}) => {
  if (!open) return null;

  return createPortal(
    <div className="absolute top-0 lfet-0 w-screen h-screen bg-neutral-800/70 flex justify-center items-center">
      <div className={cn(modalStyles({ size, className }))} {...props}>
        <Button
          className={"absolute top-2 right-4"}
          variant={"icon"}
          onClick={closeModal}
        >
          X
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default BackupModal;
