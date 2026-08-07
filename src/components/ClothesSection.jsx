import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const ownItems = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "object" ? item.owner?._id : item.owner;
    return ownerId === currentUser?._id;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h1 className="clothes-section__title">Your items</h1>
        <button
          className="clothes-section__add-button"
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {ownItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            isLoggedIn
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
