import React from 'react';
import logo from '../images/mestoLogo.svg';

class Header extends React.Component {
  render () {
    return (
      <header className="header">
        <img className="logo" src={logo} alt="Логотип" />
      </header>
    )
  }
}

export default Header;