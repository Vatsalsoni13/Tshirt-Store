import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategory,
  updateACategory,
} from "./helper/adminapicall";

const UpdateCategory = ({ history, match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getARedirect, setGetARedirect] = useState(false);

  const { user, token } = isAuthenticated();

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Update the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For eg: Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend Request
    updateACategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
          setGetARedirect(true);
        }
      })
      .catch((e) => {
        console.log("Update Category", e);
      });
  };

  const preload = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        console.log(data);

        if (data.error) {
          setError(true);
        } else {
          setName(data.name);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const redirect = () => {
    if (getARedirect) {
      setTimeout(function () {
        history.push("/admin/dashboard");
      }, 3000);
    }
  };

  return (
    <Base
      title="Update a Category here"
      description=""
      // description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()} {goBack()}
          {redirect()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
