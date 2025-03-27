import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NewBoardModal,
  EditBoardModal,
  HelpModal,
  AddCardModal,
  EditCardModal,
  AddColumnModal,
  EditColumnModal,
  FiltersModal,
} from "./modals";

const ModalController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extrage tipul modalului și datele din URL
  const queryParams = new URLSearchParams(location.search);
  const modalType = queryParams.get("modal");
  const modalData = queryParams.get("data")
    ? JSON.parse(decodeURIComponent(queryParams.get("data")))
    : null;

  // Funcția pentru închiderea modalului
  const handleCloseModal = () => {
    const newURL = new URL(window.location);
    newURL.searchParams.delete("modal");
    newURL.searchParams.delete("data");
    navigate(newURL.pathname + newURL.search);
  };

  // Deschide modalul în funcție de parametrul din URL
  switch (modalType) {
    case "newBoard":
      return (
        <NewBoardModal
          isOpen={true}
          onClose={handleCloseModal}
          onCreateBoard={(boardData) => {
            console.log("Creating board:", boardData);
            handleCloseModal();
          }}
        />
      );
    case "editBoard":
      return (
        <EditBoardModal
          isOpen={true}
          onClose={handleCloseModal}
          onUpdateBoard={(boardData) => {
            console.log("Updating board:", boardData);
            handleCloseModal();
          }}
          boardData={modalData}
        />
      );
    case "help":
      return (
        <HelpModal
          isOpen={true}
          onClose={handleCloseModal}
          onSendHelp={(helpData) => {
            console.log("Sending help request:", helpData);
            handleCloseModal();
          }}
        />
      );
    case "addCard":
      return (
        <AddCardModal
          isOpen={true}
          onClose={handleCloseModal}
          onAddCard={(cardData) => {
            console.log("Adding card:", cardData);
            handleCloseModal();
          }}
          columnId={modalData?.columnId}
        />
      );
    case "editCard":
      return (
        <EditCardModal
          isOpen={true}
          onClose={handleCloseModal}
          onUpdateCard={(cardData) => {
            console.log("Updating card:", cardData);
            handleCloseModal();
          }}
          cardData={modalData}
        />
      );
    case "addColumn":
      return (
        <AddColumnModal
          isOpen={true}
          onClose={handleCloseModal}
          onAddColumn={(columnData) => {
            console.log("Adding column:", columnData);
            handleCloseModal();
          }}
          boardId={modalData?.boardId}
        />
      );
    case "editColumn":
      return (
        <EditColumnModal
          isOpen={true}
          onClose={handleCloseModal}
          onUpdateColumn={(columnData) => {
            console.log("Updating column:", columnData);
            handleCloseModal();
          }}
          columnData={modalData}
        />
      );
    case "filters":
      return (
        <FiltersModal
          isOpen={true}
          onClose={handleCloseModal}
          onApplyFilters={(filters) => {
            console.log("Applying filters:", filters);
            handleCloseModal();
          }}
          currentSettings={modalData}
        />
      );
    default:
      return null;
  }
};

export default ModalController;
