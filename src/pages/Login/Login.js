import {Link} from "react-router-dom";
import "./Login.css";
import api from "../../api";
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import cerfModal from "../../components/cerfModal/CerfModal";
import CerfModal from "../../components/cerfModal/CerfModal";
import VerificationCode from "../../components/verificationCode/VerificationCode";
import error from "../../components/error/Error";
import Footer from "../../components/footer/Footer";
import home from "../../assets/home.svg";
import search from "../../assets/Search2.svg";
import heart from "../../assets/heart.svg";
import profile from "../../assets/profile.svg";


function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openCerf, setOpenCerf] = useState(false)
  const navigate = useNavigate();
  const [validate, setValidate] = useState('1')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const sendAgain = async () => {
    let randomNumber = Math.floor(Math.random() * 10000);
    let code = randomNumber.toString().padStart(4, '0')
    setValidate(code)
    let data = phoneNumber.replaceAll(/[^0-9]/g, '')
    await fetch("https://api.mobizon.kz/service/message/sendsmsmessage?recipient=" + data + "&text=Код валидации : " + code + "&apiKey=kz0502f56621750a9ca3ac636e8301e235c2b647839531f2994222514c786fb6ff2178")
  }

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'))
    fetch('https://surapid.kz/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
    })
        .then((response) => {
          if(response.status == 200){
              navigate('/profile')
          }
          return response.json()
        })
        .catch((error) => {
          console.log(error)
        })
  }, []);
  const handleVerification = async (code) => {
    code = code[0] + code[1] + code[2] + code[3]
    console.log(code + " " + validate)
    if (code != validate) {
      alert("Неверный код, попробуйте еще раз!")
      window.location.reload(false)
    }
    fetch('https://surapid.kz/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"phone_number": phoneNumber.replaceAll(/[^0-9]/g, '')})
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      if (data.token) {
        localStorage.setItem('accessToken', data.token)
        navigate("/profile")
      }
    })
    // }).then((response) => {
    //   console.log(response);
    //   localStorage.setItem('accessToken', response.data);
    //   navigate('/profile')
    // }).catch((error) => {
    //   console.log(error);
    //   alert('Неверный код');
    // });
  };
  const handleLogin = async (e) => {

    e.preventDefault();
    if(phoneNumber.replaceAll(/[^0-9]/g, '').length < 11){
      return
    }
    console.log(phoneNumber.replaceAll(/[^0-9]/g, ''))
    let flag = false
    fetch('https://surapid.kz/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"phone_number": phoneNumber.replaceAll(/[^0-9]/g, '')})
    }).then((response) => {
      console.log(response.status)
      flag = response.status==200
        if(!flag) {
          alert('Номер не зарегистрирован')
        }
    })
        .then(async () => {
          if(flag){
            let randomNumber = Math.floor(Math.random() * 10000);
            let code = randomNumber.toString().padStart(4, '0')
            setValidate(code)
            let data = phoneNumber.replaceAll(/[^0-9]/g, '')
            await fetch("https://api.mobizon.kz/service/message/sendsmsmessage?recipient=" + data + "&text=Код валидации : " + code + "&apiKey=kz0502f56621750a9ca3ac636e8301e235c2b647839531f2994222514c786fb6ff2178")
            setOpenCerf(true)
          }
        })
  };
    return (
    <div className="cerf-modal">
      <section className="registration">
        <form className="registration-form" onSubmit={handleLogin}>
          <h2 className="registration-h2">Добро пожаловать!</h2>
          <InputMask
              type="integer"
              mask="+7 (***) ***-**-**" // Define your desired phone number mask
              maskChar="_" // Use underscore (_) or any character you prefer for unfilled positions
              placeholder="+7 (___) ___-__-__" // Display a placeholder for user guidance
              value={phoneNumber}
              onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(numbersOnly)
                }
              }

          />
          {openCerf && <VerificationCode  handleVerification={handleVerification} sendAgain={sendAgain}/>}
            <button className="registration-button" type="submit">Продолжить</button>
          <p>У вас еще нет аккаунта? <Link to="/registration"> Зарегистрироваться</Link></p>
        </form>
      </section>
      <footer className="footer">
      <div className="mob">
        <Link to="/" className="mob-item">
          <img src={home} alt="logo" />
          <span>Главная</span>
        </Link>
        <Link to="/search" className="mob-item">
          <img src={search} alt="logo" />
          <span>Поиск</span>
        </Link>
        <Link to="/favorites" className="mob-item">
          <img src={heart} alt="logo" />
          <span>Избранное</span>
        </Link>
        <Link to="/profile" className="mob-item">
          <img src={profile} alt="logo" />
          <span>Профиль</span>
        </Link>
      </div>
      </footer>
    </div>
  );
}

export default Login;
