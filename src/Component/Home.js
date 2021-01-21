import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CSS/Home.css";
import Product from "./Product";

function Home() {
  const [item, setItem] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        let arr = {};
        if (Array.isArray(res?.data)) {
          res.data.forEach((val) => {
            if (arr[val.category]) {
              arr[val.category].push(val);
            } else {
              arr[val.category] = [];
            }
          });
        }

        setItem(arr);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  console.log(item);
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="home">
      <div className="background__img">
        <img
          className="home__image"
          src="https://wallpapercave.com/wp/wp3537591.jpg"
          alt="BackgroundImage"
        />
      </div>

      {item &&
        Object.entries(item)?.map(([key, val], i) => (
          <div className="main__row" key={key}>
            <h3 key={`${key}_${i}`}>{toTitleCase(key)}</h3>
            <div className="home__row" key={i}>
              {val.map((v) => (
                <>
                  <Product
                    key={v.id}
                    id={v.id}
                    title={v.title}
                    price={v.price}
                    rating={5}
                    image={v.image}
                    description={v.description}
                  />
                </>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
