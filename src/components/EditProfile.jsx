import React, { useState } from "react";
import Modal from "./Modal";

const EditProfileModal = ({ isOpen, onClose, onUpdateProfile, userData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile">
      <form onSubmit={handleSubmit} className="bg-black p-6 rounded-xl">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={userData?.avatar || "/default-avatar.png"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-900 border border-green-400 rounded p-2 text-white"
            defaultValue={userData?.name || ""}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-gray-400"
            defaultValue={userData?.email || ""}
            disabled
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 pr-10 text-gray-400"
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full h-10 bg-green-400 text-black font-semibold rounded"
          >
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
