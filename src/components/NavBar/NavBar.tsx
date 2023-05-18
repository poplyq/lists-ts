import React from 'react';
import './navbar.css';
import logo from './100.png';

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className='navBarCon'>
      <div className="custom-loader"></div>
      <h1 className="navbarTitle">Lists</h1>
      </div>
      <nav>
        <ul className="navbarList">
          <li className="navbarElement">Рабочие пространства</li>
          <li className="navbarElement">Недавние</li>
        </ul>
      </nav>
      <img src={logo} className="navbarUser" alt="" />
    </div>
  );
};
