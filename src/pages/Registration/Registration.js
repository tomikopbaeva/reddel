import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Registration.css";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import api from "../../api";
import VerificationCode from "../../components/verificationCode/VerificationCode";
import InputMask from "react-input-mask";
import home from "../../assets/home.svg";
import search from "../../assets/Search2.svg";
import heart from "../../assets/heart.svg";
import profile from "../../assets/profile.svg";

function Registration() {
  const [formData, setFormData] = useState({
    "email": "",
    "firstName": "",
    "lastName": "",
    "phone_number": "",
    agreementChecked: false
  });
  const [phone, setPhone] = useState('')

  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const navigate = useNavigate();

  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);

  const closeTermsAndConditions = () => {
    setShowTermsAndConditions(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleVerification = async (id) => {
    const response = await api.post("api/v1/auth/activate", {"code" : id});

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has agreed to the terms and conditions
    if (!formData.agreementChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      // Make a POST request using the api.post method
      formData.phone_number = phone.replaceAll(' ', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').replaceAll('+', '')
      console.log(formData)
      const response = await api.post("api/v1/auth/logup", formData);

      if (response.status == "200") {
        console.log(response.data)
        console.log(response)
        setShowVerificationCode(true)
      } else {
        // Handle registration errors here
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div className="cerf-modal">
        <section className="registration">
          <form className="registration-form" onSubmit={handleSubmit}>
            <h3 className="registration-h2">Регистрация</h3>

            <div className="registration-inputs">
              <input
                  type="text"
                  name="firstName"
                  placeholder="Имя"
                  value={formData.firstName}
                  onChange={handleInputChange}
              />
              <input
                  type="text"
                  name="lastName"
                  placeholder="Фамилия"
                  value={formData.lastName}
                  onChange={handleInputChange}
              />
            </div>
            <InputMask
                mask="+7 (***) ***-**-**" // Define your desired phone number mask
                maskChar="_" // Use underscore (_) or any character you prefer for unfilled positions
                placeholder="+7 (___) ___-__-__" // Display a placeholder for user guidance
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <div className="registration-checkbox">
              <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="agreementChecked"
                  name="agreementChecked"
                  checked={formData.agreementChecked}
                  onChange={handleInputChange}
              />
              <label htmlFor="agreementChecked">
                <p>Я согласен с {" "}
                <a onClick={() => setShowTermsAndConditions(true)}>
                  Условиями и Правилами
                </a>{" "}
                Reddel</p>
              </label>
            </div>
            <button type="submit" className="registration-button">
              Продолжить
            </button>
          </form>
        </section>
        {showTermsAndConditions && (
            <TermsAndConditions onClose={closeTermsAndConditions} />
        )}
        {showVerificationCode && <VerificationCode handleVerification={handleVerification}/>}
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

export default Registration;
