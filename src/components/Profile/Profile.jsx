import React, { useContext } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../Context/AuthContext";
import ErrorPage from "../../routes/root";

function Profile() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <ErrorPage />;
  }

  return (
    <>
      <h1 className={styles.test}>Succes on accessing Profile Page</h1>
    </>
  );
}

export default Profile;
