import "./Header.css";
import headerLogo from "../assets/TripleTenLogo.png";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__info">
        <img className="header__logo" src={headerLogo} alt="WTWR logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user">
        <button className="header__add-button" type="button" onClick={onAddClick}>
          + Add clothes
        </button>
        <p className="header__username">Eric</p>
        <div className="header__avatar" aria-label="Eric avatar">
          E
        </div>
      </div>
    </header>
  );
}

export default Header;
