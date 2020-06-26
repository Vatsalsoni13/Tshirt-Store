import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product, customStyles }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/8/1/8/238187-6-eng-GB/Dow-Pharma-Food-Solutions-SIC-Pharma-20162_news_large.jpg";

  const style = { maxHeight: "100%", maxWidth: "100%" };

  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={customStyles ? customStyles : style}
        className="mb-3 rounded"
      />
    </div>
  );
};
export default ImageHelper;
