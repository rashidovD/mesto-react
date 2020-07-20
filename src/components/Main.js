import React from 'react';
import api from '../utils/Api';
import Card from './Card';
import pen from '../images/editButton.svg';
import plus from '../images/addButton.svg';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userJob: '',
      userAvatar: '',
      cards: []
    }
  }

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{name, about, avatar}, initialCards]) => {
        this.setState({
          userName: name,
          userJob: about,
          userAvatar: avatar,
          cards: initialCards
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main className="content">
      <section className="profile">
        <div className="profile__box">

          <button
            className="profile__avabutton"
            type="button"
            onClick={this.props.onEditAvatar}>
              <img
              alt="Аватар"
              className="profile__avatar"
              src={this.state.userAvatar}
              />
          </button>

          <div className="profile__info">
            <div className="profile__details">
              <h1 className="profile__name">{this.state.userName}</h1>
              <button
                type="button"
                className="button profile__edit-button"
                onClick={this.props.onEditProfile}>
                  <img
                  src={pen}
                  alt="Ручка"
                  />
              </button>
            </div>
            <p className="profile__job">{this.state.userJob}</p>
          </div>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          onClick={this.props.onAddPlace}>
            <img
            src={plus}
            alt="Плюс"
            />
        </button>
      </section>
      <section className="places">
        {this.state.cards.map(card => (
          <Card
            card={card}
            key={card._id}
            onCardClick={this.props.onCardClick}
          />
        ))}
      </section>
    </main>
    )
  }
}

export default Main;