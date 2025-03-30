import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoards, selectColumns } from "../redux/selectors";
import { useParams } from "react-router";
import { fetchColumns } from "../services/reduxServices";
import Column from "../components/column";
import BackupModal from "../components/backupModal";
import Button from "../components/button";

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [addColumn, setAddColumn] = useState(false);
  const [editColumn, setEditColumn] = useState(false);
  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [boardId, dispatch]);

  return (
    <>
      {boards.length > 0 ? (
        <div className="flex gap-10 w-full">
          {columns.map((column) => {
            return (
              <Column
                key={column._id}
                columnId={column._id}
                title={column.title}
              />
            );
          })}
          <Button variant={"secondary"}>
            <span className="create-col">+</span>Add another column
          </Button>
        </div>
      ) : (
        <p className="text-center">
          Before starting your project, it is essential{" "}
          <span className="text-primary">to create a board</span> to visualize
          and track all the necessary tasks and milestones. This board serves as
          a powerful tool to organize the workflow and ensure effective
          collaboration among team members.
        </p>
      )}
      <BackupModal
        size={"md"}
        open={addColumn}
        closeModal={() => setAddColumn(false)}
      >
        <h4>Add column</h4>
        <form>
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
          />
          <Button variant={"primary"}>
            <span className="create">+</span>Add
          </Button>
        </form>
      </BackupModal>
      <BackupModal
        size={"md"}
        open={editColumn}
        closeModal={() => setEditColumn(false)}
      >
        <h4>Edit column</h4>
        <form>
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
          />
          <Button variant={"primary"}>
            <span className="create">+</span>Add
          </Button>
        </form>
      </BackupModal>
    </>
  );
};

export default Board;
