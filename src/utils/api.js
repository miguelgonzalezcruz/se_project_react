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
  return fetch(
    `https://my-json-server.typicode.com/miguelgonzalezcruz/se_project_react/items`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(handleApiResponse)
    .then(console.log("llamado getItemsFromList"));
};

const addItemsToList = ({ id, name, imageUrl, weather }) => {
  return fetch(
    `https://my-json-server.typicode.com/miguelgonzalezcruz/se_project_react/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, imageUrl, weather }),
    }
  )
    .then(handleApiResponse)
    .then(console.log("llamado addItemsToList"));
};

const removeItemsFromList = (baseURL, id) => {
  return fetch(`${baseURL}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleApiResponse);
};

export { getItemsFromList, addItemsToList, removeItemsFromList, baseURL };
