import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectBoards } from "../redux/selectors";
import { fetchBoards } from "../services/reduxServices";
import LogoComponent from "./LogoComponent";
import HelpSection from "./HelpSection";
import LogoutButton from "./LogoutButton";
import Button from "./button";
import CustomSvg from "./customSvg";
import BackupModal from "./backupModal";
import { backgrounds, icons } from "../utils/arrays";
import { createBoard, updateBoard, deleteBoard } from "../services/userServices.js";

const Sidebar = () => {
  const boards = useSelector(selectBoards);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
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

  const resetForm = () => {
    setTitle("");
    setSelectedIcon("");
    setSelectedBackground("");
    setBoardIdToEdit(null);
    setBoardIdToDelete(null);
  };

  const extractIconIdFromUrl = (url) => url.split("/").pop().replace(".svg", "");
  const extractBackgroundNameFromUrl = (url) => url.split("/").pop().replace(".png", "");

  const handleCreateBoardSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      icon: `http://localhost:5000/icons/${selectedIcon}.svg`,
      background: `http://localhost:5000/images/${selectedBackground}.png`,
    };
    const newBoard = await createBoard(boardData);
    if (newBoard.status === 201) {
      await dispatch(fetchBoards());
      resetForm();
      setCreateBoardOpen(false);
      navigate(`/${newBoard.data._id}`);
    }
  };

  const handleEditBoardSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      icon: `http://localhost:5000/icons/${selectedIcon}.svg`,
      background: `http://localhost:5000/images/${selectedBackground}.png`,
    };
    const result = await updateBoard(boardIdToEdit, boardData);
    if (result.status === 200) {
      await dispatch(fetchBoards());
      resetForm();
      setEditBoardOpen(false);
    }
  };

  const handleDeleteBoard = async () => {
    const response = await deleteBoard(boardIdToDelete);
    if (response && response.status === 204) {
      await dispatch(fetchBoards());
      setConfirmDeleteModal(false);
      setBoardIdToDelete(null);
    }
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="block md:hidden lg:hidden bg-top-bar p-8.5 text-text relative h-10 top-0 right-0"
      >
        <span className="block w-6 h-1 bg-current mb-1"></span>
        <span className="block w-6 h-1 bg-current mb-1"></span>
        <span className="block w-6 h-1 bg-current"></span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full p-4 flex flex-col bg-sidebar-bg text-text 
          max-w-64
          ${isOpen ? "block" : "hidden"}
          transition-transform duration-300 ease-in-out sm:static sm:translate-x-0  md:block sm:hidden`}
      >
        {/* Logo Component */}
        <LogoComponent />

          <h3 className="text-sm mb-0 mt-[60px] text-[12px] font-thin text-gray-400">
            My boards
          </h3>

        <div className="flex items-center justify-between w-[212px] h-[70px] mt-[8px] border-t border-b border-black/10">
          <span className=" w-[76px] text-[var(--color-logo)] text-[14px]">
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
                  <span className="text-text">{board.title}</span>
                  <div className="flex gap-2.5 items-center" onClick={(e) => e.stopPropagation()}>
                    <Button
                        variant="icon"
                        onClick={() => {
                          setBoardIdToEdit(board._id);
                          setTitle(board.title);
                          setSelectedIcon(extractIconIdFromUrl(board.icon));
                          setSelectedBackground(extractBackgroundNameFromUrl(board.background));
                          setEditBoardOpen(true);
                        }}
                    >
                      <CustomSvg
                          href="/svg/general-use-icons.svg"
                          id="pencil"
                          className="size-3.5"
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
                          className="size-3.5"
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
              onSubmit={editBoardModal ? handleEditBoardSubmit : handleCreateBoardSubmit}
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
                          className="size-5 stroke-icon peer-checked:stroke-icon-selected hover:stroke-icon-selected"
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
              <span className="create">+</span> {editBoardModal ? "Save" : "Create"}
            </Button>
          </form>
        </BackupModal>

        {/* Modal Confirm Delete */}
        <BackupModal
            size="sm"
            open={confirmDeleteModal}
            closeModal={() => {
              setConfirmDeleteModal(false);
              setBoardIdToDelete(null);
            }}
        >
          <h4 className="mb-4">Are you sure you want to delete this board?</h4>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmDeleteModal(false)}>
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
