import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal">
      <div className="bg-white p-6 rounded-2x1 w-[400px] shadow-lg relative">
        <button
          className="absolute top-0 right-4 bg-transparent"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
