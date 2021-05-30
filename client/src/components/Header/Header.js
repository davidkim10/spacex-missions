import React from 'react';
import logo from '../../images/logo-white.png';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img className="logo img-fluid" src={logo} alt="SpaceX Logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
