import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    {/* <footer className="page-footer bg-dark ">
      <div className="footer container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg ">Contact Us</button>
      </div>
      
    </footer> */}

    {/* <footer class="footer bg-success">
      <div className="footer container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg ">Contact Us</button>
      </div>
    </footer> */}
    <footer className="footer bg-success mt-3">
      <div className="footer container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg ">Contact Us</button>
      </div>
    </footer>
  </div>
);

export default Base;
