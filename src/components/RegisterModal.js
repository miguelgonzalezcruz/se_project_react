import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { Link, withRouter } from "react-router-dom";

const RegisterModal = ({
  isOpen,
  isLoading,
  onClose,
  closePopup,
  closeEsc,
  onRegister,
  openLoginPopup, // En AddItemModal no se usa
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

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
    onRegister({ email, password, name, avatar });
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
        onChange={handleEmail}
        required
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
        <Link className="popup__link" to="/signin" onClick={openLoginPopup}>
          Log in here
        </Link>
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
