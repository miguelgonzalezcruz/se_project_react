import { NavLink } from "react-router-dom";
import "../blocks/Header.css";
import logo from "../images/logo-wtwr.svg";
import avatar from "../images/Default-Avatar.png";
import ToggleSwitch from "./ToggleSwitch";

function Header({ weather, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Terrence Tegegne";
  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <img className="header__logo" src={logo} alt="logo WTWR" />
        </NavLink>
        <p className="header__date">
          {currentDate}, {weather.city}
        </p>
      </div>
      <div className="navigation__container">
        <ToggleSwitch />

        <button className="navigation__button" onClick={handleAddClick}>
          + Add clothes
        </button>

        <NavLink to="/profile" className="navigation__username">
          {userName}
          <img className="navigation__avatar" src={avatar} alt="User Avatar" />
        </NavLink>

        <NavLink to="/signin" className="navigation__username">
          Sign Up
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
