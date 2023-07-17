import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    const userData = {
      firstName,
      email,
      password
    };

    axios.post('http://localhost:3000/register', userData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="content">
      <div className="username">
        <label className={styles.label} htmlFor="firstName">First Name</label>
        <input className={styles.input} type="text" id="firstName" placeholder="First Name" onChange={handleInputChange} />
      </div>
      <div className="email">
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input} type="email" id="email" placeholder="Email" onChange={handleInputChange} />
      </div>
      <div className="password">
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} type="password" id="password" placeholder="Password" onChange={handleInputChange} />
      </div>
      <div className="register">
        <button onClick={handleSubmit} type="submit" className="btn">Register</button>
      </div>
    </div>
  );
}

export default Register;
