import React, { useState } from 'react';
import './Card.css'; 

import Regtangle from '../../assets/Rectangle.png';
import location from '../../assets/location2.svg';
import hearts from '../../assets/heart.svg';
import heart3 from '../../assets/heart3.svg';

import image from '../../assets/image.png';

function Card() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={`card ${isLiked ? 'liked' : ''}`}>
      <span className='card-header'>0-0-6</span>
      <img src={Regtangle} alt="random" />
      <div className='tags'>
        <span className='tag'>Тег 1</span>
        <span className='tag'>Тег 2</span>
      </div>
      <div className="card-body">
        <img src={image} alt="" />
        <h3>Название заведения</h3>
      </div>
      <p className="card-text">Краткая информация в 2 строки. Не более. Об акции, спец предложениях и т.д.</p>
      <div className="location">
        <img src={location} alt="random" />
        <span>Указать адрес</span>
      </div>
      <div className="card-footer">
        <button className={`card-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
          <img src={isLiked ? heart3 : hearts} alt="heart" />
        </button>
        <button className="card-button">Посетить в рассрочку</button>
      </div>
    </div>
  );
}

export default Card;
