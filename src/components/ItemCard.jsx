import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, isLoggedIn, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const imageSrc = item.imageUrl || item.link;
  const isLiked = (item.likes || []).some((userId) => {
    const likeId = typeof userId === "object" ? userId?._id : userId;
    return likeId === currentUser?._id;
  });

  function handleLike(event) {
    event.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  }

  return (
    <li className="card">
      <button
        className="card__button"
        type="button"
        onClick={() => onCardClick(item)}
      >
        <h2 className="card__name">{item.name}</h2>
        <img className="card__image" src={imageSrc} alt={item.name} />
      </button>
      {isLoggedIn && (
        <button
          className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
          type="button"
          aria-label={isLiked ? `Unlike ${item.name}` : `Like ${item.name}`}
          onClick={handleLike}
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;
