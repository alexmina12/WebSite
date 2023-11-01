import React, { useEffect, useState } from "react";
import styles from "./ItemCard.module.css";
import MyContext from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import Logo from "./img/Logo.jpg";
import { fetchData, fetchPhoneDetails, fetchAllBrands } from "../../api/api";
import * as AiIcons from "react-icons/ai";

function Card() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [visibleCount, setVisibleCount] = useState(25);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [selectedPhoneOs, setSelectedPhoneOs] = useState("");

  useEffect(() => {
    async function fetchPhonesData() {
      const phonesData = await fetchData();
      setPhones(phonesData);
      setFilteredPhones(phonesData);
    }
    fetchPhonesData();
  }, []);

  useEffect(() => {
    const filtered = phones.filter((phone) =>
      phone.device_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPhones(filtered);
  }, [searchValue, phones]);

  const navigate = useNavigate();
  const handleItemClick = async (phone) => {
    setSelectedPhone(phone);

    const { phoneDetails, operatingSystem } = await fetchPhoneDetails(phone.id);

    if (phoneDetails) {
      setSelectedPhoneOs(operatingSystem);
    }

    navigate(`/${phone.device_name}/${phone.id}`);
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
          <div className={styles.filter}>
            <button className={styles.filterButton}>Filter</button>
            <AiIcons.AiFillFilter
              className={styles.filter_icon}
            ></AiIcons.AiFillFilter>
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
                  src={phone.device_image}
                />
              </div>
              <div className={styles.small_card}>
                <p className={styles.brand}>{phone.device_name}</p>
                <p className={styles.os}>{phone.operatingSystem}</p>
                <p>Click pentru detalii</p>
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
