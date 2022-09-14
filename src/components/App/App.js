import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
// import Main from "";
// import Footer from "";
// import ModalWithForm from "";
// import ItemModal from "";
import { location, secretKey } from "../../utils/constants.js";
import {
  getForcastWeather,
  filterDataFromTheApi,
} from "../../utils/weatherApi";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForcastWeather(location, secretKey)
        .then((data) => {
          setWeatherData(filterDataFromTheApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <body className="page">
        <div className="page__wrapper">
          <Header weatherData={weatherData} />
          <main></main>
          <footer></footer>
        </div>
      </body>
    </div>
  );
};

export default App;
