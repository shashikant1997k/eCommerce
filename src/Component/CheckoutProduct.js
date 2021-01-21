import React from "react";
import "../CSS/CheckoutProduct.css";
// import { useStateValue } from "./StateProvider/StateProvider";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";

function CheckoutProduct(item) {
  // const [{ basket }, dispatch] = useStateValue();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const removeFromCart = () => {
    console.log(item.id);
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: item.id,
    });

    db.collection("cartItem").doc(item.id).delete();
  };

  return (
    <div className="checkout__product">
      <img className="checkout__productImage" src={item.image} alt="" />
      <div className="checkout__productInfo">
        <div className="checkout__productTitle">{item.title}</div>
        <div className="checkout__productPrice">₹ {item.price}</div>
        <div className="checkout__productDesc">{item.description}</div>
        <button onClick={removeFromCart}>Remove from cart</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
