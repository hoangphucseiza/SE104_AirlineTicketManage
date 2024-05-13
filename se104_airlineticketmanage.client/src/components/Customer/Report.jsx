import React from "react";

const Report = ({ result }) => {
  return (
    <div className="home-flights-right">
      <div className="d-flex align-items-center flex-column home-flights-right-above" style={{ width: "70%", margin: "auto", marginBottom: "30px" }}>
        <div className="mb-3 home-flights-rights-header">
          <span>TỔNG SỐ LƯỢNG KHÁCH HÀNG</span>
        </div>
        <h6
          style={{
            fontSize: "18px",
            color: "var(--text-color-bold)",
          }}
        >
          {result.totalCus} NGƯỜI/NĂM
        </h6>
      </div>

      <div className="d-flex align-items-center flex-column home-flights-right-above" style={{width: "70%", margin: "auto"}}>
        <div className="mb-3 home-flights-rights-header" style={{ backgroundColor: "var(--bg-yellow-color)"}}>
          <span>DOANH THU THƯỜNG NIÊN</span>
        </div>
        <h6
          style={{
            fontSize: "18px",
            color: "var(--text-color-bold)",
          }}
        >
          {result.totalRevenue} VND/NĂM
        </h6>
      </div>
      
    </div>
  );
};

export default Report;
