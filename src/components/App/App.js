import React from "react";
import "./App.css";
import Header from "../Header/Header";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import WeatherCard from "../WeatherCard/WeatherCard";
// import Footer from "";
// import ModalWithForm from "";
// import ItemModal from "";
import {
  location,
  secretKey,
  defaultWeatherIcons,
} from "../../utils/constants.js";
import {
  getForcastWeather,
  filterDataFromTheApi,
} from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/defaultClothingItems";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [activeModal, setActiveModal] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [clothingItems, setClothingItems] = React.useState([]);
  const [weatherIcons, setWeatherIcons] = React.useState([]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview-popup");
  };

  const closeAllModals = () => {
    setActiveModal();
  };

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForcastWeather(location, secretKey)
        .then((data) => {
          setWeatherData(filterDataFromTheApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  React.useEffect(() => {
    setWeatherIcons(defaultWeatherIcons);
  }, []);

  return (
    <div>
      <body className="page">
        <div className="page__content">
          <Header
            weatherData={weatherData}
            handleAddClick={() => setActiveModal("create-popup")}
          />
          <WeatherCard weatherData={weatherData} icons={weatherIcons} />
          <Main
            weatherData={weatherData}
            cards={clothingItems}
            onCardClick={handleCardClick}
          />
          <footer></footer>
        </div>
        {/* create popup */}
        {activeModal === "create-popup" && (
          <ModalWithForm title="New garment" name="new-card">
            <label className="modal__label">
              <input
                type="text"
                name="name"
                id="place-name"
                class="popup__input popup__input_content_name"
                placeholder="Title"
                required
                minlength="1"
                maxlength="30"
              />
              <span class="popup__error" id="place-name-error"></span>
            </label>

            <label className="modal__label">
              <input
                type="url"
                name="link"
                id="place-link"
                class="popup__input popup__input_content_link"
                placeholder="Image URL"
                required
              />
              <span class="popup__error" id="place-link-error"></span>
            </label>
            <p>Select the weather type</p>

            <div className="popup__input popup__input_content_radio">
              <div>
                <input
                  type="radio"
                  id="choiceHot"
                  name="weatherType"
                  value="hot"
                />
                <label className="popup__label_radio" htmlFor="choiceHot">
                  Hot
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="choiceWarm"
                  name="weatherType"
                  value="warm"
                />
                <label className="popup__label_radio" htmlFor="choiceWarm">
                  Warm
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="choiceCold"
                  name="weatherType"
                  value="cold"
                />
                <label className="popup__label_radio" htmlFor="choiceCold">
                  Cold
                </label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview-popup" && <ItemModal card={selectedCard} />}
      </body>
    </div>
  );
};

export default App;
