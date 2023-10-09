import React, {useRef, useEffect, useState} from "react";
import "./Certificate.css";

import Logo from '../../assets/Logo.svg';
import done from '../../assets/done.svg';
import done2 from '../../assets/done2.svg';
import done3 from '../../assets/done3.svg';

import Frame2 from '../../assets/Frame2.svg';

function Certificate(props) {
    const certificateRef = useRef();
    const [selectedOption, setSelectedOption] = useState(props.restaurants[0].id);
    const handleSelectChange = (event) => {
        console.log(event.target.value)
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };
    const activate = (() => {
        console.log(selectedOption)
        fetch('https://surapid.kz/api/activate_certificate/' + props.certificate.id + "/" + selectedOption, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response)
        }).then(data => {
            console.log(data)
            window.location.reload(false)
        })
    })
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
                {props.certificate.status?
                    (
                        <div className="certification-header">
                        <img src={done2} alt='123' />
                        <span>Воспользуйтесь до {props.certificate.end_date.substring(0,10).replaceAll('-', '.')}</span>
                        </div>

                    ):
                    <div className="certification-header">
                    <img src={done} alt="done" />
                    <span>Активируйте до 29.12.2023</span>
                    </div>
                }
                {/*<span>Активируйте до 29.12.2023</span>*/}
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
            {props.certificate.status && <h3>{props.certificate.encode.substring(0,10)}</h3>}
            <p>Покажите его администратору заведения  </p>
            <div className='info last'>
                <span>Сумма сертификата</span>
                <h5>{props.certificate.sum} ₸</h5>
            </div>
            <div className='info last'>
                <span>Клиент</span>
                <h5>{props.user.first_name} {props.user.last_name}</h5>
            </div>
            <div className='info last'>
                <span>Телефон</span>
                <h5>{"8" + props.user.phone_number.substring(1)}</h5>
            </div>
            <div className='info'>
                <span>В заведении</span>
                {!props.certificate.status?
                    (
                <select value={selectedOption} onChange={handleSelectChange}>
                    {props.restaurants.map(restaurant =>
                        <option value={restaurant.id}>{restaurant.title}</option>
                    )}
                </select>
                    ) :
                    <h5>
                        {props.certificate.restaurant}
                    </h5>
                }
            </div>
            <div className='attention'>
                <img src={Frame2} alt="frame" />
                <ul>
                    <li>Активацию нельзя отменить</li>
                    <li>Сертификат нельзя обналичить</li>
                    <li>Сертификат действителен 6 месяцев </li>
                    <li>Использовать сумму можно только для оплаты одного счета в заведении</li>
                </ul>
            </div>
            {!props.certificate.status?
                (<a href="#" className="activate" onClick={activate}>Активировать</a>) : <a></a>}
        </div>
    </div>
  );
}

export default Certificate;
