import React, { useContext } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../Context/AuthContext";
import ErrorPage from "../../routes/root";

function Profile() {
  const { isLoggedIn, user } = useContext(AuthContext);

  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("user:", user);

  if (!isLoggedIn) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.heading}>User Profile</h1>
      {user && (
        <div className={styles.profileInfo}>
          <p>Name: {user.nume}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
