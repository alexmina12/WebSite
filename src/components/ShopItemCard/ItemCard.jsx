import React, { useEffect, useState } from "react";
import styles from "./ItemCard.module.css";
import MyContext from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import Logo from "./img/Logo.jpg";

// Funcție pentru a obține date JSON din API
export async function logJSONData() {
  const response = await fetch(
    "https://parseapi.back4app.com/classes/Dataset_Cell_Phones_Model_Brand?limit=50",
    {
      headers: {
        "X-Parse-Application-Id": "MEqvn3N742oOXsF33z6BFeezRkW8zXXh4nIwOQUT",
        "X-Parse-Master-Key": "uZ1r1iHnOQr5K4WggIibVczBZSPpWfYbSRpD6INw",
      },
    }
  );
  const jsonData = await response.json();
  const phones = jsonData.results.map((item) => ({
    brand: item.Brand,
    operatingSystem: item.Operating_System || "Fără sistem de operare!",
    id: item.objectId,
  }));
  return phones;
}

function Card() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhones] = useState(null);
  const [visibleCount, setVisibleCount] = useState(25);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPhones, setFilteredPhones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const phonesData = await logJSONData();
      setPhones(phonesData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = phones.filter((phone) =>
      phone.brand.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPhones(filtered);
  }, [searchValue, phones]);

  const navigate = useNavigate();
  const handleItemClick = (phone) => {
    setSelectedPhones(phone);
    navigate(`/${phone.brand}/${phone.id}`);
  };

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 25);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCount(25);
    setShowAll(false);
  };

  const visiblePhones = showAll
    ? filteredPhones
    : filteredPhones.slice(0, visibleCount);

  return (
    <MyContext.Provider value={phones}>
      <div className={styles.products}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.heading}>Produse</h1>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                className={styles.src}
                type="text"
                placeholder="Caută..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.box}>
          {visiblePhones.map((phone, objectId) => (
            <div
              key={objectId}
              className={`${styles.card} ${
                selectedPhone === phone ? styles.selected : ""
              }`}
              onClick={() => handleItemClick(phone)}
            >
              <div className={styles.image}>
                <img
                  alt="Eroare server"
                  className={styles.img}
                  src="https://www.shutterstock.com/image-vector/sold-out-red-rubber-stamp-600w-1912854955.jpg"
                />
              </div>
              <div className={styles.small_card}>
                <p className={styles.brand}>{phone.brand}</p>
                <p className={styles.os}>{phone.operatingSystem}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.center}>
        {filteredPhones.length > visibleCount && !showAll && (
          <button className={styles["btn-show"]} onClick={handleShowMore}>
            Afișează mai multe
          </button>
        )}
        {showAll && (
          <button className={styles["btn-show"]} onClick={handleShowLess}>
            Afișează mai puține
          </button>
        )}
      </div>
    </MyContext.Provider>
  );
}

export default Card;
