import React, { useRef, useEffect } from "react";
import "./Certificate.css";

import Logo from '../../assets/Logo.svg';
import done from '../../assets/done.svg';
import done2 from '../../assets/done2.svg';
import done3 from '../../assets/done3.svg';

import Frame2 from '../../assets/Frame2.svg';

function Certificate(props) {
    const certificateRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (certificateRef.current && !certificateRef.current.contains(event.target)) {
                props.onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.onClose]);
    return (
    <div className="cerf-modal">
        <div ref={certificateRef} className="certification">
            <img src={Logo} alt="logo" />
            <div className="certification-header">
                <img src={done} alt="done" />
                <span>Активируйте до 29.12.2023</span>
            </div>
            {/* <div className="certification-header">
                <img src={done2} alt="done" />
                <span>Активирован - 23.06.2023</span>
            </div>
            <div className="certification-header">
                <img src={done3} alt="done" />
                <span>Срок действия истек</span>
            </div> */}
            <h4>Поздравляем! <br/> Вы успешно оформили уникальный сертификат </h4>
            <p>Ваш код:</p>
            <h3>{props.certificate.encode}</h3>
            <p>Покажите его администратору заведения  </p>
            <div className='info last'>
                <span>Сумма сертификата</span>
                <h5>{props.certificate.sum} ₸</h5>
            </div>
            <div className='info last'>
                <span>Клиент</span>
                <h5>{props.user.firstName} {props.user.lastName}</h5>
            </div>
            <div className='info last'>
                <span>Телефон</span>
                <h5>{props.user.phone}</h5>
            </div>
            {/*<div className='info'>*/}
            {/*    <span>В заведении</span>*/}
            {/*    <h5>Рыба моей мечты (на Айманова)</h5>*/}
            {/*</div>*/}
            <div className='attention'>
                <img src={Frame2} alt="frame" />
                <ul>
                    <li>Сертификат нельзя обналичить</li>
                    <li>Сертификат действителен 6 месяцев </li>
                    <li>Использовать сумму можно только для оплаты одного счета в заведении</li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Certificate;
