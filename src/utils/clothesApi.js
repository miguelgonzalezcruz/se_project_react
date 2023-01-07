import { request } from "./auth";

const BASE_URL = "http://localhost:3001";

const getItemList = () => {
  return request(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addItem = ({ name, weather, imageURL }) => {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weather, imageURL }),
  });
};

export { getItemList, addItem };
