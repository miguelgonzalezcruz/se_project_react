import React from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, cards, onCardClick }) {
  const actualWeather = weatherData.temperature;

  const weatherType = () => {
    if (actualWeather >= 86) {
      return "hot";
    } else if (actualWeather >= 66 && actualWeather <= 85) {
      return "warm";
    } else if (actualWeather <= 65) {
      return "cold";
    }
  };

  return (
    <main className="main">
      <p className="main__description">
        Today is {actualWeather}ºF / You may want to wear:
      </p>
      <section className="main__clothes">
        <div className="main__items">
          {cards
            .filter((card) => card.weather === weatherType())
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                card={filteredCard}
                onCardClick={onCardClick}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
