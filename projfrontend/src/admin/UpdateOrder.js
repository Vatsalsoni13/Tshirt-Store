// import React, { useState, useEffect } from "react";
// import Base from "../core/Base";
// import { Link } from "react-router-dom";
// import { getOrderStatus, updateAOrder, getOrder } from "./helper/adminapicall";
// import { isAuthenticated } from "../auth/helper";

// const UpdateOrder = ({ match, history }) => {
//   const [values, setValues] = useState({
//     allstatus: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
//     newStatus: "",
//     error: "",
//     success: false,
//     products: [],
//     amount: "",
//     loading: true,
//   });

//   const {
//     allstatus,
//     error,
//     newStatus,
//     success,
//     amount,
//     products,
//     loading,
//   } = values;

//   const userId = isAuthenticated() && isAuthenticated().user._id;
//   const { token } = isAuthenticated();

//   const preload = (orderId) => {
//     getOrder(orderId, userId, token).then((data) => {
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({
//           ...values,
//           amount: data.amount,
//           products: data.products,
//           loading: false,
//           newStatus: data.status,
//         });
//       }
//     });
//   };

//   // const preloadStatus = () => {
//   //   getOrderStatus(userId, token)
//   //     .then((data) => {
//   //       console.log(data);

//   //       if (data.error) {
//   //         setValues({ ...values, error: data.error });
//   //       } else {
//   //         setValues({ allstatus: data });
//   //       }
//   //     })
//   //     .catch((e) => {
//   //       console.log(e);
//   //     });
//   // };

//   useEffect(() => {
//     preload(match.params.orderId);
//   }, []);

//   const successMessage = () => {
//     return (
//       <div
//         className="alert alert-success mt-3"
//         style={{ display: success ? "" : "none" }}
//       >
//         <h4>Order updated successfully</h4>
//       </div>
//     );
//   };

//   const warningMessage = () => {
//     return (
//       <div
//         className="alert alert-danger mt-3"
//         style={{ display: error ? "" : "none" }}
//       >
//         <h4>Error in updating !</h4>
//       </div>
//     );
//   };

//   const getAllStatus = () => {
//     return (
//       allstatus &&
//       allstatus.map((s, index) => {
//         if (newStatus !== s) {
//           return (
//             <option key={index} value={s}>
//               {s}
//             </option>
//           );
//         }
//       })
//     );
//   };

//   const redirect = () => {
//     if (success) {
//       setTimeout(function () {
//         history.push("/admin/dashboard");
//       }, 3000);
//     }
//   };

//   const myCategoryForm = () => {
//     return (
//       <form>
//         <div className="form-group">
//           <p className="lead">Update the order</p>
//           <div className="form-group">
//             <select
//               onChange={handleChange("newStatus")}
//               className="form-control"
//               placeholder="Status"
//             >
//               <option value="current">{newStatus}</option>
//               {getAllStatus()}
//             </select>
//           </div>
//           <button onClick={onSubmit} className="btn btn-outline-info">
//             Update Order
//           </button>
//         </div>
//       </form>
//     );
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     const formData = { orderId: match.params.orderId, status: newStatus };

//     updateAOrder(match.params.orderId, userId, token, formData)
//       .then((data) => {
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           setValues({ ...values, newStatus: "", success: true });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleChange = (name) => (event) => {
//     const value = event.target.value;

//     setValues({ ...values, [name]: value });
//   };

//   const goBack = () => {
//     return (
//       <div className="mt-5">
//         <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
//           Admin Home
//         </Link>
//       </div>
//     );
//   };
//   return loading ? (
//     <h1>Loading</h1>
//   ) : (
//     <Base
//       title="Update a Category here"
//       description=""
//       className="container bg-info p-4"
//     >
//       <div className="row bg-white rounded">
//         <div className="col-md-8 offset-md-2">
//           {successMessage()}
//           {warningMessage()}
//           {myCategoryForm()} {goBack()}
//           {redirect()}
//         </div>
//       </div>
//     </Base>
//   );
// };
// export default UpdateOrder;
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getOrderStatus,
  updateAOrder,
  getAOrder,
  getOrder,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateOrder = ({ match }) => {
  const [values, setValues] = useState({
    allstatus: [],
    newStatus: "",
    error: "",
    success: false,
    currentStatus: "",
    products: [],
    amount: "",
  });

  const {
    allstatus,
    error,
    newStatus,
    success,
    amount,
    currentStatus,
    products,
  } = values;

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const { token } = isAuthenticated();

  const preload = () => {
    getOrder(match.params.orderId, userId, token).then((response) => {
      console.log(response);

      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        preloadStatus();
        setValues((values) => {
          return {
            ...values,
            amount: response.amount,
            products: response.products,
            newStatus: response.status,
          };
        });
      }
    });
  };

  const preloadStatus = () => {
    getOrderStatus(userId, token)
      .then((data) => {
        console.log(data);

        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues((values) => {
            return { ...values, allstatus: data };
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h4>Order updated successfully</h4>
      </div>
    );
  };

  const warningMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Error in updating !</h4>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Update the order</p>
          <div className="form-group">
            <select
              onChange={handleChange("newStatus")}
              className="form-control"
              placeholder="Status"
            >
              <option>
                {newStatus}
                {console.log("CURRENTSTATUS", newStatus)}
              </option>
              {allstatus &&
                allstatus.map((s, index) => {
                  if (s !== newStatus)
                    return (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    );
                })}
            </select>
          </div>
          <button onClick={onSubmit} className="btn btn-outline-info">
            Update Order
          </button>
        </div>
      </form>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = { orderId: match.params.orderId, status: newStatus };

    console.log(formData);

    updateAOrder(match.params.orderId, userId, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, newStatus: "", success: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;

    setValues({ ...values, [name]: value });
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

  return (
    <Base
      title="Update a Category here"
      description=""
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()} {goBack()}
          {/* {redirect()} */}
        </div>
      </div>
    </Base>
  );
};
export default UpdateOrder;
