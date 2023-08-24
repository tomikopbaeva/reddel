import React, { useState } from 'react';
import heard3 from '../../assets/heart.svg';
import heard5 from '../../assets/heart3.svg';
import image from '../../assets/image.png';
import './CartHeader.css';

function Header() {
  const [isFavorite, setIsFavorite] = useState(false); 

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite); 
  };

  return (
    <div className="header-card">
      <div className="card-body">
        <img src={image} alt="" />
        <h3>Название заведения</h3>
      </div>
      <div className='tags-card'>
        <span className='tag'>Тег 1</span>
        <span className='tag'>Тег 2</span>
      </div>
      <button className="card-button" onClick={toggleFavorite}>
        <img src={isFavorite ? heard5 : heard3} alt="heart" />
        В избранное
      </button>
    </div>
  );
}

export default Header;
