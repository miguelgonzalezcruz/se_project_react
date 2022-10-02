import "../blocks/ModalWithForm.css";

function ModalWithForm({
  isOpen,
  closePopup,
  closeEsc,
  children,
  onClose,
  buttonText,
  name,
  title,
}) {
  return (
    <div
      className={`popup popup__${name} ${isOpen ? `popup_open` : ""}`}
      onClick={closePopup}
    >
      <div className="popup__content">
        <form
          className="popup__form"
          name={name}
          onKeyDown={closeEsc}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
          <button className="popup__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
