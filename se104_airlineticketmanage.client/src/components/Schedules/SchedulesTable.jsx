import React from "react";
import moment from "moment";
import FlightBoard from "../FlightBoard";

const SchedulesTable = ({ listSchedule }) => {
  return (
    <table className="table home-flight-left-list" style={{ backgroundColor: "#F0F2F5"}}>
        <thead>
          <tr>
            <th scope="col">Mã CB</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Điểm đi - Điểm đến</th>
            <th scope="col">Thời gian bay</th>
            <th scope="col">Giá vé CB</th>
            <th scope="col">Hạng vé</th>
          </tr>
        </thead>
        <tbody>
          {listSchedule.map((item, index) => (
            <tr key={index}>
              <td>{item.maCB}</td>
              <td>{moment(item.depart_date).format("D MMMM, YYYY")}</td>
              <td style={{ paddingRight: '36px' }}>
                <FlightBoard flight={item} /> 
              </td>
              <td>{item.tgBay}</td>
              <td>{item.giaVeCB}</td>
              <td>{item.hangVe}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
};

export default SchedulesTable;
