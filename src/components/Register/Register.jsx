import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "emailConfirm") {
      setEmailConfirm(value);
    } else if (id === "passwordConfirm") {
      setPasswordConfirm(value);
    }
  };

  useEffect(() => {
    const isEmailMatch = email === emailConfirm;
    const isPasswordMatch = password === passwordConfirm;
    const isAllFieldsFilled =
      firstName && email && password && emailConfirm && passwordConfirm;

    setShowButton(isEmailMatch && isPasswordMatch && isAllFieldsFilled);
    setShowError(!isAllFieldsFilled || !isEmailMatch || !isPasswordMatch);
  }, [firstName, email, password, emailConfirm, passwordConfirm]);

  const handleSubmit = () => {
    const userData = {
      firstName,
      email,
      password,
    };

    axios
      .post("http://localhost:1024/register", userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      {showError && (
        <p className={styles.completionMsg}>
          Please complete all fields correctly.
        </p>
      )}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="firstName">
          First Name
        </label>
        <input
          className={styles.input}
          type="text"
          id="firstName"
          placeholder="First Name"
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`${styles.formGroup} ${
          email !== emailConfirm ? styles.error : ""
        }`}
      >
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={`${styles.input}`}
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`${styles.formGroup} ${
          email !== emailConfirm ? styles.error : ""
        }`}
      >
        <label className={styles.label} htmlFor="emailConfirm">
          Confirm Email
        </label>
        <input
          className={`${styles.input}`}
          type="email"
          id="emailConfirm"
          placeholder="Confirm Email"
          onChange={handleInputChange}
        />
        {email !== emailConfirm && (
          <p className={styles.errorMsg}>Emails do not match.</p>
        )}
      </div>
      <div
        className={`${styles.formGroup} ${
          password !== passwordConfirm ? styles.error : ""
        }`}
      >
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={`${styles.input}`}
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`${styles.formGroup} ${
          password !== passwordConfirm ? styles.error : ""
        }`}
      >
        <label className={styles.label} htmlFor="passwordConfirm">
          Confirm Password
        </label>
        <input
          className={`${styles.input}`}
          type="password"
          id="passwordConfirm"
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />
        {password !== passwordConfirm && (
          <p className={styles.errorMsg}>Passwords do not match.</p>
        )}
      </div>
      <div className={styles.register}>
        <button
          onClick={handleSubmit}
          type="submit"
          className={`${styles.btn} ${
            showButton ? styles.visible : styles.invisible
          }`}
          disabled={!showButton}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
