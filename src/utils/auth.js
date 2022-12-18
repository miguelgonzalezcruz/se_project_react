const baseURL = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

const register = (email, password, name, avatar) => {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  }).then(checkResponse);
};

const login = (email, password) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

const authorize = (token) => {
  return fetch(`${baseURL}/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  }).then(checkResponse);
};

const editProfile = (name, avatar) => {
  return fetch(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};

// const authorize = (email, password) => {
//   return fetch(`${baseURL}/users/me`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.token) {
//         localStorage.setItem("jwt", data.token);
//         return data;
//       } else {
//         return Promise.reject(`Error ${data.status}`);
//       }
//     })
//     .catch((err) => console.log(err));
// };

export { register, editProfile, login, authorize };
