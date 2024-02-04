import React from "react";
import Logo from "../assets/Logo.png";

const Nav = () => {
  return (
    <div className="nav__row">
      <nav>
        <figure className="nav__logo">
          <img className="nav__logo--img" src={Logo} alt="" />
        </figure>
        <ul className="nav__list">
          <li>Features</li>
          <li>Features</li>
          <li>Features</li>
          <li>Features</li>
          <li>Features</li>
        </ul>
        <button className="nav__button">Propose A Bill</button>
      </nav>
    </div>
  );
};

export default Nav;