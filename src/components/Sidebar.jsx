import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectBoards } from "../redux/selectors";
import { fetchBoards } from "../services/reduxServices";
import LogoComponent from "./LogoComponent";
import HelpSection from "./HelpSection";
import LogoutButton from "./LogoutButton";
import Button from "./button";
import CustomSvg from "./customSvg";
import BackupModal from "./backupModal";
import { backgrounds, icons } from "../utils/arrays";
import {
  createBoard,
  updateBoard,
  deleteBoard,
} from "../services/userServices.js";

const Sidebar = () => {
  const boards = useSelector(selectBoards);
  const [searchParams] = useSearchParams({});

  const isOpen = searchParams.get("sb") === "y" ? true : false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createBoardModal, setCreateBoardOpen] = useState(false);
  const [editBoardModal, setEditBoardOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [boardIdToEdit, setBoardIdToEdit] = useState(null);
  const [boardIdToDelete, setBoardIdToDelete] = useState(null);

  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");

  const URL = import.meta.env.VITE_API_URL;

  const resetForm = () => {
    setTitle("");
    setSelectedIcon("");
    setSelectedBackground("");
    setBoardIdToEdit(null);
    setBoardIdToDelete(null);
  };

  const extractIconIdFromUrl = (url) =>
    url.split("/").pop().replace(".svg", "");
  const extractBackgroundNameFromUrl = (url) =>
    url.split("/").pop().replace(".png", "");

  const handleCreateBoardSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      icon: selectedIcon,
      background: `${URL}/auth/image/${selectedBackground}.jpg`,
    };
    const newBoard = await createBoard(boardData);
    if (newBoard.status === 201) {
      dispatch(fetchBoards());
      resetForm();
      setCreateBoardOpen(false);
    }
  };

  const handleEditBoardSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      icon: selectedIcon,
      background: `${URL}/auth/image/${selectedBackground}.jpg`,
    };
    const result = await updateBoard(boardIdToEdit, boardData);
    if (result.status === 200) {
      dispatch(fetchBoards());
      resetForm();
      setEditBoardOpen(false);
    }
  };

  const handleDeleteBoard = async () => {
    const response = await deleteBoard(boardIdToDelete);
    if (response && response.status === 204) {
      dispatch(fetchBoards());
      setConfirmDeleteModal(false);
      setBoardIdToDelete(null);
    }
  };


  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full p-4 flex flex-col bg-sidebar-bg text-text 
          w-[16.25rem]
          ${isOpen ? "block z-50" : "hidden"}
          transition-transform duration-300 ease-in-out sm:static sm:translate-x-0  md:block`}
      >
        {/* Logo Component */}
        <LogoComponent />

        <h3 className=" mt-[60px] text-[12px] text-gray-400">My boards</h3>

        <div className="flex items-center justify-between w-[212px] h-[70px] mt-[8px] border-y border-separator">
          <span className=" w-[76px] text-logo text-[14px]">
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
              onClick={() => navigate(`/${board._id}`)}
            >
              <div className="flex items-center gap-2">
                <CustomSvg
                  href={"/svg/board-icons.svg"}
                  id={board.icon}
                  className={"size-4 stroke-icon-color"}
                />
                <span className="text-icon-color">{board.title}</span>
              </div>
              <div
                className="flex gap-2.5 items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="icon"
                  onClick={() => {
                    setBoardIdToEdit(board._id);
                    setTitle(board.title);
                    setSelectedIcon(extractIconIdFromUrl(board.icon));
                    setSelectedBackground(
                      extractBackgroundNameFromUrl(board.background)
                    );
                    setEditBoardOpen(true);
                  }}
                >
                  <CustomSvg
                    href="/svg/general-use-icons.svg"
                    id="pencil"
                    className="size-4 stroke-icon-color"
                  />
                </Button>
                <Button
                  variant="icon"
                  onClick={() => {
                    setBoardIdToDelete(board._id);
                    setConfirmDeleteModal(true);
                  }}
                >
                  <CustomSvg
                    href="/svg/general-use-icons.svg"
                    id="trash"
                    className="size-4 stroke-icon-color"
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <HelpSection />
        <LogoutButton />
      </aside>

      {/* Modal Create & Edit */}
      <BackupModal
        size="md"
        open={createBoardModal || editBoardModal}
        closeModal={() => {
          setCreateBoardOpen(false);
          setEditBoardOpen(false);
          resetForm();
        }}
      >
        <h4 className="mb-6">{editBoardModal ? "Edit Board" : "New Board"}</h4>
        <form
          className="flex flex-col gap-6"
          onSubmit={
            editBoardModal ? handleEditBoardSubmit : handleCreateBoardSubmit
          }
        >
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <h5>Icons</h5>
            <div className="flex gap-1.5">
              {icons.map((icon) => (
                <label key={icon.id} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="board-icon"
                    className="hidden peer"
                    value={icon.id}
                    checked={selectedIcon === icon.id}
                    onChange={() => setSelectedIcon(icon.id)}
                  />
                  <CustomSvg
                    id={icon.id}
                    href={icon.href}
                    className="size-5 stroke-icon-color hover:stroke-icon-active peer-checked:stroke-icon-active"
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <h5>Backgrounds</h5>
            <div className="grid grid-cols-8 gap-2">
              {backgrounds.map((background) => (
                <label key={background.name} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="board-bg"
                    className="hidden peer"
                    value={background.name}
                    checked={selectedBackground === background.name}
                    onChange={() => setSelectedBackground(background.name)}
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
          <Button type="submit" variant="primary" className="mt-10">
            <span className="create">+</span>{" "}
            {editBoardModal ? "Save" : "Create"}
          </Button>
        </form>
      </BackupModal>

      {/* Modal Confirm Delete */}
      <BackupModal
        size="md"
        open={confirmDeleteModal}
        closeModal={() => {
          setConfirmDeleteModal(false);
          setBoardIdToDelete(null);
        }}
      >
        <h4 className="mb-4">Are you sure you want to delete this board?</h4>
        <div className="flex justify-end gap-2">
          <Button
            variant="cancel"
            onClick={() => setConfirmDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteBoard}>
            Delete
          </Button>
        </div>
      </BackupModal>
    </>
  );
};

export default Sidebar;
