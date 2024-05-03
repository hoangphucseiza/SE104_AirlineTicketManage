import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const AirportList = ({ airports }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Mã sân bay</th>

          <th
            scope="col"
            style={{
              cursor: "pointer",
            }}
          >
            Tên sân bay <i className="fa-solid fa-sort ms-1" />
          </th>
          <th scope="col">Vị trí</th>

          <th
            scope="col"
            style={{
              cursor: "pointer",
            }}
          >
            Thời gian dừng tối thiểu (phút){" "}
            <i className="fa-solid fa-sort ms-1" />
          </th>
          <th
            scope="col"
            style={{
              cursor: "pointer",
            }}
          >
            Thời gian dừng tối đa (phút)
            <i className="fa-solid fa-sort ms-1" />
          </th>

          <th scope="col" colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {airports.map((airport, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{airport.id}</td>
            <td>{airport.name}</td>
            <td>{airport.address}</td>
            <td>{airport.transit_min}</td>
            <td>{airport.transit_max}</td>
            <td colSpan={2} style={{
                textAlign:'center'
            }}>
              <Link
                to={`/airports/update/${airport.id}`}
                className="btn btn_table btn_edit  me-4"
              >
                <i className="fa-regular fa-pen-to-square" />
                Sửa SB
              </Link>
              <button className="btn btn_table btn_delete">
                <i className="fa-solid fa-delete-left" />
                Xóa SB
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AirportList;
