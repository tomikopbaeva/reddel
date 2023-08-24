import React, { useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import './CartMain.css';
import location from '../../assets/location2.svg';
import Rectangle from '../../assets/Rectangle2.png';
import Book from '../../assets/book.svg';
import Star from '../../assets/star.svg';
import Whatsapp from '../../assets/whatsapp4.svg';
import Frame from '../../assets/Frame.svg';

function CartMain() {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [Rectangle, Rectangle, Rectangle];
  
    const handleThumbnailClick = (index) => {
      setActiveIndex(index);
    };
  return (
    <div className="cart-main">
        <div className="cart-main-left">
            <div className="cart-main-left-top shadow">
            <Splide
            options={{
              type: 'loop',
              drag: 'free',
              focus: 'start',
              perPage: 1,
              arrows: true,
              pagination: true,
              fixedWidth: '620px',
            }}
          >
            {images.map((image, index) => (
              <SplideSlide key={index}>
                <img src={image} alt={`Slide ${index}`} />
              </SplideSlide>
            ))}
          </Splide>
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
            </div>
            <div className="cart-main-left-bottom shadow">
                <div className='card-info'>
                    <h2>О заведении:</h2>
                    <div className="location">
                        <img src={location} alt="random" />
                        <span>Указать адрес</span>
                    </div>
                    <p>Одно из лучших караоке в Алматы. Скидки именинникам и компаниям от 15-и человек.Караоке, VIP кабинки, бесплатная парковка</p>
                    <div className='info'>
                        <h5>Cредний чек:</h5>
                        <span>от 6000 ₸</span>
                    </div>
                    <div className='info'>
                        <h5>Кухня:</h5>
                        <span>Европейская, Азиатская</span>
                    </div>
                    <div className='info'>
                        <h5>Телефон:</h5>
                        <span>+7 (776) 048‒03‒03</span>
                    </div>
                    <h4>Часы работы:</h4>
                    <div className='times'>
                        <div className='time'>
                            <p>ПН - ЧТ и ВС</p>
                            <p>10:00-5:00</p>
                        </div>
                        <div className='time'>
                            <p>ПТ - СБ</p>
                            <p>10:00-6:00</p>
                        </div>
                    </div>
                </div>
                <div className='card-icon'>
                    <div className='icon'>
                        <h4>Меню</h4>
                        <img src={Book} alt="book" />
                    </div>
                    <div className='icon'>
                        <h4>Акции</h4>
                        <img src={Star} alt="book" />
                    </div>
                    <div className='icon'>
                        <h4>Резерв</h4>
                        <img src={Whatsapp} alt="book" />
                    </div>
                </div>
            </div>
        </div>
        <div className="cart-main-right">
            <div className="cart-main-right-top shadow">
                <h2 className='cart-h2'>Сертификат в рассрочку на сумму</h2>
                <div className='price'>
                    <span>30 000 ₸</span>
                    <span>50 000 ₸</span>
                    <span>100 000 ₸</span>
                    <span>150 000 ₸</span>
                    <span>200 000 ₸</span>
                </div>
                <div className='certificate'>
                    <img src={Frame} alt="random" />
                    <span>Сертификатом можно оплатить 1 счет</span>
                </div>
                <button className='certificate-button'>Оформить</button>
            </div>
            <div className="cart-main-right-bottom shadow">
                <h2 className='cart-h2'>Важно!</h2>
                <li className='li'>Сертификат безналичный</li>
                <li className='li'>Сертификат можно использовать для оплаты  только 1 счета</li>
                <li className='li'>После покупки сообщите код из сертификата администратору заведения для оплаты счета</li>
            </div>
        </div>
    </div>
  );
}

export default CartMain;
