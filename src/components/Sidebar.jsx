import React from "react";
import { useSelector } from "react-redux";
import { selectBoards } from "../redux/selectors";
import LogoComponent from "./LogoComponent";
import HelpSection from "./HelpSection";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router";
import Button from "./button";

const Sidebar = () => {
  const boards = useSelector(selectBoards);

  return (
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
        <Button variant="small">
          <span className="text-[30px]">+</span>
        </Button>
      </div>

      {/* Lista de Dashboard-uri */}
      <div className="flex-1 max-h-[206px] overflow-y-auto">
        {boards.map((board) => (
          <Link
            to={`/${board._id}`}
            key={board._id}
            className="p-2 rounded-md flex justify-between cursor-pointer hover:bg-boards-hover"
          >
            <span className="text-text">{board.title}</span>
            <div className="flex space-x-2">
              <Button variant={"icon"}>✏️</Button>
              <Button variant={"icon"}>🗑️</Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Buton "Need Help" */}
      <HelpSection />

      {/* Buton Logout */}
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
