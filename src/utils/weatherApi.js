const getForcastWeather = (location, secretKey) => {
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

const filterDataFromTheApi = (data) => {
  if (!data) {
    return null;
  }
  const weather = {};
  weather.city = data.location.name;
  weather.temperature = data.current.temp_f;
  // asegurarse que la llamada al icon es correcta
  return weather;
};

export { getForcastWeather, filterDataFromTheApi };
