import React from "react";
import { Link } from "react-router-dom";

import instagram from "../../assets/instagram.svg";
import whatsapp from "../../assets/whatsapp.svg";
import mail from "../../assets/mail.svg";
import location from "../../assets/location.svg";
import Logo from "../../assets/Logo.svg";
import icon from "../../assets/icon.svg";
import profile from "../../assets/profile.svg";
import heart from "../../assets/heart.svg";

import Localization from "../localization/Localization";
import Search from "../search/Search";
import "./Header.css";

function Header({ favoriteItems }) {
  return (
    <header className="header">
      <div className="header-desk">
        <div className="header-top">
          <div className="container">
            <div className="links">
              <div className="link">
                <div className="link-img">
                  <img src={instagram} alt="instagram" />
                </div>
                <span>reddel.kz</span>
              </div>
              <div className="link">
                <div className="link-img">
                  <img src={whatsapp} alt="whatsapp" />
                </div>
                <span>+7 777 123 45 67</span>
              </div>
              <div className="link">
                <div className="link-img">
                  <img src={mail} alt="mail" />
                </div>
                <span>reddel@help.kz</span>
              </div>
            </div>
            <div className="info">
              <div className="link">
                <img src={location} alt="location" />
                <span className="link-span">Алматы</span>
              </div>
              <Localization />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-left">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
            <div className="header-left-bnt">
              <Link to="/" className="btn">
                <img src={icon} alt="icon" />
                Каталог
              </Link>
              <a>Для Бизнеса</a>
              <Search placeholder="Я ищу..." />
            </div>
          </div>
          <div className="header-right">
            <Link to="/favorites" className="header-right-item">
              <img src={heart} alt="heart" />
              <span>Избранное</span>
            </Link>
            <Link to="/profile" className="header-right-item">
              <img src={profile} alt="profile" />
              <span>Профиль</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="header-mob">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="link">
          <img src={location} alt="location" />
          <span>Алматы</span>
        </div>
        <Localization />
      </div>
    </header>
  );
}

export default Header;
