import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the tshirt store">
      <div className="row text-center">
        {products.length === 0 ? (
          <div>
            <h1>No products to buy as of now!!</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-white">All of Tshirts</h1>
            <div className="row">
              {products.map((product, index) => {
                return (
                  <div key={index} className="col-4 mb-4">
                    <Card product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Base>
  );
}
