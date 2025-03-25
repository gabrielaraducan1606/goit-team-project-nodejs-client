import React, { useState } from "react";
import Modal from "./Modal";

const NewBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const [selectedIcon, setSelectedIcon] = useState("icon1");
  const [selectedBackground, setSelectedBackground] = useState(null);

  // Iconițele
  const icons = [
    { id: "icon1", path: "/svg/Project.svg" },
    { id: "icon2", path: "/svg/star-04.svg" },
    { id: "icon3", path: "/svg/loading-03.svg" },
    { id: "icon4", path: "/svg/puzzle-piece-02.svg" },
    { id: "icon5", path: "/svg/Icon-cub.svg" },
    { id: "icon6", path: "/svg/lightning-02.svg" },
    { id: "icon7", path: "/svg/Icon-3cercuri.svg" },
    { id: "icon8", path: "/svg/hexagon.svg" },
  ];

  // Fundalurile - aranjate pentru 8 pe rând superior și 8 pe rând inferior
  const backgrounds = [
    // Primul rând
    { id: null, path: null },
    { id: "bg1", path: "/images/modal1.png" },
    { id: "bg2", path: "/images/modal2.png" },
    { id: "bg3", path: "/images/modal3.png" },
    { id: "bg4", path: "/images/modal4.png" },
    { id: "bg5", path: "/images/modal5.png" },
    { id: "bg6", path: "/images/modal6.png" },
    { id: "bg7", path: "/images/modal7.png" },

    // Al doilea rând
    { id: "bg8", path: "/images/modal8.png" },
    { id: "bg9", path: "/images/modal9.png" },
    { id: "bg10", path: "/images/modal10.png" },
    { id: "bg11", path: "/images/modal11.png" },
    { id: "bg12", path: "/images/modal12.png" },
    { id: "bg13", path: "/images/modal13.png" },
    { id: "bg14", path: "/images/modal14.png" },
    { id: "bg15", path: "/images/modal15.png" },
  ];

  const firstRowBackgrounds = backgrounds.slice(0, 8);
  const secondRowBackgrounds = backgrounds.slice(8, 16);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateBoard({
      title: e.target.title.value,
      icon: selectedIcon,
      background: selectedBackground,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New board">
      <form onSubmit={handleSubmit}>
        {/* Titlu */}
        <div className="mb-6">
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-[#1F1F1F] border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            placeholder="Title"
            required
          />
        </div>

        {/* Iconițe */}
        <div className="mb-6">
          <h3 className="text-white text-lg mb-3">Icons</h3>
          <div className="grid grid-cols-8 gap-2">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className={`flex items-center justify-center w-10 h-10 rounded-md cursor-pointer ${
                  selectedIcon === icon.id
                    ? "bg-purple-800 border border-purple-500"
                    : "bg-[#1F1F1F] border border-gray-700"
                }`}
                onClick={() => setSelectedIcon(icon.id)}
              >
                <img src={icon.path} alt="Icon" className="w-6 h-6" />
              </div>
            ))}
          </div>
        </div>

        {/* Fundaluri - două rânduri distincte */}
        <div className="mb-8">
          <h3 className="text-white text-lg mb-3">Background</h3>

          {/* Primul rând de fundaluri */}
          <div className="flex space-x-2 mb-2">
            {firstRowBackgrounds.map((bg) => (
              <div
                key={bg.id || "no-bg"}
                className={`w-[48px] h-[48px] rounded-xl overflow-hidden cursor-pointer ${
                  selectedBackground === bg.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedBackground(bg.id)}
              >
                {bg.path ? (
                  <img
                    src={bg.path}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1F1F1F] flex items-center justify-center border border-gray-700 rounded-xl">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        stroke="#757575"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Al doilea rând de fundaluri */}
          <div className="flex space-x-2">
            {secondRowBackgrounds.map((bg) => (
              <div
                key={bg.id}
                className={`w-[48px] h-[48px] rounded-xl overflow-hidden cursor-pointer ${
                  selectedBackground === bg.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedBackground(bg.id)}
              >
                <img
                  src={bg.path}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buton Create */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#BEDBB0] hover:bg-[#9DC888] text-black font-medium rounded-md py-3 px-4 w-full flex items-center justify-center gap-2 transition-colors"
          >
            <span className="text-xl">+</span>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewBoardModal;
