import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBoards, selectColumns } from "../redux/selectors";
import { fetchColumns } from "../services/reduxServices";
import {createColumn, deleteColumn, updateColumn} from "../services/userServices";
import Column from "../components/column";
import BackupModal from "../components/backupModal";
import Button from "../components/button";
import { createColumn } from "../services/userServices";
import { useForm } from "react-hook-form";

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);

  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [columnMode, setColumnMode] = useState("add");
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [columnTitle, setColumnTitle] = useState("");

  const [columnToDelete, setColumnToDelete] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [boardId, dispatch]);

  const board = boards.find((b) => b._id === boardId);
  const boardTitle = board?.title || "Unnamed Board";

  const openAddModal = () => {
    setColumnMode("add");
    setColumnTitle("");
    setColumnModalOpen(true);
  };

  const openEditModal = (columnId, title) => {
    setColumnMode("edit");
    setEditingColumnId(columnId);
    setColumnTitle(title);
    setColumnModalOpen(true);
  };

  const resetModal = () => {
    setColumnModalOpen(false);
    setColumnTitle("");
    setEditingColumnId(null);
    setColumnMode("add");
  };

  const handleColumnSubmit = async (e) => {
    e.preventDefault();
    if (!columnTitle.trim()) return;

    if (columnMode === "edit" && editingColumnId) {
      const response = await updateColumn(editingColumnId, { title: columnTitle });
      if (response.status === 200) {
        dispatch(fetchColumns(boardId));
        resetModal();
      }
    } else {
      const columnData = {
        boardId: boardId,
        title: columnTitle,
      };
      const response = await createColumn(columnData);
      if (response.status === 201) {
        dispatch(fetchColumns(boardId));
        resetModal();
      }
    }
  };

  const handleDeleteColumn = async () => {
    if (!columnToDelete) return;
    const response = await deleteColumn(columnToDelete);
    if (response && response.status === 204) {
      setConfirmDeleteModal(false);
      setColumnToDelete(null);
      dispatch(fetchColumns(boardId));
    }
  };

  return (
      <>
        {boards.length > 0 ? (
            <div className="px-5">
              <h4 className="my-2">{boardTitle}</h4>
              <div className="flex gap-10 w-full">
                {columns.map((column) => (
                    <Column
                        key={column._id}
                        columnId={column._id}
                        title={column.title}
                        onEdit={() => openEditModal(column._id, column.title)}
                        onDelete={() => {
                          setColumnToDelete(column._id);
                          setConfirmDeleteModal(true);
                        }}
                    />
                ))}
                <Button variant="secondary" onClick={openAddModal}>
                  <span className="create-col">+</span>Add another column
                </Button>
              </div>
            </div>
        ) : (
            <p className="text-center">
              Before starting your project, it is essential{" "}
              <span className="text-primary">to create a board</span> to visualize
              and track all the necessary tasks and milestones.
            </p>
        )}

        {/* Add/Edit Column Modal */}
        <BackupModal
            size="md"
            open={columnModalOpen}
            closeModal={resetModal}
        >
          <h4 className="mb-4">{columnMode === "edit" ? "Edit column" : "Add column"}</h4>
          <form onSubmit={handleColumnSubmit} className="flex flex-col gap-6">
            <input
                type="text"
                className="outline-0 border p-2 rounded bg-black text-white placeholder-gray-500"
                placeholder="Title"
                name="title"
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
            />
            <Button type="submit" variant="primary" className="bg-green-200 text-black">
              <span className="create">+</span> {columnMode === "edit" ? "Save" : "Add"}
            </Button>
          </form>
        </BackupModal>

        {/* Confirm Delete Column Modal */}
        <BackupModal
            size="sm"
            open={confirmDeleteModal}
            closeModal={() => {
              setConfirmDeleteModal(false);
              setColumnToDelete(null);
            }}
        >
          <h4 className="mb-4">Are you sure you want to delete this column?</h4>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteColumn}>
              Delete
            </Button>
          </div>
        </BackupModal>
      </>
  );
};

export default Board;
