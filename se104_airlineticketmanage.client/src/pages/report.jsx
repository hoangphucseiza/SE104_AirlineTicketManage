import React, { useState, useMemo, useEffect } from "react";
import TableRevenueFlight from "../components/ReportSummary/TableRevenueFlight";
import FilterBar from "../components/Customer/FilterBar";
import TableRevenueYear from "../components/ReportSummary/TableRevenueYear";
import ChartFlight from "../components/ReportSummary/ChartFlight";
import ChartYear from "../components/ReportSummary/ChartYear";

const fakeDataMonth = [
  {
    id: "CB01",
    number_tickets: 250,
    revenue: 12000000,
    percent: 50,
  },
  {
    id: "CB02",
    number_tickets: 250,
    revenue: 12000000,
    percent: 10,
  },
];

const fakeDataYear = [
  {
    month: 1,
    number_flights: 20,
    revenue: 12000000,
    percent: 10,
  },
  {
    month: 2,
    number_flights: 20,
    revenue: 12000000,
    percent: 10,
  },
];

const Report = () => {
  const [isShowMonth, setIsShowMonth] = useState(true);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const arrMonths = useMemo(() => {
    let maxMonth = 0;
    const monthArray = [];

    if (year === new Date().getFullYear()) {
      maxMonth = new Date().getMonth() + 1;
    } else {
      maxMonth = 12;
    }

    for (let i = 1; i <= maxMonth; i++) {
      monthArray.push(i);
    }
    return monthArray;
  }, [year]);

  const yearArray = () => {
    let maxYear = new Date().getFullYear();
    const yearArray = [];
    for (let i = maxYear; i >= 2020; i--) {
      yearArray.push(i);
    }
    return yearArray;
  };

  useEffect(() => {
    let hash = "";
    if (isShowMonth) {
      hash += `month=${month}`;
    }

    hash += `${hash.length > 0 ? "&" : ""}year=${year}`;

    hash += `${hash.length > 0 ? "&" : ""}`;
    window.location.hash = hash;
  }, [year, month, isShowMonth]);

  const list_flights = [
    {
      id_auto: 1,
      maCB: "CB001",
      count_ticket: "Sum Ticket of maCB",
      revenue: "Sum GiaTien of maCB",
      // percent: "(revenue/Revenue Month)*100"
      percent: "70%",
    },
    {
      id_auto: 2,
      maCB: "CB002",
      count_ticket: "Sum Ticket of maCB",
      revenue: "Sum GiaTien of maCB",
      // percent: "(revenue/Revenue Month)*100"
      percent: "30%",
    },
  ];

  // State cho danh sách chuyến bay
  const [listFlights, setListFlights] = useState(list_flights);

  // Dữ liệu mẫu cho bảng DOANH THU NĂM
  const list_month = [
    {
      id_auto: 1,
      month: "CB001",
      count_flight: "Sum flight of month",
      revenue: "Sum revenue",
      // percent: "(revenue/Revenue Year)*100"
      percent: "50%",
    },
    {
      id_auto: 2,
      month: "CB002",
      count_flight: "Sum flight of month",
      revenue: "Sum revenue",
      // percent: "(revenue/Revenue Year)*100"
      percent: "50%",
    },
  ];

  const [listMonth, setListMonth] = useState(list_month);

  const chartDataFlight = [
    { maCB: "CB001", revenue: 1000000 },
    { maCB: "CB002", revenue: 1500000 },
    { maCB: "CB003", revenue: 800000 },
    { maCB: "CB004", revenue: 2000000 },
  ];

  const chartDataYear = [
    { Thang: "Thang 1", revenue: 5000000 },
    { Thang: "Thang 2", revenue: 7000000 },
    { Thang: "Thang 3", revenue: 6000000 },
    { Thang: "Thang 4", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 5", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 6", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 7", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 8", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 9", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 10", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 11", revenue: Math.floor(Math.random() * 10000000) + 1 },
    { Thang: "Thang 12", revenue: Math.floor(Math.random() * 10000000) + 1 },
  ];

  return (
    <div className="report-container">
      <header className="d-flex mb-4">
        <p
          className={`mb-0 ${isShowMonth ? "active" : ""}`}
          style={{
            borderRight: "1px solid var(--border-color)",
          }}
          onClick={() => setIsShowMonth(true)}
        >
          Báo cáo doanh thu theo tháng
        </p>
        <p
          className={`mb-0 ${!isShowMonth ? "active" : ""}`}
          onClick={() => setIsShowMonth(false)}
        >
          Báo cáo doanh thu theo năm
        </p>
      </header>
      <div className="chart-container">
        {isShowMonth ? (
          <div className="chart-wrapper">
            <h4>Biểu đồ doanh thu các chuyến bay trong tháng</h4>
            <ChartFlight data={chartDataFlight} />
          </div>
        ) : (
          <div className="chart-wrapper">
            <h4>Biểu đồ doanh thu các chuyến bay của từng tháng trong năm</h4>
            <ChartYear data={chartDataYear} />
          </div>
        )}
      </div>

      {isShowMonth ? (
        <div className="pt-3">
          <h4 className="mb-3">
            Danh sách doanh thu các chuyến bay trong tháng
          </h4>

          <div className="home-flight-left-filters mb-4">
            <h6 className="mb-0 me-3">Bộ lọc</h6>

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle filter"
                type="button"
                data-bs-toggle="dropdown"
              >
                {`Tháng: ${month}`}
              </button>
              <ul
                className="dropdown-menu home-flight-left-filters-airports"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {arrMonths.map((item, index) => (
                  <li key={index} onClick={() => setMonth(index + 1)}>
                    {`Tháng ${index + 1}`}
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
                {`Năm: ${year}`}
              </button>
              <ul className="dropdown-menu home-flight-left-filters-airports">
                {yearArray().map((item, index) => (
                  <li key={index} onClick={() => setYear(item)}>
                    {`Năm ${item}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <TableRevenueFlight listFlights={listFlights} />
        </div>
      ) : (
        <div>
          <h4 className="mb-3">
            Danh sách doanh thu các chuyến bay từng tháng trong năm
          </h4>
          <div className="home-flight-left-filters mb-4">
            <h6 className="mb-0 me-3">Bộ lọc</h6>

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle filter"
                type="button"
                data-bs-toggle="dropdown"
              >
                {`Năm: ${year}`}
              </button>
              <ul className="dropdown-menu home-flight-left-filters-airports">
                {yearArray().map((item, index) => (
                  <li key={index} onClick={() => setYear(item)}>
                    {`Năm ${item}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <TableRevenueYear listMonth={listMonth} />
        </div>
      )}
    </div>
  );
};

export default Report;
