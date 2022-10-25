import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import Footer from "./Footer";
import {
  getItemsFromList,
  addItemsToList,
  removeItemsFromList,
  baseURL,
} from "../utils/api.js";
import "../blocks/App.css";

import { getForecastWeather, filterDataFromTheApi } from "../utils/weatherApi";

import { secretKey, location } from "../utils/constants";

import { defaultClothingItems } from "../utils/defaultClothingItems";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isAddClothingPopupActive, setIsAddClothingPopupActive] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [defaultClothing, setDefaultClothing] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddItemSubmit = (name, weather, imageUrl) => {
    addItemsToList(name, weather, imageUrl)
      .then((card) => {
        setDefaultClothing([card, ...defaultClothing]);
        setIsLoading(true);
      })
      .finally(() => {
        setIsLoading(false);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = () => {
    removeItemsFromList(baseURL, selectedCard.id)
      .then(() => {
        const newDefaultClothing = defaultClothing.filter(
          (card) => card.id !== selectedCard.id
        );
        setDefaultClothing(newDefaultClothing);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isPopupActive || isAddClothingPopupActive) {
      window.addEventListener("keydown", closeOnEscape);
    }
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isAddClothingPopupActive, isPopupActive]);

  const handleCloseEvent = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
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

  useEffect(() => {
    getItemsFromList(`${baseURL}`)
      .then((items) => {
        setDefaultClothing(items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setDefaultClothing(defaultClothingItems);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemModal = () => {
    setIsAddClothingPopupActive(true);
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
              weather={weatherInfo}
              cards={defaultClothing}
              handleAddItemModal={handleAddItemModal}
            />
          </Route>

          <Footer />
          <ModalWithForm
            isOpen={isAddClothingPopupActive}
            title="New garment"
            name="create-garment"
            buttonText={isLoading ? "Saving..." : "Save"}
            onClose={handleClose}
            // closeEsc={handleCloseEsc}
            closePopup={handleCloseEvent}
          />
          <ItemModal
            isOpen={isPopupActive}
            name="preview-card"
            title="Preview"
            card={selectedCard}
            onClose={handleClose}
            // closeEsc={handleCloseEsc}
            closePopup={handleCloseEvent}
            handleDeleteItem={handleDeleteItem}
          />
          <AddItemModal
            isOpen={isAddClothingPopupActive}
            onClose={handleClose}
            onAddItem={handleAddItemSubmit}
            // closeEsc={handleCloseEsc}
            closePopup={handleCloseEvent}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
