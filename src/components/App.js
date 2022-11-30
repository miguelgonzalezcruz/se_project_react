import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import LoginModal from "./LoginModal"; // Nueva línea para importar el componente de inicio de sesión
import RegisterModal from "./RegisterModal"; // Nueva línea para importar el componente de registro
import ProtectedRoute from "./ProtectedRoute"; // Nueva línea para importar el componente de ruta protegida
import { register, authorize } from "../utils/auth";
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

  const [isLogged, setIsLogged] = useState(true); // Nueva línea para el estado de inicio de sesión
  const [email, setEmail] = useState(""); // Nueva línea para el estado de correo electrónico

  const history = useHistory();

  // const handleLogin = (e) => {
  //   // Nueva función para manejar el inicio de sesión
  //   e.preventDefault();
  //   setIsLogged(true);
  // };

  const handleLogin = useCallback(
    (e) => {
      LoginModal(e)
        .then((data) => {
          if (data?.token) {
            localStorage.setItem("jwt", data.token);
          } else {
            console.log("No token");
          }
        })
        .then(() => {
          setIsLogged(true);
          history.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [history]
  );

  const handleRegister = (e) => {
    // Nueva función para manejar el registro
    RegisterModal(e)
      .then((data) => {
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  function setCardId(card) {
    card.id = defaultClothing.length + 1;
  }

  const handleAddItemSubmit = (name, weather, imageUrl) => {
    setIsLoading(true);
    addItemsToList(name, weather, imageUrl)
      .then((card) => {
        setCardId(card);
        setDefaultClothing([card, ...defaultClothing]);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = () => {
    removeItemsFromList(baseURL, selectedCard.id)
      .then(() => {
        const newDefaultClothing = defaultClothing.filter(
          (card) => card.id !== selectedCard.id
        );
        setDefaultClothing(newDefaultClothing);
      })
      .then(handleClose)
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
          <Switch>
            <Route exact path="/signin">
              <RegisterModal />
            </Route>

            <Route exact path="/login">
              <div className="">
                <LoginModal handleLogin={handleLogin} />
              </div>
            </Route>

            <ProtectedRoute isLogged={isLogged} path="/profile">
              <Profile
                handleCardClick={handleCardClick}
                handleAddClick={handleAddClick}
                weather={weatherInfo}
                cards={defaultClothing}
                handleAddItemModal={handleAddItemModal}
              />
            </ProtectedRoute>

            <Route exact path="/">
              <Main
                weather={weatherInfo}
                cards={defaultClothing}
                handleCardClick={handleCardClick}
              />
            </Route>
          </Switch>

          <Footer />
          <ModalWithForm
            isOpen={isAddClothingPopupActive}
            title="New garment"
            name="create-garment"
            buttonText={isLoading ? "Saving..." : "Save"}
            onClose={handleClose}
            closePopup={handleCloseEvent}
          />
          <ItemModal
            isOpen={isPopupActive}
            name="preview-card"
            title="Preview"
            card={selectedCard}
            onClose={handleClose}
            closePopup={handleCloseEvent}
            handleDeleteItem={handleDeleteItem}
          />
          <AddItemModal
            isOpen={isAddClothingPopupActive}
            onAddItem={handleAddItemSubmit}
            onClose={handleClose}
            closePopup={handleCloseEvent}
          />
          <LoginModal
            isOpen={isAddClothingPopupActive}
            onClose={handleClose}
            closePopup={handleCloseEvent}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
