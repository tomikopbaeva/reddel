import React, { useState } from 'react';
import './Banner.css'; 
import banner from '../../assets/Banner1.png';
import O from '../../assets/0.svg';
import O6 from '../../assets/6.svg';
import dot from '../../assets/dot.svg';
import bannerMob from '../../assets/BannerMob.png';

function Banner() {
  return (
    <div className="banner">
        <div className="banner-desk">
            <div className="banner-left">
                <h1>Оплатите счет электронным сертификатом в рассрочку</h1>
                <p>Выберите заведение и оформите безналичную рассрочку или кредит онлайн </p>
                <div className="banner-left-frame">
                    <img src={O} alt="" />
                    <img src={dot} alt="" />
                    <img src={O} alt="" />
                    <img src={dot} alt="" />
                    <img src={O6} alt="" />

                </div>
            </div>
            <div className="banner-right">
                <img src={banner} alt="banner" />
            </div>
        </div>
        <div className="banner-mob">
            <img src={bannerMob} />
        </div>
    </div>
  );
}

export default Banner;
