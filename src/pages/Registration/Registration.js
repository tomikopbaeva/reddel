import { Link } from "react-router-dom";
import "./Registration.css";
import Error from "../../components/error/Error";

function Registration() {
    return (
    <div className="cerf-modal">
      <section className="registration">
        <form className="registration-form">
          <h2 className="registration-h2">Регистрация</h2>
          <div className="registration-inputs">
            <input type="text" placeholder="Имя" />
            <input type="text" placeholder="Фамилия" />
          </div>
          <input type="text" placeholder="+7 (___) ___-__-__" />
          <input type="email" placeholder="Email" />
          <div className="registration-checkbox">
            <input type="checkbox" className="custom-checkbox" id="checkbox" name="checkbox" />
            <label for="checkbox"> Я согласен с <Link to="/terms">&nbsp; Условиями и Правилами &nbsp;</Link> Reddell</label>
          </div>
          <Link to="/">          
            <button className="registration-button">Продолжить</button>
          </Link>
        </form>
      </section>
    </div>
  );
}

export default Registration;
