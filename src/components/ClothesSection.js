import React from "react";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({
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
        <button className="navigation__button" onClick={openAddItemPopup}>
          + Add clothes
        </button>
      </div>
      <ul className="user-profile__cards">
        {cards.map((card, index) => (
          <ItemCard
            key={index}
            card={card}
            cardClick={handleCardClick}
            onLike={likeCard}
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

export default ClothesSection;
