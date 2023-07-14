import React, {useState} from "react";
import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri';

export function Nav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  console.log(sidebar)

  return (
    <>
      <div className={`${styles['navbar']} ${styles['nav-bar']}`}>
        <Link to="#" className="menu-bars">
          <RiIcons.RiMenuLine onClick={showSidebar} />
        </Link>
        <div className={`${styles['nav-menu']} ${sidebar ? styles.active : ''}`}>          <ul className={styles['nav-menu-items']}>
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
          </ul>
        </div>
      </div>
    </>
  );
}