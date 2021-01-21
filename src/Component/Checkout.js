import React, { useEffect, useState } from "react";
import "../CSS/Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { db } from "../firebase";
import { useSelector } from "react-redux";

function Checkout() {
  const state = useSelector((state) => state);
  let user = state.user;
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

  return (
    <div className="checkoutProduct">
      {basket?.length === 0 ? (
        <div className="cart__empty">
          <h2>Shopping Cart</h2>
          <h2>Your Shopping Cart is empty.</h2>
        </div>
      ) : (
        <>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          {basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              description={item.description}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Checkout;
