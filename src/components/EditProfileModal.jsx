import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

const defaultValues = {
  name: "",
  avatar: "",
};

function EditProfileModal({ isOpen, isLoading, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateProfile(values);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      loadingText="Saving..."
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="profile-name">
        Name
        <input
          className="modal__input"
          id="profile-name"
          name="name"
          type="text"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="profile-avatar">
        Avatar URL
        <input
          className="modal__input"
          id="profile-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
