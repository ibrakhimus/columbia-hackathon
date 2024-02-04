import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav__row">
      <nav>
        <Link to="/">
          <figure className="nav__logo">
            <img className="nav__logo--img" src={Logo} alt="" />
          </figure>
        </Link>
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
