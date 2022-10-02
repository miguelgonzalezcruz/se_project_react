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
  const [popupActive, setPopupActive] = React.useState(null);
  const [selectCard, setSelectedCard] = React.useState({});
  const [defaultClothing, setDefaultClothing] = React.useState([]);

  const handleAddClick = () => {
    setPopupActive("create-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setPopupActive("preview-card");
  };

  const handleClose = () => {
    setPopupActive(null);
  };

  const handleCloseEsc = () => {
    setPopupActive();
  };

  React.useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        handleCloseEsc();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  const handleCloseEvent = (event) => {
    if (event.target === event.currentTarget) {
      setPopupActive(null);
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
          isOpen={popupActive === "create-garment"}
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
          isOpen={popupActive === "preview-card"}
          name="preview-card"
          card={selectCard}
          onClose={handleClose}
          closeEsc={handleCloseEsc}
          closePopup={handleCloseEvent}
        />
      </div>
    </div>
  );
}

export default App;
