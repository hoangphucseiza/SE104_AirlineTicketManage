import React from "react";

const Report = ({ cusNumbers }) => {
  return (
    <div className="home-flights-right">
      <div
        className="d-flex align-items-center flex-column home-flights-right-above"
        style={{ width: "70%", margin: "auto", marginBottom: "30px" }}
      >
        <div className="mb-3 home-flights-rights-header">
          <span >Tổng số lượng hành khách</span>
        </div>
        <h6
          style={{
            fontSize: "20px",
            color: "var(--text-color-bold)",
          }}
        >
          {cusNumbers} hành khách
        </h6>
      </div>
    </div>
  );
};

export default Report;
