import React from "react";
import "./Header.css";
import logoMain from "";
import avatarDefault from "";

const Header = ({ weatherData }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Terrence Tegegne";
  const avatar = "";

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoMain} alt="wtwr logo" className="header__logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              <button className="navigation__button">+ Add clothes</button>
            </li>
            <li>
              <div className="navigation__link">
                {userName}
                {avatar}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
