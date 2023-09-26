import React, {useEffect, useState} from "react";
import ProfileChanges from "../profileChanges/ProfileChanges";
import Certificate from "../certificate/Certificate";
import "./Profiles.css";

import instagram from "../../assets/instagram3.svg";
import whatsapp from "../../assets/whatsapp3.svg";
import mail from "../../assets/mail3.svg";
import edit from "../../assets/edit.svg";
import done from "../../assets/done.svg";
import {SplideSlide} from "@splidejs/react-splide";

function Profiles(props) {
    const [certificateArray, setCertificateArray] = useState([]);
    const [certificateId, setCertificateId] = useState(-1)
    useEffect(() => {
        console.log(123)
        fetch('http://185.146.1.93:8000/get_certificates_by_id/' + localStorage.getItem('userId'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setCertificateArray(data.certificates)
            })
    }, []);

    const handleCertificateClick = (id:number) => {
        setCertificateId(id)
    };

    const closeCertificate = () => {
        setCertificateId(-1)
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
            <ProfileChanges user={props.user}/>
            <div className="shadow">
                <h2 className="h2">Мои сертификаты</h2>
                {certificateArray.map((certificate) =>(
                        <div className="profile-cert" onClick={ () => handleCertificateClick(certificate.id) }>
                            <h3 className="h3">Выберите ресторан из списка доступных</h3>
                            <div className="profile-cert-img">
                                <img src={done} alt="done" />
                                <span>Активируйте до 29.12.2023</span>
                            </div>
                            <h4>{certificate.sum}₸</h4>
                        </div>
                ))}
                <p className="p">Здесь будут ваши сертификаты</p>
            </div>
        </div>

        {certificateArray.map((certificate) =>
            certificate.id == certificateId ? <Certificate onClose={closeCertificate} certificate={certificate} user={props.user}/> : <span></span>
        )}
    </section>
  );
}

export default Profiles;
