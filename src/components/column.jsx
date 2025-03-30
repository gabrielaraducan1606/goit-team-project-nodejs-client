import React, { useEffect, useState } from "react";
import { fetchCards } from "../services/userServices";
import Button from "./button";
import BackupModal from "./backupModal";
import { labels } from "../utils/arrays";

const Column = ({ columnId, title }) => {
  const [cards, setCards] = useState([]);
  const [addCard, setAddCard] = useState(false);
  useEffect(() => {
    (async () => {
      const respones = await fetchCards(columnId);

      setCards(respones);
    })();
  }, [columnId]);

  return (
    <div className="w-1/3">
      <h2 className="text-lg font-semibold border">{title}</h2>
      {cards.map((card) => {
        return (
          <div key={card._id} className="border p-2 my-2">
            <h3 className="text-md font-semibold">{card.title}</h3>
            <p>{card.description}</p>
          </div>
        );
      })}
      <Button variant={"primary"} onClick={() => setAddCard(true)}>
        <span className="create">+</span>Add another card
      </Button>
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
          ></input>
          <textarea
            className="w-full h-40 py-3.5 px-5 rounded-md text-input-text ring-1 ring-input focus:ring-input-active outline-0"
            placeholder="Description"
          ></textarea>
          <div className="flex flex-col">
            <h5>Label color</h5>
            <div className="flex gap-3">
              {labels.map((label) => (
                <label>
                  <input
                    type="radio"
                    radioGroup="label"
                    name="label"
                    value={label.hex}
                    className="hidden peer"
                  />
                  <span
                    className={`size-3.5 bg-[${label.hex}] rounded-full aspect-square cursor-pointer peer-checked:shadow-amber-500`}
                  >
                    {" "}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </BackupModal>
    </div>
  );
};

export default Column;
