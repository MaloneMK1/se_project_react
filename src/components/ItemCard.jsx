import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  function handleCardClick() {
    onCardClick(item);
  }

  return (
    <li className="card">
      <button className="card__button" type="button" onClick={handleCardClick}>
        <h2 className="card__name">{item.name}</h2>
        <img className="card__image" src={item.link} alt={item.name} />
      </button>
    </li>
  );
}

export default ItemCard;
