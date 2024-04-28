import React, { useState } from "react";
import moment from "moment";

const TableRevenueYear = ({ listMonth }) => {


  return (
    <div className="container-report">

      <table className="table home-flight-left-list" style={{ backgroundColor: "#F0F2F5" }}>
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tháng</th>
            <th scope="col">Số chuyến bay</th>
            <th scope="col">Doanh Thu</th>
            <th scope="col">Tỷ lệ</th>
          </tr>
        </thead>
        <tbody>
          {listMonth.map((item, index) => (
            <tr key={index}>
              <td>{item.id_auto}</td>
              <td>{item.month}</td>
              <td>{item.count_flight}</td>
              <td>{item.revenue}</td>
              <td>
                <small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 fix-size">{item.percent}</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableRevenueYear;
