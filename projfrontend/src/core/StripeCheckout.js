import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const userToken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        // const { status } = response;
        const a = response.json().then((event) => {
          console.log(event);
          const orderData = {
            products: products,
            transaction_id: event.id,
            amount: event.amount,
          };
          createOrder(userId, userToken, orderData);
        });
        // console.log(a);

        emptyCart(() => {
          console.log("Crash?");
        });

        setReload(!reload);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      emptyCheck()
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  const emptyCheck = () => {
    if (products.length > 0) {
      return (
        <StripeCheckoutButton
          stripeKey="pk_test_51GuHoJJxT7MBHh0sL9CGgZlEghJJmCT1Mc3l2X6SnG2JBC5bonz04icSZaB9yyJc2yRCqf5l2X1RW4UGJKRp6UGO0016iffFMR"
          token={makePayment}
          amount={getFinalPrice() * 100}
          name="Buy Tshirts"
          shippingAddress
          billingAddress
        >
          <button className="btn btn-success btn-block">Pay with Stripe</button>
        </StripeCheckoutButton>
      );
    } else {
      return <h1>Add something to cart</h1>;
    }
  };

  return (
    <div>
      {/* <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3> */}
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
