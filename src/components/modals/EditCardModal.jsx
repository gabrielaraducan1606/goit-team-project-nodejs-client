import React from "react";
import Modal from "./Modal";

const EditCardModal = ({ isOpen, onClose, onUpdateCard, cardData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateCard({
      ...cardData,
      title: e.target.title.value,
      description: e.target.description.value,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit card">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            defaultValue={cardData?.title || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            defaultValue={cardData?.description || ""}
          ></textarea>
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

export default EditCardModal;
