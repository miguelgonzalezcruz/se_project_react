import React from "react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/ClothesSection.css";

function ClothesSection({
  cards,
  handleCardClick,
  openAddItemPopup,
  isLogged,
  likeCard,
  dislikeCard,
  onLike,
  handlelikeClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <section className="user-profile__content">
      <div className="user-profile__content_row">
        <p>Your items</p>
        <button className="navigation__button" onClick={openAddItemPopup}>
          + Add clothes
        </button>
      </div>
      <ul className="user-profile__cards">
        {cards.map((card) => (
          <ItemCard
            key={card._id}
            id={card._id}
            name={card.name}
            image={card.imageUrl}
            weather={card.weather}
            card={card}
            isLogged={isLogged}
            cardClick={handleCardClick}
            currentUser={currentUser}
            likeCard={likeCard}
            dislikeCard={dislikeCard}
            // onLike={onLike}
            onLike={() => {
              handlelikeClick(
                card._id,
                card.likes.includes(currentUser._id),
                currentUser
              );
            }}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
