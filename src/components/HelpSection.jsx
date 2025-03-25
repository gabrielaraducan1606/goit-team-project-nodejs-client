import { useState } from "react";
import Modal from "./Modal";

const HelpSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // console.log("Send Request", { email, message });
    // setIsModalOpen(false);
  };

  return (
    <div className="p-4 rounded-lg bg-background text-text">
      <img src="/svg/plant.svg" alt="plant" />

      <p className="text-sm mt-4 mb-6 text-text w-[172px]">
        If you need help with <span className="text-[#BEDBB0]">TaskPro</span>, check out our support resources or reach out to our customer support team.
      </p>

      <div className="flex items-center gap-[8px] mt-6">
        <img src="/svg/help.svg"  fill="red" alt="help-symbol" />
        <span className="text-text font-medium cursor-pointer" onClick={() => setIsModalOpen(true)}>
          Need help?
        </span>
      </div>

      {/* Modalul reutilizabil */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-black font-bold mb-6">Need Help</h3>
      <input
      type="email"
      placeholder="Email address"
      className="w-full p-2 border border-gray-300 rounded mb-4 placeholder-gray-500 text-black"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
      placeholder="Comment"
      className="w-full p-2 border border-gray-300 rounded mb-4 placeholder-gray-500 text-black"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      ></textarea>
     <div className="flex justify-center mt-4">
        <button onClick={handleSend}>
        Send
        </button>
     </div>
   </Modal>
</div>
  );
};

export default HelpSection;
