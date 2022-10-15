import React from "react";
import { useState, useEffect } from "react";

import "../blocks/ModalWithForm.css";

function ModalWithForm({
  isOpen,
  closePopup,
  closeEsc,
  children,
  onClose,
  buttonText,
  name,
  title,
  onAddItem,
}) {
  const [nameValue, setNameValue] = useState("");
  const [imageURLValue, setImageURLValue] = useState("");
  const [weatherValue, setWeatherValue] = useState("");

  useEffect(() => {
    setNameValue("");
    setImageURLValue("");
    setWeatherValue("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURLValue(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeatherValue(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { nameValue, weatherValue, imageURLValue };
    onAddItem(newItem);
    onClose();
  }

  return (
    <div
      className={`popup popup__${name} ${isOpen ? `popup_open` : ""}`}
      onClick={closePopup}
    >
      <div className="popup__content">
        <form
          className="popup__form"
          name={name}
          onKeyDown={closeEsc}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          <label className="popup__input-label">Name</label>
          <input
            className="popup__input"
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleNameChange}
            value={nameValue}
          />
          <label className="popup__input-label">Image</label>
          <input
            className="popup__input"
            type="url"
            name="imageURL"
            placeholder="Image URL"
            required
            onChange={handleImageURLChange}
            value={imageURLValue}
          />
          <label className="popup__input-title">Select the weather type</label>
          <label className="popup__input-text" htmlFor="hot">
            <input
              className="popup__input-radio"
              type="radio"
              name="weather"
              value={weatherValue}
              onChange={handleWeatherChange}
              checked={weatherValue === "hot"}
            />
            Hot
          </label>
          <label className="popup__input-text" htmlFor="warm">
            <input
              className="popup__input-radio"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleWeatherChange}
              checked={weatherValue === "warm"}
            />
            Warm
          </label>
          <label className="popup__input-text" htmlFor="cold">
            <input
              className="popup__input-radio"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleWeatherChange}
              checked={weatherValue === "cold"}
            />
            Cold
          </label>
          <button
            className="popup__button"
            type="submit"
            onClick={handleSubmit}
            disabled={!nameValue || !imageURLValue || !weatherValue}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
