import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

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
import { useTranslation } from "react-i18next"
function Header({ favoriteItems }) {
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();
  const login = () =>{
    fetch('https://api.reddel.kz/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
    })
        .then((response) => {
          if (response.status == 200) {
            navigate('/profile')
          }
          else{
            navigate('/login')
          }
        })
  }
  const favorites = () =>{
    fetch('https://api.reddel.kz/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
    })
        .then((response) => {
          if (response.status == 200) {
            navigate('/favorites')
          }
          else{
            navigate('/login')
          }
        })
  }
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
                <span><a href="https://instagram.com/reddel.kz?igshid=MzRlODBiNWFlZA==">reddel.kz</a></span>
              </div>
              <div className="link">
                <div className="link-img">
                  <img src={whatsapp} alt="whatsapp" />
                </div>
                <span><a href="https://wa.me/77077528313">+7 (707) 752 83 13</a></span>
              </div>
              <div className="link">
                <div className="link-img">
                  <img src={mail} alt="mail" />
                </div>
                <span><a href="mailto:support@reddel.kz">support@reddel.kz</a></span>
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
              <a className="link1" href="https://wa.me/77077528313">{t("Для Бизнеса")}</a>
              <Search placeholder={t("Я ищу")} />
            </div>
          </div>
          <div className="header-right">
            <a href="#" onClick={favorites} className="header-right-item">
              <img src={heart} alt="heart" />
              <span>{t("Избранное")}</span>
            </a>
            <a href="#" onClick={login} className="header-right-item">
              <img src={profile} alt="profile" />
              <span>Профиль</span>
            </a>
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
