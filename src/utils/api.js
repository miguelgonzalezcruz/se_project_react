const baseURL = "http://localhost:3001";

//https://my-json-server.typicode.com/miguelgonzalezcruz/se_project_react/items

//http://localhost:3001

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItemsFromList = () => {
  return fetch(`${baseURL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleApiResponse);
};

const addItemsToList = (name, imageUrl, weather) => {
  return fetch(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(name, imageUrl, weather),
  }).then(handleApiResponse);
};

const removeItemsFromList = (id) => {
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleApiResponse);
};

const likeCard = (id) => {
  return fetch(`${baseURL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(handleApiResponse);
};

const dislikeCard = (id) => {
  return fetch(`${baseURL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(handleApiResponse);
};

export {
  getItemsFromList,
  addItemsToList,
  removeItemsFromList,
  likeCard,
  dislikeCard,
  baseURL,
};
