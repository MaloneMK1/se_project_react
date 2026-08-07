import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import headerLogo from "../assets/TripleTenLogo.png";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch";

function UserAvatar({ user, className }) {
  if (user?.avatar) {
    return (
      <img
        className={className}
        src={user.avatar}
        alt={`${user.name} avatar`}
      />
    );
  }

  return (
    <div className={className} aria-label={`${user?.name || "User"} avatar`}>
      {user?.name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
}

function Header({
  weatherData,
  isLoggedIn,
  onAddClick,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
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
        {isLoggedIn ? (
          <>
            <button
              className="header__add-button"
              type="button"
              onClick={onAddClick}
            >
              + Add clothes
            </button>
            <Link className="header__profile-link" to="/profile">
              <p className="header__username">{currentUser?.name}</p>
              <UserAvatar user={currentUser} className="header__avatar" />
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              className="header__auth-button"
              type="button"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
            <button
              className="header__auth-button"
              type="button"
              onClick={onLoginClick}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
