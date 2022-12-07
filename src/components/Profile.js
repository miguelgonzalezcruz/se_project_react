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
  openEditModal,
  openPopup,
  isLogged,
  likeCard,
  dislikeCard,
  isAddItemOpen,
  isEditProfileOpen,
  closePopup,
  handleAddItem,
  isLoading,
  handleEditProfile,
}) {
  return (
    <div className="user-profile">
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        openEditModal={openEditModal}
      />
      <ClothesSection
        weather={weather}
        cards={cards}
        handleCardClick={handleCardClick}
        handleAddItemClick={handleAddItemModal}
        openPopup={openPopup}
        isLogged={isLogged}
        likeCard={likeCard}
        dislikeCard={dislikeCard}
        currentUser={currentUser}
      />
      {isAddItemOpen && (
        <AddItemModal
          isOpen={isAddItemOpen}
          onClose={closePopup}
          onAddItem={handleAddItem}
          isLoading={isLoading}
        />
      )}
      {isEditProfileOpen && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={closePopup}
          onEditProfile={handleEditProfile}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Profile;
