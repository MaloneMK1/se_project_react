import { useForm } from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

const defaultValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="imageUrl">
        Image
        <input
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__radio-label" htmlFor="hot">
          <input
            className="modal__radio"
            id="hot"
            name="weather"
            type="radio"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label className="modal__radio-label" htmlFor="warm">
          <input
            className="modal__radio"
            id="warm"
            name="weather"
            type="radio"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal__radio-label" htmlFor="cold">
          <input
            className="modal__radio"
            id="cold"
            name="weather"
            type="radio"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
