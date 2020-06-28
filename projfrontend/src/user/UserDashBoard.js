import React from "react";
import Base from "../core/Base";
import { useState } from "react";
import { getMyOrders } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { useEffect } from "react";
import ImageHelper from "../core/helper/ImageHelper";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [values, setValues] = useState({
    data: [],
  });

  const { data } = values;

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getOrders = () => {
    getMyOrders(userId, token)
      .then((data) => {
        console.log(data);

        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            data,
            // orderId: data._id,
            // name: data.user.name,
            // amount: data.amount,
            // createdAt: data.createdAt,
            // products: data.products,
            // transactionId: data.transactionId,
            // status: data.status,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const date = (time) => {
    const isoTime = new Date(time).toLocaleTimeString();
    const isoDate = new Date(time).toDateString();
    console.log(isoDate);

    return isoDate + ", " + isoTime;
  };

  const showImage = (product) => (
    <ImageHelper
      product={product}
      // customStyles={{ height: "30%", width: "30%" }}
    />
  );

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Base title="UserDashboard" description="My Orders">
      <div className="mr-5 float-right">
        <Link className="btn btn-small btn-success mb-3" to="/user/profile">
          Profile
        </Link>
      </div>
      {data.length === 0 ? (
        <div>
          <h3>
            No Orders visit <Link to="/">Home</Link> to explore more products
          </h3>
        </div>
      ) : (
        data.map((order, index) => (
          // console.log(order);
          <div key={index} className="text-white bg-dark ">
            <table className="table table-bordered text-white ">
              <thead className="thead-light">
                <tr>
                  <th scope="row">Order Id : {order._id}</th>
                  <th scope="row">Status : {order.status}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{order.user.name}</td>
                </tr>
                <tr>
                  <th scope="row">Transaction Id</th>
                  <td>{order.transaction_id}</td>
                </tr>
                <tr>
                  <th scope="row">Amount</th>
                  <td>₹. {order.amount}</td>
                </tr>
                <tr>
                  <th scope="row">Order Date</th>
                  <td>{date(order.createdAt)}</td>
                </tr>
                <tr>
                  <th scope="row">Products</th>
                  <td>
                    You have purchased {order.products.length} products.
                    {order.products.map((product, index) => (
                      <div key={index} className="col-4">
                        <li>
                          {product.name}- ₹.{product.price}
                        </li>
                        {showImage(product)}
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </Base>
  );
};
export default UserDashboard;
