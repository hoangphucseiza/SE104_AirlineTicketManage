import React, { useState } from "react";
import moment from "moment";

const TableRevenueFlight = ({ listFlights }) => {


  return (
    <div className="container-report">

      <table className="table home-flight-left-list" style={{ backgroundColor: "#F0F2F5" }}>
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã Chuyến bay</th>
            <th scope="col">Số Vé</th>
            <th scope="col">Doanh Thu</th>
            <th scope="col">Tỷ lệ</th>
          </tr>
        </thead>
        <tbody>
          {listFlights.map((item, index) => (
            <tr key={index}>
              <td>{item.id_auto}</td>
              <td>{item.maCB}</td>
              <td>{item.count_ticket}</td>
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

export default TableRevenueFlight;
