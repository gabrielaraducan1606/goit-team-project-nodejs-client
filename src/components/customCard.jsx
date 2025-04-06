import React from "react";
import { labels } from "../utils/arrays";
import Button from "./button";
import CustomSvg from "./customSvg";

const CustomCard = ({
  id,
  title,
  description,
  priority,
  deadline,
  onEdit,
  onDelete,
}) => {
  const priorityColor = (priority) => {
    const color = labels.find((label) => label.name === priority);
    return color.hex;
  };
  const selectedColor = priorityColor(priority);
  const cardDeadline = new Date(deadline);
  const dateToday = new Date();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", id);
  };

  return (
    <div
        draggable
        onDragStart={handleDragStart}
        className="w-[20.8rem] bg-card-bg rounded-lg relative overflow-hidden p-4  flex flex-col gap-3 h-fit">
      <h4>{title}</h4>
      <p className="line-clamp-2 text-xs">{description}</p>
      <hr className="my-2" />
      <div className="flex gap-3 flex-row w-full items-center self">
        <div>
          <p className="text-xs">Priority</p>
          <div className="flex items-center gap-1">
            <div
              className={`size-4 rounded-full aspect-square `}
              style={{ backgroundColor: selectedColor }}
            ></div>
            <p>{priority}</p>
          </div>
        </div>
        <div>
          <p className="text-xs">Deadline</p>
          <p>{cardDeadline.toLocaleDateString()}</p>
        </div>
        <div className="flex gap-1.5 self-end grow justify-end">
          {dateToday.toLocaleDateString() > cardDeadline.toDateString() && (
            <CustomSvg
              href={"/svg/general-use-icons.svg"}
              id={"bell"}
              className={"size-5 stroke-icon-active"}
            />
          )}
          <Button variant={"icon"} onClick={onEdit}>
            <CustomSvg
              href={"/svg/general-use-icons.svg"}
              id={"pencil"}
              className={"size-5 stroke-icon-color"}
            />
          </Button>
          <Button variant={"icon"} onClick={onDelete}>
            <CustomSvg
              href={"/svg/general-use-icons.svg"}
              id={"trash"}
              className={"size-5 stroke-icon-color"}
            />
          </Button>
        </div>
      </div>
      <div
        className={`absolute h-full w-1 top-0 left-0`}
        style={{ backgroundColor: selectedColor }}
      ></div>
    </div>
  );
};

export default CustomCard;
