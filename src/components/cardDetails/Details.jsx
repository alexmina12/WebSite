import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';

function Details({ phones }) {
  const { brand, id } = useParams();

  const phone = phones.find((phone) => phone.brand === brand && phone.id === id);

  if (!phone) {
    return <p>Phone not found.</p>;
  }

  return (
    <div className={styles.test}>
      <h2>{phone.brand}</h2>
      <p>Operating System: {phone.operatingSystem}</p>
      <p>Details: {phone.details}</p>
      <p>Year: {phone.year}</p>
      <p>Chipset: {phone.chipset}</p>
    </div>
  );
}

export default Details;
