// import React from "react";
import "./WeatherCard.css";

import sunnyNight from "../../images/sunnyNight.svg";

function WeatherCard({ weatherData }) {
  const iconApiText = weatherData.icontext;
  const actualWeather = weatherData.temperature;
  const statusIsDay = weatherData.isday;

  const weatherIcon = () => {
    if (iconApiText === "Sunny" && statusIsDay === false) {
      return "sunnyNight";
    } else if (iconApiText === "Cloudy" && statusIsDay === true) {
      return "cloudyDay";
    }
  };

  return (
    <section className="mainweathercard">
      <div className="mainweathercard__wrapper">
        <p className="mainweathercard__temperature">{actualWeather}ºF</p>
        <img src={sunnyNight} alt="avatar" className="mainweathercard__icon" />
      </div>
      <div></div>
    </section>
  );
}

export default WeatherCard;
