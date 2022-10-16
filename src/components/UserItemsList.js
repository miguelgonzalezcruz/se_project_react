import React from "react";
import ItemCard from "./ItemCard";
import { weatherType } from "../utils/weatherApi";
import CurrentTemperatureUnitContext from "../utils/CurrentTemperatureUnitContext";
import "../blocks/UserItemsList.css";

function UserItemsList({ cards, weather, cardClick, handleAddItemClick }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const currentTemperature =
    currentTemperatureUnit === "F"
      ? weather?.temperature
      : weather?.temperatureC;

  return (
    <section className="user-profile__content">
      <div className="user-profile__content_row">
        <p>Your items</p>
        <button className="add-button" onClick={handleAddItemClick}>
          + Add new
        </button>
      </div>
      <div>
        <ul className="user-profile__cards">
          {cards
            .filter((card) => card.weather === weatherType(currentTemperature))
            .map((currentCard) => (
              <ItemCard
                key={currentCard.id}
                card={currentCard}
                cardClick={() => cardClick(currentCard)}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}

export default UserItemsList;
