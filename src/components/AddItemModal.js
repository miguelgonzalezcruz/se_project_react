import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ isOpen, onClose, closePopup, closeEsc, onAddItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
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
      onAddItem={onAddItem}
      handleSubmit={handleSubmit}
      handleWeatherChange={handleWeatherChange}
      handleImageURLChange={handleImageURLChange}
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
        value={imageUrl}
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
          name={weather}
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
          name={weather}
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
          name={weather}
        />
        Cold
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
