import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

function RegisterModal() {
  const history = useHistory();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(values)
      .then((res) => {
        if (res) {
          this.props.onClose();
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="popup popup__register">
      <div className="popup__content">
        <form className="popup__form" name="register" onSubmit={handleSubmit}>
          <h2 className="popup__title">Sign up</h2>
          <input
            className="popup__input"
            type="email"
            name="email"
            value={values.email}
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            className="popup__input"
            type="password"
            name="password"
            value={values.password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <input
            className="popup__input"
            type="text"
            name="name"
            value={values.name}
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <input
            className="popup__input"
            type="url"
            name="avatar"
            value={values.avatar}
            placeholder="Avatar URL"
            required
            onChange={handleChange}
          />
          <button className="popup__button" type="submit">
            Sign up
          </button>
          <p className="popup__text">
            Already registered?{" "}
            <Link className="popup__link" to="/signin">
              Next
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default withRouter(RegisterModal);
