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
          <label className="block text-sm font-medium mb-1 text-text">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-input border border-input-active rounded p-2 text-input-text"
            defaultValue={columnData?.title || ""}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="w-full h-10 rounded">
            Edit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditColumnModal;
