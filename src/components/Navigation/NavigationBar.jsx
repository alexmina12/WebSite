import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri';
import * as FcIcons from 'react-icons/fc'
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
                <span><FcIcons.FcHome /> Home</span>
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/about">
                <span><FcIcons.FcAbout /> About</span>
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/login">
                <span><RiIcons.RiLoginBoxFill /> Login</span>
              </Link>
            </li>
            <li className={styles['nav-text']}>
              <Link to="/register">
                <span><FcIcons.FcRegisteredTrademark /> Register</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
