import React from "react";
import styles from "./login.module.css";

function Login(e) {
  return (
    <div className={styles.container}>
      <h2 className={styles.loginHeading}>Login section</h2>
      <form className={styles.loginForm}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
