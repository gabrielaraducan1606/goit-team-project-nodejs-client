import React from "react";
import Modal from "./Modal";

const HelpModal = ({ isOpen, onClose, onSendHelp }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendHelp({
      email: e.target.email.value,
      comment: e.target.comment.value,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Need help">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="sr-only">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            placeholder="Email address"
          />
        </div>

        <div className="mb-4">
          <label className="sr-only">Comment</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded p-2"
            placeholder="Comment"
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-btn-text font-medium rounded-md py-2 px-4 w-full"
          >
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default HelpModal;
