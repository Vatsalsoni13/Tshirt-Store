import React from "react";
import Base from "../core/Base";
import { useState } from "react";
import { getUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { useEffect } from "react";
const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    purchases: [],
  });

  const { name, email, purchases } = values;

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getMyProfile = () => {
    getUser(userId, token)
      .then((data) => {
        console.log(data);

        setValues({
          ...values,
          name: data.name,
          email: data.email,
          purchases: data.purchases,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <Base title="Profile">
      <div className="card mb-4 ">
        <h4 className="card-header bg-success">User Information</h4>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{email}</td>
            </tr>

            <tr>
              <th scope="row">Purchases</th>
              <td>
                You have purchased {purchases.length} products.
                {purchases.map((product, index) => (
                  <div key={index} className="col-5">
                    <li>
                      {product.name}- ₹.{product.amount}
                    </li>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Base>
  );
};
export default Profile;
