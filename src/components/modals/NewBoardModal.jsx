import React, { useState } from "react";
import Modal from "./Modal";

const NewBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const [selectedIcon, setSelectedIcon] = useState("icon1");
  const [selectedBackground, setSelectedBackground] = useState(null);

  const icons = [
    { id: "icon1", value: "project" },
    { id: "icon2", value: "star" },
    { id: "icon3", value: "loading" },
    { id: "icon4", value: "puzzle" },
    { id: "icon5", value: "cube" },
    { id: "icon6", value: "lightning" },
    { id: "icon7", value: "three-circles" },
    { id: "icon8", value: "hexagon" },
  ];

  const backgrounds = [
    { id: null },
    { id: "bg1" },
    { id: "bg2" },
    { id: "bg3" },
    { id: "bg4" },
    { id: "bg5" },
    { id: "bg6" },
    { id: "bg7" },
    { id: "bg8" },
    { id: "bg9" },
    { id: "bg10" },
    { id: "bg11" },
    { id: "bg12" },
    { id: "bg13" },
    { id: "bg14" },
    { id: "bg15" },
  ];

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
        <div className="mb-6">
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-input border border-input-active rounded p-3 text-input-text placeholder-placeholder focus:outline-none focus:border-input-active"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-title text-lg mb-3">Icons</h3>
          <div className="grid grid-cols-8 gap-2">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className={`flex items-center justify-center w-10 h-10 rounded-md cursor-pointer ${
                  selectedIcon === icon.id
                    ? "bg-icon-active border border-icon-active"
                    : "bg-input border border-input"
                }`}
                onClick={() => setSelectedIcon(icon.id)}
              >
                <svg className="w-6 h-6 text-icon-selected">
                  <use xlinkHref={`/svg/sprite.svg#${icon.value}`} />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-title text-lg mb-3">Background</h3>

          <div className="grid grid-cols-8 grid-rows-2 gap-2">
            {backgrounds.map((bg) => (
              <div
                key={bg.id || "no-bg"}
                className={`w-12 h-12 rounded-xl overflow-hidden cursor-pointer ${
                  selectedBackground === bg.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedBackground(bg.id)}
              >
                {bg.id ? (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url("/api/backgrounds/${bg.id}")`,
                    }}
                  ></div>
                ) : (
                  <div className="w-full h-full bg-input flex items-center justify-center border border-input rounded-xl">
                    <svg className="w-5 h-5 text-icon">
                      <use xlinkHref="/svg/sprite.svg#no-background" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="w-full h-10 rounded">
            <span>+</span>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewBoardModal;
