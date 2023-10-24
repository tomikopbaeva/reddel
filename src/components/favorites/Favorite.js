import React, {useEffect, useState} from "react";
import "./Favorite.css";
import heart1 from "../../assets/heart1.svg";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


function Favorite(props) {
    const {t, i18n} = useTranslation();
    return (
    <section className="favorite">
      <h2 className="h2">{t("Избранное")}</h2>
      <div className="desk">
        {props.favoriteItems.length > 0 ? (
          <div className="favorite-item">
            {props.favoriteItems}
          </div>
        ) : (
          <div className="empty">
            <img className="favorite-img" src={heart1} alt="Избранное" />
            <p className="favorite-text">
                {t("Здесь можно сохранять заведения, которые вам понравились и вы хотели бы посетить")}
            </p>
            <button className="favorite-button card-button"><a className="text" href="/">{t("Перейти в каталог")}</a></button>
          </div>
        )}
      </div>
      <MobSlider cardArray={props.favoriteItems} />
    </section>
  );
}

export default Favorite;
