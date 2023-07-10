import React, { useEffect, useState } from "react";
import styles from './ItemCard.module.css';
import MyContext from "../../MyContext";
import { useNavigate } from "react-router-dom";

export async function logJSONData() {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Dataset_Cell_Phones_Model_Brand?limit=50',
    {
      headers: {
        'X-Parse-Application-Id': 'MEqvn3N742oOXsF33z6BFeezRkW8zXXh4nIwOQUT',
        'X-Parse-Master-Key': 'uZ1r1iHnOQr5K4WggIibVczBZSPpWfYbSRpD6INw',
      }
    }
  );
  const jsonData = await response.json();
  const phones = jsonData.results.map(item => ({
    brand: item.Brand,
    operatingSystem: item.Operating_System || "No OS!",
    id: item.objectId,
  }));
  return phones;
}

export function Card() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(25);
  const [showAll, setShowAll] = useState(false);

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
    navigate(`/${phone.brand}/${phone.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 25);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCount(25);
    setShowAll(false);
  };

  const filteredPhones = phones.filter((phone) => {
    return phone.brand.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const visiblePhones = showAll ? filteredPhones : filteredPhones.slice(0, visibleCount);

  return (
    <MyContext.Provider value={phones}>
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>
        {visiblePhones.map((phone, objectId) => (
          <div
            key={objectId}
            className={`${styles.card} ${
              selectedPhone === phone ? styles.selected : ""
            }`}
            onClick={() => handleItemClick(phone)}
          >
            <img
              alt="Server Error"
              className={styles.img}
              src="https://www.shutterstock.com/image-vector/sold-out-red-rubber-stamp-600w-1912854955.jpg"
            />
            <div className={styles.description}>
              <p>{phone.brand}</p>
              <p>{phone.operatingSystem}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.center}>
        {filteredPhones.length > visibleCount && !showAll && (
          <button className={styles["btn-show"]} onClick={handleShowMore}>
            Show More
          </button>
        )}
        {showAll && (
          <button className={styles["btn-show"]} onClick={handleShowLess}>
            Show Less
          </button>
        )}
      </div>
    </MyContext.Provider>
  );
}

