const baseURL =
  "https://my-json-server.typicode.com/miguelgonzalezcruz/se_project_react";

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getItems = (baseURL) => {
  return fetch(`${baseURL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleApiResponse);
};

const addItems = (baseURL, name, imageUrl, weather) => {
  return fetch(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name, imageUrl, weather),
  }).then(handleApiResponse);
};

const removeItems = (baseURL, id) => {
  return fetch(`${baseURL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleApiResponse);
};

export { getItems, addItems, removeItems, baseURL };
