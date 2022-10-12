import React from "react";
import { useContext } from "react";
import "../blocks/WeatherCard.css";
import CurrentTemperatureUnitContext from "../utils/CurrentTemperatureUnitContext";

// weather Card Icons

import sunDay from "../images/weather-icons/sunnyDay.svg";
import cloudDay from "../images/weather-icons/cloudyDay.svg";
import rainDay from "../images/weather-icons/rainDay.svg";
import fogDay from "../images/weather-icons/fogDay.svg";
import snowDay from "../images/weather-icons/snowDay.svg";
import stormDay from "../images/weather-icons/stormDay.svg";
import clearNight from "../images/weather-icons/clearNight.svg";
import CloudNight from "../images/weather-icons/cloudyNight.svg";
import rainNight from "../images/weather-icons/rainNight.svg";
import fogNight from "../images/weather-icons/fogNight.svg";
import snowNight from "../images/weather-icons/snowNight.svg";
import stormNight from "../images/weather-icons/stormNight.svg";

// weather Logics
import {
  isSunnyNow,
  isCloudyNow,
  isRainyNow,
  isSnowyNow,
  isStormyNow,
  isFoggyNow,
  whatTimeIsIt,
} from "../utils/WeatherLogic";

function WeatherCard({ weather }) {
  const timeNow = whatTimeIsIt();
  const isSunny = isSunnyNow(weather.card);
  const isCloudy = isCloudyNow(weather.card);
  const isRainy = isRainyNow(weather.card);
  const isSnowy = isSnowyNow(weather.card);
  const isStormy = isStormyNow(weather.card);
  const isFoggy = isFoggyNow(weather.card);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const stylesForWeatherCard = timeNow
    ? "weathercard__background-day"
    : "weathercard__background-night";
  const iconFromWeather = isSunny
    ? timeNow
      ? sunDay
      : clearNight
    : isCloudy
    ? timeNow
      ? cloudDay
      : CloudNight
    : isRainy
    ? timeNow
      ? rainDay
      : rainNight
    : isFoggy
    ? timeNow
      ? fogDay
      : fogNight
    : isSnowy
    ? timeNow
      ? snowDay
      : snowNight
    : isStormy
    ? timeNow
      ? stormDay
      : stormNight
    : null;

  return (
    <section className="weathercard">
      <div className={stylesForWeatherCard}>
        <p className="weathercard__temperature">
          {currentTemperatureUnit === "F"
            ? weather.temperature
            : weather.temperatureC}
        </p>
        <p className="weathercard__temperature">º{currentTemperatureUnit}</p>
        <img
          src={iconFromWeather}
          className="weathercard__icon"
          alt={`${weather.card} icon`}
        />
      </div>
    </section>
  );
}

export default WeatherCard;
