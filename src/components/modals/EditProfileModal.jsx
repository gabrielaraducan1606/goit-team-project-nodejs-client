import React from "react";
import Modal from "./Modal";

const EditProfileModal = ({ isOpen, onClose, onUpdateProfile, userData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: e.target.name.value,
      email: e.target.email.value,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            defaultValue={userData?.name || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            defaultValue={userData?.email || ""}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-btn-text font-medium rounded-md py-2 px-4 w-full"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
