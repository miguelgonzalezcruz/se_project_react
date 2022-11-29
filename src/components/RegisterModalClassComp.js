import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      avatar: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          this.props.onClose();
          this.props.history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="popup popup__register">
        <div className="popup__content">
          <form
            className="popup__form"
            name="register"
            onSubmit={this.handleSubmit}
          >
            <h2 className="popup__title">Регистрация</h2>
            <input
              className="popup__input"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              required
              onChange={this.handleChange}
            />
            <input
              className="popup__input"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="pasword"
              required
              onChange={this.handleChange}
            />
            <button className="popup__submit" type="submit">
              Next
            </button>
            <Link to="/sign-in" className="popup__link">
              or Log in
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
