import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    return (
    <div className="cerf-modal">
      <section className="registration">
        <form className="registration-form">
          <h2 className="registration-h2">Добро пожаловать!</h2>
          <input type="text" placeholder="+7 (___) ___-__-__" />
          <Link to="/">          
            <button className="registration-button">Продолжить</button>
          </Link>
          <p>У вас еще нет аккаунта? <Link to="/registration"> Зарегистрироваться</Link></p>
        </form>
      </section>
    </div>
  );
}

export default Login;
