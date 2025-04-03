import React, { useState } from "react";
import ThemeToggle from "./themeToggle";
import UserInfo from "./UserInfo";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectBoards } from "../redux/selectors";
import Button from "./button";
import CustomSvg from "./customSvg";

const Header = () => {
  const { boardId } = useParams();
  const boards = useSelector(selectBoards);
  const [popout, openPopout] = useState(false);

  const togglePopout = () => {
    openPopout((popout) => !popout);
  };

  const getboardName = () => {
    if (boardId) {
      const board = boards.find((board) => board._id === boardId);
      return board.title;
    }
    return;
  };

  const boardName = getboardName();

  return (
    <div className="w-full">
      <header className="flex w-full justify-end bg-top-bar gap-[14px] items-center p-4">
        <ThemeToggle />
        <UserInfo />
      </header>
      <div className="w-full flex flex-row items-center justify-between px-6 relative">
        <h4 className="my-2">{boardName}</h4>
        <Button
          variant={"icon"}
          className={"flex flex-row gap-2 items-center"}
          onClick={() => {
            openPopout(true);
          }}
        >
          <CustomSvg
            href={"/svg/general-use-icons.svg"}
            id={"filter"}
            className={"size-4"}
          />
          <p className="text-base">Filters</p>
        </Button>
        {popout && (
          <div className="animate-flip-down animate-once animate-duration-300 animate-ease-linear animate-normal absolute bg-modal-bg border border-primary rounded-lg p-6 flex flex-col gap-6 right-6 top-10">
            <Button variant={"icon"} className={"absolute top-2 right-2"}>
              X
            </Button>
            <h4 onClick={togglePopout}>Poput test</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
