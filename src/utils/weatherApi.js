const getForecastWeather = (secretKey, location) => {
  const parsedLocation = `${location.latitude},${location.longitude}`;
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${secretKey}&q=${parsedLocation}&days=1`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const weatherType = (actualWeather) => {
  if (actualWeather >= 86) {
    return "hot";
  } else if (actualWeather >= 66 && actualWeather <= 85) {
    return "warm";
  } else if (actualWeather <= 65) {
    return "cold";
  }
};

const witchWeatherType = (icon) => {
  if (icon === "Sunny" || icon === "Clear") {
    return "sunny";
  } else if (
    icon === "Partly cloudy" ||
    icon === "Cloudy" ||
    icon === "Overcast"
  ) {
    return "cloudy";
  } else if (
    icon === "Mist" ||
    icon.includes("rain") ||
    icon.includes("drizzle")
  ) {
    return "rain";
  } else if (
    icon.includes("snow") ||
    icon.includes("sleet") ||
    icon.includes("ice")
  ) {
    return "snow";
  } else if (icon.includes("fog")) {
    return "fog";
  } else if (icon.includes("with thunder")) {
    return "storm";
  }
};

const filterDataFromTheApi = (data) => {
  if (!data) {
    return null;
  }
  const weather = {};
  weather.city = data.location.name;
  weather.temperature = data.current.temp_f;
  weather.temperatureC = data.current.temp_c;
  weather.isday = data.current.is_day;
  weather.card = witchWeatherType(data.current.condition.text);
  return weather;
};

export { getForecastWeather, weatherType, filterDataFromTheApi };
