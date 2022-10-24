import React from "react";
import "../blocks/ItemCard.css";

function ItemCard({ card, cardClick }) {
  return (
    <li key={card.id}>
      <div className="card__wrapper">
        <div className="card">
          <div className="card__title-container">
            <p className="card__title">{card.name}</p>
          </div>
          <div className="card__like-container">
            <button className="card__like"></button>
          </div>
        </div>
        <img
          className="card__image"
          src={card.imageUrl}
          alt={card.name}
          onClick={() => cardClick(card)}
          name={card.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
