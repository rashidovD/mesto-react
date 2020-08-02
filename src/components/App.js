import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOPen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      currentUser: null,
      dataImg: {
        link: null,
        name: null
      }
    }
  }

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        this.setState({
          currentUser: userInfo,
          cards: initialCards
        })
      })
      .catch(error => console.log(error));
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    })
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOPen: true
    })
  }

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    })
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: true,
      dataImg: {
        link: card.link,
        name: card.name
      }
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOPen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      dataImg: {
        link: null,
        name: null
      }
    })
  }

  handleUpdateUser = (userInfo) => {
    api.updUserInfo(userInfo)
      .then(userInfo => {
        this.setState({
          currentUser: userInfo
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleUpdateAvatar = (link) => {
    api.changeAvatar(link)
      .then(userInfo => {
        this.setState({
          currentUser: userInfo
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleAddPlaceSubmit = (dataForm) => {
    api.uploadCard(dataForm)
      .then(newCard => {
        this.setState({
          cards: [newCard, ...this.state.cards]
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === this.state.currentUser._id);
    api.likeCard(card._id, isLiked)
      .then(newCard => {
        const newCards = this.state.cards.map(item => item._id === card._id ? newCard: item);
        this.setState({
          cards: newCards
        });
      })
      .catch(error => console.log(error));
  }

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(res => {
        const newCards = this.state.cards.filter(item => item._id !== card._id);
        this.setState({
          cards: newCards
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="page">

        <CurrentUserContext.Provider value={this.state.currentUser}>

          <Header />
          {this.state.currentUser && <Main
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onEditAvatar={this.handleEditAvatarClick}
            onCardClick={this.handleCardClick}
            cards={this.state.cards}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
          />}
          <Footer />

          {this.state.currentUser && <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOPen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUser}
          />}

          <AddPlacePopup
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            onAddPlace={this.handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatar}
          />

          <ImagePopup
            card={this.state.selectedCard}
            onClose={this.closeAllPopups}
            image={this.state.dataImg}
          />

        </CurrentUserContext.Provider>

      </div>
    );
  }
}

export default App;
