import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';

function Details({ phones }) {
  const { brand, id } = useParams();

  const phone = phones.find((phone) => phone.brand === brand && phone.id === id);

  if (!phone) {
    return <p>Phone not found.</p>;
  }

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setCartItems([...cartItems, { ...phone, quantity }]);
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    setAddedToCart(false);
    setQuantity(1); // Resetează cantitatea produsului la 1
    setCartItems(cartItems.filter((item) => item.id !== phone.id));
  };

  return (
    <div className={styles.test}>
      <h2>{phone.brand}</h2>
      <p>Operating System: {phone.operatingSystem}</p>
      <p>Details: {phone.details}</p>
      <p>Year: {phone.year}</p>
      <p>Chipset: {phone.chipset}</p>
      <div className={styles.quantity}>
        <button className={styles.btn} onClick={handleDecrease}>
          -
        </button>
        <span className={styles.quantityDisplay}>{quantity}</span>
        <button className={styles.btn} onClick={handleIncrease}>
          +
        </button>
      </div>
      {addedToCart ? (
        <button className={styles.removeFromCartBtn} onClick={handleRemoveFromCart}>
          Șterge produsul
        </button>
      ) : (
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Adaugă în coș
        </button>
      )}
      {addedToCart && (
        <p className={styles.feedbackMessage}>Produsul a fost adăugat în coș!</p>
      )}
    </div>
  );
}

export default Details;
