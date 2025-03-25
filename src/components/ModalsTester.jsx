import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/modalSlice";

const ModalsTester = () => {
  const dispatch = useDispatch();

  const openModalHandler = (type, data = null) => {
    dispatch(openModal({ type, data }));
  };

  // Date exemplu pentru modale
  const sampleBoard = {
    id: "1",
    title: "Sample Board",
    icon: "icon1",
    background: "none",
  };
  const sampleColumn = { id: "1", title: "To Do", boardId: "1" };
  const sampleCard = {
    id: "1",
    title: "Sample Card",
    description: "This is a sample card",
    priority: "medium",
    deadline: new Date().toISOString().split("T")[0],
    columnId: "1",
  };
  const sampleUser = { name: "John Doe", email: "john@example.com" };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modal Tester</h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => openModalHandler("newBoard")}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          New Board Modal
        </button>

        <button
          onClick={() => openModalHandler("editBoard", sampleBoard)}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Edit Board Modal
        </button>

        <button
          onClick={() => openModalHandler("help")}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Help Modal
        </button>

        <button
          onClick={() => openModalHandler("addCard", { columnId: "1" })}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Add Card Modal
        </button>

        <button
          onClick={() => openModalHandler("editCard", sampleCard)}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Edit Card Modal
        </button>

        <button
          onClick={() => openModalHandler("addColumn", { boardId: "1" })}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Add Column Modal
        </button>

        <button
          onClick={() => openModalHandler("editColumn", sampleColumn)}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Edit Column Modal
        </button>

        <button
          onClick={() => openModalHandler("editProfile", sampleUser)}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Edit Profile Modal
        </button>

        <button
          onClick={() => openModalHandler("filters", { priorities: ["high"] })}
          className="bg-primary hover:bg-secondary text-btn-text p-3 rounded"
        >
          Filters Modal
        </button>
      </div>
    </div>
  );
};

export default ModalsTester;
