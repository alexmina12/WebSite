// Login.jsx
import React, { useState } from "react";
import styles from "./login.module.css";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    const userData = {
      email,
      password
    };

    axios.post('http://localhost:1024/login', userData)
      .then(response => {
        console.log(response.data);
        setLoginStatus(response.data.message);
      })
      .catch(error => {
        console.error(error);
        setLoginStatus('A apărut o eroare la autentificare.');
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      {loginStatus && (
        <p className={styles.loginStatus}>{loginStatus}</p>
      )}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input} type="email" id="email" placeholder="Email" onChange={handleInputChange} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} type="password" id="password" placeholder="Password" onChange={handleInputChange} />
      </div>
      <div className={styles.login}>
        <button onClick={handleLogin} type="submit" className={styles.btn}>Login</button>
      </div>
    </div>
  );
}

export default Login;
