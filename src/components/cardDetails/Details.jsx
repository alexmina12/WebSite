import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { fetchData, fetchPhoneDetails } from "../../api/api";
import * as BiIcons from "react-icons/bi";

function Details({ phones }) {
  const { brand, id } = useParams();
  const [telefonSelectat, setTelefonSelectat] = useState(null);
  const [cantitate, setCantitate] = useState(1);
  const [adaugatInCos, setAdaugatInCos] = useState(false);
  const [articoleCos, setArticoleCos] = useState([]);
  const [afiseazaPlata, setAfiseazaPlata] = useState(false);
  const [metodaPlata, setMetodaPlata] = useState("card");
  const [sumaTotala, setSumaTotala] = useState(0);
  const [metodaLivrare, setMetodaLivrare] = useState("standard");
  const [informatiiLivrare, setInformatiiLivrare] = useState({
    nume: "",
    adresa: "",
    telefon: "",
  });
  const [detailed, setIsDetailed] = useState(false);

  useEffect(() => {
    const telefonGasit = phones.find(
      (telefon) => telefon.brand === brand && telefon.id === id
    );
    if (telefonGasit) {
      fetchPhoneDetails(telefonGasit.id).then((details) => {
        setTelefonSelectat({ ...telefonGasit, ...details });
      });
    }
  }, [phones, brand, id]);

  useEffect(() => {
    const suma = articoleCos.reduce(
      (total, articol) => total + articol.pret * articol.cantitate,
      0
    );
    setSumaTotala(suma);
  }, [articoleCos]);

  const micsoreazaCantitate = () => {
    if (cantitate > 1) {
      setCantitate(cantitate - 1);
    }
  };

  const maresteCantitate = () => {
    setCantitate(cantitate + 1);
  };

  const adaugaInCos = () => {
    const existentInCos = articoleCos.find(
      (articol) => articol.id === telefonSelectat.id
    );
    if (existentInCos) {
      setArticoleCos(
        articoleCos.map((articol) =>
          articol.id === telefonSelectat.id
            ? { ...articol, cantitate: articol.cantitate + cantitate }
            : articol
        )
      );
    } else {
      setArticoleCos([...articoleCos, { ...telefonSelectat, cantitate }]);
    }
    setAdaugatInCos(true);
  };

  const scoateDinCos = () => {
    setAdaugatInCos(false);
    setCantitate(1);
    setArticoleCos(
      articoleCos.filter((articol) => articol.id !== telefonSelectat.id)
    );
  };

  const schimbaMetodaLivrare = (event) => {
    setMetodaLivrare(event.target.value);
  };

  const schimbaInformatiiLivrare = (event) => {
    const { name, value } = event.target;
    setInformatiiLivrare({
      ...informatiiLivrare,
      [name]: value,
    });
  };

  const schimbaMetodaPlata = (event) => {
    setMetodaPlata(event.target.value);
  };

  const deschidePlata = () => {
    setAfiseazaPlata(true);
  };

  const construiesteMesajPlataFinalizata = (sumaTotalaPlata) => {
    let mesaj = "Produse cumpărate:\n";
    for (const articol of articoleCos) {
      mesaj += `- ${articol.brand} x ${articol.cantitate} - ${
        articol.pret * articol.cantitate
      } lei\n`;
    }
    mesaj += `\nSuma totală plătită: ${sumaTotalaPlata.toFixed(2)} lei`;
    return mesaj;
  };

  const finalizeazaPlata = () => {
    let costLivrare = 0;
    if (metodaLivrare === "express") {
      costLivrare = 100;
    }

    const sumaTotalaPlata = sumaTotala + costLivrare;
    const mesajPlataFinalizata =
      construiesteMesajPlataFinalizata(sumaTotalaPlata);

    setArticoleCos([]);
    setAfiseazaPlata(false);
    alert("Plată efectuată cu succes!\n\n" + mesajPlataFinalizata);
  };

  const specificatiiProdus = [
    {
      label: "Sistem de operare:",
      value: telefonSelectat?.operatingSystem || "N/A",
    },
    { label: "Aparitie:", value: telefonSelectat?.release || "N/A" },
    { label: "Chipset:", value: telefonSelectat?.cpu || "N/A" },
    {
      label: "Storage capacity",
      value: telefonSelectat?.storageCapacity || [],
    },
    {
      label: "Pret:",
      value: telefonSelectat?.prices || "Select storage capacity",
    },
  ];

  if (!telefonSelectat) {
    return <p>Telefonul nu a fost găsit.</p>;
  }
  const display = telefonSelectat?.display || [];

  const details = () => {
    setIsDetailed(false);
  };

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productDetails}>
          <div className={styles.box}>
            <h2>{telefonSelectat?.device_name}</h2>
            <img
              src={telefonSelectat.device_image}
              alt={telefonSelectat.brand}
            />
          </div>
          <div className={styles.specificationsContainer}>
            {specificatiiProdus.map((spec, index) => (
              <div key={index} className={styles.specificationItem}>
                <span className={styles.specificationLabel}>{spec.label}</span>
                {spec.label === "Storage capacity" ? (
                  <div className={styles.storageButtons}>
                    {spec.value.map((storageOption, storageIndex) => (
                      <button
                        key={storageIndex}
                        onClick={() => handleStorageClick(storageOption)}
                      >
                        {storageOption}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className={styles.specificationValue}>
                    {spec.value}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className={styles.quantity}>
            <div className={styles.quantityBtnContainer}>
              <button
                className={styles.quantityBtn}
                onClick={micsoreazaCantitate}
              >
                -
              </button>
              <button className={styles.quantityBtn} onClick={maresteCantitate}>
                +
              </button>
            </div>
            <div className={styles.quantityDisplay}>{cantitate}</div>
          </div>

          {adaugatInCos ? (
            <div>
              <button
                className={styles.removeFromCartBtn}
                onClick={scoateDinCos}
              >
                <span className={styles.cartIcon}>
                  <ShoppingCartIcon />
                </span>{" "}
                Scoate din Coș
              </button>
              <button
                className={styles.proceedToPaymentBtn}
                onClick={deschidePlata}
              >
                Procedează la Plată
              </button>
            </div>
          ) : (
            <button className={styles.addToCartBtn} onClick={adaugaInCos}>
              <span className={styles.cartIcon}>
                <ShoppingCartIcon />
              </span>{" "}
              Adaugă în Coș
            </button>
          )}
          {adaugatInCos && afiseazaPlata && (
            <div className={styles.paymentContainer}>
              <h3>Alege Metoda de Livrare:</h3>
              <label>
                <input
                  type="radio"
                  value="standard"
                  checked={metodaLivrare === "standard"}
                  onChange={schimbaMetodaLivrare}
                />
                Livrare Standard
              </label>
              <label>
                <input
                  type="radio"
                  value="express"
                  checked={metodaLivrare === "express"}
                  onChange={schimbaMetodaLivrare}
                />
                Livrare Express
              </label>
              <label>
                <input
                  type="radio"
                  value="store_pickup"
                  checked={metodaLivrare === "store_pickup"}
                  onChange={schimbaMetodaLivrare}
                />
                Ridicare din Magazin
              </label>
              {metodaLivrare === "express" && (
                <div>
                  <h3>Informații Livrare:</h3>
                  <input
                    type="text"
                    placeholder="Nume"
                    name="nume"
                    value={informatiiLivrare.nume}
                    onChange={schimbaInformatiiLivrare}
                  />
                  <input
                    type="text"
                    placeholder="Adresă"
                    name="adresa"
                    value={informatiiLivrare.adresa}
                    onChange={schimbaInformatiiLivrare}
                  />
                  <input
                    type="tel"
                    placeholder="Telefon"
                    name="telefon"
                    value={informatiiLivrare.telefon}
                    onChange={(event) => {
                      const { value } = event.target;
                      if (/^\d*$/.test(value)) {
                        schimbaInformatiiLivrare(event);
                      }
                    }}
                    pattern="[0-9]*"
                    maxLength="10"
                  />
                </div>
              )}
              {metodaLivrare === "store_pickup" && (
                <div>
                  <h3>Informații Ridicare din Magazin:</h3>
                  <p>
                    Disponibil pentru ridicare la locația magazinului nostru.
                  </p>
                </div>
              )}
              <h3>Alege Metoda de Plată:</h3>
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={metodaPlata === "card"}
                  onChange={schimbaMetodaPlata}
                />
                Plată cu Cardul
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={metodaPlata === "cash"}
                  onChange={schimbaMetodaPlata}
                />
                Plată la Livrare
              </label>
              <p>Sumă Totală: {sumaTotala.toFixed(2)} lei</p>
              <button
                className={styles.finishPaymentBtn}
                onClick={finalizeazaPlata}
              >
                Finalizează Plata
              </button>
            </div>
          )}
          {adaugatInCos && !afiseazaPlata && (
            <p className={styles.feedbackMessage}>
              Produsul a fost adăugat în coș!
            </p>
          )}
        </div>

        <div className={styles.specs}>
          <h3>Specs</h3>
          <div className={styles.details}>
            {/* <div>
            <h4>Display</h4>
            <p>{telefonSelectat.display_type}</p>
            <p>{telefonSelectat.display_size}</p>
            <p>{telefonSelectat.display_res}</p>
          </div>
          <hr></hr> */}
            {detailed ? (
              <>
                <div>
                  Body
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                    onClick={() => setIsDetailed(!details)}
                  ></BiIcons.BiSolidUpArrow>
                </div>
                <p>is working</p>
                <div>
                  Display
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                    onClick={() => setIsDetailed(!details)}
                  ></BiIcons.BiSolidUpArrow>
                </div>
                <p>is working</p>
                <div>
                  OS
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                  ></BiIcons.BiSolidUpArrow>
                </div>
                <div>
                  Storage and RAM{" "}
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                  ></BiIcons.BiSolidUpArrow>
                </div>
                <div>
                  Back cameras{" "}
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                  ></BiIcons.BiSolidUpArrow>
                </div>
                <div>
                  Front cameras{" "}
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                  ></BiIcons.BiSolidUpArrow>
                </div>
                <div>
                  Battery{" "}
                  <BiIcons.BiSolidUpArrow
                    className={styles.down}
                  ></BiIcons.BiSolidUpArrow>
                </div>
              </>
            ) : (
              <>
                <div>
                  Body
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                    onClick={() => setIsDetailed(true)}
                  ></BiIcons.BiSolidDownArrow>
                </div>
                <div>
                  Display
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                    onClick={() => setIsDetailed(true)}
                  ></BiIcons.BiSolidDownArrow>
                </div>
                <div>
                  OS
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                  ></BiIcons.BiSolidDownArrow>
                </div>
                <div>
                  Storage and RAM{" "}
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                  ></BiIcons.BiSolidDownArrow>
                </div>
                <div>
                  Back cameras{" "}
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                  ></BiIcons.BiSolidDownArrow>
                </div>
                <div>
                  Front cameras{" "}
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                  ></BiIcons.BiSolidDownArrow>
                </div>
                <div>
                  Battery{" "}
                  <BiIcons.BiSolidDownArrow
                    className={styles.down}
                  ></BiIcons.BiSolidDownArrow>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
