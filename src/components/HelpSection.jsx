import { useState } from "react";

const HelpSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Trimiterea cererii către server
    console.log("Send Request", { email, message });
    // Închide modalul după trimiterea cererii
    setIsModalOpen(false);
  };

  return (
    <div
      className="bg-[#1F1F1F] p-4 rounded-lg p-[20px]"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <img src="/public/svg/plant.svg" alt="plant" />
      {/* Textul ajutorului */}
      <p
        className="text-sm mt-4 mb-6 text-left w-[172px]"
        style={{ color: "var(--text-color)" }}
      >
        If you need help with TaskPro, check out our support resources or reach out to our customer support team{" "}
        <span className="text-[#BEDBB0]">TaskPro</span>.
      </p>

      {/* Linia și butonul de ajutor */}
      <div className="flex items-center gap-[8px] mt-6">
        <img src="/public/svg/help.svg" alt="help-symbol" />
        <span
          className="text-sm font-medium"
          onClick={() => setIsModalOpen(true)}
          style={{ color: "var(--text-color)" }}
        >
          Need help?
        </span>
      </div>

      {/* Modalul care apare la apăsarea butonului */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-color)" }}>
              Need Help?
            </h3>

            {/* Câmpuri de intrare */}
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Your message"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSection;
