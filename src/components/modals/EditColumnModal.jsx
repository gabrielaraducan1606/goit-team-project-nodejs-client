import React from "react";
import Modal from "./Modal";

const EditColumnModal = ({ isOpen, onClose, onUpdateColumn, columnData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateColumn({
      ...columnData,
      title: e.target.title.value,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit column">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            defaultValue={columnData?.title || ""}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-btn-text font-medium rounded-md py-2 px-4 w-full"
          >
            Edit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditColumnModal;
