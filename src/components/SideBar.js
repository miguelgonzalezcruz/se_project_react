import React from "react";
import "../blocks/Profile.css";

function SideBar({
  isOpen,
  onClose,
  closePopup,
  closeEsc,
  isLoading,
  onEditUser,
  isLogged,
  currentUser,
  openEditProfilePopup,
  handleLogout,
}) {
  return (
    <div className="user-profile">
      <section className="user-profile__sidebar">
        <div className="sidebar__row">
          <img src={currentUser.avatar} alt="User Avatar" />
          <p className="username">{currentUser.name}</p>
        </div>
        <button
          type="button"
          className="add-button"
          onClick={openEditProfilePopup}
        >
          Change profile data
        </button>
        <button type="button" className="add-button" onClick={handleLogout}>
          Log Out
        </button>
      </section>
    </div>
  );
}

export default SideBar;
