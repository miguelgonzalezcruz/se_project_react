import ItemCard from "./ItemCard";
import "../blocks/Profile.css";
import { useContext } from "react";
import avatar from "../images/Default-Avatar.png";
import { defaultClothingItems } from "../utils/defaultClothingItems";

function Profile({ handleCardClick, handleAddClick }) {
  const userName = "Terrence Tegegne";
  return (
    <main className="user-profile">
      <section className="user-profile__sidebar">
        <div className="sidebar__row">
          <img src={avatar} alt="User Avatar" />
          <p className="username">{userName}</p>
        </div>
      </section>
      <section className="user-profile__content">
        <div className="user-profile__content_row">
          <p>Your items</p>
          <button className="add-button" onClick={handleAddClick}>
            + Add new
          </button>
        </div>
        <div>
          <ul className="user-profile__cards">
            {defaultClothingItems.map((currentCard) => (
              <ItemCard
                key={currentCard._id}
                card={currentCard}
                cardClick={() => handleCardClick(currentCard)}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Profile;
