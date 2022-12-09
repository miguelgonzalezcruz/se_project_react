import React from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { weatherType } from "../utils/weatherApi";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { likeCard, dislikeCard } from "../utils/api";

function Main({ weather, cards, handleCardClick, isLogged, currentUser }) {
  const weatherToday = weather.temperature;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [selectedCard, setSelectedCard] = React.useState({});

  const onLike = (card) => {
    if (card.isLiked) {
      dislikeCard(card._id).then((res) => {
        setSelectedCard(res);
      });
    } else {
      likeCard(card._id).then((res) => {
        setSelectedCard(res);
      });
    }
  };

  return (
    <main className="main">
      <section>
        <WeatherCard weather={weather} />
      </section>
      <p className="main__description">
        Today is{" "}
        {currentTemperatureUnit === "F"
          ? weather.temperature
          : weather.temperatureC}{" "}
        º{currentTemperatureUnit} / You may want to wear:
      </p>
      <section className="main__clothes">
        <div className="main__cards">
          {cards
            .filter((card) => card.weather === weatherType(weatherToday))
            .map((card, index) => (
              <ItemCard
                key={index}
                card={card}
                cardClick={handleCardClick}
                onLike={onLike}
                weather={card.weather}
                isLogged={isLogged}
                currentUser={currentUser}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
