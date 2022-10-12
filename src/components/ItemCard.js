import "../blocks/ItemCard.css";

function ItemCard({ card, cardClick }) {
  return (
    <div className="card__wrapper">
      <div className="card">
        <div className="card__title-container">
          <p className="card__title">{card.name}</p>
        </div>
        <div className="card__like-container">
          <button className="card__like"></button>
        </div>
      </div>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={cardClick}
      />
    </div>
  );
}

export default ItemCard;