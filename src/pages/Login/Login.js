import {Link} from "react-router-dom";
import "./Login.css";
import api from "../../api";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    console.log(localStorage.getItem('accessToken') + " token")
    fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
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

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      console.log(credentials)
      const response = await api.post('/api/v1/auth/login', credentials);
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('accessToken', response.data.token);
      if(response.status == 200)
        navigate('/profile');
    } catch (error) {
      console.log(error);
      alert("Неверный логин или пароль");
    }
  };
    return (
    <div className="cerf-modal">
      <section className="registration">
        <form className="registration-form" onSubmit={handleLogin}>
          <h2 className="registration-h2">Добро пожаловать!</h2>
          <input type="text" name="username" value={credentials.username} onChange={handleInputChange} placeholder="Логин" />
          <input type="password" name="password" value={credentials.password} onChange={handleInputChange} placeholder="Пароль" />
            <button className="registration-button" type="submit">Продолжить</button>
          <p>У вас еще нет аккаунта? <Link to="/registration"> Зарегистрироваться</Link></p>
        </form>
      </section>
    </div>
  );
}

export default Login;
