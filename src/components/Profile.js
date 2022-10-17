import ItemCard from "./ItemCard";
import "../blocks/Profile.css";
import { useContext } from "react";
import avatar from "../images/Default-Avatar.png";
import { defaultClothingItems } from "../utils/defaultClothingItems";
import UserItemsList from "./UserItemsList";

function Profile({ handleCardClick, handleAddItemModal, weather, cards }) {
  const userName = "Terrence Tegegne";
  return (
    <main className="user-profile">
      <section className="user-profile__sidebar">
        <div className="sidebar__row">
          <img src={avatar} alt="User Avatar" />
          <p className="username">{userName}</p>
        </div>
      </section>
      <UserItemsList
        weather={weather}
        cards={cards}
        cardClick={handleCardClick}
        handleAddItemClick={handleAddItemModal}
      />
    </main>
  );
}

export default Profile;
