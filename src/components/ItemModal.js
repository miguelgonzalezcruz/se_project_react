import React from "react";
import "../blocks/ItemModal.css";

function ItemModal({ card, onClose, closePopup, isOpen, handleDeleteItem }) {
  return (
    <div
      className={`card__popup ${isOpen ? `popup_open` : ""}`}
      onClick={closePopup}
    >
      <div className="card__popup-container">
        <div className="card__popup-image-container">
          <img
            className="card__popup-image"
            src={card.imageUrl}
            alt={card.name}
          />
        </div>
        <p className="card__popup-description">{card.name}</p>
        <p className="card__popup-description_temperature">
          Weather: {card.weather}
        </p>
        <button
          className="card__popup-delete-clothes"
          onClick={handleDeleteItem}
        >
          Delete Item
        </button>
        <button className="card__popup-close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ItemModal;
