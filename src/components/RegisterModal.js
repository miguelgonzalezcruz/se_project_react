import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import ModalWithForm from "./ModalWithForm";

function RegisterModal(isOpen, onClose, onRegister, closePopup, closeEsc) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, values } = e.target;
    setValues((prevState) => {
      return {
        ...prevState,
        [name]: values,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.email, values.password, values.name, values.avatar);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="register"
      name="register"
      buttonText="Sign up"
      onClose={onClose}
      closeEsc={closeEsc}
      closePopup={closePopup}
      handleSubmit={handleSubmit}
    >
      <label className="popup__input-label">Email</label>
      <input
        className="popup__input"
        type="email"
        name="email"
        value={values.email}
        placeholder="Email"
        required
        onChange={handleChange}
      />
      <label className="popup__input-label">Password</label>
      <input
        className="popup__input"
        type="password"
        name="password"
        value={values.password}
        placeholder="Password"
        required
        onChange={handleChange}
      />
      <label className="popup__input-label">Name</label>
      <input
        className="popup__input"
        type="text"
        name="name"
        value={values.name}
        placeholder="Name"
        required
        onChange={handleChange}
      />
      <label className="popup__input-label">Avatar URL</label>
      <input
        className="popup__input"
        type="url"
        name="avatar"
        value={values.avatar}
        placeholder="Avatar URL"
        required
        onChange={handleChange}
      />
      <p className="popup__text">
        Already registered?{" "}
        <Link className="popup__link" to="/signin">
          Log in here
        </Link>
      </p>
    </ModalWithForm>
  );
}

export default withRouter(RegisterModal);
