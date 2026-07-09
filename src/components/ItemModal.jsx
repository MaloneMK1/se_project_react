import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, onDeleteClick }) {
  const imageSrc = card?.imageUrl || card?.link;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleDeleteClick() {
    onDeleteClick(card);
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
            <img className="item-modal__image" src={imageSrc} alt={card.name} />
            <div className="item-modal__footer">
              <div>
                <h2 className="item-modal__title">{card.name}</h2>
                <p className="item-modal__weather">Weather: {card.weather}</p>
              </div>
              <button
                className="item-modal__delete-button"
                type="button"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
