import "./ModalWithForm.css";
import { useModalClose } from "../hooks/useModalClose";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  loadingText = "Saving...",
  isLoading = false,
  secondaryButtonText,
  onSecondaryClick,
  isOpen,
  onClose,
  onSubmit,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button
              className="modal__submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? loadingText : buttonText}
            </button>
            {secondaryButtonText && (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryClick}
                disabled={isLoading}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
