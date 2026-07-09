import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../assets/TripleTenLogo.png";
import ToggleSwitch from "./ToggleSwitch";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__info">
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src={headerLogo} alt="WTWR logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user">
        <ToggleSwitch />
        <button className="header__add-button" type="button" onClick={onAddClick}>
          + Add clothes
        </button>
        <Link className="header__profile-link" to="/profile">
          <p className="header__username">Eric</p>
          <div className="header__avatar" aria-label="Eric avatar">
            E
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
