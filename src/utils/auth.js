const baseURL = "http://localhost:3000";

export const register = async ({ email, password, name, avatar }) => {
  const response = await fetch(`${baseURL}/signup`, {
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
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }
  console.log(data);
};

// export const register = async ({ email, password, name, avatar }) => {
//   return fetch(`${baseURL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       password,
//       name,
//       avatar,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       console.log(data);
//     });
// };

export const authorize = ({ email, password }) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      } else {
        return;
      }
    });
};
