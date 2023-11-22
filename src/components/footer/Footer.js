import './Footer.css'; 
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

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
import {useTranslation} from "react-i18next";

function Footer() {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const login = () =>{
        fetch('https://api.reddel.kz/api/user', {
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
                        <a href="mailto:support@reddel.kz">{t("Для Бизнеса")}</a>
                        <Link to="/favorites">{t("Избранное")}</Link>
                        <Link to="/profile">{t("Личный кабинет")}</Link>
                    </div>
                    <div className="footer-network">
                        <div>
                            <img src={instagram} alt="instagram" />
                            <span> <a href="https://instagram.com/reddel.kz?igshid=MzRlODBiNWFlZA=="> reddel.kz </a></span>
                        </div>
                        <div>
                            <img src={whatsapp} alt="instagram" />
                            <span><a href="https://wa.me/77077528313">+7 (707) 752 83 13</a></span>
                        </div>
                        <div>
                            <img src={mail} alt="instagram" />
                            <span><a href="mailto:support@reddel.kz">support@reddel.kz</a></span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="footer-bottom">
                <p>© Copyright 2023, Reddel</p>
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
          <a href="#" onClick={login} className="mob-item">
            <img src={profile} alt="logo" />
            <span>Профиль</span>
          </a>
        </div>
    </footer>
  );
}

export default Footer;
