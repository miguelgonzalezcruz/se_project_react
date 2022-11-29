import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    if (!this.state.email || !this.state.password) {
      return;
    }
    auth
      .authorize(this.state.email, this.state.password)
      .then((res) => {
        if (res.jwt) {
          this.setState(
            {
              email: "",
              password: "",
            },
            () => {
              this.props.handleLogin();
              this.props.history.push("/profile");
            }
          );
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
            <h2 className="popup__title">Log in</h2>
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
              placeholder="Password"
              required
              onChange={this.handleChange}
            />
            <button className="popup__button" type="submit">
              Log in
            </button>
            <p className="popup__text">
              or{" "}
              <Link className="popup__link" to="/sign-in">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginModal);
