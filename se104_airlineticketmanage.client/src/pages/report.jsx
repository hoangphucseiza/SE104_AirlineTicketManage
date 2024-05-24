import React, { useState, useMemo, useEffect } from "react";
import { getDataAPI } from "../utils/fetchData";
import ChartFlight from "../components/ReportSummary/ChartFlight";
import ChartYear from "../components/ReportSummary/ChartYear";
import FormatMoney from "../utils/FormatMoney";

const Report = () => {
  const [isShowMonth, setIsShowMonth] = useState(true);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthStatistics, setMonthStatistics] = useState([]);
  const [yearStatistics, setYearStatistics] = useState([]);

  useEffect(() => {
    const getMonthStatistic = async () => {
      const res = await getDataAPI(
        `api/VeMayBay/DoanhThuTheoThang/${month}/${year}`
      );

      const data = res.data["$values"].map((item) => ({
        flight_id: item.maCB,
        number_tickets: item.tongSoVe,
        sold_tickets: item.tongSoVeBanDuoc,
        revenue: item.doanhThu,
        percent: parseFloat(item.phanTram.toFixed(2)),
      }));

      setMonthStatistics(data);
    };
    getMonthStatistic();
  }, [month, year]);

  useEffect(() => {
    const getYearStatistic = async () => {
      const res = await getDataAPI(`api/VeMayBay/DoanhThuTheoNam/${year}`);

      console.log(res.data);
      const data = res.data["$values"].map((item) => ({
        month: item.thang,
        number_flights: item.soChuyenBayKhoiHanh,
        sold_tickets: item.tongSoVeBanDuoc,
        revenue: item.doanhThu,
        percent: parseFloat(item.tyLe.toFixed(2)),
      }));

      setYearStatistics(data);
    };
    getYearStatistic();
  }, [year]);

  const arrMonths = useMemo(() => {
    let maxMonth = 0;
    const monthArray = [];

    if (year === new Date().getFullYear()) {
      maxMonth = new Date().getMonth() + 1;
    } else {
      maxMonth = 12;
    }

    for (let i = maxMonth; i >= 1; i--) {
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

  const chartDataFlight = useMemo(() => {
    return monthStatistics.map((item) => ({
      maCB: item.flight_id,
      revenue: item.revenue,
    }));
  }, [monthStatistics]);

  const chartDataYear = useMemo(() => {
    return yearStatistics.map((item) => ({
      Thang: "Tháng " + item.month,
      revenue: item.revenue,
    }));
  }, [yearStatistics]);

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
                  <li key={index} onClick={() => setMonth(item)}>
                    {`Tháng ${item}`}
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

          <div className="container-report">
            <table className="table" style={{ backgroundColor: "#F0F2F5" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Mã Chuyến bay</th>
                  <th scope="col">Tổng số vé</th>
                  <th scope="col">Số vé bán được</th>
                  <th scope="col">Doanh thu (VNĐ)</th>
                  <th scope="col">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody>
                {monthStatistics.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.flight_id}</td>
                    <td>{item.number_tickets}</td>
                    <td>{item.sold_tickets}</td>
                    <td>{item.revenue}</td>
                    <td>
                      <button
                        className="btn btn_outline btn_outline_primary "
                        style={{
                          padding: "8px 4px",
                          minWidth: "100px",
                        }}
                      >
                        {item.percent}%
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6}>
                    <h5 className="mb-0 text-center">
                      Tổng doanh thu:{" "}
                      {FormatMoney(
                        monthStatistics.reduce(
                          (acc, currentValue) => acc + currentValue.revenue,
                          0
                        )
                      )}{" "}
                      VNĐ
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <div className="container-report">
            <table className="table" style={{ backgroundColor: "#F0F2F5" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tháng</th>
                  <th scope="col">Số chuyến bay</th>
                  <th scope="col">Doanh thu (VNĐ)</th>
                  <th scope="col">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody>
                {yearStatistics.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.month}</td>
                    <td>{item.number_flights}</td>
                    <td>{item.revenue}</td>
                    <td>
                      <button
                        className="btn btn_outline btn_outline_primary "
                        style={{
                          padding: "8px 4px",
                          minWidth: "100px",
                        }}
                      >
                        {item.percent}%
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6}>
                    <h5 className="mb-0 text-center">
                      Tổng doanh thu:{" "}
                      {FormatMoney(
                        yearStatistics.reduce(
                          (acc, currentValue) => acc + currentValue.revenue,
                          0
                        )
                      )}{" "}
                      VNĐ
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
