import { useForm } from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

const defaultValues = {
  email: "",
  password: "",
};

function LoginModal({
  isOpen,
  isLoading,
  onClose,
  onLogin,
  onSwitchToRegister,
}) {
  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values, resetForm);
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      loadingText="Logging in..."
      isLoading={isLoading}
      secondaryButtonText="or Sign up"
      onSecondaryClick={onSwitchToRegister}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
