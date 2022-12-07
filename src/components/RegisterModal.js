import React from "react";
import { Link, withRouter } from "react-router-dom";
import ModalWithForm from "./ModalWithForm";

const RegisterModal = ({
  isOpen,
  onClose,
  closePopup,
  closeEsc,
  isLoading,
  onRegister,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.value);
    console.log(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password, name, avatar);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="register"
      name="register"
      onClose={onClose}
      closeEsc={closeEsc}
      closePopup={closePopup}
      handleSubmit={handleSubmit}
      buttonText={isLoading ? "One sec..." : "Sign up"}
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
      <label className="popup__input-label">Name</label>
      <input
        className="popup__input"
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        required
        onChange={handleName}
      />
      <label className="popup__input-label">Avatar URL</label>
      <input
        className="popup__input"
        type="url"
        name="avatar"
        value={avatar}
        placeholder="Avatar URL"
        required
        onChange={handleAvatar}
      />
      <p className="popup__text">
        Already registered?{" "}
        <Link className="popup__link" to="/signin">
          Log in here
        </Link>
      </p>
    </ModalWithForm>
  );
};

export default withRouter(RegisterModal);
