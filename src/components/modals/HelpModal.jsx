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
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-input border border-input-active rounded p-2 text-input-text"
            placeholder="Email address"
          />
        </div>

        <div className="mb-6">
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="w-full bg-input border border-input-active rounded p-2 text-input-text"
            placeholder="Comment"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="w-full h-10 rounded">
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default HelpModal;
