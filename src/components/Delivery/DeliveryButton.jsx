import React, { useState } from 'react';
import styles from './DeliveryButton.module.css';

const DeliveryButton = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowOptions(false);
  };

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles['delivery-button']}>
      <button className={styles['delivery-button-main']} onClick={handleButtonClick}>
        Deliver to {selectedCountry ? selectedCountry : 'Selected Country'}
      </button>
      {showOptions && (
        <div className={styles['country-options']}>
          <ul>
            <li onClick={() => handleCountrySelect('Moldova')} className={styles['country-option']}>
              Moldova
            </li>
            <li onClick={() => handleCountrySelect('Romania')} className={styles['country-option']}>
              Romania
            </li>
            <li onClick={() => handleCountrySelect('Italy')} className={styles['country-option']}>
              Italy
            </li>
            <li onClick={() => handleCountrySelect('Germany')} className={styles['country-option']}>
              Germany
            </li>
            <li onClick={() => handleCountrySelect('France')} className={styles['country-option']}>
              France
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeliveryButton;


