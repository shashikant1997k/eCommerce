import React, { useState } from "react";
import "../CSS/Login.css";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const register = (event) => {
    event.preventDefault();

    // register on on the basis of email password using firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-Up</h1>

        <form action="">
          <h5>Email</h5>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />

          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>

        <button onClick={register} className="_btn">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;
