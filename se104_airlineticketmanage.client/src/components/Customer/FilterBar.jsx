import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { getDataAPI } from "../../utils/fetchData";
import DatePicker from "../DatePicker";

const FilterBar = ({ filters, setFilters }) => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const getAirports = async () => {
      try {
        const res = await getDataAPI("api/SanBay/GetSanBayAll");

        res.data &&
          setAirports(
            res.data["$values"].map((airport) => ({
              id: airport.maSB,
              address: airport.viTri,
            }))
          );
      } catch (err) {
        console.log(err);
      }
    };

    getAirports();
  }, []);

  const desAirports = useMemo(() => {
    return airports.filter((airport) => airport.id !== filters.depart.id);
  }, [airports, filters.depart]);

  const handleChangeDate = (date) => {
    setFilters({
      ...filters,
      departDate: date,
    });
  };

  return (
    <div className="home-flight-left-filters mb-4">
      <h6 className="mb-0 me-3">Bộ lọc</h6>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle filter"
          type="button"
          data-bs-toggle="dropdown"
        >
          {filters.depart.id
            ? "Điểm đi: " + filters.depart.id + " - " + filters.depart.address
            : "Điểm đi"}
        </button>
        <ul className="dropdown-menu home-flight-left-filters-airports">
          <li
            onClick={() =>
              setFilters({
                ...filters,
                depart: {
                  address: "",
                  id: "",
                },
              })
            }
          >
            Tất cả
          </li>
          {airports.map((airport, index) => (
            <li
              key={index}
              onClick={() => setFilters({ ...filters, depart: airport })}
            >
              {airport.address} ({airport.id}), Việt Nam
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle filter"
          type="button"
          data-bs-toggle="dropdown"
        >
          {filters.destination.id
            ? "Điểm đến: " +
              filters.destination.id +
              " - " +
              filters.destination.address
            : "Điểm đến"}
        </button>
        <ul className="dropdown-menu home-flight-left-filters-airports">
          <li
            onClick={() =>
              setFilters({
                ...filters,
                destination: {
                  address: "",
                  id: "",
                },
              })
            }
          >
            Tất cả
          </li>
          {desAirports.map((airport, index) => (
            <li
              key={index}
              onClick={() => setFilters({ ...filters, destination: airport })}
            >
              {airport.address} ({airport.id}), Việt Nam
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
          {filters.departDate
            ? "Ngày khởi hành: " +
              moment(filters.departDate).format("DD/MM/YYYY")
            : "Ngày khởi hành"}
        </button>
        <ul className="dropdown-menu">
          <DatePicker
            date={filters.departDate}
            onChangeDate={handleChangeDate}
            acceptPastDate={true}
          />
        </ul>
      </div>
    </div>
  );
};

export default FilterBar;
