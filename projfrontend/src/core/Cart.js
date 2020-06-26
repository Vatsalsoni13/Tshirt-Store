import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";
import PaymentB from "./PaymentB";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {/* <h2>Load products</h2> */}
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  return (
    <Base title="Cart Page" description="Ready to CheckOut">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in cart!!!</h3>
          )}
        </div>
        {products.length > 0 ? (
          <div className="col-6">
            <h2>Your bill: {getFinalPrice()}</h2>

            <StripeCheckout products={products} setReload={setReload} />

            <h3>OR</h3>
            <PaymentB products={products} setReload={setReload} />
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </Base>
  );
}
