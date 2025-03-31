import React from "react";
import { labels } from "../utils/arrays";
import Button from "./button";
import CustomSvg from "./customSvg";

const CustomCard = ({ title, description, priority, deadline }) => {
  const priorityColor = (priority) => {
    const color = labels.find((label) => label.name === priority);
    return color.hex;
  };
  const selectedColor = priorityColor(priority);
  const cardDeadline = new Date(deadline);
  const dateToday = new Date();

  return (
    <div className="w-[21rem] bg-card-bg rounded-lg relative overflow-hidden p-4  flex flex-col gap-3 h-fit">
      <h4>{title}</h4>
      <p className="line-clamp-2 text-xs">{description}</p>
      <hr className="my-2" />
      <div className="flex gap-3 flex-row w-full items-center self">
        <div>
          <p className="text-xs">Priority</p>
          <div className="flex items-center gap-1">
            <div
              className={`size-4 rounded-full aspect-square bg-[${selectedColor}]`}
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
              className={"size-5"}
            />
          )}
          <Button variant={"icon"}>
            <CustomSvg
              href={"/svg/general-use-icons.svg"}
              id={"arrow-circle"}
              className={"size-5"}
            />
          </Button>
          <Button variant={"icon"}>
            <CustomSvg
              href={"/svg/general-use-icons.svg"}
              id={"pencil"}
              className={"size-5"}
            />
          </Button>
          <Button variant={"icon"}>
            <CustomSvg
              href={"/svg/general-use-icons.svg"}
              id={"trash"}
              className={"size-5"}
            />
          </Button>
        </div>
      </div>
      <div
        className={`absolute bg-[${selectedColor}] h-full w-1 top-0 left-0`}
      ></div>
    </div>
  );
};

export default CustomCard;
