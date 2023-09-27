import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Registration.css";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import api from "../../api";
import VerificationCode from "../../components/verificationCode/VerificationCode";

function Registration() {
  const [formData, setFormData] = useState({
    "email": "",
    "firstName": "",
    "lastName": "",
    "phone_number": "",
    "username": "username123",
    "password": "qwerty123",
    agreementChecked: false
  });
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

  const handleVerification = async (e) => {

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
                type="text"
                name="phone_number"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone_number}
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
        {showVerificationCode && <VerificationCode handleVerification={handleVerification}/>}
      </div>
  );
}

export default Registration;
