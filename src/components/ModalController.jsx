import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../redux/slices/modalSlice";
import {
  NewBoardModal,
  EditBoardModal,
  HelpModal,
  AddCardModal,
  EditCardModal,
  AddColumnModal,
  EditColumnModal,
  EditProfileModal,
  FiltersModal,
} from "./modals";

const ModalController = () => {
  const modalsState = useSelector((state) => state.modals);
  const activeModal = modalsState?.activeModal;
  const modalData = modalsState?.modalData;

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!activeModal) return null;

  switch (activeModal) {
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
    case "editProfile":
      return (
        <EditProfileModal
          isOpen={true}
          onClose={handleCloseModal}
          onUpdateProfile={(profileData) => {
            console.log("Updating profile:", profileData);
            handleCloseModal();
          }}
          userData={modalData}
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
