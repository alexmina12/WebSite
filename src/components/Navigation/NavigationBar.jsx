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
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {}, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <>
      <div className={`${styles.navbar} ${styles["nav-bar"]}`}>
        <Link to="#" className={`${styles["menu-bars"]}`}>
          <RiIcons.RiMenuLine onClick={() => setSidebar(!sidebar)} />
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
                <RiIcons.RiCloseLine onClick={() => setSidebar(false)} />
              </Link>
            </li>
            <li className={styles["nav-text"]}>
              <Link to="/" onClick={closeSidebar}>
                <span>
                  <FcIcons.FcHome /> Home
                </span>
              </Link>
            </li>
            <li className={styles["nav-text"]}>
              <Link to="/about" onClick={closeSidebar}>
                <span>
                  <FcIcons.FcAbout /> About
                </span>
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className={styles["nav-text"]}>
                <Link to="/login" onClick={closeSidebar}>
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
                <Link to="/register" onClick={closeSidebar}>
                  <span>
                    <FcIcons.FcRegisteredTrademark /> Register
                  </span>
                </Link>
              </li>
            ) : (
              <Link to={`/profile/${user.id}`} onClick={closeSidebar}>
                <li className={styles["nav-text"]}>
                  <span>
                    <CgIcons.CgProfile /> Profile
                  </span>
                </li>
              </Link>
            )}
            <li className={styles["nav-text"]}>
              <Link to="/ClearCache" onClick={closeSidebar}>
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
