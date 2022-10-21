import "../blocks/ModalWithForm.css";

function ModalWithForm({
  isOpen,
  closePopup,
  children,
  buttonText,
  name,
  title,
  handleSubmit,
}) {
  return (
    <div
      className={`popup popup__${name} ${isOpen ? `popup_open` : ""}`}
      onClick={closePopup}
    >
      <div className="popup__content">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name}>
          {children}
          <button
            className="popup__submit"
            type="submit"
            onClick={handleSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
