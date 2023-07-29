import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io5";
import styles from "./NavigationBar.module.css";
import AuthContext from "../../Context/AuthContext";
import * as CgIcons from "react-icons/cg";

function Nav() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className={`${styles.navbar} ${styles["nav-bar"]}`}>
        <Link to="#" className={`${styles["menu-bars"]}`}>
          <RiIcons.RiMenuLine onClick={showSidebar} />
        </Link>
        {isLoggedIn && (
          <div className={styles.delog}>
            <IoIcons.IoLogOut onClick={handleLogout} />
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.profile}>
            <CgIcons.CgProfile />
          </div>
        )}
        <div
          className={`${styles["nav-menu"]} ${sidebar ? styles.active : ""}`}
        >
          <ul className={styles["nav-menu-items"]}>
            <li className={styles["navbar-toggle"]}>
              <Link to="#" className={`${styles["menu-bars"]}`}>
                <RiIcons.RiCloseLine onClick={showSidebar} />
              </Link>
            </li>
            <li className={styles["nav-text"]}>
              <Link to="/">
                <span>
                  <FcIcons.FcHome /> Home
                </span>
              </Link>
            </li>
            <li className={styles["nav-text"]}>
              <Link to="/about">
                <span>
                  <FcIcons.FcAbout /> About
                </span>
              </Link>
            </li>
            {/* Elimină link-ul de login dacă utilizatorul este autentificat */}
            {!isLoggedIn ? (
              <li className={styles["nav-text"]}>
                <Link to="/login">
                  <span>
                    <RiIcons.RiLoginBoxFill /> Login
                  </span>
                </Link>
              </li>
            ) : (
              <li className={styles["nav-text"]}>
                <span onClick={handleLogout}>
                  <IoIcons.IoLogOut /> Logout
                </span>
              </li>
            )}
            {!isLoggedIn ? (
              <li className={styles["nav-text"]}>
                <Link to="/register">
                  <span>
                    <FcIcons.FcRegisteredTrademark /> Register
                  </span>
                </Link>
              </li>
            ) : (
              <Link to="/Profile">
                <li className={styles["nav-text"]}>
                  <span>
                    <CgIcons.CgProfile /> Profile
                  </span>
                </li>
              </Link>
            )}
            <li className={styles["nav-text"]}>
              <Link to="/ClearCache">
                <span>
                  <FcIcons.FcRegisteredTrademark /> Clear Server Cache
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
