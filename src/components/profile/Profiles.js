import React, { useState } from "react";
import ProfileChanges from "../profileChanges/ProfileChanges";
import Certificate from "../certificate/Certificate";
import "./Profiles.css";

import instagram from "../../assets/instagram3.svg";
import whatsapp from "../../assets/whatsapp3.svg";
import mail from "../../assets/mail3.svg";
import edit from "../../assets/edit.svg";
import done from "../../assets/done.svg";

function Profiles() {
    const [isCertificateVisible, setCertificateVisible] = useState(false);
    const hasCertificates = true;

    const handleCertificateClick = () => {
        setCertificateVisible(!isCertificateVisible);
    };

    const closeCertificate = () => {
        setCertificateVisible(false);
    };
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
            <ProfileChanges />
            <div className="shadow">
                <h2 className="h2">Мои сертификаты</h2>
                {hasCertificates ? (
                <div className="profile-cert" onClick={handleCertificateClick}>
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
        {isCertificateVisible && <Certificate onClose={closeCertificate} />}
    </section>
  );
}

export default Profiles;
