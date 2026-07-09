import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal delete-modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="delete-modal__content">
        <button
          className="delete-modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        <p className="delete-modal__text">
          Are you sure you want to delete this item? This action is irreversible.
        </p>
        <button className="delete-modal__confirm" type="button" onClick={onConfirm}>
          Yes, delete item
        </button>
        <button className="delete-modal__cancel" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
