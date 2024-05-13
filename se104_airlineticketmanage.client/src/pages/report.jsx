import React, { useState } from "react";
import TableRevenueFlight from "../components/ReportSummary/TableRevenueFlight";
import FilterBar from "../components/Customer/FilterBar";
import TableRevenueYear from "../components/ReportSummary/TableRevenueYear";
import ChartFlight from "../components/ReportSummary/ChartFlight";
import ChartYear from "../components/ReportSummary/ChartYear";

const Report = () => {
  const [textFilter1, setTextFilter1] = useState("");

  const handleTextFilterChange1 = (newValue) => {
    setTextFilter1(newValue);
  };

  const filterOptions1 = [
    {
      label: "THÁNG",
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    },
    {
      label: "NĂM",
      values: ["2022", "2023", "2024"]
    }
  ];

  const [textFilter2, setTextFilter2] = useState("");

  const handleTextFilterChange2 = (newValue) => {
    setTextFilter2(newValue);
  };

  const filterOptions2 = [
    {
      label: "NĂM",
      values: ["2020", "2021", "2022", "2023", "2024"]
    }
  ];

  const list_flights = [
    {
      id_auto: 1,
      maCB: "CB001",
      count_ticket: "Sum Ticket of maCB",
      revenue: "Sum GiaTien of maCB",
      // percent: "(revenue/Revenue Month)*100"
      percent: "70%"
    },
    {
      id_auto: 2,
      maCB: "CB002",
      count_ticket: "Sum Ticket of maCB",
      revenue: "Sum GiaTien of maCB",
      // percent: "(revenue/Revenue Month)*100"
      percent: "30%"
    }
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
      percent: "50%"
    },
    {
      id_auto: 2,
      month: "CB002",
      count_flight: "Sum flight of month",
      revenue: "Sum revenue",
      // percent: "(revenue/Revenue Year)*100"
      percent: "50%"
    }
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
    { Thang: "Thang 12", revenue: Math.floor(Math.random() * 10000000) + 1 }
  ];

  return (
    <div className="report-container">
      <div className="chart-container">
        <div className="chart-wrapper">
          <h4>BIỂU ĐỒ DOANH THU BÁN VÉ CÁC CHUYẾN BAY
          </h4>
          <ChartFlight data={chartDataFlight} />
        </div>
        <div className="chart-wrapper">
          <h4>BIỂU ĐỒ DOANH THU NĂM
          </h4>
          <ChartYear data={chartDataYear} />
        </div>
      </div>

      <h2>DOANH THU BÁN VÉ CÁC CHUYẾN BAY</h2>
      {/* FilterBar và TableRevenueFlight */}
      <FilterBar
        filterOptions={filterOptions1}
        onTextSearchChange={handleTextFilterChange1}
      />
      <TableRevenueFlight listFlights={listFlights} />

      <h2>DOANH THU NĂM</h2>
      {/* FilterBar và TableRevenueYear */}
      <FilterBar
        filterOptions={filterOptions2}
        onTextSearchChange={handleTextFilterChange2}
      />
      <TableRevenueYear listMonth={listMonth} />


    </div>
  );
}

export default Report;
