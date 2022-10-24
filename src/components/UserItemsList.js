import React from "react";
import ItemCard from "./ItemCard";
import "../blocks/UserItemsList.css";

function UserItemsList({ cards, handleCardClick, handleAddItemClick }) {
  return (
    <section className="user-profile__content">
      <div className="user-profile__content_row">
        <p>Your items</p>
        <button className="add-button" onClick={handleAddItemClick}>
          + Add new
        </button>
      </div>
      <ul className="user-profile__cards">
        {cards.map((card) => (
          <ItemCard
            key={card.id}
            id={card.id}
            card={card}
            cardClick={handleCardClick}
            weather={card.weather}
          />
        ))}
      </ul>
    </section>
  );
}

export default UserItemsList;
