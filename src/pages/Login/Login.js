import {Link} from "react-router-dom";
import "./Login.css";
import api from "../../api";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import cerfModal from "../../components/cerfModal/CerfModal";
import CerfModal from "../../components/cerfModal/CerfModal";
import VerificationCode from "../../components/verificationCode/VerificationCode";
import error from "../../components/error/Error";


function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openCerf, setOpenCerf] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    console.log(localStorage.getItem('accessToken') + " token")
    fetch('http://86.107.44.200:8075/api/v1/users/' + localStorage.getItem('userId'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
      }
    })
        .then((response) => {
          if (response.ok) {
            navigate("/profile")
          }
        })
  }, []);
  const handleVerification = (code) => {
    api.post("api/v1/auth/checkCode", {
        "code": "123456", // Replace with the actual code you want to send
        "phone_number": phoneNumber.replaceAll(/[^0-9]/g, ''),
    }).then((response) => {
      console.log(response);
      localStorage.setItem('accessToken', response.data);
      navigate('/profile')
    }).catch((error) => {
      console.log(error);
      alert('Неверный код');
    });
  };
  const handleLogin = async (e) => {

    e.preventDefault();
    if(phoneNumber.replaceAll(/[^0-9]/g, '').length < 11){
      return
    }
    let data = phoneNumber.replaceAll(/[^0-9]/g, '')
    const response = await api.post("api/v1/auth/login", {'phone_number': data}).then((response) => {
      console.log(response.data)
      if(response.status == 200){
        localStorage.setItem('userId', response.data.id)
        setOpenCerf(true)
      }
    }).catch((error) =>{
      console.log(error)
      alert("Номер не зарегистриван")
      return;
    })

    // try {
    //   console.log(credentials)
    //   const response = await api.post('/api/v1/auth/login', credentials);
    //   localStorage.setItem('userId', response.data.id)
    //   localStorage.setItem('accessToken', response.data.token);
    //   if(response.status == 200)
    //     navigate('/profile');
    // } catch (error) {
    //   console.log(error);
    //   alert("Неверный логин или пароль");
    // }
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
          {openCerf && <VerificationCode  handleVerification={handleVerification}/>}
            <button className="registration-button" type="submit">Продолжить</button>
          <p>У вас еще нет аккаунта? <Link to="/registration"> Зарегистрироваться</Link></p>
        </form>
      </section>
    </div>
  );
}

export default Login;
