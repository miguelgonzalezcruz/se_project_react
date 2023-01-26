import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../blocks/App.css";

// ----------- Components -------------
// new test
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";

// ----------- Utils -------------

import { register, authorize, login, editProfile } from "../utils/auth";
import {
  getItemsFromList,
  addItemsToList,
  removeItemsFromList,
  baseURL,
  likeCard,
  dislikeCard,
} from "../utils/api.js";
import { getForecastWeather, filterDataFromTheApi } from "../utils/weatherApi";
import { secretKey, location } from "../utils/constants";
import { defaultClothingItems } from "../utils/defaultClothingItems";

// ----------- Contexts -------------

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isCardLiked, setIsCardLiked] = useState(false); // nuevo

  const [isAddClothingPopupActive, setIsAddClothingPopupActive] =
    useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [defaultClothing, setDefaultClothing] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  // ----------------- REGISTRO NUEVO USUARIO -----------------

  const handleRegister = (email, password, name, avatar) => {
    setIsLoading(true);
    register(email, password, name, avatar)
      .then((res) => {
        console.log(res);
        handleLogin(res.email, password);
        setIsLogged(true);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // ----------------- LOGIN USUARIO -----------------

  const handleLogin = (email, password) => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  // ----------------- EDITAR PERFIL USUARIO -----------------

  const handleEditProfile = (name, avatar) => {
    setIsLoading(true);
    editProfile(name, avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // ----------------- AUTORIZACIÓN USUARIO -----------------

  const handleAuthorize = () => {
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

  // ********* Clothes Actions *********

  // ----------------- ADD CLOTHES -----------------

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

  // ----------------- DELETE CLOTHES -----------------

  // const recoverCards = () => {
  //   getItemsFromList()
  //     .then((cards) => {
  //       setDefaultClothing(cards);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleDeleteItem = () => {
    setIsLoading(true);
    removeItemsFromList(selectedCard._id)
      .then(() => {
        const newDefaultClothing = defaultClothing.filter(
          (cardId) => cardId._id !== selectedCard._id
        );
        setDefaultClothing(newDefaultClothing);
      })
      .then(handleClose)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // ****** Popup Actions ******

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupActive("cardPopup");
  };

  const handleClose = () => {
    setIsPopupActive(false);
    setIsAddClothingPopupActive(false);
  };

  const handleCloseEvent = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  function setCardId(card) {
    card.id = defaultClothing.length + 1;
  }

  // ***** Use Effects *****

  useEffect(() => {
    getItemsFromList()
      .then((items) => {
        setDefaultClothing(items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setDefaultClothing(defaultClothingItems);
  }, []);

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

  // --- Weather ---

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(secretKey, location)
        .then((data) => {
          setWeatherInfo(filterDataFromTheApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // **** Like Actions ****

  const handleLike = (cardId) => {
    likeCard(cardId)
      .then((likedCard) => {
        setDefaultClothing((state) =>
          state.map((c) => (c._id === likedCard._id ? likedCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = (cardId) => {
    dislikeCard(cardId)
      .then((likedCard) => {
        setDefaultClothing((state) =>
          state.map((c) => (c._id === likedCard._id ? likedCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleLikeClick = (cardId, isLiked) => {
    const token = localStorage.getItem("jwt");
    if (isLiked) {
      handleDislike(cardId, token);
    } else {
      handleLike(cardId, token);
    }
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
                  // handleCardLike={handleCardLike}
                  isLogged={isLogged}
                  currentUser={currentUser}
                  likeCard={likeCard}
                  dislikeCard={dislikeCard}
                  handleDislike={handleDislike}
                  handleLike={handleLike}
                  onLike={handleLikeClick}
                  handlelikeClick={handleLikeClick}
                />
              </Route>
              <ProtectedRoute path="/profile" isLogged={isLogged}>
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
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  handleEditProfile={handleEditProfile}
                  isLoading={isLoading}
                  isLogged={isLogged}
                  handleAddItemSubmit={handleAddItemSubmit}
                  likeCard={likeCard}
                  dislikeCard={dislikeCard}
                  handleLike={handleLike}
                  onLike={handleLikeClick}
                  handlelikeClick={handleLikeClick}
                />
              </ProtectedRoute>
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
                currentUser={currentUser}
                isLogged={isLogged}
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
