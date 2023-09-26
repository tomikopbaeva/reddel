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
import api from "../../api";

function CartMain(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [Rectangle, Rectangle, Rectangle];

    const [selectedPrice, setSelectedPrice] = useState(null);

    const handlePriceSelection = (price) => {
        console.log(price)
        setSelectedPrice(price);
    };
    const handleThumbnailClick = (index) => {
      setActiveIndex(index);
    };
    const create_certificate = async (e) => {

        e.preventDefault();
        try {
            if(localStorage.getItem('userId') && localStorage.getItem('accessToken')){
                fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            fetch('http://185.146.1.93:8000/create_certificate', {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    'price': selectedPrice,
                                    'user_id': localStorage.getItem('userId')
                                })
                            })
                                .then((response) => {
                                    return response.json()
                                })
                                .then((data) =>{
                                console.log(data)
                            })
                        }
                    })
            }

        } catch (error) {
            console.log(error.messages);
            alert("Неверный логин или пароль");
        }
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
                <SplideSlide key={0}>
                    <img width="100%" src={props.item_image} alt="Slide" />
                </SplideSlide>
            {images.map((image, index) => (
              <SplideSlide key={1}>
                <img src={image} id={index} width="100%" alt="Slide" />
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
                    <p>{props.description}</p>
                    <div className="location">
                        <img src={location} alt="random" />
                        <span>{props.location}</span>
                    </div>
                    <div className='info'>
                        <h5>Cредний чек:</h5>
                        <span>{props.average}</span>
                    </div>
                    <div className='info'>
                        <h5>Кухня:</h5>
                        <span>{props.kitchen}</span>
                    </div>
                    <div className='info'>
                        <h5>Телефон:</h5>
                        <span>{props.phone_number}</span>
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
                    {props.prices && props.prices.map((item, index) => (
                        <span
                            key={index}
                            onClick={() => handlePriceSelection(item)}
                            className={selectedPrice === item ? 'selected-price' : ''}
                        >
                            <p>{item} ₸</p>
                        </span>
                    ))}
                </div>
                <div className='certificate'>
                    <img src={Frame} alt="random" />
                    <span>Сертификатом можно оплатить 1 счет</span>
                </div>
                <button className='certificate-button' onClick={create_certificate}>Оформить</button>
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
