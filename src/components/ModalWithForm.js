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
        <form className="popup__form" name={name} noValidate>
          <h2 className="popup__title">{title}</h2>
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
