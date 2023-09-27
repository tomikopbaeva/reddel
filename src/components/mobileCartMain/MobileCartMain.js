import React from 'react';
import { useState } from 'react';
import './MobileCartMain.css';
import CerfModal from '../cerfModal/CerfModal';

import image from '../../assets/image.png';
import call from '../../assets/call.svg';
import whatsapp from '../../assets/whatsapp3.svg';
import instagram from '../../assets/instagram3.svg';
import heart from '../../assets/heart3.svg';
import Rectangle from '../../assets/Rectangle.png';
import heart2 from '../../assets/heart2.svg';
import {useNavigate} from "react-router-dom";
import VerificationCode from "../verificationCode/VerificationCode";
import axios from "axios";



function MobileCartMain(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [Rectangle, Rectangle, Rectangle];
  const [showVerification, setShowVerification] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };
  const handleCertificateButtonClick = () => {
      if(selectedPrice != null){
          setShowVerification(true)
      }
    setIsModalOpen(true); 
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  return (
      <div className='mobile-cart-main'>
        <div className="card-main-header">
          <div className="card-body">
            <img src={image} alt="" />
            <div>
              <h3>{props.title}</h3>
              <div className='card-tags'>
                  {props.tags && props.tags.map((item, index) => (
                      <span key={index} className='tag'>{item}</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-main-link">
          <div>
            <img src={call} alt="call" />
            <span>Позвонить</span>
          </div>
          <div>
            <img src={whatsapp} alt="call" />
            <span>Whatsapp</span>
          </div>
          <div>
            <img src={instagram} alt="call" />
            <span>Instagram</span>
          </div>
          <div>
          <img src={isFavorite ? heart2 : heart} alt="heart" onClick={handleFavoriteClick} />            <span>В избранное</span>
          </div>
        </div>
        <div className="card-main-info">
          <h2>О заведении:</h2>
          <p className='main-info-p'>{props.description}</p>
        </div>
        <div className="card-main-item">
          <button className='icon-item'>
              <h4>🔥 Акции</h4>
          </button>
          <button className='icon-item'>
              <h4>🌟 Меню</h4>
          </button>
        </div>
        <div className="card-main-body"></div>
        <div className='info'>
            <h5>Cредний чек:</h5>
            <span>{props.average}₸</span>
        </div>
        <div className='info'>
            <h5>Кухня:</h5>
            <span>{props.kitchen}</span>
        </div>
        <div className='info'>
            <h5>Телефон:</h5>
            <span>{props.phone_number}</span>
        </div>
        <div className='info time'>
            <h5>Часы работы:</h5>
            <div className='info-time'>
              <span>ПН - ЧТ и ВС: 10:00-5:00</span>
              <span>ПТ - СБ: 10:00-6:00</span>
            </div>
        </div>
        <div className="thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={image} alt={`Thumbnail ${index}`} />
              </div>
            ))}
        </div>
        <button className='certificate-button' onClick={handleCertificateButtonClick}>
          Оформить
        </button>
          {isModalOpen && <CerfModal onClose={() => setIsModalOpen(false)}
                                     prices={props.prices}/>}

      </div>
  );
}

export default MobileCartMain;