import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getOrders } from "./helper/adminapicall";

const ManageCategories = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getOrders(user._id, token)
      .then((data) => {
        console.log("ORDERS", data);

        if (data.error) {
          console.log(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(user._id);

    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage Orders here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mt-4">All Orders:</h2>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {orders.length} orders
          </h2>
          {orders.map((orders, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-6">
                  <h3 className="text-white text-left">{orders._id}</h3>
                </div>
                <div className="col-6">
                  <Link
                    className="btn btn-success"
                    to={`/admin/order/update/${orders._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
export default ManageCategories;
