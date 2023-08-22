import React from "react";
import "./Сategories.css";
import '@splidejs/splide/dist/css/themes/splide-default.min.css'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';

function Сategories() {
  const categories = [
    "Все",
    "Рестораны и бары",
    "Тойхана",
    "Зоны отдыха",
    "Караоке",
    "Салоны красоты"
  ];

  return (
    <section className="categories">
      <h2 className="h2">Категории</h2>
      <div className="desk">
        <div className="categories-list">
          {categories.map((category, index) => (
            <span key={index}>{category}</span>
          ))}
        </div>
      </div>
      <div className="mob">
        <Splide options={{
            type: 'loop',
            drag: 'free',
            focus: 'start',
            perPage: 4,
            arrows: false,
            pagination: false,
            fixedWidth: 'default',
            gap: '6px',
        }}>
            {categories.map((category, index) => (
              <SplideSlide key={index}>
                <div className="categories-list">
                  <span>{category}</span>
                </div>
              </SplideSlide>
            ))}
        </Splide>
      </div>
    </section>
  );
}

export default Сategories;
