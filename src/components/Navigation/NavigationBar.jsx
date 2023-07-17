import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri';
import styles from "./NavigationBar.module.css";

export function Nav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className={`${styles.navbar} ${styles['nav-bar']}`}>
        <Link to="#" className="menu-bars">
          <RiIcons.RiMenuLine onClick={showSidebar} />
        </Link>
        <div className={`${styles['nav-menu']} ${sidebar ? styles.active : ''}`}>
          <ul className={styles['nav-menu-items']}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <RiIcons.RiCloseLine onClick={showSidebar} />
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/register">
                <span>Register</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
