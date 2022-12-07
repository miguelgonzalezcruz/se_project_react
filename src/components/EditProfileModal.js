import React from "react";
import ModalWithForm from "./ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onClose,
  closePopup,
  closeEsc,
  isLoading,
  onEditUser,
  currentUser,
}) => {
  const [name, setName] = React.useState(currentUser.name);
  const [avatar, setAvatar] = React.useState(currentUser.avatar);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onEditUser(name, avatar);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="edit-profile"
      name="edit-profile"
      onClose={onClose}
      closeEsc={closeEsc}
      closePopup={closePopup}
      handleSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Changes saved"}
    >
      <label className="popup__input-label">Name</label>
      <input
        className="popup__input"
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        required
        onChange={handleName}
        minLength="2"
        maxLength="30"
      />
      <label className="popup__input-label">Avatar URL</label>
      <input
        className="popup__input"
        type="url"
        name="avatar"
        value={avatar}
        placeholder="Avatar URL"
        required
        onChange={handleAvatar}
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
