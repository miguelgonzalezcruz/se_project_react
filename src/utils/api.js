import { request } from "./auth";

const baseURL = "http://localhost:3001";

//https://my-json-server.typicode.com/miguelgonzalezcruz/se_project_react/items

//http://localhost:3001

const getItemsFromList = () => {
  return request(`${baseURL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addItemsToList = (name, imageUrl, weather) => {
  return request(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(name, imageUrl, weather),
  });
};

const removeItemsFromList = (cardId) => {
  return request(`${baseURL}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const likeCard = (id) => {
  return request(`${baseURL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const dislikeCard = (id) => {
  return request(`${baseURL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

export {
  getItemsFromList,
  addItemsToList,
  removeItemsFromList,
  likeCard,
  dislikeCard,
  baseURL,
};
