import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { weatherType } from "../utils/weatherApi";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../utils/CurrentTemperatureUnitContext";

function Main({ weather, cards, handleCardClick }) {
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
            .map((currentCard) => (
              <ItemCard
                key={currentCard._id}
                card={currentCard}
                cardClick={() => handleCardClick(currentCard)}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;