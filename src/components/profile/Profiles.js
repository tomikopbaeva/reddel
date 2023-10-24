import React, {useEffect, useState} from "react";
import ProfileChanges from "../profileChanges/ProfileChanges";
import Certificate from "../certificate/Certificate";
import "./Profiles.css";
import done2 from '../../assets/done2.svg';

import instagram from "../../assets/instagram3.svg";
import whatsapp from "../../assets/whatsapp3.svg";
import mail from "../../assets/mail3.svg";
import edit from "../../assets/edit.svg";
import done from "../../assets/done.svg";
import {SplideSlide} from "@splidejs/react-splide";
import {useTranslation} from "react-i18next";

function Profiles(props) {
    const {t, i18n} = useTranslation();

    const [certificateId, setCertificateId] = useState(-1)

    const handleCertificateClick = (id:number) => {
        setCertificateId(id)
    };

    const closeCertificate = () => {
        setCertificateId(-1)
    };


  return (
    <section className="profile">
        <div className="profile-header">
            <h2 className="h2">{t("Связаться с Reddel")}</h2>
            <div className="profile-header-link">
                <img src={instagram} alt="instagram" />
                <img src={whatsapp} alt="whatsapp" />
                <img src={mail} alt="mail" />
            </div>
        </div>
        <div className="profile-main">
            <ProfileChanges user={props.user}/>
            <div className="shadow">
                <h2 className="h2">{t("Мои сертификаты")}</h2>
                {props.certificates.map((certificate) =>(
                    certificate.status ?
                    <div className="profile-cert" onClick={() => handleCertificateClick(certificate.id)}>
                        <h3 className="h3">В ресторане { certificate.restaurant}</h3>
                        <div className="profile-cert-img">
                            <img src={done2} alt="done"/>
                            <span>{t("Воспользуйтесь до")} {certificate.end_date.substring(0,10).replaceAll('-', '.')} {t("дейін іске қосылды")}</span>
                        </div>
                        <h4>{certificate.sum}₸</h4>
                    </div> :
                        <div className="profile-cert" onClick={() => handleCertificateClick(certificate.id)}>
                            <h3 className="h3">{t("Выберите ресторан из списка доступных")}</h3>
                            <div className="profile-cert-img">
                                <img src={done} alt="done"/>
                                <span>{t("Активируйте до")} 29.12.2023 {t("дейін іске қосыңыз")}</span>
                            </div>
                            <h4>{certificate.sum}₸</h4>
                        </div>

                ))}
                <p className="p">{t("Здесь будут ваши сертификаты")}</p>
            </div>
        </div>

        {props.certificates.map((certificate) =>
            certificate.id == certificateId ? <Certificate onClose={closeCertificate} restaurants={props.restaurants} certificate={certificate} user={props.user}/> : <span></span>
        )}
    </section>
  );
}

export default Profiles;
