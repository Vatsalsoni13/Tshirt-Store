import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateAProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import ImageHelper from "../core/helper/ImageHelper";

const UpdateProduct = ({ history, match }) => {
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
    product: [],
  });

  const {
    product,
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

  const preload = (productId) => {
    getProduct(productId)
      .then((data) => {
        console.log("Product", data);

        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          preloadCategories();

          setValues((values) => {
            return {
              ...values,
              product: data,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category.name,
              stock: data.stock,
              formData: new FormData(),
            };
          });
          console.log("CATE:", categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues((values) => {
          return {
            ...values,
            categories: data,
            formData: new FormData(),
          };
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateAProduct(match.params.productId, user._id, token, formData)
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
        <h4>'{createdProduct}' updated successfully</h4>
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
          {!photo ? (
            <ImageHelper
              product={product}
              // customStyles={{ height: "30%", width: "0%" }}
            />
          ) : (
            <div className="rounded border border-success p-2">
              {console.log(photo)}
              <img
                src={URL.createObjectURL(photo)}
                alt="photo"
                style={{ height: "50%", width: "50%" }}
                className="mb-3 rounded"
              />
            </div>
          )}

          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
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
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>{category}</option>
          {categories &&
            categories.map((cate, index) => {
              if (cate.name !== category)
                return (
                  <option key={index} value={cate.name}>
                    {cate.name}
                  </option>
                );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
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
          {/* {console.log(product)} */}
          {successMessage()}
          {warningMessage()}
          {redirect()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateProduct;
