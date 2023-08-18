import React, { useState } from 'react';
import './Localization.css'; 

function Localization() {
  const [activeButton, setActiveButton] = useState('kaz'); 

  const handleButtonClick = (language) => {
    setActiveButton(language);
  };

  return (
    <div className="localization">
      <button
        className={`localization-button ${activeButton === 'kaz' ? 'active' : ''}`}
        onClick={() => handleButtonClick('kaz')}
      >
        Қаз
      </button>
      <button
        className={`localization-button ${activeButton === 'rus' ? 'active' : ''}`}
        onClick={() => handleButtonClick('rus')}
      >
        Рус
      </button>
    </div>
  );
}

export default Localization;
