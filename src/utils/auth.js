const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrmgc.students.nomoredomainssbs.ru/"
    : "http://localhost:3001";

// const baseURL = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const register = (email, password, name, avatar) => {
  return request(`${baseURL}/signup`, {
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
  });
};

const login = (email, password) => {
  return request(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const authorize = (token) => {
  return request(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const editProfile = (name, avatar) => {
  return request(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export { register, editProfile, login, authorize, checkResponse, request };
