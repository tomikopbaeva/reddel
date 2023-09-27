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
import VerificationCode from "../verificationCode/VerificationCode";
import termsAndConditions from "../../pages/TermsAndConditions/TermsAndConditions";
import {useNavigate} from "react-router-dom";

function CartMain(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [Rectangle, Rectangle, Rectangle];
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showIIN, setShowIIN] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const handlePriceSelection = (price) => {
        console.log(price)
        setShowIIN(true)
        setSelectedPrice(price);
    };
    const handleThumbnailClick = (index) => {
      setActiveIndex(index);
    };
    const handleVerification = (id) => {
        fetch('https://fastcash-back.trafficwave.kz/ffc-api-public/universal/general/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1ODgyMDY0LCJqdGkiOiJkODQ2OWVkMGIyNWY0ZThiOTJlNTQ5ZGJmYTI3ODA1OSIsInVzZXJfaWQiOjI0NzUsImVtYWlsIjoidGVzdF9wYXJ0bmVyQG1haWwucnUiLCJmdWxsX25hbWUiOiIiLCJtZXJjaGFudCI6IlNFUlZJQ0VfQ0VOVEVSIiwiYnJhbmNoIjoiIiwicm9sZSI6bnVsbCwic2FsdCI6IiJ9.cKCzD94sftgINuR2lsoQYdeME0zvKmhyx3_ntCMxkeQ"
            },
            body: JSON.stringify({
                'iin': "020716550669",
                'mobile_phone': "+77082420482",
                'code' : id[0].toString() + id[1].toString() + id[2].toString() + id[3].toString()
            })
        })
            .then((response) =>{
                console.log(response)
                fetch('https://fastcash-back.trafficwave.kz/ffc-api-public/universal/apply/apply-lead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1ODgyMDY0LCJqdGkiOiJkODQ2OWVkMGIyNWY0ZThiOTJlNTQ5ZGJmYTI3ODA1OSIsInVzZXJfaWQiOjI0NzUsImVtYWlsIjoidGVzdF9wYXJ0bmVyQG1haWwucnUiLCJmdWxsX25hbWUiOiIiLCJtZXJjaGFudCI6IlNFUlZJQ0VfQ0VOVEVSIiwiYnJhbmNoIjoiIiwicm9sZSI6bnVsbCwic2FsdCI6IiJ9.cKCzD94sftgINuR2lsoQYdeME0zvKmhyx3_ntCMxkeQ"
                    },
                    body: JSON.stringify({
                        'iin': "020716550669",
                        'mobile_phone': "+77082420482",
                        'product': 'REDDEL',
                        'channel': 'REDDEL_WEB',
                        'partner': 'REDDEL',
                        'credit_params': {
                            'period': '3',
                            'principal' : selectedPrice,
                        },
                        'additional_infromation': {
                            'hook_url': 'http://185.146.1.93:8000/save_job',
                            'success_url': 'http://185.146.1.93:8000/save_job',
                            'failure_url': 'http://185.146.1.93:8000/save_job'
                        },
                        'credit_good':{
                            'cost': selectedPrice
                        },
                        'verification_sms':{
                            'verification_sms_code': id[0].toString() + id[1].toString() + id[2].toString() + id[3].toString(),
                            'verification_sms_data_time': new Date().toISOString()
                        },
                        'merchant': {
                            'bin': '12312312312'
                        },
                        'multiple_installment_params':{
                            'period': '3',
                            "principal": selectedPrice
                        }

                    })
                })
            })

    }
    const create_certificate = async (e) => {
        e.preventDefault();
        fetch('https://fastcash-back.trafficwave.kz/ffc-api-public/universal/general/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1ODgyMDY0LCJqdGkiOiJkODQ2OWVkMGIyNWY0ZThiOTJlNTQ5ZGJmYTI3ODA1OSIsInVzZXJfaWQiOjI0NzUsImVtYWlsIjoidGVzdF9wYXJ0bmVyQG1haWwucnUiLCJmdWxsX25hbWUiOiIiLCJtZXJjaGFudCI6IlNFUlZJQ0VfQ0VOVEVSIiwiYnJhbmNoIjoiIiwicm9sZSI6bnVsbCwic2FsdCI6IiJ9.cKCzD94sftgINuR2lsoQYdeME0zvKmhyx3_ntCMxkeQ"
            },
            body: JSON.stringify({
                'iin': "020716550669",
                'mobile_phone': "+77082420482"
            })
        })
            .then((response) =>{
                console.log(response)
            })
        if(showIIN)
            setShowVerification(true)
        // try {
        //     if(localStorage.getItem('userId') && localStorage.getItem('accessToken')){
        //         fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
        //             }
        //         })
        //             .then((response) => {
        //                 if (response.ok) {
        //                     fetch('http://185.146.1.93:8000/create_certificate', {
        //                         method: "POST",
        //                         headers: {
        //                             'Content-Type': 'application/json',
        //                         },
        //                         body: JSON.stringify({
        //                             'price': selectedPrice,
        //                             'user_id': localStorage.getItem('userId')
        //                         })
        //                     })
        //                         .then((response) => {
        //                             return response.json()
        //                         })
        //                         .then((data) =>{
        //                         console.log(data)
        //                     })
        //                 }
        //             })
        //     }
        //
        // } catch (error) {
        //     console.log(error.messages);
        //     alert("Неверный логин или пароль");
        // }
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
                { showIIN ? (
                    <div>
                        <a>Введите свой иин</a>
                        <input></input>
                    </div>) : (<a>Выберите сумму</a>) }
                <button className='certificate-button' onClick={create_certificate}>Оформить</button>
                {showVerification && <VerificationCode handleVerification={handleVerification}/>}
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
