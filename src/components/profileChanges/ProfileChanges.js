import React, { useState } from "react";
import "./ProfileChanges.css";
import VerificationCode from "../verificationCode/VerificationCode";
import edit from "../../assets/edit.svg";

function ProfileChanges() {
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
        <h2 className="h2">Личные данные</h2>
        <div className="profile-edit" onClick={handleEditClick}>
          {isEditing ? (
            <span>Сохранить</span>
          ) : (
            <>
              <img src={edit} alt="edit" />
              <span>Изменить</span>
            </>
          )}
        </div>
        <div className="info">
          <span>Имя</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value="Марат" />
        </div>
        <div className="info">
          <span>Фамилия</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value="Муртазин" />
        </div>
        <div className="info">
          <span>Телефон</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value="+7 777 123 45 67" />
        </div>
        <div className="info">
          <span>Email</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value="marat_murt91@mail.ru" />
        </div>
      </div>
      {showVerificationCode && <VerificationCode />}
    </div>
  );
}

export default ProfileChanges;
