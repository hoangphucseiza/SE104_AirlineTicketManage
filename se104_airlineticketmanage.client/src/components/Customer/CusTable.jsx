import React from "react";
import moment from "moment";

const CusTable = ({ listCus }) => {
  return (
    <table className="table home-flight-left-list" style={{ backgroundColor: "#F0F2F5"}}>
        <thead>
          <tr>
            <th scope="col">Mã KH</th>
            <th scope="col">Tên KH</th>
            <th scope="col">Số CCCD</th>
            <th scope="col">SĐT</th>
            <th scope="col">MÃ CB</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Vị trí sân bay</th>
          </tr>
        </thead>
        <tbody>
          {listCus.map((cus, index) => (
            <tr key={index}>
              <td>{cus.maKH}</td>
              <td>{cus.tenKH}</td>
              <td>{cus.cccd}</td>
              <td>{cus.sdt}</td>
              <td>{cus.maCB}</td>
              <td>{moment(cus.ngayBay).format("D MMMM, YYYY")}</td>
              <td>{cus.vitri}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
};

export default CusTable;