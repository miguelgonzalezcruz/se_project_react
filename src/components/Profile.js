import React from "react";
import "../blocks/Profile.css";
import avatar from "../images/Default-Avatar.png";
import UserItemsList from "./UserItemsList";

function Profile({ handleCardClick, handleAddItemModal, weather, cards }) {
  const userName = "Terrence Tegegne";
  return (
    <div className="user-profile">
      <section className="user-profile__sidebar">
        <div className="sidebar__row">
          <img src={avatar} alt="User Avatar" />
          <p className="username">{userName}</p>
        </div>
      </section>
      <UserItemsList
        weather={weather}
        cards={cards}
        handleCardClick={handleCardClick}
        handleAddItemClick={handleAddItemModal}
      />
    </div>
  );
}

export default Profile;
