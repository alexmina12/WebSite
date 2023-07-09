import React, { useEffect, useState, } from "react";

import styles from './ItemCard.module.css';

import MyContext from "../../MyContext";

import { useNavigate } from "react-router-dom";



export async function logJSONData() {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Dataset_Cell_Phones_Model_Brand?limit=50',
    {
      headers: {
        'X-Parse-Application-Id': 'MEqvn3N742oOXsF33z6BFeezRkW8zXXh4nIwOQUT', // This is the fake app's application id
        'X-Parse-Master-Key': 'uZ1r1iHnOQr5K4WggIibVczBZSPpWfYbSRpD6INw', // This is the fake app's readonly master key
      }
    }
  );
  const jsonData = await response.json();
  const phones = jsonData.results.map(item => ({
    brand: item.Brand,
    operatingSystem: item.Operating_System || "No OS!",
    id: item.objectId,
  }));
  // const data = phones.map(phone => phone.id)
  // console.log(data)
  console.log(jsonData)
  return phones;
}



export function Card() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setselectedPhones] = useState(null);
  const [visibleCount, setVisibleCount] = useState(25); // Numărul inițial de elemente afișate
  const [showAll, setShowAll] = useState(false); // Starea pentru afișarea tuturor elementelor

  useEffect(() => {
    async function fetchData() {
      const phonesData = await logJSONData();
      setPhones(phonesData);
    }
    fetchData();
  }, []);

  const navigate = useNavigate()
  const handleItemClick = (phone) => {
    setselectedPhones(phone);
    navigate(`/${phone.brand}/${phone.id}`)
  };

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 25); // Adăugați 25 la numărul de elemente afișate
    setShowAll(true);
  };
  const handleShowLess = () => {
    setVisibleCount(25); // Resetați numărul de elemente afișate la 25
    setShowAll(false); // Actualizați starea pentru afișarea tuturor elementelor
  };

  const visiblePhones = showAll ? phones : phones.slice(0, visibleCount);

  return (
    <MyContext.Provider value={phones}>
      <div className={styles.container}>
      {visiblePhones.map((phone, objectId) => (
            <div 
            key={objectId} 
            className={`${styles.card} ${selectedPhone === phone ? styles.selected : ''}`} 
            onClick={() => handleItemClick(phone)}>
            <img alt="Server Error" 
            className="styles.img" 
            src="https://www.shutterstock.com/image-vector/sold-out-red-rubber-stamp-600w-1912854955.jpg"></img>
           <div className="description">
              <p>{phone.brand}</p>
              <p>{phone.operatingSystem}</p>
              
                </div>
                
            
          </div>
        ))}
        
    
      </div>

      <div className={styles.center}>
        {phones.length > visibleCount && !showAll && (
          <button className={styles["btn-show"]} onClick={handleShowMore}>Show More</button>
        )}
        {showAll && (
          <button className={styles["btn-show"]} onClick={handleShowLess}>Show Less</button>
        )}
      </div>
    </MyContext.Provider>
  );
}