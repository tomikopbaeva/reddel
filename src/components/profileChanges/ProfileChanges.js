import React, {useEffect, useState} from "react";
import "./ProfileChanges.css";
import VerificationCode from "../verificationCode/VerificationCode";
import edit from "../../assets/edit.svg";
import isTokenValid from "../../api.js"
import { useNavigate  } from "react-router-dom";
import login from "../../pages/Login/Login";
import {useTranslation} from "react-i18next";


function ProfileChanges(props) {
  const {t, i18n} = useTranslation();

  const navigate = useNavigate ();
  const [isEditing, setIsEditing] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const handleEditClick = () => {
    if (isEditing) {
      setShowVerificationCode(true);
    }
    setIsEditing(!isEditing);
  };


  return (
    <div className="profile-main">
      <div className="shadow">
        <h2 className="h2">{t("Личные данные")}</h2>
        {/*<div className="profile-edit" onClick={handleEditClick}>*/}
        {/*  {isEditing ? (*/}
        {/*    <span>Сохранить</span>*/}
        {/*  ) : (*/}
        {/*    <>*/}
        {/*      <img src={edit} alt="edit" />*/}
        {/*      <span>Изменить</span>*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</div>*/}
        <div className="info">
          <span>{t("Имя")}</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value={props.user.first_name}/>
        </div>
        <div className="info">
          <span>{t("Фамилия")}</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value={props.user.last_name}/>
        </div>
        <div className="info">
          <span>{t("Телефон")}</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value={props.user.phone_number} />
        </div>
        <div className="info">
          <span>Email</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value={props.user.email} />
        </div>
      </div>
      {showVerificationCode && <VerificationCode />}
    </div>

  );
}

export default ProfileChanges;
