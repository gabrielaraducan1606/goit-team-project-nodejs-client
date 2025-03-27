import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColumns } from "../redux/selectors";
import { useParams } from "react-router";
import { fetchColumns } from "../services/reduxServices";
import Column from "../components/column";

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [boardId, dispatch]);
  const columns = useSelector(selectColumns);

  return (
    <div className="flex justify-around w-full">
      {columns.map((column) => {
        return (
          <Column key={column._id} columnId={column._id} title={column.title} />
        );
      })}
    </div>
  );
};

export default Board;
