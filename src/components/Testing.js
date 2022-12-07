import "../blocks/card.css";
import React from "react";

function ItemCard(props) {
  const [isLiked, setIsLiked] = React.useState(
    props.item.likes.includes(props.currentUser._id)
  );

  const handleLike = () => {
    props.likeItem(props.item._id).then(setIsLiked(true));
  };

  const handleDislike = () => {
    props.dislikeItem(props.item._id).then(setIsLiked(false));
  };

  return (
    <li className="card" id={`${props.weather}`}>
      <div className="card__title-wrapper">
        <h4 className="card__title">{props.name}</h4>
        {props.isLoggedIn && (
          <button
            type="button"
            className={isLiked ? "card__like card__like-filled" : "card__like"}
            onClick={isLiked ? handleDislike : handleLike}
          ></button>
        )}
      </div>
      <img
        src={props.image}
        onClick={props.handleCardClick}
        className="card__image"
        alt={`Example photo of ${props.name}`}
      />
    </li>
  );
}

export default ItemCard;
