import React, {useEffect, useState} from "react";
import "./Favorite.css";
import heart1 from "../../assets/heart1.svg";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";
import {useNavigate} from "react-router-dom";


function Favorite(props) {
  return (
    <section className="favorite">
      <h2 className="h2">Избранное</h2>
      <div className="desk">
        {props.favoriteItems.length > 0 ? (
          <div className="favorite-item">
            {props.favoriteItems}
          </div>
        ) : (
          <div className="empty">
            <img className="favorite-img" src={heart1} alt="Избранное" />
            <p className="favorite-text">
              Здесь можно сохранять заведения, которые вам понравились и вы хотели бы посетить
            </p>
            <button className="favorite-button card-button">Перейти в каталог</button>
          </div>
        )}
      </div>
      <MobSlider cardArray={props.favoriteItems} />
    </section>
  );
}

export default Favorite;
