import React, { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import styles from "./styles/Login.module.css";
import { useDispatch } from "react-redux";
import { setUsername, setPassword } from "../redux/authSlice";
import { baseUrl } from "../utils/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [showIncorrectCredentials, setShowIncorrectCredentials] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsernameState(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordState(event.target.value);
  };

  //****************************Post Request For The Login****************** */

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setUsername(username));
        dispatch(setPassword(password));
        navigate("/homepage");
        console.log("Successfully logged in!");
      } else {
        console.log("Incorrect credentials!");
        setShowIncorrectCredentials(true);
        setTimeout(() => setShowIncorrectCredentials(false), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <FaTwitter className={styles.logo} />
        </div>
        <h1 className={styles.title}>Log in to Twitter</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username:
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label className={styles.label}>
            Password:
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button className={styles.button} type="submit">
            Log In
          </button>
        </form>
        {showIncorrectCredentials && (
          <div className={styles.errorPopup}>Incorrect credentials</div>
        )}
      </div>
    </div>
  );
};

export default Login;




