import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Registration.css";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import api from "../../api";

function Registration() {
  const [formData, setFormData] = useState({
    "email": "",
    "firstName": "",
    "lastName": "",
    "password": "",
    "username": ""
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has agreed to the terms and conditions
    if (!formData.agreementChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      // Make a POST request using the api.post method
      const response = await api.post("api/v1/auth/logup", formData);

      if (response.status == "200") {
        // Handle successful registration here
        alert("Registration successful!");
        navigate('/login');
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
            <h2 className="registration-h2">Регистрация</h2>

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
            <input
                type="username"
                name="username"
                placeholder="Логин"
                value={formData.username}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="+7 (___) ___-__-__"
                value={formData.phoneNumber}
                onChange={handleInputChange}
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
                Я согласен с{" "}
                <a onClick={() => setShowTermsAndConditions(true)}>
                  Условиями и Правилами
                </a>{" "}
                Reddell
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
      </div>
  );
}

export default Registration;
