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
    if (
        inputValues[1] &&
        inputValues[2] &&
        inputValues[3] &&
        inputValues[3]
    ) {
      props.handleVerification(inputValues);
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
        <p className="code-text">Отправить повторно через: 30 сек.</p>
        <a href={"/profile"}>Изменить номер телефона</a>
      </form>
    </div>
  );
}

export default VerificationCode;
