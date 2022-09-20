export function ItemModal({ card, onClose, isOpen }) {
  return (
    /*modal for the image popup*/
    <div className={`modal ${isOpen && "modal_open"}`} id="image-popup">
      <div className="popup__content">
        <img className="popup__image" src={card && card.link} />
        {/* src={`url(${card.link})`} */}
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img alt="X" />
        </button>
        <h2 className="popup__caption">{card && card.name}</h2>
      </div>
    </div>
  );
}

export default ItemModal;
