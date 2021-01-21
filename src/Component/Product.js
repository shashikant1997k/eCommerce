import React from "react";
import "../CSS/Product.css";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";

function Product({ id, title, price, rating, image, description }) {
  const dispatch = useDispatch();
  const uesr = useSelector((state) => state.user);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        price,
        image,
        description,
      },
    });

    db.collection("cartItem").add({
      id,
      uid: uesr?.uid,
      title,
      price,
      image,
      description,
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <div className="product_title">
          {title.length < 40 ? title : title.slice(0, 40) + "..."}
        </div>

        <div className="product__desc">
          {description.length < 75
            ? description
            : description.slice(0, 75) + "..."}
        </div>
        <div className="product__price">
          <div>₹ {price}</div>
        </div>
      </div>

      <div className="product__img">
        <img src={image} alt="" />
      </div>
      <div className="add__to__cart">
        <button onClick={addToBasket}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
