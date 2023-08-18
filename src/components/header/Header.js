import React from 'react';
import instagram from '../../assets/instagram.svg';
import whatsapp from '../../assets/whatsapp.svg';
import mail from '../../assets/mail.svg';
import location from '../../assets/location.svg';
import Logo from '../../assets/Logo.svg';
import icon from '../../assets/icon.svg';
import profile from '../../assets/profile.svg';
import heart from '../../assets/heart.svg';

import Localization from '../localization/Localization';
import Search from '../search/Search';
import './Header.css';

function Header() {
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
                <span>Алматы</span>
              </div>
              <Localization />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-left">
            <img src={Logo} alt="" />
            <div className="header-left-bnt">
              <button className='btn'>
                <img src={icon} alt="icon" />
                Каталог
              </button>
              <a>Для Бизнеса</a>
              <Search />
            </div>
          </div>
          <div className="header-right">
            <div className="header-right-item">
              <img src={heart} alt="heart" />
              <span>Избранное</span>
            </div>
            <div className="header-right-item">
              <img src={profile} alt="profile" />
              <span>Профиль</span>
            </div>
          </div>
        </div>
      </div>
      <div className='header-mob'>
        <img src={Logo} alt="" />
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