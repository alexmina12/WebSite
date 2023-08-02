import React, { useContext } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../Context/AuthContext";
import ErrorPage from "../../routes/root";
import * as LuIcons from "react-icons/lu";

function Profile() {
  const { isLoggedIn, user } = useContext(AuthContext);

  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("user:", user);

  if (!isLoggedIn) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileContainer1}>
          <h1 className={styles.heading}>User Profile</h1>
          {user && (
            <div className={styles.profileInfo}>
              <p>
                Username: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p className={styles.name}>{user.nume}</p>
              <p>
                Email: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>{user.email}</p>
            </div>
          )}
        </div>
        <div className={styles.profileContainer2}>
          <h1 className={styles.heading}>User Profile</h1>
          {user && (
            <div className={styles.profileInfo}>
              <p>
                First Name: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>
                Last Name: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>
                Gender: {user.nume} <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>
                Birthdate: {user.email}{" "}
                <LuIcons.LuEdit className={styles.icon} />
              </p>
            </div>
          )}
        </div>
        <div className={styles.profileContainer3}>
          <h1 className={styles.heading}>Billing Information</h1>
          {user && (
            <div className={styles.profileInfo}>
              <p>
                Country: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>
                Street: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>
                Number: <LuIcons.LuEdit className={styles.icon} />
              </p>
              <p>
                Adittional information:{" "}
                <LuIcons.LuEdit className={styles.icon} />
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
