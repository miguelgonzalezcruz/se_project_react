import "../blocks/SideBar.css";
import "../blocks/Profile.css";

function SideBar({ currentUser, handleLogout, openEditModal }) {
  return (
    <div className="user-profile">
      <section className="user-profile__sidebar">
        <div className="sidebar__row">
          <img src={currentUser.avatar} alt="User Avatar" />
          <p className="username">{currentUser.name}</p>
        </div>
        <button type="button" className="add-button" onClick={openEditModal}>
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
