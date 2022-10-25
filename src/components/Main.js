import React from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { weatherType } from "../utils/weatherApi";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weather, cards, handleCardClick, index }) {
  const weatherToday = weather.temperature;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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
                key={card.id || index}
                id={card.id}
                name={card.name}
                weather={card.weather}
                imageUrl={card.imageUrl}
                card={card}
                cardClick={handleCardClick}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
