import React, {useRef, useEffect, useState} from "react";
import "./CerfModal.css";
import Frame from '../../assets/Frame.svg';
import {useNavigate} from "react-router-dom";
import VerificationCode from "../verificationCode/VerificationCode";
import axios from "axios";

function CerfModal({ onClose, prices }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showVerification, setShowVerification] = useState(false)
    const [showIIN, setShowIIN] = useState(false)
    const [reject, setReject] = useState(null)
    const [phone, setPhone] = useState("")
    const [iinOk, setIINOk] = useState(true)
    const [iin, setIIN] = useState("")
    const [month, setMonth] = useState(-1)
    const handleIINChange = (e) => {
        setIIN(e.target.value);
    };
    const waitForRedirect = async () => {
        try {
            const interval = 2000; // Интервал в миллисекундах (1 секунда)
            const maxAttempts = 60; // Максимальное количество попыток (60 секунд ожидания)

            let attempts = 0;
            const pollRedirectUrl = async () => {
                try {
                    const response = await axios.get('http://185.146.1.93:8000/redirect_user/' + localStorage.getItem('userId'));
                    const url = response.data.url;

                    if (url) {
                        if(url['0'] == 'h')
                            window.location.href = url;
                        else {
                            alert(url)
                            navigate('/')
                        }
                    } else if (attempts < maxAttempts) {
                        attempts++;
                        setTimeout(pollRedirectUrl, 1000);
                    } else {
                        console.error('Превышено максимальное время ожидания.');
                    }
                } catch (error) {
                    console.error(error);
                    setTimeout(pollRedirectUrl, 1000);
                }
            };

            pollRedirectUrl();
        } catch (error) {
            console.error(error);
        }
    };
    const handlePriceSelection = (price) => {
        console.log(price)
        setShowIIN(true)
        setSelectedPrice(price);
        setShowIIN(month > 0 && price > 0)
    };
    const handleMonth = (price) => {
        setMonth(price);
        setShowIIN(price > 0 && selectedPrice > 0)
    };
    const handleVerification = (id) => {
        fetch('https://fastcash-back.trafficwave.kz/ffc-api-public/universal/general/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MjYxMjc3LCJqdGkiOiI4ZDE4YjE3OGY1YWE0Y2JkYmJiYWZjZmVmNjE0ODc2NCIsInVzZXJfaWQiOjI0NzUsImVtYWlsIjoidGVzdF9wYXJ0bmVyQG1haWwucnUiLCJmdWxsX25hbWUiOiIiLCJtZXJjaGFudCI6IlNFUlZJQ0VfQ0VOVEVSIiwiYnJhbmNoIjoiIiwicm9sZSI6bnVsbCwic2FsdCI6IiJ9.ktE4gjM-zrWZG9vCp3pk7UB5o0Uj25iZXB662UjzSXw"
            },
            body: JSON.stringify({
                'iin': "020716550660",
                'mobile_phone': '+77082420482',
                'code' : id[0].toString() + id[1].toString() + id[2].toString() + id[3].toString()
            })
        })
            .then((response) =>{
                console.log(response)
                fetch('https://fastcash-back.trafficwave.kz/ffc-api-public/universal/apply/apply-lead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MjYxMjc3LCJqdGkiOiI4ZDE4YjE3OGY1YWE0Y2JkYmJiYWZjZmVmNjE0ODc2NCIsInVzZXJfaWQiOjI0NzUsImVtYWlsIjoidGVzdF9wYXJ0bmVyQG1haWwucnUiLCJmdWxsX25hbWUiOiIiLCJtZXJjaGFudCI6IlNFUlZJQ0VfQ0VOVEVSIiwiYnJhbmNoIjoiIiwicm9sZSI6bnVsbCwic2FsdCI6IiJ9.ktE4gjM-zrWZG9vCp3pk7UB5o0Uj25iZXB662UjzSXw"
                    },
                    body: JSON.stringify({
                        'iin': iin,
                        'mobile_phone': '+77082420482',
                        'product': 'REDDEL',
                        'channel': 'REDDEL_WEB',
                        'partner': 'REDDEL',
                        'credit_params': {
                            'period': '3',
                            'principal' : selectedPrice,
                        },
                        'additional_information': {
                            'hook_url': 'http://185.146.1.93:8000/handle',
                            'success_url': 'http://185.146.1.93:8000/handle',
                            'failure_url': 'http://185.146.1.93:8000/handle'
                        },
                        'credit_goods': [{'cost': selectedPrice}]
                    })
                })
                    .then((response) =>{
                        if(response.ok){
                            waitForRedirect()
                        }
                        else{
                        }
                    })
                    .catch((error) =>{
                        console.log(error.message)
                    })
            })

    }
    const create_certificate = async (e) => {
        if(selectedPrice==null || iin.length < 12)
            return
        e.preventDefault();
        fetch('https://fastcash-back.trafficwave.kz/ffc-api-public/universal/general/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MjYxMjc3LCJqdGkiOiI4ZDE4YjE3OGY1YWE0Y2JkYmJiYWZjZmVmNjE0ODc2NCIsInVzZXJfaWQiOjI0NzUsImVtYWlsIjoidGVzdF9wYXJ0bmVyQG1haWwucnUiLCJmdWxsX25hbWUiOiIiLCJtZXJjaGFudCI6IlNFUlZJQ0VfQ0VOVEVSIiwiYnJhbmNoIjoiIiwicm9sZSI6bnVsbCwic2FsdCI6IiJ9.ktE4gjM-zrWZG9vCp3pk7UB5o0Uj25iZXB662UjzSXw"
            },
            body: JSON.stringify({
                'iin': iin,
                'mobile_phone': '+77082420482'
            })
        })
            .then((response) =>{
                console.log(response)
                if(showIIN) {
                    setShowVerification(response.ok)
                    setIINOk(response.ok)
                }
            })
    };
    // useEffect(() => {
    //   const handleClickOutside = (event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //       onClose();
    //     }
    //   };
    //
    //   document.addEventListener("mousedown", handleClickOutside);
    //   return () => {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   };
    // }, [onClose]);
    
    return (
    <div className="cerf-modal">
        <div className="cerf-modal-content" ref={modalRef}>
            <h5 className="h5">Сертификат в рассрочку на сумму</h5>
            <div className='price'>
                {prices && prices.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => handlePriceSelection(item)}
                        className={selectedPrice === item ? 'selected-price' : ''}
                    >
                            <p>{item} ₸</p>
                        </span>
                ))}
            </div>
            <h5 className="h5">На срок</h5>
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
            { showIIN ? (
                <form>
                    <label htmlFor="inputField">Введите иин:</label>
                    <br></br>
                    <br></br>
                    <input type="text" value={iin} onChange={handleIINChange} name="code" minLength="12" maxLength="12" required></input>
                    <br></br>
                    <br></br>

                    <button className='certificate-button' type={"submit"} onClick={create_certificate}>Оформить</button>
                </form>) : (
                <a>Выберите сумму</a>
            )

            }
            { !showIIN ? <button className='certificate-button' onClick={create_certificate}>Оформить</button> : (<a></a>)}
        </div>
        {showVerification && <VerificationCode handleVerification={handleVerification}/>}
    </div>
  );
}

export default CerfModal;
