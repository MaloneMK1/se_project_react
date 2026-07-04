import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal item-modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="item-modal__content">
        <button
          className="item-modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        {card && (
          <>
            <img className="item-modal__image" src={card.link} alt={card.name} />
            <div className="item-modal__footer">
              <h2 className="item-modal__title">{card.name}</h2>
              <p className="item-modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
