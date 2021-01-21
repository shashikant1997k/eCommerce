import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../CSS/Header.css";
import { Link, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { Button } from "@material-ui/core";

function Header() {
  const state = useSelector((state) => state);
  let user = state?.user;
  const history = useHistory();
  const handleAuth = () => {
    auth.signOut();
    history.push("/login");
  };

  const [basket, setBasket] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        db.collection("cartItem").onSnapshot((res) => {
          setBasket(
            res?.docs
              ?.map((doc) => ({ ...doc.data(), id: doc.id }))
              .filter((v) => v?.uid === user?.uid)
          );
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [user?.uid]);

  console.log(basket);

  return (
    <nav className="header">
      <Link to="/" className="header__link" style={{ marginRight: "10px" }}>
        <Button variant="outlined">Home</Button>
      </Link>
      <div className="header__nav">
        <div className="header__search">
          <input type="text" className="input__search" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <Link
          to="/checkout"
          className="header__link"
          style={{ marginLeft: "1em" }}
        >
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header_optionTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>

        <div
          onClick={handleAuth}
          className="header__option"
          style={{ cursor: "pointer" }}
        >
          <span className="header_optionOne">{user ? user?.email : ""}</span>
          <span className="header_optionTwo">Sign Out</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
