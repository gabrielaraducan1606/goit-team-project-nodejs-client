import React, { useEffect, useState } from "react";
import {fetchCards} from "../services/userServices";
import Button from "./button";
import BackupModal from "./backupModal";
import { labels } from "../utils/arrays";
import CustomCard from "./customCard";
import CustomSvg from "./customSvg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchColumns } from "../services/reduxServices";
import { useParams, useSearchParams } from "react-router";

const Column = ({ columnId, title, onEdit, onDelete }) => {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (item) => {
    setSelectedValue(item);
  };

  useEffect(() => {
    (async () => {
      const respones = await fetchCards(columnId);
      setCards(respones);
    })();
  }, [columnId]);

  const query = searchParams.get("q");

  const handleChange = (item) => {
    setSelectedValue(item);
  };

  const editCol = async (data) => {
    const response = await updateColumn(columnId, data.title);
    if (response === 200) {
      reset();
      setEditColumn(false);
      dispatch(fetchColumns(boardId));
    }
  };

  const handelDelete = async () => {
    const response = await deleteColumn(columnId);
    if (response === 204) {
      dispatch(fetchColumns(boardId));
    }
  };

  const filteredCards = filtereCards(query, cards);

  return (
      <div className="w-[21rem] flex flex-col gap-5 max-h-full overflow-y-hidden">
        <div className="flex w-full h-fit bg-card-bg rounded-lg p-4 items-center">
          <h4 className="grow font-semibold">{title}</h4>
          <Button variant={"icon"} onClick={onEdit}>
            <CustomSvg
                href={"/svg/general-use-icons.svg"}
                id={"pencil"}
                className={"size-5"}
            />
          </Button>
          <Button variant={"icon"} onClick={onDelete}>
            <CustomSvg
                href={"/svg/general-use-icons.svg"}
                id={"trash"}
                className={"size-5"}
            />
          </Button>
        </div>

        {cards.map((card) => (
            <CustomCard
                key={card.id}
                title={card.title}
                description={card.description}
                priority={card.priority}
                deadline={card.deadline}
            />
        ))}

        {/* ADD CARD BUTTON */}
        <Button variant={"primary"} onClick={() => setAddCard(true)}>
          <span className="create">+</span>Add another card
        </Button>

        {/* ADD CARD MODAL */}
        <BackupModal
            size={"md"}
            open={addCard}
            closeModal={() => setAddCard(false)}
        >
          <form className="flex flex-col gap-6">
            <h4>Add Card</h4>
            <input
                type="text"
                className="outline-0"
                placeholder="Title"
                name="title"
            />
            <textarea
                className="w-full h-40 py-3.5 px-5 rounded-md text-input-text ring-1 ring-input focus:ring-input-active outline-0"
                placeholder="Description"
            />
            <div className="flex flex-col">
              <h5>Label color</h5>
              <div className="flex gap-3">
                {labels.map((item) => (
                    <label key={item.name} className="flex flex-col items-center cursor-pointer">
                      <input
                          type="radio"
                          name="label"
                          value={item.name}
                          checked={selectedValue === item.name}
                          onChange={() => handleChange(item.name)}
                          className="absolute opacity-0 h-0 w-0"
                      />
                      <div
                          className={`w-6 h-6 rounded-full border-2 mb-1 relative transition-all duration-200 ${
                              selectedValue === item.name
                                  ? "border-gray-800 scale-110"
                                  : "border-gray-300"
                          }`}
                          style={{ backgroundColor: item.hex }}
                      >
                        {selectedValue === item.name && (
                            <div
                                className="absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: item.hex }}
                            />
                        )}
                      </div>
                    </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h5>Deadline</h5>
              <input
                  type="date"
                  className="outline-0 ring-0 w-32 p-0"
                  name="date"
              />
            </div>
            <Button variant={"primary"} type="submit">
              <span className="create">+</span>Add
            </Button>
          </form>
        </BackupModal>
      </div>
  );
};

export default Column;
