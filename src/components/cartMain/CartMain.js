import React, {useEffect, useState} from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import Freedom from '../../assets/Logo Credit.png'


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
import MenuCarousel from "../MenuCarousel/MenuCarousel";


function CartMain(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [Rectangle, Rectangle, Rectangle];
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [showIIN, setShowIIN] = useState(false)
    const [phone, setPhone] = useState("")
    const [iinOk, setIINOk] = useState(true)
    const [showVerification, setShowVerification] = useState(false)
    const [showOkText, setShowOkText] = useState(false)
    const [showErrorText, setShowErrorText] = useState(false)
    const [iin, setIIN] = useState("")
    const [month, setMonth] = useState(-1)
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);

    const handleIINChange = (e) => {
        setIIN(e.target.value);
    };
    const handleMonth = (price) => {
        setMonth(price);
        setShowIIN(price > 0 && selectedPrice > 0)
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    let [user, setUser] = useState({
        "email": "",
        "firstName": "",
        "lastName": "",
        "username": "",
        "phone_number": "77082420482"
    });
    const handlePriceSelection = (price) => {
        setSelectedPrice(price);
        setShowIIN(month > 0 && price > 0)
    };
    const waitForRedirect = async () => {
        console.log("HERE WE GO AGAIN")
        try{
            const response = await fetch('https://cloudpaymentsapi.kz/redirect_user/' + localStorage.getItem('userId'))
            console.log("HERE WE GO AGAIN 2")
            const data = await response.json();
            console.log(data)
            const url = await data.url;
            console.log(url)
            if (url) {
                if (url['0'] == 'h')
                    window.location.href = url;
                else {
                    alert(url)
                    navigate('/')
                }
            }

        }
        catch (error){
            alert(error)
        }

    }
    const handleThumbnailClick = (index) => {
      setActiveIndex(index);
    };
    const handleVerification = (id) => {
        console.log(localStorage.getItem("jwt"))
        fetch('https://api.ffin.credit/ffc-api-public/universal/general/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                'iin': iin,
                'mobile_phone': + user.phone_number,
                'code' : id[0].toString() + id[1].toString() + id[2].toString() + id[3].toString()
            })
        })
            .then((response) =>{
                console.log(response)
                console.log("apply")
                fetch('https://api.ffin.credit/ffc-api-public/universal/apply/apply-lead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "JWT " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        'iin': iin,
                        'mobile_phone': '+' + user.phone_number,
                        'product': 'REDDEL',
                        'channel': 'REDDEL_WEB',
                        'partner': 'REDDEL',
                        'credit_params': {
                            'period': month,
                            'principal' : selectedPrice,
                        },
                        'additional_information': {
                            'hook_url': 'https://cloudpaymentsapi.kz/handle',
                            'success_url': 'https://reddel.kz/profile',
                            'failure_url': 'https://reddel.kz/profile'
                        },
                        'credit_goods': [{'cost': selectedPrice}]
                    })
                })
                    .then((response) =>{
                        console.log(response.json())
                        if(response.ok){
                            console.log("OK")
                            waitForRedirect();
                        }
                        else{
                            setShowErrorText(true)
                        }
                    })
                    .catch((error) =>{
                        console.log()
                        console.log(error.message)

                    })
            })
            .catch((error) =>{
                console.log(error)
            })

    }
    const create_certificate = async () => {
        // fetch('http://86.107.44.200:8075/api/v1/users/' + localStorage.getItem('userId'), {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
        //     }
        // })
        //     .then((response) => {
        //         if(!response.ok)
        //             navigate('/login')
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log(data)
        //         setUser(data);
        //     })
        //     .catch((error) => {
        //         console.error(error); // Handle any errors that occurred during the fetch
        //         navigate('/login')
        //     });
        if(selectedPrice==null || iin.length < 12)
            return
        await fetch('https://api.ffin.credit/ffc-api-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': 'reddel@ffin.credit',
                'password': '3TxAA5@rsA9M$*yw'
            })
        })
            .then(async (response) => {
                let jwt = await response.json()
                console.log(jwt.access)
                localStorage.setItem("jwt", jwt.access)
            })
        console.log(localStorage.getItem("jwt"))
        fetch('https://api.ffin.credit/ffc-api-public/universal/general/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                'iin': iin,
                'mobile_phone': '+' + user.phone_number
            })
        })
            .then((response) =>{
                console.log(response)

                if(showIIN) {
                    setShowVerification(response.ok)
                    setIINOk(response.ok)
                }
            })
            .catch((error) =>{
                console.log(('error'))
            })
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
    const openCarousel = () => {
        setIsCarouselOpen(true);
    };

    const closeCarousel = () => {
        setIsCarouselOpen(false);
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
                    <div className="icon" onClick={openCarousel}>
                        <h4>Меню</h4>
                        <img className="img50" src={Book} alt="book" />
                    </div>
                    {isCarouselOpen && (
                        <MenuCarousel menus={props.menus} onClose={closeCarousel} />
                    )}
                    <div className='icon'>
                        <h4>Акции</h4>
                        <img className="img50" src={Star} alt="book" />
                    </div>
                    <div className='icon'>
                        <h4>Резерв</h4>
                        <img className="img50" src={Whatsapp} alt="book" />
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
                            <p> {item} ₸</p>
                        </span>
                    ))}
                </div>
                <h2 className='cart-h2'> На срок</h2>
                <div className='price'>
                        <span className={month === 3 ? 'selected-price' : ''} onClick={()  => handleMonth(3)}>
                            <p>3 месяца</p>
                        </span>
                        <span className={month === 6 ? 'selected-price' : ''} onClick={()  => handleMonth(6)}>
                            <p>6 месяцев</p>
                        </span>
                </div>
                <div className='certificate'>
                    <img src={Frame} alt="random" />
                    <span>Сертификатом можно оплатить 1 счет</span>
                </div>
                <img src={Freedom} alt="random" width={'150px'}/>

                { showIIN ? (
                    <div>
                        <label >Введите иин:</label>
                        <br></br>
                        <br></br>
                        <input type="text" value={iin} onChange={handleIINChange} name="code" minLength="12" maxLength="12" required></input>
                        { !iinOk ? <a className={'error'}>Данные введены неверно</a> : <p></p>}
                        <br></br>
                        <br></br>

                        <button className='certificate-button' type={"submit"} onClick={create_certificate}>Оформить</button>
                    </div>) : (
                    <a>Выберите сумму</a>
                    )

                }
                { !showIIN ? <button className='certificate-button' onClick={create_certificate}>Оформить</button> : (<a></a>)}

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
