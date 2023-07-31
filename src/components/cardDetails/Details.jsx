/* Details.js */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Details({ phones }) {
  const { brand, id } = useParams();
  const [phone, setPhone] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const foundPhone = phones.find(
      (phone) => phone.brand === brand && phone.id === id
    );
    setPhone(foundPhone);
  }, [phones, brand, id]);

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
    setQuantity(1);
    setCartItems(cartItems.filter((item) => item.id !== phone.id));
  };

  if (!phone) {
    return <p className={styles.error}>Phone not found.</p>;
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img src={phone.image} alt={phone.brand} />
      </div>
      <div className={styles.productDetails}>
        <h2>{phone.brand}</h2>
        <p>Operating System: {phone.operatingSystem}</p>
        <p>Details: {phone.details}</p>
        <p>Year: {phone.year}</p>
        <p>Chipset: {phone.chipset}</p>
        <div className={styles.quantity}>
          <button className={styles.quantityBtn} onClick={handleDecrease}>
            -
          </button>
          <span className={styles.quantityDisplay}>{quantity}</span>
          <button className={styles.quantityBtn} onClick={handleIncrease}>
            +
          </button>
        </div>
        {addedToCart ? (
          <button
            className={styles.removeFromCartBtn}
            onClick={handleRemoveFromCart}
          >
            <span className={styles.cartIcon}>
              <ShoppingCartIcon />
            </span>{" "}
            Șterge produsul
          </button>
        ) : (
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            <span className={styles.cartIcon}>
              <ShoppingCartIcon />
            </span>{" "}
            Adaugă în coș
          </button>
        )}
        {addedToCart && (
          <p className={styles.feedbackMessage}>
            Produsul a fost adăugat în coș!
          </p>
        )}
      </div>
    </div>
  );
}

export default Details;
