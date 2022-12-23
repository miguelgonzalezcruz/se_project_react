const baseURL =
  "https://my-json-server.typicode.com/miguelgonzalezcruz/se_project_react/items";

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItemsFromList = () => {
  return fetch(`${baseURL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleApiResponse);
};

const addItemsToList = ({ id, name, imageUrl, weather }) => {
  return fetch(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, imageUrl, weather }),
  }).then(handleApiResponse);
};

const removeItemsFromList = (baseURL, id) => {
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
