import React, { useEffect, useState } from "react";
import styles from './ItemCard.module.css'
import MyContext from "../../MyContext";

async function logJSONData() {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Dataset_Cell_Phones_Model_Brand?limit=13',
    {
      headers: {
        'X-Parse-Application-Id': 'MEqvn3N742oOXsF33z6BFeezRkW8zXXh4nIwOQUT',
        'X-Parse-Master-Key': 'uZ1r1iHnOQr5K4WggIibVczBZSPpWfYbSRpD6INw',
      },
    }
  );
  const jsonData = await response.json();
  const phones = jsonData.results.map(item => ({
    brand: item.Brand,
    operatingSystem: item.Operating_System || "No OS!",
    id: item.objectId,
  }));
  // const data = phones.map(phone => phone.brand)
  // console.log(data)
  // console.log(jsonData)
  return phones;
}

export function Card() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const phonesData = await logJSONData();
      setPhones(phonesData);
    }
    fetchData();
  }, []);

  return (
    <MyContext.Provider value={phones}>
    <div className={styles.container}>
      {phones.map((phone, objectId) => (
        <div key={objectId} className={styles.card}>
          <img alt="Server Error" className="styles.img" src="https://www.shutterstock.com/image-vector/sold-out-red-rubber-stamp-600w-1912854955.jpg"></img>
          <p>{phone.brand}</p>
          <p>{phone.operatingSystem}</p>
        </div>
      ))}
    </div>
    </MyContext.Provider>
  );
}
