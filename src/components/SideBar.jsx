import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={`${currentUser.name} avatar`}
          />
        ) : (
          <div
            className="sidebar__avatar"
            aria-label={`${currentUser?.name} avatar`}
          >
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button className="sidebar__button" type="button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__button" type="button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
