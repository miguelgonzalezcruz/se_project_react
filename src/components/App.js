import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
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

  const [isLogged, setIsLogged] = useState(false); // <-- ¿Está el usuario logueado?
  const [currentUser, setCurrentUser] = useState({}); // <-- Datos del usuario logueado

  const history = useHistory(); // <-- Gestiona el historial de navegación

  const closePopup = () => {
    setIsPopupActive(false);
  };

  // ----------------- REGISTRO NUEVO USUARIO -----------------

  const handleRegister = (email, password, name, avatar) => {
    register(email, password, name, avatar) // <-- Viene de Auth.js
      // .then((res) => {
      //   //OJO El servidor parece que no devuelve el token ****
      //   handleLogin(res.email, res.password); // <-- ¿Por qué no funciona?
      //   setIsLogged(true);
      // })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        closePopup();
      });
  };

  // ----------------- LOGIN USUARIO -----------------

  const handleLogin = (email, password) => {
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        console.log(res.token);
        handleAuthorize();
        setIsLogged(true);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        closePopup();
      });
  };

  // ----------------- EDITAR PERFIL USUARIO -----------------

  const handleEditProfile = (name, avatar) => {
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

  // ----------------- AUTORIZACIÓN USUARIO -----------------

  const handleAuthorize = () => {
    // <-- ¿Debe integrarse en el Login?
    authorize(localStorage.getItem("jwt"))
      .then((user) => {
        if (user) {
          setIsLogged(true);
          setCurrentUser(user);
        } else {
          setIsLogged(false);
          setCurrentUser({});
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleAuthorize();
  }, []);

  // ----------------- CERRAR SESIÓN -----------------

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setCurrentUser({});
    history.push("/login");
  };

  // ----------- Código anterior que funciona OK ------------

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

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupActive("cardPopup");
  };

  const handleClose = () => {
    setIsPopupActive(false);
    setIsAddClothingPopupActive(false);
  };

  function setCardId(card) {
    card.id = defaultClothing.length + 1;
  }

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
  // -- Aquí estamos trabajando el Like ------------
  const handleLikeClick = ({ cardId, isLiked, user }) => {
    const token = localStorage.getItem("jwt");
    isLiked ? dislikeCard(cardId, token) : likeCard(cardId, token);
    const newDefaultClothing = defaultClothing.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          likes: isLiked
            ? card.likes.filter((like) => like.user !== user)
            : [...card.likes, { user: user }],
        };
      }
      return card;
    });
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
                  likeCard={likeCard}
                  dislikeCard={dislikeCard}
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
                  weather={weatherInfo}
                  cards={defaultClothing}
                  likeCard={likeCard}
                  dislikeCard={dislikeCard}
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  handleEditProfile={handleEditProfile}
                  isLoading={isLoading}
                  isLogged={isLogged}
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

            {isPopupActive === "loginPopup" && (
              <LoginModal
                isOpen={isPopupActive === "loginPopup"}
                onClose={handleClose}
                closePopup={handleCloseEvent}
                onLogin={handleLogin}
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
