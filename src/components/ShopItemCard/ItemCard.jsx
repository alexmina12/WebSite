import React, { useEffect, useState, } from "react";
import styles from './ItemCard.module.css'
import MyContext from "../../MyContext";
import { useNavigate } from "react-router-dom";

export async function logJSONData() {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Dataset_Cell_Phones_Model_Brand?limit=50',
    {
      headers: {
        'X-Parse-Application-Id': 'MEqvn3N742oOXsF33z6BFeezRkW8zXXh4nIwOQUT', 
        // This is the fake app's application id
        
        'X-Parse-Master-Key': 'uZ1r1iHnOQr5K4WggIibVczBZSPpWfYbSRpD6INw', 
        // This is the fake app's readonly master key
      }
    }
  );
  const jsonData = await response.json();
  const phones = jsonData.results.map(item => ({
    brand: item.Brand,
    operatingSystem: item.Operating_System || "No OS!",
    id: item.objectId,
    year: item.Announced,
    chipset: item.Chipset,
    displayRes: item.Display_resolution,
    displaySize: item.Display_size,
    displayType: item.Display_Type,
  }));
  const data = phones.map(phone => phone.id)
  console.log(data)
  console.log(jsonData)
  return phones;
}

export function Card() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const phonesData = await logJSONData();
      setPhones(phonesData);
    }
    fetchData();
  }, []);

  const navigate = useNavigate();


  const handleItemClick = (phone) => {
    setSelectedPhone(phone);
    navigate(`/${phone.brand}/${phone.id}`)
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredPhones = phones.filter((phone) => {
    return phone.brand.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <MyContext.Provider value={phones}>
      <div className={styles.container}>
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Ex: iPhone 6"
        />
        <br />
        {filteredPhones.map((phone, objectId) => (
            <div
              key={objectId}
              className={`${styles.card} ${
              selectedPhone === phone ? styles.selected : "" }  `}
              onClick={() => handleItemClick(phone)}
            >
            <img 
              alt="Server Error" 
              className="styles.img" 
              src="https://www.shutterstock.com/image-vector/sold-out-red-rubber-stamp-600w-1912854955.jpg">
            </img>
            <p>{phone.brand}</p>
            <p>{phone.operatingSystem}</p>
          </div>
        ))}
      </div>
    </MyContext.Provider>
  );
}
