import React from "react";

const ModalOverlay = ({ children, onClick }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
