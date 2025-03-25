import React from "react";
import Modal from "./Modal";

const FiltersModal = ({ isOpen, onClose, onApplyFilters, currentSettings }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(currentSettings || {});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-base font-medium mb-2">Label color</h3>
          <div className="flex space-x-2">
            <div className="h-6 w-6 rounded-full bg-blue-400"></div>
            <div className="h-6 w-6 rounded-full bg-pink-400"></div>
            <div className="h-6 w-6 rounded-full bg-green-400"></div>
            <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-btn-text font-medium rounded-md py-2 px-4 w-full"
          >
            Apply filters
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FiltersModal;
