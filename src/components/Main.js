import React from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { weatherType } from "../utils/weatherApi";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  weather,
  cards,
  handleCardClick,
  isLogged,
  onLike,
  handlelikeClick,
  // handleCardLike,
}) {
  const weatherToday = weather.temperature;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = React.useContext(CurrentUserContext);

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
            .map((card) => (
              <ItemCard
                key={card._id}
                _id={card._id}
                card={card}
                name={card.name}
                image={card.imageUrl}
                cardClick={handleCardClick}
                // onLike={handleCardLike} nuevo
                handlelikeClick
                // onLike={onLike}
                weather={card.weather}
                isLogged={isLogged}
                currentUser={currentUser}
                // onLike={handlelikeClick}
                onLike={() => {
                  handlelikeClick(
                    card._id,
                    card.likes.includes(currentUser._id),
                    currentUser
                  );
                }}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
