import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { defaultClothingItems } from "../utils/defaultClothingItems";

const AddItemModal = ({ isOpen, onClose, closePopup, closeEsc }) => {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setImageURL("");
    setWeather("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  function handleSubmit(e) {
    const newItem = { name, weather, imageURL };
    defaultClothingItems.push(newItem);
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      name="create-garment"
      buttonText="Add garment"
      onClose={onClose}
      closeEsc={closeEsc}
      closePopup={closePopup}
      onAddItem={handleSubmit}
    >
      <label className="popup__input-label">Name</label>
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Name"
        required
        onChange={handleNameChange}
        value={name}
      />
      <label className="popup__input-label">Image</label>
      <input
        className="popup__input"
        type="url"
        name="image"
        placeholder="Image URL"
        required
        onChange={handleImageURLChange}
        value={imageURL}
      />
      <label className="popup__input-title">Select the weather type</label>
      <label className="popup__input-text" htmlFor="hot">
        <input
          className="popup__input-radio"
          type="radio"
          id="hot"
          value="hot"
          onChange={handleWeatherChange}
          checked={weather === "hot"}
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
          checked={weather === "warm"}
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
          checked={weather === "cold"}
        />
        Cold
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
