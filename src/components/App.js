import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, login, editProfile } from "../utils/auth";
import Footer from "./Footer";
import {
  getItemsFromList,
  addItemsToList,
  removeItemsFromList,
  baseURL,
  likeCard,
  dislikeCard,
} from "../utils/api.js";
import "../blocks/App.css";

import { getForecastWeather, filterDataFromTheApi } from "../utils/weatherApi";

import { secretKey, location } from "../utils/constants";

import { defaultClothingItems } from "../utils/defaultClothingItems";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfileModal from "./EditProfileModal";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isAddClothingPopupActive, setIsAddClothingPopupActive] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [defaultClothing, setDefaultClothing] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  const closePopup = () => {
    setIsPopupActive(false);
  };

  // ----------------- Nueva función para manejar el registro -----------------

  const handleRegister = (email, password, name, avatar) => {
    setIsLoading(true);
    register(email, password, name, avatar)
      .then((res) => {
        handleLogin(res.email, password);
        setIsLogged(true);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closePopup();
      });
  };
  // ----------------- Nueva función para manejar el inicio de sesión -----------------

  const handleLogin = (email, password) => {
    setIsLoading(true);
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLogged(true);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closePopup();
      });
  };

  // ----------------- Nueva función para manejar la edición del usuario -----------------

  const handleEditProfile = (name, avatar) => {
    setIsLoading(true);
    authorize();
    editProfile(name, avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closePopup();
      });
  };

  // ----------------- Nueva función para manejar el cierre de sesión -----------------

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setCurrentUser({});
    history.push("/login");
  };

  // ----------------- Nueva función para autorizar al usuario -----------------

  const handleAuthorize = () => {
    authorize(localStorage.getItem("jwt"))
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setIsLogged(true);
        } else {
          setCurrentUser({});
          setIsLogged(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddClick = () => {
    setIsPopupActive("newItemPopup");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupActive("cardPopup");
  };

  const handleClose = () => {
    setIsPopupActive(false);
    setIsAddClothingPopupActive(false);
  };

  const handleEditProfileClick = () => {
    setIsPopupActive("editProfilePopup");
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weather={weatherInfo}
              handleAddClick={handleAddClick}
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              isLogged={isLogged}
              handleAuthorize={handleAuthorize}
              currentUser={currentUser}
              openAddItemPopup={() => {
                setIsPopupActive("newItemPopup");
              }}
              openRegisterPopup={() => {
                setIsPopupActive("registerPopup");
              }}
              openLoginPopup={() => {
                setIsPopupActive("loginPopup");
              }}
            />

            <Switch>
              <Route exact path="/">
                <Main
                  weather={weatherInfo}
                  cards={defaultClothing}
                  handleCardClick={handleCardClick}
                  isLogged={isLogged}
                  currentUser={currentUser}
                />
              </Route>
              <Route isLogged={isLogged} path="/profile">
                {isLogged ? <Redirect to="/profile" /> : <Redirect to="/" />}
                <Profile
                  openAddItemPopup={() => {
                    setIsPopupActive("newItemPopup");
                  }}
                  openEditProfilePopup={() => {
                    setIsPopupActive("editProfilePopup");
                  }}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  weather={weatherInfo}
                  cards={defaultClothing}
                  handleAddItemModal={handleAddItemModal}
                  likeCard={likeCard}
                  dislikeCard={dislikeCard}
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  handleEditProfile={handleEditProfile}
                  isLoading={isLoading}
                  isLogged={isLogged}
                  isAddItemOpen={isPopupActive === "newItemPopup"}
                  isEditProfileOpen={isPopupActive === "editProfilePopup"}
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

            {isPopupActive === "cardPopup" && (
              <ItemModal
                isOpen={isPopupActive}
                name="preview-card"
                title="Preview"
                card={selectedCard}
                onClose={handleClose}
                closePopup={handleCloseEvent}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            {isPopupActive === "newItemPopup" && (
              <AddItemModal
                isOpen={isPopupActive === "newItemPopup"}
                onAddItem={handleAddItemSubmit}
                onClose={handleClose}
                closePopup={handleCloseEvent}
              />
            )}
            {isPopupActive === "loginPopup" && (
              <LoginModal
                isOpen={isPopupActive === "loginPopup"}
                onClose={handleClose}
                closePopup={handleCloseEvent}
              />
            )}

            {isPopupActive === "registerPopup" && (
              <RegisterModal
                isOpen={isPopupActive === "registerPopup"}
                onClose={handleClose}
                closePopup={handleCloseEvent}
                onRegister={handleRegister}
              />
            )}
            {isPopupActive === "editProfilePopup" && (
              <EditProfileModal
                isOpen={isPopupActive === "editProfilePopup"}
                onClose={handleClose}
                closePopup={handleCloseEvent}
                onEditProfile={handleEditProfile}
                currentUser={currentUser}
              />
            )}
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
