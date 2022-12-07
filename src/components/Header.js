import React from "react";
import { NavLink } from "react-router-dom";
import "../blocks/Header.css";
import logo from "../images/logo-wtwr.svg";
import ToggleSwitch from "./ToggleSwitch";

// import CurrentUserContext from "../contexts/CurrentUserContext"
// import avatar from "../images/Default-Avatar.png";

function Header({
  weather,
  openAddItemPopup,
  openRegisterPopup,
  openLoginPopup,
  isLogged,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isUserLogged, setIsUserLogged] = React.useState(false);

  const handleClick = () => {
    setIsUserLogged(!isUserLogged);
  };

  // const userName = "Terrence Tegegne";
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
        <ToggleSwitch isUserLogged={isUserLogged} handleClick={handleClick} />
        {isLogged ? (
          <>
            <button className="navigation__button" onClick={openAddItemPopup}>
              + Add clothes
            </button>
            <NavLink to="/profile" className="navigation__username">
              {currentUser.name}
              <img
                className="navigation__avatar"
                src={currentUser.avatar}
                alt="User Avatar"
              />
            </NavLink>
          </>
        ) : (
          <>
            <button className="navigation__button" onClick={openRegisterPopup}>
              Sign Up
            </button>
            <button className="navigation__button" onClick={openLoginPopup}>
              Sign In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
