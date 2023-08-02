import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  useEffect(() => {
    const telefonGasit = phones.find(
      (telefon) => telefon.brand === brand && telefon.id === id
    );
    setTelefonSelectat(telefonGasit);
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
    const existentInCos = articoleCos.find((articol) => articol.id === telefonSelectat.id);
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
    setArticoleCos(articoleCos.filter((articol) => articol.id !== telefonSelectat.id));
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
      mesaj += `- ${articol.brand} x ${articol.cantitate} - ${articol.pret * articol.cantitate} lei\n`;
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
    const mesajPlataFinalizata = construiesteMesajPlataFinalizata(sumaTotalaPlata);

    setArticoleCos([]);
    setAfiseazaPlata(false);
    alert("Plată efectuată cu succes!\n\n" + mesajPlataFinalizata);
  };

  if (!telefonSelectat) {
    return <p>Telefonul nu a fost găsit.</p>;
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img src={telefonSelectat.image} alt={telefonSelectat.brand} />
      </div>
      <div className={styles.productDetails}>
        <h2>{telefonSelectat.brand}</h2>
        <p>Sistem de operare: {telefonSelectat.sistemOperare}</p>
        <p>Detalii: {telefonSelectat.detalii}</p>
        <p>An: {telefonSelectat.an}</p>
        <p>Chipset: {telefonSelectat.chipset}</p>
        <div className={styles.quantity}>
          <button className={styles.quantityBtn} onClick={micsoreazaCantitate}>
            -
          </button>
          <span className={styles.quantityDisplay}>{cantitate}</span>
          <button className={styles.quantityBtn} onClick={maresteCantitate}>
            +
          </button>
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
                    // Verificați dacă inputul conține doar cifre folosind o expresie regulată
                    if (/^\d*$/.test(value)) {
                      // Dacă inputul conține doar cifre, actualizați starea
                      schimbaInformatiiLivrare(event);
                    }
                  }}
                  pattern="[0-9]*"     // Permite doar cifre
                  maxLength="10"       // Lungime maximă de 10 caractere (cifre)
                />
              </div>
            )}
            {metodaLivrare === "store_pickup" && (
              <div>
                <h3>Informații Ridicare din Magazin:</h3>
                <p>Disponibil pentru ridicare la locația magazinului nostru.</p>
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
    </div>
  );
}

export default Details;
