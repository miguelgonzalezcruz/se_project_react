import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

function LoginModal() {
  const history = useHistory();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(values)
      .then((res) => {
        if (res) {
          this.props.onClose();
          history.push("/profile");
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
          <h2 className="popup__title">Log in</h2>
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
          <button className="popup__button" type="submit">
            Log in
          </button>
          <p className="popup__text">
            or{" "}
            <Link to="/signup" className="popup__link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default withRouter(LoginModal);
