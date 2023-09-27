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
    const waitForRedirect = async () => {
        try {
            const interval = 1000; // Интервал в миллисекундах (1 секунда)
            const maxAttempts = 60; // Максимальное количество попыток (60 секунд ожидания)

            let attempts = 0;
            const pollRedirectUrl = async () => {
                try {
                    const response = await axios.get('http://185.146.1.93:8000/redirect_user');
                    const url = response.data.url;

                    if (url) {
                        window.location.href = url;
                    } else if (attempts < maxAttempts) {
                        attempts++;
                        setTimeout(pollRedirectUrl, interval);
                    } else {
                        console.error('Превышено максимальное время ожидания.');
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            pollRedirectUrl();
        } catch (error) {
            console.error(error);
        }
    };
    const handlePriceSelection = (price) => {
        console.log(price)
        setSelectedPrice(price);
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
                        'iin': '020716550669',
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
                            alert('На указанный номер было отправлено sms сообщение\n' +
                                '\n' +
                                'Для завершения оформления сертификата, пройдите по полученной ссылке')
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
        if(selectedPrice==null)
            return
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
            setShowVerification(true)
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
            <div className='certificate'>
                <img src={Frame} alt="random" />
                <span>Сертификатом можно оплатить 1 счет</span>
            </div>
            <button className='certificate-button' onClick={create_certificate}>Оформить</button>
        </div>
        {showVerification && <VerificationCode handleVerification={handleVerification}/>}
    </div>
  );
}

export default CerfModal;
