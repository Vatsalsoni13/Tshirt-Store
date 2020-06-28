import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createAProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = ({ history }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getARedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getARedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
          console.log("CATE:", categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    if (photo) {
      event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      createAProduct(user._id, token, formData)
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: "",
              description: "",
              price: "",
              photo: "",
              stock: "",
              loading: false,
              getARedirect: true,
              createdProduct: data.name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setValues({ ...values, error: "No Image" });
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>'{createdProduct}' created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Error in creating {createdProduct} !</h4>
      </div>
    );
  };

  const redirect = () => {
    if (getARedirect) {
      setTimeout(function () {
        history.push("/admin/dashboard");
      }, 3000);
    }
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            required={true}
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
          required={true}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
          required={true}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          required={true}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          required={true}
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
          required={true}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {redirect()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};
export default AddProduct;
