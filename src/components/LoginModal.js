import React from "react";
import ModalWithForm from "./ModalWithForm";
import { Link, useHistory, withRouter } from "react-router-dom";

const LoginModal = ({
  isOpen,
  onClose,
  closePopup,
  closeEsc,
  isLoading,
  onRegister,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="login"
      name="login"
      onClose={onClose}
      closeEsc={closeEsc}
      closePopup={closePopup}
      handleSubmit={handleSubmit}
      buttonText={isLoading ? "One sec..." : "Log in"}
    >
      <label className="popup__input-label">Email</label>
      <input
        className="popup__input"
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        required
        onChange={handleEmail}
      />
      <label className="popup__input-label">Password</label>
      <input
        className="popup__input"
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        required
        onChange={handlePassword}
      />
      <p className="popup__text">
        or{" "}
        <Link to="/signup" className="popup__link">
          Sign up
        </Link>
      </p>
    </ModalWithForm>
  );
};

export default withRouter(LoginModal);
