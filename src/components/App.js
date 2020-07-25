import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ButtonSubmit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOPen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      dataImg: {
        link: null,
        name: null
      }
    }
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

  render() {
    return (
      <div className="page">
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
        />
        <Footer />

      <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={this.state.isEditProfilePopupOPen}
      onClose={this.closeAllPopups}>
        <input type="text" name="name" placeholder="Имя" className="popup__input popup__input_type_name" required pattern="[a-zA-ZА-ЯЁа-яё\s\-]+" minLength="2" maxLength="40"  id="name-input" />
        <span className="popup__input-error" id="name-input-error"></span>
        <input type="text" name="job" placeholder="О себе" className="popup__input popup__input_type_job" required minLength="2" maxLength="200" id="job-input" />
        <span className="popup__input-error" id="job-input-error"></span>
        <ButtonSubmit>Сохранить</ButtonSubmit>
      </PopupWithForm>

      <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={this.state.isAddPlacePopupOpen}
      onClose={this.closeAllPopups}>
        <input type="text" name="name" placeholder="Название" className="popup__input" required minLength="1" maxLength="30" id="name-input" />
        <span className="popup__input-error" id="name-input-error"></span>
        <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required id="url-input" />
        <span className="popup__input-error" id="url-input-error"></span>
        <ButtonSubmit>Создать</ButtonSubmit>
      </PopupWithForm>

      <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={this.state.isEditAvatarPopupOpen}
      onClose={this.closeAllPopups}>
        <input type="url" className="popup__input popup__input_type_link" name="link" placeholder="Ссылка на картинку" id="avatar-input" required />
        <span className="popup__input-error" id="avatar-input-error"></span>
        <ButtonSubmit>Сохранить</ButtonSubmit>
      </PopupWithForm>

      <ImagePopup
        card={this.state.selectedCard}
        onClose={this.closeAllPopups}
        image={this.state.dataImg}
      />


      </div>
    );
  }
}

export default App;
