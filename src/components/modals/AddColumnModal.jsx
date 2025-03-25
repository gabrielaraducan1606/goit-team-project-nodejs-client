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
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            placeholder="Enter column title"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-btn-text font-medium rounded-md py-2 px-4 w-full"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
