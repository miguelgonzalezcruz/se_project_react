import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import Footer from "./Footer";
import { getItemList, addItem } from "../utils/clothesApi.js";
import "../blocks/App.css";

import { getForecastWeather, filterDataFromTheApi } from "../utils/weatherApi";

import { secretKey, location } from "../utils/constants";

import { defaultClothingItems } from "../utils/defaultClothingItems";

import CurrentTemperatureUnitContext from "../utils/CurrentTemperatureUnitContext";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isAddClothingPopupActive, setIsAddClothingPopupActive] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [defaultClothing, setDefaultClothing] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddClick = () => {
    setIsAddClothingPopupActive(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupActive(true);
  };

  const handleClose = () => {
    setIsPopupActive(false);
    setIsAddClothingPopupActive(false);
  };

  const handleCloseEsc = () => {
    setIsPopupActive(false);
    setIsAddClothingPopupActive(false);
  };

  const handleAddItemSubmit = (name, weather, imageURL) => {
    addItem({ name, weather, imageURL })
      .then((newItem) => {
        setDefaultClothing([newItem, ...defaultClothing]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        handleCloseEsc();
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
      setIsAddClothingPopupActive(null);
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(secretKey, location)
        .then((data) => {
          setWeatherInfo(filterDataFromTheApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // useEffect(() => {
  //   getItemList()
  //     .then((items) => {
  //       setDefaultClothing(items);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    setDefaultClothing(defaultClothingItems);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weather={weatherInfo} handleAddClick={handleAddClick} />
          <Route exact path="/">
            <Main
              weather={weatherInfo}
              cards={defaultClothing}
              handleCardClick={handleCardClick}
            />
          </Route>

          <Route exact path="/profile">
            <Profile
              handleCardClick={handleCardClick}
              handleAddClick={handleAddClick}
            />
          </Route>

          <Footer />
          <ModalWithForm
            isOpen={isAddClothingPopupActive}
            title="New garment"
            name="create-garment"
            buttonText="Add garment"
            onClose={handleClose}
            closeEsc={handleCloseEsc}
            closePopup={handleCloseEvent}
            onAddItem={handleAddItemSubmit}
          />
          <ItemModal
            isOpen={isPopupActive}
            name="preview-card"
            card={selectedCard}
            onClose={handleClose}
            closeEsc={handleCloseEsc}
            closePopup={handleCloseEvent}
          />
          <AddItemModal
            isOpen={isAddClothingPopupActive}
            onClose={handleClose}
            closeEsc={handleCloseEsc}
            closePopup={handleCloseEvent}
            onAddItem={handleAddItemSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
