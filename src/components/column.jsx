import React, { useEffect, useState } from "react";
import { fetchCards } from "../services/userServices";

const Column = ({ columnId, title }) => {
  const [cards, setCards] = useState([]);
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
    </div>
  );
};

export default Column;
