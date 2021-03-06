import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: 0,
    error: "",
    success: false,
  });
  const { name, email, password, error, success, role } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, role })
      .then((data) => {
        console.log(data);

        if (data.error) {
          console.log("if");

          setValues({ ...values, error: data.error, success: false });
        } else if (data.err) {
          setValues({ ...values, error: data.err, success: false });
        } else {
          console.log("else");

          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => {
        setValues({ ...values, error: "Already exists or Try agin later" });
        console.log("Error in signup");
      });
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder="Email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Role</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value={0}
                  checked={role === 0}
                  onChange={handleChange("role")}
                />
                <label className="form-check-label">User</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value={1}
                  checked={role === 1}
                  onChange={handleChange("role")}
                />
                <label className="form-check-label">Admin</label>
              </div>
              {/* <input
                className="form-control"
                onChange={handleChange("password")}
                type="radio"
                value={password}
              /> */}
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully! Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignUp Page" description="A page for user to signup!">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </Base>
  );
};
export default Signup;
