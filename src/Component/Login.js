import React, { useState } from "react";
import "../CSS/Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
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
        <h1>Sign-in</h1>

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

          <button type="submit" onClick={signIn} className="_btn">
            Sign in
          </button>
        </form>
        <div className="or_txt">
          <span></span>
          <h5>OR</h5>
          <span></span>
        </div>

        <Link to="/register">
          <button className="login__registerButton">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
