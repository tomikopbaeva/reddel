import React from 'react';
import Logo from '../../assets/Logo2.svg';
import location from '../../assets/location3.svg';
import Localization from '../localization/Localization';
import './MobileCartHeader.css';


function MobileCartHeader() {
  return (
      <div className='mobile-cart-header'>
        <img src={Logo} alt="" />
        <div className="link">
          <img src={location} alt="location" />
          <span>Алматы</span>
        </div>
        <Localization />
      </div>
  );
}

export default MobileCartHeader;