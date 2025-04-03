import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoards, selectColumns } from "../redux/selectors";
import { useParams } from "react-router";
import { fetchColumns } from "../services/reduxServices";
import Column from "../components/column";
import BackupModal from "../components/backupModal";
import Button from "../components/button";
import { createColumn } from "../services/userServices";
import { useForm } from "react-hook-form";

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [addColumn, setAddColumn] = useState(false);
  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [boardId, dispatch]);

  const addNewColumn = async (data) => {
    const response = await createColumn({ boardId, title: data.title });
    if (response === 201) {
      dispatch(fetchColumns(boardId));
      reset();
      setAddColumn(false);
    }
  };



  return (
    <>
      {boards.length > 0 ? (
        <div className="px-5 w-fit ">
          <div className="flex gap-10 ">
            {columns.map((column) => {
              return (
                <Column
                  key={column._id}
                  columnId={column._id}
                  title={column.title}
                />
              );
            })}
            <Button variant={"secondary"} onClick={() => setAddColumn(true)}>
              <span className="create-col">+</span>Add another column
            </Button>
          </div>
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
        <form
          className=" flex flex-col gap-6"
          onSubmit={handleSubmit(addNewColumn)}
        >
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
            {...register("title")}
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
