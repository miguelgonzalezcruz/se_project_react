import React from "react";
import "../blocks/Profile.css";
import avatar from "../images/Default-Avatar.png";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import AddItemModal from "./AddItemModal";
import EditProfileModal from "./EditProfileModal";

function Profile({
  handleCardClick,
  handleAddItemModal,
  weather,
  cards,
  currentUser,
  handleLogout,
  openEditProfilePopup,
  openAddItemPopup,
  isLogged,
  likeCard,
  dislikeCard,
  onLike,
  closePopup,
  handleAddItemSubmit,
  isLoading,
  handleEditProfile,
  handleCloseEvent,
  openAddItem,
  openEditProfile,
}) {
  return (
    <div className="user-profile">
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        openEditProfilePopup={openEditProfilePopup}
      />
      <ClothesSection
        weather={weather}
        cards={cards}
        handleCardClick={handleCardClick}
        handleAddItemClick={handleAddItemModal}
        openAddItemPopup={openAddItemPopup}
        isLogged={isLogged}
        likeCard={likeCard}
        dislikeCard={dislikeCard}
        currentUser={currentUser}
        onLike={onLike}
      />
      {openAddItem && (
        <AddItemModal
          isOpen={openAddItemPopup}
          onClose={closePopup}
          onAddItem={handleAddItemSubmit}
          isLoading={isLoading}
          closePopup={handleCloseEvent}
        />
      )}
      {openEditProfile && (
        <EditProfileModal
          isOpen={openEditProfilePopup}
          onClose={closePopup}
          onEditProfile={handleEditProfile}
          isLoading={isLoading}
          closePopup={handleCloseEvent}
        />
      )}
    </div>
  );
}

export default Profile;
