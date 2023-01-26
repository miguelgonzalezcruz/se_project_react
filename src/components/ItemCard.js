import React from "react";
import "../blocks/ItemCard.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
//new test
function ItemCard(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // const isLiked = props.card.likes.includes(currentUser._id);
  const currentUserId = currentUser._id || null;
  const card = props.card || {};
  const likes = card.likes || [];
  const isLiked = likes.includes(currentUserId);

  const openModal = () => {
    props.cardClick(props.card);
  };

  return (
    <li>
      <div className="card__wrapper">
        <div className="card">
          <div className="card__title-container">
            <p className="card__title">{props.name}</p>
          </div>
          <div className="card__like-container">
            <button
              className={isLiked ? "card__like_active" : "card__like"}
              type="button"
              onClick={props.onLike}
            />
          </div>
        </div>
        <img
          className="card__image"
          src={props.image}
          alt={props.name}
          onClick={openModal}
          name={props.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
