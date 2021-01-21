import React, { useEffect, useState } from "react";
import "../CSS/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import Register from "./Register";

function App() {
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState();
  useEffect(() => {
    // initialState.user
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setIsUser(true);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setIsUser(false);
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {!isUser && isUser !== undefined ? (
          <>
            <Redirect to="/login" />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </>
        ) : (
          <>
            <Header />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
