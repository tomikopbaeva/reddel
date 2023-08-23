import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useState } from 'react';
import './Restaurants.css';
import Card from '../card/Card';
import MobSlider from '../mobSlider/MobSlider';


function Restaurants() {
  const [shownCount, setShownCount] = useState(9); // Изначально показано 9 элементов

  const cardArray = [];
  for (let i = 0; i < 100; i++) { // Создаем массив из 100 элементов (тут изменить на свою логику)
    cardArray.push(<Card key={i} />);
  }

  const handleShowAll = () => {
    setShownCount(100); // При клике на кнопку, показываем все 100 элементов
  };

  return (
    <section className='place'>
      <div className='place-header'>
          <h2 className='h2'>Заведения</h2>
          <button className='place-button' onClick={handleShowAll}>Показать все</button>
      </div>
      <div className='desk'>
        <div className='place-list'>
            {cardArray.slice(0, shownCount)} {/* Отображаем элементы с 0 до shownCount */}
        </div>
      </div>
      <MobSlider cardArray={cardArray} />
    </section>
  );
}

export default Restaurants;
