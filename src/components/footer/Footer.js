import './Footer.css'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo2 from '../../assets/Logo2.svg';
import instagram from '../../assets/instagram2.svg';
import whatsapp from '../../assets/whatsapp2.svg';
import mail from '../../assets/mail2.svg';

import home from '../../assets/home.svg';
import heart from '../../assets/heart.svg';
import search from '../../assets/Search2.svg';
import profile from '../../assets/profile.svg';

import home2 from '../../assets/home2.svg';
import heart2 from '../../assets/heart3.svg';
import profile2 from '../../assets/profile3.svg';

function Footer() {
  return (
    <footer className="footer">
        <div className="desk">
            <section className="footer-section">
                <div className="footer-logo">
                    <img src={Logo2} alt="logo" />
                    <span>Сертификат для оплаты счета в рассрочку</span>
                </div>
                <div className="footer-links">
                    <div className="footer-link">
                        <Link to="/">Каталог</Link>
                        <a>Для бизнеса</a>
                        <Link to="/favorites">Избранное</Link>
                        <Link to="/profile">Личный кабинет</Link>
                    </div>
                    <div className="footer-network">
                        <div>
                            <img src={instagram} alt="instagram" />
                            <span>reddel.kz</span>
                        </div>
                        <div>
                            <img src={whatsapp} alt="instagram" />
                            <span>+7 777 123 45 67</span>
                        </div>
                        <div>
                            <img src={mail} alt="instagram" />
                            <span>reddel@help.kz</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="footer-bottom">
                <p>© Copyright 2022, Reddel</p>
            </div>
        </div>
        <div className="mob">
          <Link to="/" className="mob-item">
            <img src={home} alt="logo" />
            <span>Главная</span>
          </Link>
          <Link to="/search" className="mob-item">
            <img src={search} alt="logo" />
            <span>Поиск</span>
          </Link>
          <Link to="/favorites" className="mob-item">
            <img src={heart} alt="logo" />
            <span>Избранное</span>
          </Link>
          <Link to="/profile" className="mob-item">
            <img src={profile} alt="logo" />
            <span>Профиль</span>
          </Link>
        </div>
    </footer>
  );
}

export default Footer;
