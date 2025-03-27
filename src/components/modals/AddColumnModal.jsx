import React from "react";
import Modal from "./Modal";

const AddColumnModal = ({ isOpen, onClose, onAddColumn, boardId }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddColumn({
      boardId,
      column: { title: e.target.title.value },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add column">
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
            placeholder="Enter column title"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="w-full h-10 rounded">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
