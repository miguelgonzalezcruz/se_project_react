const location = {
  latitude: "39.877102353224544",
  longitude: "3.016448725979634",
};
const secretKey = "d822945cd55b4400a70102740221109";

const defaultWeatherIcons = [
  {
    _id: 0,
    name: "cloudyDay",
    weather: "Cloudy",
    day: 1,
    link: "../images/cloudyDay.svg",
  },

  {
    _id: 1,
    name: "sunnyNight",
    weather: "Sunny",
    day: 0,
    link: "../images/sunnyNight.svg",
  },
];

export { location, secretKey, defaultWeatherIcons };
