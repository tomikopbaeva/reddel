import React, {useEffect, useState} from "react";
import "./VerificationCode.css";

const KEYBOARDS = {
  backspace: 8,
  arrowLeft: 37,
  arrowRight: 39,
};

function VerificationCode(props) {
  const [inputValues, setInputValues] = useState(Array(4).fill(""));
  const inputRefs = Array(4).fill(null).map(() => React.createRef());
  const [seconds, setSeconds] = useState(5);
  const [showChangeNumberLink, setShowChangeNumberLink] = useState(false);
  const [showError, setShowError] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setShowChangeNumberLink(true);
        clearInterval(interval);
      }
    }, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, [seconds]);
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  useEffect(() => {
    setShowError(false)
    if (
        inputValues[1] &&
        inputValues[2] &&
        inputValues[3] &&
        inputValues[3]
    ) {
      props.handleVerification(inputValues)
          .then(result => {
            setShowError(!result)
          })
    }
  }, [inputValues]);

  const handleKeyDown = (e, index) => {
    switch (e.keyCode) {
      case KEYBOARDS.backspace:
        handleInputChange(index, "");
        break;
      case KEYBOARDS.arrowLeft:
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
        break;
      case KEYBOARDS.arrowRight:
        if (index < inputValues.length - 1) {
          inputRefs[index + 1].current.focus();
        }
        break;
      default:
    }
  };

  return (
    <div className="cerf-modal">
      <form action="#" className="form">
        <h3 className="text-center">Введите код из SMS</h3>
        <div className="d-flex ">
          {inputValues.map((value, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="tel"
              maxLength="1"
              pattern="[0-9]"
              className="form-control"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        {showError ? <p className="error">Неверный код</p>: <a></a>}
        {showChangeNumberLink ? (
            <p>
              <a href="/change-number">Изменить номер</a>
            </p>
        ) : (
            <p className="code-text">Отправить повторно через: {seconds} сек.</p>
        )}
      </form>
    </div>
  );
}

export default VerificationCode;
