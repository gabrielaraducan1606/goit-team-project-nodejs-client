import React, { useState } from "react";
import ThemeToggle from "./themeToggle";
import UserInfo from "./UserInfo";
import { useParams, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { selectBoards } from "../redux/selectors";
import Button from "./button";
import CustomSvg from "./customSvg";
import { labels } from "../utils/arrays";

const Header = () => {
  const { boardId } = useParams();
  const boards = useSelector(selectBoards);
  const [popout, openPopout] = useState(false);
  const [, setSearchParams] = useSearchParams({  });

  const togglePopout = () => {
    openPopout((popout) => !popout);
  };

  const updateSearchParams = (params) => {
    if (params === "") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ q: params }, { replace: true });
    }
    openPopout(false);
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
          <div className="animate-flip-down animate-once animate-duration-300 animate-ease-linear animate-normal absolute bg-modal-bg border border-primary rounded-lg p-6 flex flex-col gap-2 right-6 top-10 z-50">
            <Button
              variant={"icon"}
              className={"absolute top-3.5 right-3.5"}
              onClick={togglePopout}
            >
              X
            </Button>
            <h4>Filters</h4>
            <hr className="w-[18.75rem]" />
            <div className="w-full flex flex-row justify-between">
              <h3>Label color</h3>
              <p
                className="cursor-pointer hover:underline "
                onClick={() => updateSearchParams("")}
              >
                Show all
              </p>
            </div>
            <div>
              {labels.map((label) => {
                return (
                  <div
                    key={label.name}
                    className="flex flex-row items-center gap-2 cursor-pointer group w-fit "
                    onClick={() => updateSearchParams(label.name)}
                  >
                    <div
                      className="size-3.5 aspect-square rounded-full"
                      style={{ backgroundColor: label.hex }}
                    ></div>
                    <h3 className="group-hover:text-primary">{label.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
