// HandleSubmit

// handleSubmit(e) {
//     e.preventDefault();
//     if (this.state.password === this.state.confirmPassword) {
//       let { username, password, email } = this.state;
//       auth.register(username, password, email).then((res) => {
//         if (res) {
//           this.setState({ message: "" }, () => {
//             this.props.history.push("/login");
//           });
//         } else {
//           this.setState({
//             message: "Something went wrong!",
//           });
//         }
//       });
//     }
//   }

// auth.js - register

// export const BASE_URL = "https://api.nomoreparties.co";

// const register = (username, password, email) => {
//   return fetch(`${BASE_URL}/auth/local/register`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password, email }),
//   }).then((response) => {
//     try {
//       if (response.status === 200) {
//         return response.json();
//       }
//     } catch (e) {
//       return e;
//     }
//   });
// };
