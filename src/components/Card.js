import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render () {
    return (
      <div className="place">
        <img
        className="place__image"
        src={this.props.card.link}
        onClick={this.handleClick}
        />
        <button type="button" className="place__delete-card"></button>
        <div className="place__description">
          <p className="place__name">{this.props.card.name}</p>
          <div className="place__like-box">
            <button type="button" className="place__like"></button>
            <p className="place__count">{this.props.card.likes.length}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;