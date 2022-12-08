import React from "react";
import "../blocks/ItemCard.css";

function ItemCard({ card, cardClick, onLike }) {
  const [isLiked, setIsLiked] = React.useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
    onLike(card);
  }

  return (
    <li>
      <div className="card__wrapper">
        <div className="card">
          <div className="card__title-container">
            <p className="card__title">{card.name}</p>
          </div>
          <div className="card__like-container">
            <button
              className={isLiked ? "card__like_active" : "card__like"}
              type="button"
              onClick={handleLikeClick}
            ></button>
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
