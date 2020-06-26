import React, { useState, useEffect } from "react";
import { loadCart, emptyCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import { processPayment, getMeToken } from "./helper/PaymentBHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token)
      .then((info) => {
        console.log("INFO", info);

        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch((err) => console.log(err));
  };

  const showbtDropIn = () => {
    if (info.clientToken !== null) {
      return emptyCheck();
    } else {
      return (
        <Link to="/signin">
          <button className="btn btn-warning">Signin</button>
        </Link>
      );
    }
  };

  const emptyCheck = () => {
    if (products.length > 0) {
      return (
        <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="btn btn-success btn-block" onClick={onPurchase}>
            Pay with PayPal
          </button>
        </div>
      );
    } else {
      return <h1>Add something to cart</h1>;
    }
  };

  useEffect(() => {
    if (userId) getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, loading: false, success: response.success });
            console.log("Payment Success");
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData);
            emptyCart(() => {
              console.log("Crash?");
            });

            setReload(!reload);
          })
          .catch((err) => {
            setInfo({ loading: false, success: false });
            console.log("Payment Failed", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      {/* <h3>Your bill is : {getAmount()}</h3> */}
      {showbtDropIn()}
    </div>
  );
};

export default PaymentB;
