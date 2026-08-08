import "./DeleteConfirmationModal.css";
import { useModalClose } from "../hooks/useModalClose";

function DeleteConfirmationModal({ isOpen, isLoading, onClose, onConfirm }) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal delete-modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="delete-modal__content">
        <button
          className="delete-modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        <p className="delete-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          className="delete-modal__confirm"
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="delete-modal__cancel"
          type="button"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
