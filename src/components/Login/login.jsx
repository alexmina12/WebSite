import React, { useState, useContext, useEffect } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import ErrorPage from "../../routes/root";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);

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
      password,
    };

    axios
      .post("http://localhost:1024/login", userData)
      .then((response) => {
        setLoginStatus(response.data.message);
        if (response.data.success) {
          if (response.data.user) {
            setIsLoggedIn(true);
            setUser(response.data.user);
            navigate("/");
          } else {
            console.error(
              "Datele utilizatorului lipsesc din răspunsul serverului."
            );
            setLoginStatus("A apărut o eroare la autentificare.");
          }
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoginStatus("A apărut o eroare la autentificare.");
      });
  };

  // Dacă utilizatorul este logat, îl redirecționăm către pagina principală
  if (isLoggedIn) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      {loginStatus && <p className={styles.loginStatus}>{loginStatus}</p>}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.login}>
        <button onClick={handleLogin} type="submit" className={styles.btn}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
