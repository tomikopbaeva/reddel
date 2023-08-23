import React from "react";
import "./Favorite.css";
import heart1 from "../../assets/heart1.svg";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";

const favoriteItems = [
  {
    id: 1,
    name: "Заведение 1",
    description: "Описание первого заведения...",
    imageUrl: "url_1",
  },
  {
    id: 2,
    name: "Заведение 2",
    description: "Описание второго заведения...",
    imageUrl: "url_2",
  },
];


function Favorite() {
  return (
    <section className="favorite">
      <h2 className="h2">Избранное</h2>
      <div className="desk">
        {favoriteItems.length > 0 ? (
          <div className="favorite-item">
            {favoriteItems.map((item) => (
              <Card
                key={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            ))}
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
      <MobSlider cardArray={favoriteItems} />
    </section>
  );
}

export default Favorite;
