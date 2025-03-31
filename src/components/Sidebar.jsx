import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectBoards } from "../redux/selectors";
import LogoComponent from "./LogoComponent";
import HelpSection from "./HelpSection";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router";
import Button from "./button";
import CustomSvg from "./customSvg";
import BackupModal from "./backupModal";
import { backgrounds, icons } from "../utils/arrays";

const Sidebar = () => {
  const boards = useSelector(selectBoards);
  const [createBoard, setCreateBoardOpen] = useState(false);

  return (
    <>
      <aside className="w-64 h-full p-4 flex flex-col bg-sidebar-bg text-text">
        {/* Logo Component */}
        <LogoComponent />

        <h3 className="text-sm mb-0 mt-[60px] text-[12px] font-thin text-gray-400">
          My boards
        </h3>

        <div className="flex items-center justify-between w-[212px] h-[70px] mt-[8px] border-t border-b border-black/10">
          <span className="font-poppins w-[76px] text-title text-[14px] font-medium">
            Create a new board
          </span>
          <Button variant="small" onClick={() => setCreateBoardOpen(true)}>
            <span className="text-[30px]">+</span>
          </Button>
        </div>

        {/* Lista de Dashboard-uri */}
        <div className="flex-1 max-h-[206px] overflow-y-auto">
          {boards.map((board) => (
            <div
              key={board._id}
              className="p-2 rounded-md flex justify-between cursor-pointer hover:bg-boards-hover"
            >
              <Link to={`/${board._id}`}>
                <span className="text-text">{board.title}</span>
              </Link>
              <div className="flex gap-2.5 items-center">
                <Button variant={"icon"}>
                  <CustomSvg
                    href={"/svg/general-use-icons.svg"}
                    id={"pencil"}
                    className={"size-3.5"}
                  />
                </Button>
                <Button variant={"icon"}>
                  <CustomSvg
                    href={"/svg/general-use-icons.svg"}
                    id={"trash"}
                    className={"size-3.5"}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Buton "Need Help" */}
        <HelpSection />

        {/* Buton Logout */}
        <LogoutButton />
      </aside>

      {/* NEW BOARD MODAL */}
      <BackupModal
        size={"md"}
        open={createBoard}
        closeModal={() => setCreateBoardOpen(false)}
      >
        <h4 className="mb-6">New Board</h4>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
          ></input>
          <div>
            <h5>Icons</h5>
            <div className="flex gap-1.5">
              {icons.map((icon) => (
                <label
                  key={icon.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="board-icon"
                    className="hidden peer"
                    value={icon.id}
                  />
                  <CustomSvg
                    id={icon.id}
                    href={icon.href}
                    className={
                      "size-5 stroke-icon peer-checked:stroke-icon-selected hover:stroke-icon-selected"
                    }
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <h5>Backgrounds</h5>
            <div className="grid grid-cols-8 gap-2">
              {backgrounds.map((background) => (
                <label
                  key={background.name}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="board-bg"
                    className="hidden peer"
                    value={background.name}
                  />
                  <img
                    src={background.src}
                    alt={background.name}
                    className="peer-checked:shadow-lg shadow-primary hover:shadow-lg"
                  />
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" variant={"primary"} className={"mt-10"}>
            <span className="create">+</span>Create
          </Button>
        </form>
      </BackupModal>

      {/* EDIT BOARD MODAL */}
      <BackupModal
        size={"md"}
        open={createBoard}
        closeModal={() => setCreateBoardOpen(false)}
      >
        <h4 className="mb-6">Edit Board</h4>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
          ></input>
          <div>
            <h5>Icons</h5>
            <div className="flex gap-1.5">
              {icons.map((icon) => (
                <label
                  key={icon.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="board-icon"
                    className="hidden peer"
                    value={icon.id}
                  />
                  <CustomSvg
                    id={icon.id}
                    href={icon.href}
                    className={
                      "size-5 stroke-icon peer-checked:stroke-icon-selected hover:stroke-icon-selected"
                    }
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <h5>Backgrounds</h5>
            <div className="grid grid-cols-8 gap-2">
              {backgrounds.map((background) => (
                <label
                  key={background.name}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="board-bg"
                    className="hidden peer"
                    value={background.name}
                  />
                  <img
                    src={background.src}
                    alt={background.name}
                    className="peer-checked:shadow-lg shadow-primary hover:shadow-lg"
                  />
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" variant={"primary"} className={"mt-10"}>
            <span className="create">+</span>Edit
          </Button>
        </form>
      </BackupModal>
    </>
  );
};

export default Sidebar;
