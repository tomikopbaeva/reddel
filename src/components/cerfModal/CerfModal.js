import React, { useRef, useEffect } from "react";
import "./CerfModal.css";
import Frame from '../../assets/Frame.svg';

function CerfModal({ onClose }) {
    const modalRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
    
    return (
    <div className="cerf-modal">
        <div className="cerf-modal-content" ref={modalRef}>
            <h5 className="h5">Сертификат в рассрочку на сумму</h5>
            <div className='price'>
                    <span>30 000 ₸</span>
                    <span>50 000 ₸</span>
                    <span>100 000 ₸</span>
                    <span>150 000 ₸</span>
                    <span>200 000 ₸</span>
            </div>
            <div className='certificate'>
                <img src={Frame} alt="random" />
                <span>Сертификатом можно оплатить 1 счет</span>
            </div>
            <button className='certificate-button'>Оформить</button>
        </div>
    </div>
  );
}

export default CerfModal;
