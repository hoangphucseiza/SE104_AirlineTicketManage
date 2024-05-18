import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterBar from "../../components/Customer/FilterBar";
import FindFlightList from "../../components/Booking/FindFlightList";
import ExportCSV from "../../components/ExportCSV";

import { AppContext } from "../../App";
import moment from "moment";

const fakeData = [
  {
    id: "CB001",
    depart: {
      id: "HAN",
      address: "Hà Nội",
    },
    destination: {
      id: "VDH",
      address: "Quảng Bình",
    },
    depart_date: new Date("5/4/2024 10:00"),
    landing_date: new Date("5/4/2024 12:00"),
    flight_time: 120,
    price: 800000,
    capacity: 120,
    ticket_sold: 100,
  },
  {
    id: "CB001",
    depart: {
      id: "HAN",
      address: "Hà Nội",
    },
    destination: {
      id: "VDH",
      address: "Quảng Bình",
    },
    depart_date: new Date("5/4/2024 10:00"),
    landing_date: new Date("5/4/2024 12:00"),
    flight_time: 120,
    price: 800000,
    capacity: 120,
    ticket_sold: 120,
  },
];

const Schedules = () => {
  const { setAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [flights, setFlights] = useState(fakeData);
  const [filters, setFilters] = useState({
    depart: {
      address: "",
      id: "",
    },
    destination: {
      address: "",
      id: "",
    },
    departDate: "",
  });

  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let hash = "";
    if (filters.depart.id) {
      hash += `depart=${filters.depart.id}`;
    }
    if (filters.destination.id) {
      hash += `${hash.length > 0 ? "&" : ""}destination=${
        filters.destination.id
      }`;
    }
    hash += `${hash.length > 0 ? "&" : ""}page=${page}`;
    window.location.hash = hash;
  }, [page, filters]);

  const handleTextSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleClickFlight = (flight) => {
    navigate(`/schedules/update/${flight.id}`);
  };

  const customData = useCallback(() => {
    return flights.map((flight) => ({
      "Mã chuyến bay": flight.id,
      "Sân bay đi": flight.depart.id,
      "Sân bay đến": flight.destination.id,
      "Ngày khởi hành": moment(flight.depart_date).format("DD/MM/YYYY HH:mm"),
      "Thời gian bay": flight.flight_time,
      "Giá vé": flight.price,
      "Tổng số vé": flight.capacity,
      "Số vẽ đã bán": flight.ticket_sold,
    }));
  }, [flights]);

  return (
    <div className="mb-4">
      <div className="box_shadow mb-3 table_container px-3">
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center mb-5 ">
            <h5 className="mb-0">Danh sách Lịch chuyến bay</h5>
            <div className="d-flex align-items-center gap-4">
              <form
                className="d-flex justify-content-between align-items-center table_search"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm chuyến bay..."
                  className="form-control me-2"
                  value={searchText}
                  onChange={handleTextSearchChange}
                />
                <i className="fa-solid fa-magnifying-glass" />
              </form>
              <Link
                to={{
                  pathname: "/schedules/add",
                }}
                className="btn btn_table btn_add"
              >
                <i className="fa-solid fa-calendar-plus" />
                Tạo lịch chuyến bay
              </Link>
              <ExportCSV
                csvData={customData(flights)}
                filename={"danh-sach-chuyen-bay"}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <div className="mb-3">
          <FindFlightList
            flights={flights}
            handleClickFlight={handleClickFlight}
            showFilter={false}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center ">
        <p>
          Hiển thị {(page - 1) * 10 + 1} đến {page * 10} trong tổng số{" "}
          {pages.length * 10} chuyến bay
        </p>
        <div className="pagination">
          <button
            className="btn btn_page"
            disabled={page <= 1 && true}
            onClick={() => setPage(page - 1)}
          >
            Trước
          </button>
          {pages.map((id) => (
            <button
              key={id}
              className={`btn btn_page ${id === page ? "active" : ""} `}
              onClick={() => setPage(id)}
            >
              {id}
            </button>
          ))}
          <button
            className="btn btn_page"
            disabled={page >= pages.length && true}
            onClick={() => setPage(page + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
