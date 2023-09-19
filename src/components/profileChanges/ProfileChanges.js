import React, {useEffect, useState} from "react";
import "./ProfileChanges.css";
import VerificationCode from "../verificationCode/VerificationCode";
import edit from "../../assets/edit.svg";
import isTokenValid from "../../api.js"
import { useNavigate  } from "react-router-dom";
import login from "../../pages/Login/Login";


function ProfileChanges() {
  const navigate = useNavigate ();
  const [isEditing, setIsEditing] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  let [user, setUser] = useState({
    "email": "",
    "firstName": "",
    "lastName": "",
    "username": ""
  });
  const handleEditClick = () => {
    if (isEditing) {
      setShowVerificationCode(true);
    }
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    console.log(localStorage.getItem('accessToken') + " token")
    fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer_' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
      }
    })
        .then((response) => {
          // Check if the response status code indicates success (status code 200)
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          console.log(user.firstName)
          console.log(data);
        })
        .catch((error) => {
          console.error(error); // Handle any errors that occurred during the fetch
          navigate('/login')
        });
  }, []);


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
          <input className="profile-input" type="text" placeholder="Введите новый email" value={user.firstName}/>
        </div>
        <div className="info">
          <span>Фамилия</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value={user.lastName}/>
        </div>
        <div className="info">
          <span>Телефон</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value="+7 777 123 45 67" />
        </div>
        <div className="info">
          <span>Email</span>
          <input className="profile-input" type="text" placeholder="Введите новый email" value={user.email} />
        </div>
      </div>
      {showVerificationCode && <VerificationCode />}
    </div>
  );
}

export default ProfileChanges;
