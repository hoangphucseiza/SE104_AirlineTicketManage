import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import ExportCSV from "../../components/ExportCSV";
import Filter from "../../components/Airports/Filter";
import AirportList from "../../components/Airports/AirportList";

const fakeData = [
  {
    id: "HAN",
    name: "Nội Bài",
    transit_min: 30,
    transit_max: 90,
    address: "Hà Nội",
  },
  {
    id: "SGN",
    name: "Tân Sơn Nhất",
    transit_min: 40,
    transit_max: 60,
    address: "Hà Nội",
  },
  {
    id: "HAN",
    name: "Nội Bài",
    transit_min: 30,
    transit_max: 60,
    address: "Hà Nội",
  },
  {
    id: "HAN",
    name: "Nội Bài",
    transit_min: 30,
    transit_max: 60,
    address: "Hà Nội",
  },
  {
    id: "HAN",
    name: "Nội Bài",
    transit_min: 30,
    transit_max: 60,
    address: "Hà Nội",
  },
  {
    id: "HAN",
    name: "Nội Bài",
    transit_min: 30,
    transit_max: 60,
    address: "Hà Nội",
  },
  {
    id: "HAN",
    name: "Nội Bài",
    transit_min: 30,
    transit_max: 60,
    address: "Hà Nội",
    number_transit_airports: [
      {
        destination_id: "SGN",
        destination_name: "Tân Sơn Nhất",
        destination_add: "Hồ Chí Minh",
        max_transit_airports: 2,
      },
      {
        destination_id: "DAD",
        destination_name: "Cảng hàng không quốc tế Đà Nẵng",
        destination_add: "Đà Nẵng",
        max_transit_airports: 2,
      },
    ],
  },
];

const Airports = () => {
  const [airports, setAirports] = useState(fakeData);
  const [showAirports, setShowAirports] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    transit_time: [0, 0],
    sort: "default",
  });
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setShowAirports([...airports]);
  }, [airports]);

  
  useEffect(() => {
    switch (filter.sort) {
      case "name_A_to_Z":
        setShowAirports((prev) =>
          [...prev].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "name_Z_to_A":
        setShowAirports((prev) =>
          [...prev].sort((a, b) => -a.name.localeCompare(b.name))
        );
        break;
      case "transit_min_high_to_low":
        setShowAirports((prev) =>
          [...prev].sort((a, b) => b.transit_min - a.transit_min)
        );

        break;
      case "transit_max_high_to_low":
        setShowAirports((prev) =>
          [...prev].sort((a, b) => b.transit_max - a.transit_max)
        );
        break;
      default:
        setShowAirports([...airports]);
    }
  }, [filter.sort]);

  const customData = useCallback(() => {
    return airports.map((airport) => ({
      "Mã sân bay": airport.id,
      "Tên sân bay": airport.name,
      "Vị trí": airport.address,
      "Thời gian dừng tối thiểu": airport.transit_min,
      "Thời gian dừng tối đa": airport.transit_max,
    }));
  }, [airports]);

  useEffect(() => {
    let hash = "";
    if (filter.transit_time[0] !== 0) {
      hash += `transit_from=${filter.transit_time[0]}`;
    }
    if (filter.transit_time[1] !== 0) {
      hash += `${hash.length > 0 ? "&" : ""}transit_to=${
        filter.transit_time[1]
      }`;
    }
    hash += `${hash.length > 0 ? "&" : ""}page=${page}`;
    window.location.hash = hash;
  }, [page, filter.transit_time]);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.hash = `search=${search}&page=1`;
  };

  return (
    <div className="mb-4 table">
      <div className="box_shadow mb-3 table_container">
        <div className="mb-3 ">
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <h5>Danh sách Sân bay</h5>
            <div className="d-flex align-items-center gap-4">
              <form
                className="d-flex justify-content-between align-items-center table_search"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm sân bay..."
                  className="form-control me-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass" />
              </form>
              <Link
                to={{
                  pathname: "/airports/add",
                }}
                className="btn btn_table btn_add"
              >
                <i className="fa-solid fa-plus" />
                Thêm sân bay
              </Link>
              <ExportCSV
                csvData={customData(airports)}
                filename={"danh-sach-san-bay"}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3 ">
            <Filter filter={filter} setFilter={setFilter} />
          </div>
        </div>
        <div className="mb-3">
          <AirportList airports={showAirports} />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center ">
        <p>
          Hiển thị {(page - 1) * 10 + 1} đến {page * 10} trong tổng số{" "}
          {pages.length * 10} sân bay
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

export default Airports;
