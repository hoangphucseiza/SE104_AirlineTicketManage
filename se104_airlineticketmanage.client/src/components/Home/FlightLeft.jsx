import React from "react";
import moment from "moment";
import FlightBoard from "../FlightBoard";

const FlightLeft = ({ flightsSchedule }) => {
  return (
    <div className="home-flights-left">
      <div className="home-flights-left-search mb-2">
        <i className="fa-solid fa-magnifying-glass me-2" />
        <input placeholder="Mã chuyến bay..." />
      </div>
      <div className="home-flight-left-filters mb-4">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Ngày khởi hành
          </button>
          <ul className="dropdown-menu">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Điểm đi
          </button>
          <ul className="dropdown-menu">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Điểm đến
          </button>
          <ul className="dropdown-menu">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <table className="table home-flight-left-list">
        <thead>
          <tr>
            <th scope="col">Mã chuyến bay</th>
            <th scope="col">Điểm đi - Điểm đến</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Hành khách</th>
          </tr>
        </thead>
        <tbody>
          {flightsSchedule.map((flight, index) => (
            <tr key={index}>
              <td>{flight.id}</td>
              <td style={{
                paddingRight:'36px'
              }}>
                <FlightBoard flight={flight} />
              </td>
              <td>{moment(flight.depart_date).format("D MMMM, YYYY")}</td>
              <td>{flight.passengers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightLeft;
