import React, { useEffect, useState } from "react";
import {
  createCard,
  deleteCard,
  fetchCards,
  filtereCards,
  updateCard,
} from "../services/userServices";
import Button from "./button";
import BackupModal from "./backupModal";
import { labels } from "../utils/arrays";
import CustomCard from "./customCard";
import CustomSvg from "./customSvg";
import { useSearchParams } from "react-router";

const Column = ({ columnId, title, onEdit, onDelete }) => {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [isOver, setIsOver] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardDeadline, setCardDeadline] = useState("");

  const handleChange = (item) => {
    setSelectedValue(item);
    console.log(item);

  };

  useEffect(() => {
    (async () => {
      const respones = await fetchCards(columnId);
      setCards(respones);
    })();
  }, [columnId]);

  const query = searchParams.get("q");

  const filteredCards = filtereCards(query, cards);

  const handleAddCardSubmit = async (e) => {
    e.preventDefault();
    if (!cardTitle.trim()) return;

    const cardData = {
      columnId,
      title: cardTitle,
      description: cardDescription,
      priority: selectedValue,
      deadline: cardDeadline,
    };

    const response = await createCard(cardData);
    if (response === 201 || response === 200) {
      const updatedCards = await fetchCards(columnId);
      setCards(updatedCards);
      resetForm();
    }
  };

  const handleUpdateCardSubmit = async (e) => {
    e.preventDefault();
    if (!cardTitle.trim() || !editCard) return;

    const cardData = {
      title: cardTitle,
      description: cardDescription,
      label: selectedValue,
      deadline: cardDeadline,
    };

    const response = await updateCard(editCard._id, cardData);
    if (response === 200) {
      const updatedCards = await fetchCards(columnId);
      setCards(updatedCards);
      resetForm();
    }
  };

  const resetForm = () => {
    setAddCard(false);
    setEditCard(null);
    setCardTitle("");
    setCardDescription("");
    setCardDeadline("");
    setSelectedValue("");
  };

  const handleEditClick = (card) => {
    setCardTitle(card.title);
    setCardDescription(card.description);
    setSelectedValue(card.label);
    setCardDeadline(card.deadline?.split("T")[0] || "");
    setEditCard(card);
  };

  const handleDeleteCard = async (cardId) => {
    const response = await deleteCard(cardId);
    if (response === 200 || response === 204) {
      const updatedCards = await fetchCards(columnId);
      setCards(updatedCards);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsOver(false);

    const cardId = e.dataTransfer.getData("cardId");
    if (cardId) {
      await updateCard(cardId, { columnId });
      window.location.reload();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  return (
    <div
        className={`min-w-[21rem] flex flex-col items-center gap-5 max-h-full overflow-y-hidden transition-all duration-200 
        ${isOver ? "ring-2 ring-green-400 bg-green-100/10" : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
    >
      <div className="flex w-full h-fit gap-2 bg-card-bg rounded-lg p-4 items-center">
        <h4 className="grow font-semibold">{title}</h4>
        <Button variant={"icon"} onClick={onEdit}>
          <CustomSvg
            href={"/svg/general-use-icons.svg"}
            id={"pencil"}
            className={"size-4 stroke-icon-color"}
          />
        </Button>
        <Button variant={"icon"} onClick={onDelete}>
          <CustomSvg
            href={"/svg/general-use-icons.svg"}
            id={"trash"}
            className={"size-4 stroke-icon-color"}
          />
        </Button>
      </div>

      {filteredCards.map((card) => (
        <CustomCard
          key={card._id}
          id={card._id}
          title={card.title}
          description={card.description}
          priority={card.priority}
          deadline={card.deadline}
          onEdit={() => handleEditClick(card)}
          onDelete={() => handleDeleteCard(card._id)}
        />
      ))}

      {/* ADD CARD BUTTON */}
      <Button variant={"primary"} onClick={() => setAddCard(true)}>
        <span className="create">+</span>Add another card
      </Button>

      {/* ADD/EDIT CARD MODAL */}
      <BackupModal
        size={"md"}
        open={addCard || editCard}
        closeModal={resetForm}
      >
        <form
          className="flex flex-col gap-6"
          onSubmit={editCard ? handleUpdateCardSubmit : handleAddCardSubmit}
        >
          <h4>{editCard ? "Edit Card" : "Add Card"}</h4>
          <input
            type="text"
            className="outline-0"
            placeholder="Title"
            name="title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <textarea
            className="w-full h-40 py-3.5 px-5 rounded-md text-input-text ring-1 ring-input focus:ring-input-active outline-0"
            placeholder="Description"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />
          <div className="flex flex-col">
            <h5>Label color</h5>
            <div className="flex gap-3">
              {labels.map((item) => (
                <label
                  key={item.name}
                  className="flex flex-col items-center cursor-pointer"
                >
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
              value={cardDeadline}
              onChange={(e) => setCardDeadline(e.target.value)}
            />
          </div>
          <Button variant={"primary"} type="submit">
            <span className="create">+</span>
            {editCard ? "Save" : "Add"}
          </Button>
        </form>
      </BackupModal>
    </div>
  );
};

export default Column;
