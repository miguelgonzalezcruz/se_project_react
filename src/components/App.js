import React from "react";
import Header from "./Header";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import "../blocks/App.css";

import { getForecastWeather, filterDataFromTheApi } from "../utils/weatherApi";

import { secretKey, location } from "../utils/constants";

import { defaultClothingItems } from "../utils/defaultClothingItems";

function App() {
  const [weatherInfo, setWeatherInfo] = React.useState({});
  const [isPopupActive, setIsPopupActive] = React.useState(null);
  const [isAddClothingPopupActive, setIAddClothingPopupActive] =
    React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [defaultClothing, setDefaultClothing] = React.useState([]);

  const handleAddClick = () => {
    setIAddClothingPopupActive("create-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupActive("preview-card");
  };

  const handleClose = () => {
    setIsPopupActive(null);
    setIAddClothingPopupActive(null);
  };

  const handleCloseEsc = () => {
    setIsPopupActive();
    setIAddClothingPopupActive();
  };

  React.useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        handleCloseEsc();
        setIAddClothingPopupActive();
      }
    };
    if (isPopupActive || isAddClothingPopupActive) {
      window.addEventListener("keydown", close);
    }
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [isAddClothingPopupActive, isPopupActive]);

  const handleCloseEvent = (event) => {
    if (event.target === event.currentTarget) {
      setIsPopupActive(null);
      setIAddClothingPopupActive(null);
    }
  };

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(secretKey, location)
        .then((data) => {
          setWeatherInfo(filterDataFromTheApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    setDefaultClothing(defaultClothingItems);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header weather={weatherInfo} handleAddClick={handleAddClick} />
        <Main
          weather={weatherInfo}
          cards={defaultClothing}
          handleCardClick={handleCardClick}
        />
        <Footer />
        <ModalWithForm
          isOpen={isAddClothingPopupActive}
          title="New garment"
          name="create-garment"
          buttonText="Add garment"
          onClose={handleClose}
          closeEsc={handleCloseEsc}
          closePopup={handleCloseEvent}
        >
          <label className="popup__input-label">Name</label>
          <input
            className="popup__input"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <label className="popup__input-label">Image</label>
          <input
            className="popup__input"
            type="url"
            name="image"
            placeholder="Image URL"
            required
          />
          <label className="popup__input-title">Select the weather type</label>
          <label className="popup__input-text" htmlFor="hot">
            <input
              className="popup__input-radio"
              type="radio"
              id="hot"
              value="hot"
            />
            Hot
          </label>
          <label className="popup__input-text" htmlFor="warm">
            <input
              className="popup__input-radio"
              type="radio"
              id="warm"
              value="warm"
            />
            Warm
          </label>
          <label className="popup__input-text" htmlFor="cold">
            <input
              className="popup__input-radio"
              type="radio"
              id="cold"
              value="cold"
            />
            Cold
          </label>
        </ModalWithForm>

        <ItemModal
          isOpen={isPopupActive}
          name="preview-card"
          card={selectedCard}
          onClose={handleClose}
          closeEsc={handleCloseEsc}
          closePopup={handleCloseEvent}
        />
      </div>
    </div>
  );
}

export default App;
