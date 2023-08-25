import React from "react";
import "./Profiles.css";

import instagram from "../../assets/instagram3.svg";
import whatsapp from "../../assets/whatsapp3.svg";
import mail from "../../assets/mail3.svg";
import edit from "../../assets/edit.svg";
import done from "../../assets/done.svg";

function Profiles() {
    const hasCertificates = false;
  return (
    <section className="profile">
        <div className="profile-header">
            <h2 className="h2">Связаться с Reddel</h2>
            <div className="profile-header-link">
                <img src={instagram} alt="instagram" />
                <img src={whatsapp} alt="whatsapp" />
                <img src={mail} alt="mail" />
            </div>
        </div>
        <div className="profile-main">
            <div className="shadow">
                <h2 className="h2">Личные данные</h2>
                <div className="profile-edit">
                    <img src={edit} alt="edit" />
                    <span>Изменить</span>
                </div>
                <div className='info'>
                    <span>Имя</span>
                    <h5>Марат</h5>
                </div>
                <div className='info'>
                    <span>Фамилия</span>
                    <h5>Муртазин</h5>
                </div>
                <div className='info'>
                    <span>Телефон</span>
                    <h5>+7 777 123 45 67</h5>
                </div>
                <div className='info'>
                    <span>Email</span>
                    <h5>marat_murt91@mail.ru</h5>
                </div>

            </div>
            <div className="shadow">
                <h2 className="h2">Мои сертификаты</h2>
                {hasCertificates ? (
                <div className="profile-cert">
                    <h3 className="h3">Сертификат Лесная Сказка</h3>
                    <div className="profile-cert-img">
                        <img src={done} alt="done" />
                        <span>Активируйте до 29.12.2023</span>
                    </div>
                    <h4>100 000 ₸</h4>
                </div>)
                : (
                    <p className="p">Здесь будут ваши сертификаты</p>
                )}
            </div>
        </div>
    </section>
  );
}

export default Profiles;
