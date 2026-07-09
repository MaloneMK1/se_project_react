import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const imageSrc = item.imageUrl || item.link;

  function handleCardClick() {
    onCardClick(item);
  }

  return (
    <li className="card">
      <button className="card__button" type="button" onClick={handleCardClick}>
        <h2 className="card__name">{item.name}</h2>
        <img className="card__image" src={imageSrc} alt={item.name} />
      </button>
    </li>
  );
}

export default ItemCard;
