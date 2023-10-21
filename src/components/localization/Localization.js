import React, {useEffect, useState} from 'react';
import './Localization.css';
import { useTranslation } from "react-i18next"

function Localization() {
  const [activeButton, setActiveButton] = useState(localStorage.getItem("lang"));
  useEffect(() => {
      i18n.changeLanguage(localStorage.getItem("lang"))

  }, [])
  const handleButtonClick = (language) => {
    setActiveButton(language);
    localStorage.setItem("lang", language)
      i18n.changeLanguage(language)
  };
  const {t, i18n} = useTranslation();
  const changeLanguage = (language) => {
      i18n.changeLanguage(language)
  }

  return (
    <div className="localization">
      <button
        className={`localization-button ${activeButton === 'kz' ? 'active' : ''}`}
        onClick={() => handleButtonClick('kz')}
      >
        Қаз
      </button>
      <button
        className={`localization-button ${activeButton === 'ru' ? 'active' : ''}`}
        onClick={() => handleButtonClick('ru')}
      >
        Рус
      </button>
    </div>
  );
}

export default Localization;
