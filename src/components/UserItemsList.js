import React from "react";
import ItemCard from "./ItemCard";
import "../blocks/UserItemsList.css";

function UserItemsList({
  cards,
  handleCardClick,
  openAddItemPopup,
  isLogged,
  currentUser,
  likeCard,
  dislikeCard,
}) {
  return (
    <section className="user-profile__content">
      <div className="user-profile__content_row">
        <p>Your items</p>
        <button className="add-button" onClick={openAddItemPopup}>
          + Add new
        </button>
      </div>
      <ul className="user-profile__cards">
        {cards.map((card, index) => (
          <ItemCard
            key={index}
            card={card}
            cardClick={handleCardClick}
            weather={card.weather}
            isLogged={isLogged}
            currentUser={currentUser}
            likeCard={likeCard}
            dislikeCard={dislikeCard}
          />
        ))}
      </ul>
    </section>
  );
}

export default UserItemsList;
