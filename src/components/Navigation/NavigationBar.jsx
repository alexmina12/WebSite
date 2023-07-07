import React from "react";
import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <div>
      <nav>
        <div className={styles.header}> 
            <h1>ShopWise</h1>
            <Link to="/login" className={styles.p}>Login</Link>
            <Link to="/cart" className={styles.p}>Cart</Link>
        </div>
        <ul className={styles.nav}>
          <li className={styles.space}></li>
          <li className={styles.links}>Acasa</li>
          <Link to="/about"><li className={styles.links}>Despre</li></Link>
          <li className={styles.links}>Experienta</li>
          <li className={styles.links}>Educatie</li>
          <li className={styles.links}>Abilitati</li>
          <li className={styles.links}>Proiecte</li>
        </ul>
      </nav>
    </div>
  );
}
