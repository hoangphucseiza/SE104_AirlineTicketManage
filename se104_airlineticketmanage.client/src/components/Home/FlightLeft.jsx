import React, { useState, useEffect } from "react";
import moment from "moment";
import FlightBoard from "../FlightBoard";
import DatePicker from "../DatePicker";

// eslint-disable-next-line react/prop-types
const FlightLeft = ({
  flightsSchedule,
  showFlights,
  filters,
  setFilters,
  searchFlights,
  setSearchFlights,
}) => {
  const [departs, setDeparts] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const new_departs = [];
    const new_destinations = [];

    for (var item of flightsSchedule) {
      if (
        new_departs.findIndex((depart) => depart.id === item.depart.id) === -1
      ) {
        new_departs.push(item.depart);
      }

      if (
        new_destinations.findIndex(
          (destination) => destination.id === item.destination.id
        ) === -1
      ) {
        new_destinations.push(item.destination);
      }
    }

    setDeparts(new_departs);
    setDestinations(new_destinations);
  }, [flightsSchedule]);

  const handleChangeDate = (date) => {
    setFilters({
      ...filters,
      date,
    });
  };

  return (
    <div className="home-flights-left">
      <div className="home-flights-left-search mb-2">
        <i className="fa-solid fa-magnifying-glass me-2" />
        <input
          placeholder="Mã chuyến bay..."
          value={searchFlights}
          onChange={(e) => setSearchFlights(e.target.value)}
        />
      </div>
      <div className="home-flight-left-filters mb-4">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {filters.date ? moment(filters.date).format("DD/MM/YYYY") : "Ngày khởi hành"}
          </button>
          <ul className="dropdown-menu">
            <DatePicker date={filters.date} onChangeDate={handleChangeDate} />
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {filters.depart
              ? `Từ: ${filters.depart.address} (${filters.depart.id}), Việt Nam`
              : "Điểm đi"}
          </button>
          <ul className="dropdown-menu home-flight-left-filters-airports">
            <li onClick={() => setFilters({ ...filters, depart: null })}>
              Tất cả
            </li>
            {departs.map((depart, index) => (
              <li
                key={index}
                onClick={() => setFilters({ ...filters, depart })}
              >
                {depart.address} ({depart.id}), Việt Nam
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {filters.destination
              ? `Đến: ${filters.destination.address} (${filters.destination.id}), Việt Nam`
              : "Điểm đến"}
          </button>
          <ul className="dropdown-menu home-flight-left-filters-airports">
            <li onClick={() => setFilters({ ...filters, destination: null })}>
              Tất cả
            </li>
            {destinations.map((destination, index) => (
              <li
                key={index}
                onClick={() => setFilters({ ...filters, destination })}
              >
                {destination.address} ({destination.id}), Việt Nam
              </li>
            ))}
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
          {showFlights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.id}</td>
              <td
                style={{
                  paddingRight: "36px",
                }}
              >
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
