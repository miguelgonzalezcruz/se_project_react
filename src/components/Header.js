import "../blocks/Header.css";
import logo from "../images/logo-wtwr.svg";
import avatar from "../images/Default-Avatar.png";

function Header({ weather, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Terrence Tegegne";
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="logo WTWR" />
        <p className="header__date">
          {currentDate}, {weather.city}
        </p>
      </div>
      <div className="navigation__container">
        <button className="navigation__button" onClick={handleAddClick}>
          + Add clothes
        </button>
        <p className="navigation__username">{userName}</p>
        <img className="navigation__avatar" src={avatar} alt="User Avatar" />
      </div>
    </header>
  );
}

export default Header;
