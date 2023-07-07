import React from 'react';
import styles from "./Details.module.css";

function Details({ phone }) {
  return (
    <body className={styles.test}>
      <h2>{phone.brand}</h2>
      <p>Operating System: {phone.operatingSystem}</p>
      <p>{phone.Details}</p>
      <p>{phone.year}</p>
      <p>{phone.chipset}</p>
    </body>
  );
}

export default Details;
