import React from "react";
import "../ItemCard/ItemCard.css";

function ItemCard({ card }) {
  return (
    <article className="card">
      <div className="card__info">
        <div className="card__title-container">
          <h2 className="card__title">{card.name}</h2>
        </div>
        <div className="card__like-container">
          <button type="button" className="card__like"></button>
        </div>
      </div>

      <div className="card__image">
        <img className="element__image" src={card.link} alt=" " />
      </div>
    </article>
  );
}

export default ItemCard;
