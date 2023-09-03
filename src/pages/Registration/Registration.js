import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";

function Registration() {
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);

  const closeTermsAndConditions = () => {
    setShowTermsAndConditions(false);
  };

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
            <label htmlFor="checkbox">
              Я согласен с <a onClick={() => setShowTermsAndConditions(true)}>Условиями и Правилами</a> Reddell
            </label>
          </div>
          <Link to="/">
            <button className="registration-button">Продолжить</button>
          </Link>
        </form>
      </section>
      {showTermsAndConditions && <TermsAndConditions onClose={closeTermsAndConditions} />}
    </div>
  );
}

export default Registration;
