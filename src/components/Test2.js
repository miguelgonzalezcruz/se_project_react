import "../blocks/ItemCard.css";
import React from "react";

class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  render() {
    return (
      <ul>
        {this.props.cards.map((card) => {
          return (
            <li
              key={card.id}
              className="card__wrapper"
              onClick={(e) => {
                this.props.cardClick(card);
                this.props.setData({
                  id: card.id,
                  name: card.name,
                  imageUrl: card.imageUrl,
                  weather: card.weather,
                  card: e.target,
                });
              }}
            >
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
                src={card.imageUrl}
                alt={card.name}
                onClick={this.props.cardClick}
                name={card.name}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ItemCard;
