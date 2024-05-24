import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import FlightBoard from "../FlightBoard";

const SchedulesTable = ({ listSchedule }) => {
  return (
    <table className="table home-flight-left-list" style={{ backgroundColor: "#F0F2F5" }}>
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Mã CB</th>
          <th scope="col">Ngày khởi hành</th>
          <th scope="col">Điểm đi - Điểm đến</th>
          <th scope="col">Thời gian bay</th>
          <th scope="col">Giá vé CB</th>
          <th scope="col">Số lượng SBTG</th>
          <th scope="col">Hạng vé</th>
        </tr>
      </thead>
      <tbody>
        {listSchedule.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.maCB}</td>
            <td>{moment(item.depart_date).format("D MMMM, YYYY")}</td>
            <td style={{ padding: '20px' }}>
              <FlightBoard flight={item} />
            </td>
            <td>{item.tgBay}</td>
            <td>{item.giaVeCB}</td>
            <td>{item.slSBTG}</td>
            <td>
              <div class="container px-4 text-center">
                <div class="row gx-5">
                  <div>
                    <div class="p-3">{item.hangVe.typePT} : {item.hangVe.slPT}</div>
                  </div>
                  <div>
                    <div class="p-3">{item.hangVe.typeTG} : {item.hangVe.slTG}</div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <Link
                to={`/schedules/update/${item.maCB}`}
                className="btn btn_table btn_edit  me-4"
              >
                <i className="fa-regular fa-pen-to-square" />
                Sửa Lịch Bay
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

export default SchedulesTable;