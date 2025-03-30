import React from "react";
import Button from "./button";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal ">
      <div className="bg-white p-6 rounded-2x1 w-[400px] shadow-lg relative">
        <Button
          variant={"icon"}
          className="absolute top-0 right-4"
          onClick={onClose}
        >
          ✖
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
